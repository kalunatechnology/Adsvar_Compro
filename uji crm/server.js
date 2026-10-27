const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const { createHmac, randomBytes, randomUUID } = require('node:crypto');
const dotenv = require('dotenv');

// Prioritaskan uji crm/.env jika ada, fallback ke root .env
const localEnvPath = path.join(__dirname, '.env');
const rootEnvPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(localEnvPath)) {
  console.log(`[ENV] Memuat konfigurasi dari: ${localEnvPath}`);
  dotenv.config({ path: localEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  console.log(`[ENV] Memuat konfigurasi dari root: ${rootEnvPath}`);
  dotenv.config({ path: rootEnvPath });
} else {
  dotenv.config();
}

const MARKA_URL = (process.env.MARKA_CRM_WEBHOOK_URL || '').trim();
const INTEGRATION_ID = (process.env.MARKA_CRM_INTEGRATION_ID || '').trim();
const KEY_ID = (process.env.MARKA_CRM_KEY_ID || '').trim();
const SIGNING_SECRET = (process.env.MARKA_CRM_SIGNING_SECRET || '').trim();
const PUBLIC_ORIGIN_DOMAIN = (process.env.PUBLIC_ORIGIN_DOMAIN || '').trim();
const PATH = '/api/v1/integrations/webhooks/events';

console.log('--- Konfigurasi Webhook CRM ---');
console.log('MARKA_CRM_WEBHOOK_URL   :', MARKA_URL);
console.log('MARKA_CRM_INTEGRATION_ID:', INTEGRATION_ID);
console.log('MARKA_CRM_KEY_ID        :', KEY_ID);
console.log('MARKA_CRM_SIGNING_SECRET:', SIGNING_SECRET ? `${SIGNING_SECRET.slice(0, 6)}...` : '(kosong)');
console.log('PUBLIC_ORIGIN_DOMAIN    :', PUBLIC_ORIGIN_DOMAIN);
console.log('-------------------------------');

async function sendMarkaEvent(eventId, eventType, data) {
  const occurredAt = new Date().toISOString();
  const body = JSON.stringify({
    event_id: eventId,
    event_type: eventType,
    schema_version: 1,
    occurred_at: occurredAt,
    timestamp: Math.floor(Date.now() / 1000),
    data,
  });

  console.log(`\n[EVENT OUTGOING] Mengirim event: ${eventType} (ID: ${eventId})`);
  console.log(`Payload data:`, JSON.stringify(data, null, 2));

  for (let attempt = 1; attempt <= 3; attempt++) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const nonce = randomBytes(16).toString('hex');
    const prefix = `v1\nPOST\n${PATH}\n${timestamp}\n${nonce}\n`;
    const signature = createHmac('sha256', SIGNING_SECRET)
      .update(Buffer.from(prefix, 'utf8'))
      .update(Buffer.from(body, 'utf8'))
      .digest('hex');

    console.log(`[Attempt ${attempt}/3] Headers yang dikirim:`);
    console.log(`  X-Integration-Id        : ${INTEGRATION_ID}`);
    console.log(`  X-Integration-Key-Id    : ${KEY_ID}`);
    console.log(`  X-Integration-Timestamp : ${timestamp}`);
    console.log(`  X-Integration-Nonce     : ${nonce}`);
    console.log(`  X-Integration-Signature : ${signature}`);

    let response;
    try {
      response = await fetch(MARKA_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-Integration-Id': INTEGRATION_ID,
          'X-Integration-Key-Id': KEY_ID,
          'X-Integration-Timestamp': timestamp,
          'X-Integration-Nonce': nonce,
          'X-Integration-Signature': signature,
        },
        body,
        signal: AbortSignal.timeout(8000),
      });
    } catch (error) {
      console.error(`[Attempt ${attempt}] Fetch Error:`, error.message);
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
      continue;
    }

    const responseText = await response.text();
    console.log(`[Marka Response] Status: ${response.status} ${response.statusText}`);
    console.log(`[Marka Response] Body  : ${responseText}`);

    let responseJson = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch (e) {
      // bukan JSON
    }

    if (response.status === 200 || response.status === 202) {
      return { success: true, status: response.status, data: responseJson || responseText };
    }

    if (response.status < 500 && response.status !== 408 && response.status !== 429) {
      return {
        success: false,
        status: response.status,
        error: responseJson || responseText,
        message: `Marka rejected event: HTTP ${response.status}`
      };
    }

    if (attempt === 3) {
      return {
        success: false,
        status: response.status,
        error: responseJson || responseText,
        message: `Marka unavailable after retries: HTTP ${response.status}`
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
  }
}

const app = express();
app.use(express.json());

// Endpoint info server
app.get('/', (req, res) => {
  res.json({
    status: 'Express CRM Test Server Aktif',
    config: {
      markaUrl: MARKA_URL,
      integrationId: INTEGRATION_ID,
      keyId: KEY_ID,
      originDomain: PUBLIC_ORIGIN_DOMAIN,
    },
    endpoints: {
      postInquiry: 'POST /api/contact',
      quickTest: 'GET /test',
    }
  });
});

// Endpoint pengujian cepat langsung dari browser / curl
app.get('/test', async (req, res) => {
  console.log('\n>>> Menerima request GET /test');
  const eventId = randomUUID();
  const testPayload = {
    origin_domain: PUBLIC_ORIGIN_DOMAIN,
    customer: {
      name: 'Tester Express CRM',
      email: 'tester@example.com',
      phone: '08123456789',
    },
    requirements: {
      subject: 'Uji Coba Integrasi CRM via Express',
      description: 'Pesan pengujian otomatis dari Express test server',
      target_budget: 5000000,
    },
  };

  try {
    const result = await sendMarkaEvent(eventId, 'inquiry.submitted', testPayload);
    res.status(result.status || 200).json({
      test: 'GET /test executed',
      eventId,
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint POST /api/contact sesuai inquery_contack.tsx
app.post('/api/contact', async (req, res) => {
  console.log('\n>>> Menerima request POST /api/contact');
  const form = req.body || {};

  if (!form.name || !form.email || !form.subject) {
    return res.status(400).json({ error: 'Data wajib belum lengkap (name, email, subject)' });
  }

  const eventId = req.headers['idempotency-key'] || randomUUID();
  const payload = {
    origin_domain: PUBLIC_ORIGIN_DOMAIN,
    customer: {
      name: String(form.name).slice(0, 200),
      email: String(form.email).slice(0, 320),
      phone: form.phone ? String(form.phone).slice(0, 40) : undefined,
    },
    requirements: {
      subject: String(form.subject).slice(0, 300),
      description: String(form.message || '').slice(0, 20000),
      ...(form.targetBudget ? { target_budget: Number(form.targetBudget) } : {}),
    },
  };

  try {
    const result = await sendMarkaEvent(eventId, 'inquiry.submitted', payload);
    return res.status(result.status || 200).json({
      accepted: result.success,
      event_id: eventId,
      markaResponse: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Express CRM Test Server berjalan di http://localhost:${PORT}`);
  console.log(`- Cek status : GET  http://localhost:${PORT}/`);
  console.log(`- Jalankan tes: GET  http://localhost:${PORT}/test`);
  console.log(`- Submit form: POST http://localhost:${PORT}/api/contact\n`);
});
