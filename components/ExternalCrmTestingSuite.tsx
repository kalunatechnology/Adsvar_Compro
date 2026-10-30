"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Activity,
  Send,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
  Terminal,
  ShieldCheck,
  Server,
  Zap,
  Globe,
  Key,
  MessageSquare,
  FileText,
  LifeBuoy,
  Star,
  CheckSquare,
  ArrowDownLeft,
  Search,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface CrmEventLog {
  id: number;
  eventId: string;
  eventType: string;
  direction: "INBOUND_DISPATCHED" | "OUTBOUND_RECEIVED";
  statusCode: number;
  success: number;
  payloadJson: string;
  responseJson: string;
  createdAt: string;
}

interface CrmConfigInfo {
  webhookUrl: string;
  integrationId: string;
  keyId: string;
  publicOriginDomain: string;
  signingSecretMasked: string;
  outboundSecretMasked: string;
}

export default function ExternalCrmTestingSuite() {
  const [activeSubTab, setActiveSubTab] = useState<
    | "overview"
    | "inquiry"
    | "chat"
    | "ticket"
    | "feedback"
    | "quotation"
    | "outbound"
    | "portal"
    | "logs"
  >("overview");

  const [config, setConfig] = useState<CrmConfigInfo | null>(null);
  const [status, setStatus] = useState<string>("CHECKING");
  const [logs, setLogs] = useState<CrmEventLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [selectedLog, setSelectedLog] = useState<CrmEventLog | null>(null);

  // Diagnostic Test Suite State
  const [runningSuite, setRunningSuite] = useState(false);
  const [suiteResults, setSuiteResults] = useState<Record<string, unknown> | null>(null);

  // Form states for manual testing
  const [inquiryForm, setInquiryForm] = useState({
    name: "Ahmad Dani",
    email: "ahmad.dani@adsvar.id",
    phone: "081234567890",
    subject: "Konsultasi Scale-Up Bisnis E-Commerce",
    message: "Kami butuh bantuan produksi reels mingguan dan strategi copywriting.",
    targetBudget: "15000000",
  });

  const [chatForm, setChatForm] = useState({
    visitorId: "tester-browser-99",
    visitorName: "Budi Santoso",
    messageText: "Halo, apakah ada slot konsultasi gratis untuk minggu ini?",
  });

  const [ticketForm, setTicketForm] = useState({
    subject: "Kendala Akses Dashboard Revisi Konten",
    description: "Link preview video tidak dapat dibuka sejak kemarin sore.",
    serialNumber: "SN-ADS-2026-X8",
    customerEmail: "budi@client-adsvar.com",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    customerCode: "CUST-BRIDAK-058769",
    rating: 5,
    feedbackText: "Layanan sangat profesional, video reels memiliki retensi tinggi!",
    salesOrderId: "",
  });

  const [quotationForm, setQuotationForm] = useState({
    quotationId: "c7a8e912-3456-4789-a012-3456789abcde",
    decision: "ACCEPTED" as "ACCEPTED" | "REJECTED",
    reason: "Harga dan ruang lingkup kerja sudah disepakati bersama.",
  });

  const [outboundForm, setOutboundForm] = useState({
    eventType: "message.reply_requested",
    threadId: "webchat:tester-browser-99",
    replyText: "Halo Pak Budi, slot konsultasi kami buka setiap Selasa & Kamis jam 14.00.",
    repliedBy: "Customer Success Adsvar",
  });

  const [portalForm, setPortalForm] = useState({
    type: "quotations" as "quotations" | "tickets",
    id: "QUO-2026-001",
    token: "mock-portal-scoped-token-12345",
  });

  // Action status / responses
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResponse, setActionResponse] = useState<unknown | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch Config
  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/crm/test");
      const json = await res.json();
      if (json.config) {
        setConfig(json.config);
        setStatus(json.status);
      }
    } catch {
      setStatus("ERROR");
    }
  }, []);

  // Fetch Logs
  const fetchLogs = useCallback(async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("/api/crm/events?limit=50");
      const json = await res.json();
      if (json.success && Array.isArray(json.logs)) {
        setLogs(json.logs);
      }
    } catch (e) {
      console.warn("Failed to load CRM logs:", e);
    } finally {
      setLoadingLogs(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
    fetchLogs();
  }, [fetchConfig, fetchLogs]);

  // Run automated suite
  const handleRunFullDiagnostics = async () => {
    setRunningSuite(true);
    setSuiteResults(null);
    try {
      const res = await fetch("/api/crm/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "all" }),
      });
      const json = await res.json();
      setSuiteResults(json.results || json);
      fetchLogs();
    } catch (err) {
      setSuiteResults({ error: err instanceof Error ? err.message : "Error executing suite" });
    } finally {
      setRunningSuite(false);
    }
  };

  // Clear audit logs
  const handleClearLogs = async () => {
    if (!confirm("Hapus semua log audit CRM dari database lokal?")) return;
    try {
      await fetch("/api/crm/events", { method: "DELETE" });
      setLogs([]);
      setSelectedLog(null);
    } catch (e) {
      console.error(e);
    }
  };

  // Submit test actions
  const handleSubmitAction = async (endpoint: string, payload: unknown, method = "POST") => {
    setActionLoading(true);
    setActionResponse(null);
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method !== "GET" ? JSON.stringify(payload) : undefined,
      });
      const data = await res.json().catch(() => ({ status: res.status, text: res.statusText }));
      setActionResponse({ httpStatus: res.status, data });
      fetchLogs();
    } catch (err) {
      setActionResponse({
        error: err instanceof Error ? err.message : "Request failed",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Connection Status & Quick Diagnostic */}
      <div className="p-6 rounded-[22px] bg-gradient-to-r from-[#12131F] via-[#151624] to-[#12131F] border border-[#232435] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-ping" />
                Live Marka ERP & CRM Hub
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                HMAC-SHA256 Signed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
              External Marka CRM Integration
            </h2>
            <p className="text-xs text-[#8E8EA0] max-w-2xl mt-1 leading-relaxed">
              Adsvar website connects directly to Marka CRM via encrypted Inbound & Outbound Webhooks. Test all 7 integration features in real-time below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRunFullDiagnostics}
              disabled={runningSuite}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#E04B00] hover:from-[#E04B00] hover:to-[#C03E00] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#FF5500]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${runningSuite ? "animate-spin text-white" : ""}`} />
              <span>{runningSuite ? "Running Diagnostics..." : "⚡ 1-Click Test All Features"}</span>
            </button>
            <button
              onClick={fetchLogs}
              className="p-2.5 rounded-xl bg-[#181926] hover:bg-[#232435] border border-[#27283B] text-[#8E8EA0] hover:text-white transition-colors cursor-pointer"
              title="Refresh Log History"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLogs ? "animate-spin text-[#FF5500]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Credentials / Config Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#1F2030] text-xs">
          <div className="p-3 rounded-xl bg-[#0E0F18]/80 border border-[#202130]">
            <div className="text-[10px] text-[#6E6E82] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Server className="w-3 h-3 text-[#FF5500]" />
              Webhook Endpoint
            </div>
            <div className="font-mono text-white text-[11px] truncate" title={config?.webhookUrl}>
              {config?.webhookUrl ? "api/v1/integrations/webhooks/events" : "Not configured"}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Port 202 Accepted</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E0F18]/80 border border-[#202130]">
            <div className="text-[10px] text-[#6E6E82] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Key className="w-3 h-3 text-[#FF5500]" />
              Key ID / Integration ID
            </div>
            <div className="font-mono text-white text-[11px] truncate" title={config?.keyId}>
              {config?.keyId || "Not configured"}
            </div>
            <div className="text-[10px] text-[#8E8EA0] truncate mt-0.5" title={config?.integrationId}>
              {config?.integrationId ? `${config.integrationId.slice(0, 8)}...` : ""}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E0F18]/80 border border-[#202130]">
            <div className="text-[10px] text-[#6E6E82] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#FF5500]" />
              Allowlist Domain
            </div>
            <div className="font-mono text-white text-[11px] truncate">
              {config?.publicOriginDomain || "www.adsvar.id"}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Validated in Marka</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E0F18]/80 border border-[#202130]">
            <div className="text-[10px] text-[#6E6E82] uppercase tracking-wider mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#FF5500]" />
              Signing Secret
            </div>
            <div className="font-mono text-white text-[11px]">
              {config?.signingSecretMasked || "Configured in .env"}
            </div>
            <div className="text-[10px] text-[#8E8EA0] mt-0.5">Server-Side Only (Secure)</div>
          </div>
        </div>
      </div>

      {/* Diagnostic Suite Result Box */}
      {suiteResults && (
        <div className="p-5 rounded-[20px] bg-[#10111C] border border-[#232435] shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF5500]" />
              <h3 className="text-sm font-bold text-white">Real-Time Diagnostic Test Suite Results</h3>
            </div>
            <button
              onClick={() => setSuiteResults(null)}
              className="text-xs text-[#8E8EA0] hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(suiteResults).map(([key, val]: [string, any]) => {
              const isAccepted = val?.status === 202 || val?.status === 200 || val?.success === true;
              return (
                <div
                  key={key}
                  className={`p-3 rounded-xl border ${
                    isAccepted
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      {key}
                    </span>
                    {isAccepted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    HTTP {val?.status || (isAccepted ? 202 : 400)}
                  </div>
                  <div className="text-[10px] text-[#8E8EA0] truncate mt-0.5">
                    {val?.latencyMs ? `${val.latencyMs}ms` : ""} {val?.data?.accepted ? "Accepted" : val?.error ? JSON.stringify(val.error).slice(0, 30) : "Sent"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab Navigation for 7 Features + Logs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1E1F2E]">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "inquiry", label: "Feature 1: Contact Form", icon: FileText },
          { id: "chat", label: "Feature 2: Live Chat", icon: MessageSquare },
          { id: "ticket", label: "Feature 3: Support Ticket", icon: LifeBuoy },
          { id: "feedback", label: "Feature 4: Feedback & Review", icon: Star },
          { id: "quotation", label: "Feature 5: Quotation Approval", icon: CheckSquare },
          { id: "outbound", label: "Feature 6: Inbound Webhook", icon: ArrowDownLeft },
          { id: "portal", label: "Feature 7: Portal Data", icon: Globe },
          { id: "logs", label: `Audit Log (${logs.length})`, icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setActionResponse(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/20"
                  : "bg-[#141522] text-[#8E8EA0] hover:text-white hover:bg-[#1C1D2E] border border-[#232435]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feature 1: Form Inquiry / Contact */}
      {activeSubTab === "inquiry" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF5500]" />
                Test Feature 1: &quot;Contact Us&quot; Form (`inquiry.submitted`)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Sends new prospect leads directly to **CRM &gt; Incoming Inquiry** in Marka.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Prospect Name</label>
                <input
                  type="text"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[#8E8EA0] block mb-1">Email</label>
                  <input
                    type="email"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                  />
                </div>
                <div>
                  <label className="text-[#8E8EA0] block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Subject / Requirement</label>
                <input
                  type="text"
                  value={inquiryForm.subject}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Target Budget (Rp)</label>
                <input
                  type="number"
                  value={inquiryForm.targetBudget}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, targetBudget: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Full Message</label>
                <textarea
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() => handleSubmitAction("/api/contact", inquiryForm)}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Sending to CRM..." : "Send Inquiry to Marka CRM (POST /api/contact)"}</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 2: Live Chat */}
      {activeSubTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#FF5500]" />
                Test Feature 2: Live Chatbox (`message.received`)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Messages flow directly into Marka **CRM &gt; Customer Inbox** in real-time.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Visitor ID (Thread Session)</label>
                <input
                  type="text"
                  value={chatForm.visitorId}
                  onChange={(e) => setChatForm({ ...chatForm, visitorId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Visitor Name</label>
                <input
                  type="text"
                  value={chatForm.visitorName}
                  onChange={(e) => setChatForm({ ...chatForm, visitorName: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Chat Message Content</label>
                <textarea
                  rows={4}
                  value={chatForm.messageText}
                  onChange={(e) => setChatForm({ ...chatForm, messageText: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() => handleSubmitAction("/api/chat/send", chatForm)}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Sending Chat..." : "Send Message to CRM Inbox (POST /api/chat/send)"}</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 3: Support Ticket */}
      {activeSubTab === "ticket" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-[#FF5500]" />
                Test Feature 3: Support &amp; Warranty Ticket (`ticket.created`)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Issues or warranty claims automatically enter **CRM &gt; Support &amp; Warranty**.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Issue Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Serial Number (Optional)</label>
                <input
                  type="text"
                  value={ticketForm.serialNumber}
                  onChange={(e) => setTicketForm({ ...ticketForm, serialNumber: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                  placeholder="SN-XXX (Auto warranty validation in Marka)"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Customer Email</label>
                <input
                  type="email"
                  value={ticketForm.customerEmail}
                  onChange={(e) => setTicketForm({ ...ticketForm, customerEmail: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Issue Description</label>
                <textarea
                  rows={4}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() => handleSubmitAction("/api/support/ticket", ticketForm)}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Creating Ticket..." : "Create Ticket in CRM (POST /api/support/ticket)"}</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 4: Feedback */}
      {activeSubTab === "feedback" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FF5500]" />
                Test Feature 4: Customer Review &amp; Feedback (`feedback.submitted`)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Customer ratings and testimonials flow into **CRM &gt; Engagement**.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Customer Code (party_code from Marka)</label>
                <input
                  type="text"
                  value={feedbackForm.customerCode}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, customerCode: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                  placeholder="CUST-BRIDAK-058769"
                />
                <p className="text-[10px] text-amber-400/90 mt-1">
                  💡 Enter a valid registered customer code (party_code) active in Marka under the same organization.
                </p>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Satisfaction Rating (1 - 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                      className={`p-2 rounded-lg border flex items-center gap-1 cursor-pointer ${
                        feedbackForm.rating >= star
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                          : "bg-[#181926] border-[#262738] text-[#6E6E82]"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold">{star}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Sales Order ID (Optional, Marka UUID; leave blank if none)</label>
                <input
                  type="text"
                  value={feedbackForm.salesOrderId}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, salesOrderId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Testimonial / Feedback</label>
                <textarea
                  rows={3}
                  value={feedbackForm.feedbackText}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedbackText: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() => handleSubmitAction("/api/feedback", feedbackForm)}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Submitting Review..." : "Submit Feedback to CRM (POST /api/feedback)"}</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 5: Quotation Decision */}
      {activeSubTab === "quotation" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#FF5500]" />
                Test Feature 5: Quotation Approval (`quotation.decision`)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Customer approves or rejects Quotations directly from the portal.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Quotation ID (Marka ERP Quotation UUID)</label>
                <input
                  type="text"
                  value={quotationForm.quotationId}
                  onChange={(e) => setQuotationForm({ ...quotationForm, quotationId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                  placeholder="c7a8e912-3456-4789-a012-3456789abcde"
                />
                <p className="text-[10px] text-emerald-400/90 mt-1">
                  💡 UUID format: Marka validates standard UUID format (36-character hex) for quotations.
                </p>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Customer Decision</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuotationForm({ ...quotationForm, decision: "ACCEPTED" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                      quotationForm.decision === "ACCEPTED"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-[#181926] border-[#262738] text-[#8E8EA0]"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ACCEPT (ACCEPTED)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuotationForm({ ...quotationForm, decision: "REJECTED" })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                      quotationForm.decision === "REJECTED"
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-[#181926] border-[#262738] text-[#8E8EA0]"
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>REJECT (REJECTED)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Notes / Reason</label>
                <textarea
                  rows={3}
                  value={quotationForm.reason}
                  onChange={(e) => setQuotationForm({ ...quotationForm, reason: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() => handleSubmitAction("/api/portal/quotation/decision", quotationForm)}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Processing..." : "Submit Decision (POST /api/portal/quotation/decision)"}</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 6: Outbound Webhook Simulation */}
      {activeSubTab === "outbound" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-[#FF5500]" />
                Test Feature 6: Webhook from Marka (Outbound Receiver)
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Inbound receiver endpoint on website: `POST /api/webhooks/marka`. This endpoint verifies `x-marka-signature` and updates local state.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Marka Outbound Event Type</label>
                <select
                  value={outboundForm.eventType}
                  onChange={(e) => setOutboundForm({ ...outboundForm, eventType: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white cursor-pointer"
                >
                  <option value="message.reply_requested">message.reply_requested (Staff replies to chat)</option>
                  <option value="ticket.status_updated">ticket.status_updated (Ticket status updated)</option>
                  <option value="quotation.approved">quotation.approved (Quotation approved internally)</option>
                </select>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Thread ID / Ticket ID</label>
                <input
                  type="text"
                  value={outboundForm.threadId}
                  onChange={(e) => setOutboundForm({ ...outboundForm, threadId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Staff Sender Name</label>
                <input
                  type="text"
                  value={outboundForm.repliedBy}
                  onChange={(e) => setOutboundForm({ ...outboundForm, repliedBy: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">CRM Staff Reply Message</label>
                <textarea
                  rows={3}
                  value={outboundForm.replyText}
                  onChange={(e) => setOutboundForm({ ...outboundForm, replyText: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#181926] border border-[#262738] text-white"
                />
              </div>

              <button
                onClick={() =>
                  handleSubmitAction("/api/webhooks/marka", {
                    event_id: `out-sim-${Date.now()}`,
                    event_type: outboundForm.eventType,
                    occurred_at: new Date().toISOString(),
                    data: {
                      thread_id: outboundForm.threadId,
                      ticket_id: outboundForm.threadId,
                      reply_text: outboundForm.replyText,
                      replied_by: outboundForm.repliedBy,
                      status: "RESOLVED",
                    },
                  })
                }
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Simulate Webhook from Marka to Website</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Feature 7: Portal Data */}
      {activeSubTab === "portal" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-[20px] bg-[#12131D] border border-[#202130] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FF5500]" />
                Test Feature 7: Customer Portal Data Access
              </h3>
              <p className="text-xs text-[#8E8EA0] mt-1">
                Read Quotation or Ticket data directly from Marka API using Portal Scoped Token.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#8E8EA0] block mb-1">Entity Type</label>
                <select
                  value={portalForm.type}
                  onChange={(e) => setPortalForm({ ...portalForm, type: e.target.value as any })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white cursor-pointer"
                >
                  <option value="quotations">Quotation (/api/v1/portal/quotations/:id)</option>
                  <option value="tickets">Ticket (/api/v1/portal/tickets/:id)</option>
                </select>
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Entity ID</label>
                <input
                  type="text"
                  value={portalForm.id}
                  onChange={(e) => setPortalForm({ ...portalForm, id: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[#8E8EA0] block mb-1">Portal Bearer Token</label>
                <input
                  type="text"
                  value={portalForm.token}
                  onChange={(e) => setPortalForm({ ...portalForm, token: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg bg-[#181926] border border-[#262738] text-white font-mono"
                />
              </div>

              <button
                onClick={() =>
                  handleSubmitAction(
                    `/api/portal/data?type=${portalForm.type}&id=${encodeURIComponent(
                      portalForm.id
                    )}&token=${encodeURIComponent(portalForm.token)}`,
                    null,
                    "GET"
                  )
                }
                disabled={actionLoading}
                className="w-full py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Read Data from Marka API</span>
              </button>
            </div>
          </div>

          <ResponseInspector actionResponse={actionResponse} />
        </div>
      )}

      {/* Overview / Architecture Info */}
      {activeSubTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-[20px] bg-[#12131D] border border-[#202130]">
            <div className="w-8 h-8 rounded-lg bg-[#FF5500]/15 text-[#FF5500] flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Inbound Events (Outbox)</h4>
            <p className="text-xs text-[#8E8EA0] leading-relaxed">
              Your website securely signs form inquiries, live chats, tickets, and feedback using HMAC-SHA256 and transmits them to Marka CRM port 202.
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#12131D] border border-[#202130]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Nonce Signature Security</h4>
            <p className="text-xs text-[#8E8EA0] leading-relaxed">
              Each request includes a unique 16-byte nonce and epoch timestamp to mathematically prevent replay attacks without client state storage.
            </p>
          </div>

          <div className="p-5 rounded-[20px] bg-[#12131D] border border-[#202130]">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Outbound Webhook Hub</h4>
            <p className="text-xs text-[#8E8EA0] leading-relaxed">
              When CRM staff replies in Marka, a webhook is fired to `/api/webhooks/marka` with constant-time signature verification (`timingSafeEqual`).
            </p>
          </div>
        </div>
      )}

      {/* Live Event Audit Log Table */}
      <div className="p-6 rounded-[22px] bg-[#12131D] border border-[#202130] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FF5500]" />
              <h3 className="text-sm font-bold text-white">Webhook Integration Audit Log (Real-Time SQLite)</h3>
            </div>
            <p className="text-xs text-[#8E8EA0] mt-0.5">
              Every inbound &amp; outbound event is logged with HTTP status, JSON response, and high-precision timestamp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              className="px-3 py-1.5 rounded-lg bg-[#181926] hover:bg-[#232435] text-xs font-medium text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingLogs ? "animate-spin text-[#FF5500]" : ""}`} />
              <span>Refresh</span>
            </button>
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {loadingLogs ? (
          <div className="py-12 text-center text-xs text-[#8E8EA0]">Loading CRM audit logs...</div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#6E6E82]">
            No webhook activity recorded yet. Try submitting one of the test forms above or run 1-Click Diagnostics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1E1F2E] text-[#6E6E82] text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Direction</th>
                  <th className="py-2.5 px-3">Event Type</th>
                  <th className="py-2.5 px-3">Event ID</th>
                  <th className="py-2.5 px-3 text-center">HTTP Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1B28]">
                {logs.map((log) => {
                  const isAccepted = log.statusCode === 202 || log.statusCode === 200;
                  const isOutbound = log.direction === "OUTBOUND_RECEIVED";
                  return (
                    <tr key={log.id} className="hover:bg-[#161724] transition-colors">
                      <td className="py-3 px-3 text-[#8E8EA0] whitespace-nowrap font-mono text-[11px]">
                        {log.createdAt
                          ? new Date(log.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                          : "-"}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isOutbound
                              ? "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                              : "bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/20"
                          }`}
                        >
                          {isOutbound ? "OUTBOUND" : "INBOUND"}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-white font-mono text-[11px]">
                        {log.eventType}
                      </td>
                      <td className="py-3 px-3 text-[#8E8EA0] font-mono text-[10px] truncate max-w-[140px]">
                        {log.eventId}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isAccepted
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {isAccepted ? (
                            <CheckCircle2 className="w-2.5 h-2.5" />
                          ) : (
                            <AlertTriangle className="w-2.5 h-2.5" />
                          )}
                          HTTP {log.statusCode}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-2.5 py-1 rounded-md bg-[#1C1D2E] hover:bg-[#25263A] text-white text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          Inspect JSON
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#0E0F18] border border-[#232435] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-[#141522] border-b border-[#232435] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FF5500]" />
                  Event Details: {selectedLog.eventType}
                </h4>
                <p className="text-[11px] font-mono text-[#8E8EA0] mt-0.5">
                  ID: {selectedLog.eventId}
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg hover:bg-[#1E1F2E] text-[#8E8EA0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs font-mono">
              <div>
                <div className="flex items-center justify-between text-[#8E8EA0] mb-1 font-sans">
                  <span>Payload Body Sent:</span>
                  <button
                    onClick={() => copyToClipboard(selectedLog.payloadJson)}
                    className="text-[10px] text-[#FF5500] hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-[#06070B] border border-[#1E1F2E] text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
                  {tryFormatJson(selectedLog.payloadJson)}
                </pre>
              </div>

              <div>
                <div className="text-[#8E8EA0] mb-1 font-sans">Marka Server Response:</div>
                <pre className="p-3 rounded-xl bg-[#06070B] border border-[#1E1F2E] text-cyan-300 overflow-x-auto text-[11px] leading-relaxed">
                  {tryFormatJson(selectedLog.responseJson)}
                </pre>
              </div>
            </div>

            <div className="p-3 bg-[#12131D] border-t border-[#1E1F2E] flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-[#1E1F2E] hover:bg-[#2A2B3E] text-xs font-medium text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResponseInspector({ actionResponse }: { actionResponse: any }) {
  if (!actionResponse) {
    return (
      <div className="p-6 rounded-[20px] bg-[#0E0F18] border border-[#202130] flex flex-col items-center justify-center text-center">
        <Code2 className="w-10 h-10 text-[#2D2E42] mb-3" />
        <h4 className="text-xs font-bold text-[#8E8EA0]">Response Inspector Panel</h4>
        <p className="text-[11px] text-[#6E6E82] max-w-xs mt-1">
          Click any send button on the left to test endpoints and inspect HTTP status and real-time responses from Marka CRM.
        </p>
      </div>
    );
  }

  const isSuccess =
    actionResponse?.httpStatus === 202 ||
    actionResponse?.httpStatus === 200 ||
    actionResponse?.data?.success === true;

  return (
    <div className="p-6 rounded-[20px] bg-[#0E0F18] border border-[#202130] flex flex-col h-full animate-in fade-in duration-150">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          )}
          <span className="text-xs font-bold text-white">
            Execution Result: HTTP {actionResponse?.httpStatus || 200}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isSuccess ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {isSuccess ? "Accepted (Port 202)" : "Error / Rejected"}
        </span>
      </div>

      <pre className="flex-1 p-3.5 rounded-xl bg-[#06070B] border border-[#1E1F2E] text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed">
        {JSON.stringify(actionResponse, null, 2)}
      </pre>

      <div className="mt-3 text-[10px] text-[#6E6E82]">
        Status 202 confirms the payload is valid and queued for asynchronous processing in Marka CRM.
      </div>
    </div>
  );
}

function tryFormatJson(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}
