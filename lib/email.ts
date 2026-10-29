import nodemailer from "nodemailer";

export interface InquiryEmailPayload {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  packageChoice?: string;
  billingCycle?: string;
  price?: string;
  message?: string;
  brandDescription?: string;
  source?: string;
}

export interface ChatMessagePayload {
  visitorName: string;
  visitorId: string;
  threadId: string;
  messageText: string;
  messageId?: string;
}

export interface TicketPayload {
  subject: string;
  description: string;
  customerEmail?: string;
  serialNumber?: string;
  eventId?: string;
}

export interface FeedbackPayload {
  customerCode: string;
  rating: number;
  feedbackText?: string;
  salesOrderId?: string;
}

// Credentials exactly matching Kaluna technology Google SMTP configuration
const emailUser = process.env.EMAIL_USER || "kalunatechnology@gmail.com";
const emailPass = (process.env.EMAIL_PASS || "zjdbqllnzyzwiehh").replace(/\s+/g, "");
const emailReceiver = process.env.EMAIL_RECEIVER || "corporate@adsvar.id";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

function getJakartaDate(): string {
  return new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });
}

function emailWrapper(title: string, badge: string, contentHtml: string): string {
  const dateStr = getJakartaDate();
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Adsvar Digital</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E4E4E7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0A0A0E; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; width: 100%; background-color: #12131A; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45); border: 1px solid #232433;">
          
          <!-- Top Orange Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #FF5500 0%, #FF8F52 50%, #FF5500 100%);"></td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td style="background-color: #161722; padding: 32px 28px; text-align: center; border-bottom: 1px solid #232433;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.08em; text-transform: uppercase;">
                      ADSVAR<span style="color: #FF5500;">.</span>
                    </span>
                    <p style="margin: 6px 0 0 0; font-size: 11.5px; color: #FF5500; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 700;">
                      ${badge}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #101118; padding: 20px 28px; border-top: 1px solid #232433; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11.5px; color: #71717A;">
                Waktu Masuk: ${dateStr} WIB
              </p>
              <p style="margin: 0; font-size: 11px; color: #52525B;">
                &copy; ${new Date().getFullYear()} Adsvar Digital · PT SINERGI MUDA ARSA. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// 1. Template Inquiry / Pemilihan Paket / Kontak
export async function sendInquiryNotification(payload: InquiryEmailPayload) {
  try {
    const {
      name,
      email,
      phone,
      service,
      packageChoice,
      billingCycle,
      price,
      message,
      brandDescription,
      source,
    } = payload;

    const effectivePackage = packageChoice || service || "General Consultation";
    const effectiveMessage = message || brandDescription || "Tidak ada catatan tambahan.";
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    const waTarget = cleanPhone.startsWith("0")
      ? `62${cleanPhone.slice(1)}`
      : cleanPhone.startsWith("62")
      ? cleanPhone
      : cleanPhone
      ? `62${cleanPhone}`
      : "";

    const contentHtml = `
      <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">
        Pesan / Permintaan Baru Masuk
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #9E9EB0; line-height: 1.55;">
        Calon klien telah mengirimkan formulir konsultasi / pemesanan paket melalui website Adsvar:
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #181926; border-radius: 14px; border: 1px solid #28293D; margin-bottom: 24px; overflow: hidden;">
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; width: 34%; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Nama Klien</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 14px; font-weight: 700; color: #FFFFFF;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">WhatsApp / Telepon</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; color: #FFFFFF;">
            ${phone ? `<a href="https://wa.me/${waTarget}" style="color: #25D366; text-decoration: none; font-weight: 600;">${phone} &rarr; Chat Langsung</a>` : "-"}
          </td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Email</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; color: #FF8F52;">
            ${email ? `<a href="mailto:${email}" style="color: #FF8F52; text-decoration: none; font-weight: 500;">${email}</a>` : "-"}
          </td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Paket / Layanan</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; font-weight: 600; color: #FFFFFF;">
            <span style="display: inline-block; background-color: rgba(255,85,0,0.12); color: #FF5500; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; border: 1px solid rgba(255,85,0,0.3);">
              ${effectivePackage}
            </span>
          </td>
        </tr>
        ${billingCycle && billingCycle !== "-" ? `
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Siklus Billing</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; color: #FFFFFF;">${billingCycle}</td>
        </tr>` : ""}
        ${price && price !== "-" ? `
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Estimasi Harga</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; font-weight: 700; color: #FF5500;">${price}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 14px 18px; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Sumber Formulir</td>
          <td style="padding: 14px 18px; font-size: 13px; color: #A1A1B2;">${source || "Website Inquiries"}</td>
        </tr>
      </table>

      <div style="margin-bottom: 26px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; color: #8E8EA0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Catatan Brand / Pesan Klien:
        </label>
        <div style="background-color: #181926; border-left: 3px solid #FF5500; border-top: 1px solid #28293D; border-right: 1px solid #28293D; border-bottom: 1px solid #28293D; border-radius: 0 10px 10px 0; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #D1D1DB; white-space: pre-wrap;">
          ${effectiveMessage}
        </div>
      </div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding-top: 4px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                ${email ? `
                <td style="padding-right: 10px;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #FF5500; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 600; box-shadow: 0 4px 14px rgba(255,85,0,0.35);">
                    Balas Email Klien &rarr;
                  </a>
                </td>` : ""}
                ${waTarget ? `
                <td>
                  <a href="https://wa.me/${waTarget}" style="display: inline-block; background-color: #25D366; color: #000000; text-decoration: none; padding: 12px 22px; border-radius: 10px; font-size: 13px; font-weight: 700;">
                    Chat WhatsApp &rarr;
                  </a>
                </td>` : ""}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    const html = emailWrapper("New Lead Inquiry", "New Incoming Lead Inquiry", contentHtml);

    const info = await transporter.sendMail({
      from: `"Adsvar Digital Website" <${emailUser}>`,
      to: emailReceiver,
      replyTo: email || undefined,
      subject: `New Lead Inquiry: ${effectivePackage} - ${name}`,
      html,
    });

    console.log(`[Email] Inquiry notification sent to ${emailReceiver}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email] Failed to send inquiry notification to ${emailReceiver}:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

// 2. Template Live Chat Pesan Masuk
export async function sendChatMessageNotification(payload: ChatMessagePayload) {
  try {
    const { visitorName, visitorId, threadId, messageText } = payload;

    const contentHtml = `
      <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">
        Pesan Live Chat Baru Masuk
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #9E9EB0; line-height: 1.55;">
        Pengunjung website telah mengirimkan pesan live chat:
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #181926; border-radius: 14px; border: 1px solid #28293D; margin-bottom: 24px; overflow: hidden;">
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; width: 34%; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Pengirim</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 14px; font-weight: 700; color: #FFFFFF;">${visitorName}</td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Visitor ID</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13px; color: #A1A1B2; font-family: monospace;">${visitorId}</td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Thread ID</td>
          <td style="padding: 14px 18px; font-size: 13px; color: #A1A1B2; font-family: monospace;">${threadId}</td>
        </tr>
      </table>

      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; color: #8E8EA0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Isi Pesan Chat:
        </label>
        <div style="background-color: #181926; border-left: 3px solid #25D366; border-top: 1px solid #28293D; border-right: 1px solid #28293D; border-bottom: 1px solid #28293D; border-radius: 0 10px 10px 0; padding: 16px; font-size: 14px; line-height: 1.6; color: #FFFFFF; white-space: pre-wrap;">
          ${messageText}
        </div>
      </div>
    `;

    const html = emailWrapper("New Live Chat Message", "New Live Chat Message", contentHtml);

    const info = await transporter.sendMail({
      from: `"Adsvar Live Chat" <${emailUser}>`,
      to: emailReceiver,
      subject: `New Live Chat Message from ${visitorName}`,
      html,
    });

    console.log(`[Email] Live chat notification sent to ${emailReceiver}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email] Failed to send chat notification:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

// 3. Template Support Ticket Baru
export async function sendTicketNotification(payload: TicketPayload) {
  try {
    const { subject, description, customerEmail, serialNumber, eventId } = payload;

    const contentHtml = `
      <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">
        Tiket Bantuan / Support Baru
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #9E9EB0; line-height: 1.55;">
        Tiket support baru telah dibuat di sistem Adsvar CRM:
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #181926; border-radius: 14px; border: 1px solid #28293D; margin-bottom: 24px; overflow: hidden;">
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; width: 34%; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Subjek Tiket</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 14px; font-weight: 700; color: #FFFFFF;">${subject}</td>
        </tr>
        ${customerEmail ? `
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Email Customer</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13.5px; color: #FF8F52;">
            <a href="mailto:${customerEmail}" style="color: #FF8F52; text-decoration: none;">${customerEmail}</a>
          </td>
        </tr>` : ""}
        ${serialNumber ? `
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Nomor / Serial Ref</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 13px; color: #A1A1B2;">${serialNumber}</td>
        </tr>` : ""}
        ${eventId ? `
        <tr>
          <td style="padding: 14px 18px; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Event ID</td>
          <td style="padding: 14px 18px; font-size: 12.5px; color: #71717A; font-family: monospace;">${eventId}</td>
        </tr>` : ""}
      </table>

      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; color: #8E8EA0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Deskripsi Keluhan / Kebutuhan:
        </label>
        <div style="background-color: #181926; border-left: 3px solid #FF5500; border-top: 1px solid #28293D; border-right: 1px solid #28293D; border-bottom: 1px solid #28293D; border-radius: 0 10px 10px 0; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #E4E4E7; white-space: pre-wrap;">
          ${description}
        </div>
      </div>
    `;

    const html = emailWrapper("New Support Ticket", "New Support Ticket Notification", contentHtml);

    const info = await transporter.sendMail({
      from: `"Adsvar Support System" <${emailUser}>`,
      to: emailReceiver,
      replyTo: customerEmail || undefined,
      subject: `Support Ticket: ${subject}`,
      html,
    });

    console.log(`[Email] Ticket notification sent to ${emailReceiver}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email] Failed to send ticket notification:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

// 4. Template Customer Review / Feedback
export async function sendFeedbackNotification(payload: FeedbackPayload) {
  try {
    const { customerCode, rating, feedbackText, salesOrderId } = payload;
    const stars = "★".repeat(Math.min(5, Math.max(1, rating))) + "☆".repeat(Math.max(0, 5 - rating));

    const contentHtml = `
      <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">
        Review / Feedback Klien Baru
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 13.5px; color: #9E9EB0; line-height: 1.55;">
        Klien telah mengirimkan evaluasi rating dan ulasan layanan:
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #181926; border-radius: 14px; border: 1px solid #28293D; margin-bottom: 24px; overflow: hidden;">
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; width: 34%; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Customer Code</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 14px; font-weight: 700; color: #FFFFFF;">${customerCode}</td>
        </tr>
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Rating</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #242538; font-size: 16px; font-weight: 800; color: #FFB800;">
            ${stars} <span style="font-size: 13px; color: #FFFFFF; margin-left: 6px;">(${rating} / 5)</span>
          </td>
        </tr>
        ${salesOrderId ? `
        <tr>
          <td style="padding: 14px 18px; font-size: 12.5px; font-weight: 600; color: #8E8EA0;">Sales Order ID</td>
          <td style="padding: 14px 18px; font-size: 13px; color: #A1A1B2;">${salesOrderId}</td>
        </tr>` : ""}
      </table>

      ${feedbackText ? `
      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; color: #8E8EA0; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
          Isi Ulasan / Testimoni:
        </label>
        <div style="background-color: #181926; border-left: 3px solid #FFB800; border-top: 1px solid #28293D; border-right: 1px solid #28293D; border-bottom: 1px solid #28293D; border-radius: 0 10px 10px 0; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #E4E4E7; white-space: pre-wrap;">
          ${feedbackText}
        </div>
      </div>` : ""}
    `;

    const html = emailWrapper("Customer Feedback", "Customer Review & Rating", contentHtml);

    const info = await transporter.sendMail({
      from: `"Adsvar Customer Feedback" <${emailUser}>`,
      to: emailReceiver,
      subject: `Customer Feedback: Rating ${rating}/5 from ${customerCode}`,
      html,
    });

    console.log(`[Email] Feedback notification sent to ${emailReceiver}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[Email] Failed to send feedback notification:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}
