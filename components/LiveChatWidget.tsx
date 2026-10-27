"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, X, Send, Sparkles, CheckCheck, Loader2, Bot } from "lucide-react";

interface ChatMessage {
  id?: number;
  messageId: string;
  senderType: "EXTERNAL" | "INTERNAL" | "BOT";
  senderName: string;
  text: string;
  createdAt?: string;
  status?: "sending" | "sent" | "error";
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize visitor identity
  useEffect(() => {
    if (typeof window !== "undefined") {
      let vid = localStorage.getItem("adsvar_chat_visitor_id");
      if (!vid) {
        vid = `vis-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        localStorage.setItem("adsvar_chat_visitor_id", vid);
      }
      setVisitorId(vid);

      const savedName = localStorage.getItem("adsvar_chat_visitor_name") || "Tamu";
      setVisitorName(savedName);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [messages, isOpen]);

  // Fetch thread messages from server
  const fetchMessages = useCallback(async () => {
    if (!visitorId) return;
    try {
      const res = await fetch(`/api/chat/messages?threadId=webchat:${visitorId}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.messages)) {
        if (json.messages.length > 0) {
          setMessages(json.messages);
        } else {
          // Default greeting
          setMessages([
            {
              messageId: "welcome-1",
              senderType: "BOT",
              senderName: "Adsvar Assistant",
              text: "Halo! Selamat datang di Adsvar. Ada yang bisa kami bantu seputar layanan scaling bisnis Anda? Pesan Anda akan terhubung langsung ke sistem CRM Marka kami.",
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch chat messages:", e);
    }
  }, [visitorId]);

  useEffect(() => {
    if (visitorId) {
      fetchMessages();
    }
  }, [visitorId, fetchMessages]);

  // Poll for replies every 5 seconds when open
  useEffect(() => {
    if (!isOpen || !visitorId) return;
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, visitorId, fetchMessages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending || !visitorId) return;

    const textToSend = inputMessage.trim();
    const tempMsgId = `m-${Date.now()}`;
    const newMsg: ChatMessage = {
      messageId: tempMsgId,
      senderType: "EXTERNAL",
      senderName: visitorName || "Tamu",
      text: textToSend,
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          visitorName: visitorName || "Tamu Website",
          messageId: tempMsgId,
          messageText: textToSend,
        }),
      });

      const json = await res.json();
      if (res.ok || json.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.messageId === tempMsgId ? { ...m, status: "sent" } : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.messageId === tempMsgId ? { ...m, status: "error" } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.messageId === tempMsgId ? { ...m, status: "error" } : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleNameChange = (name: string) => {
    setVisitorName(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("adsvar_chat_visitor_name", name);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF5500] to-[#E04B00] text-white shadow-xl shadow-[#FF5500]/25 hover:shadow-[#FF5500]/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Buka Live Chat CRM"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">
                Live Chat CRM
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </>
          )}

          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce" />
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[80vh] z-50 rounded-2xl bg-[#0E0F18]/95 backdrop-blur-xl border border-[#232435] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#141522] border-b border-[#232435] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FF5500]/15 flex items-center justify-center border border-[#FF5500]/30 text-[#FF5500]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">Adsvar Live Support</h4>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-semibold">
                    Marka CRM
                  </span>
                </div>
                <p className="text-[10px] text-[#8E8EA0]">
                  Terhubung via Webhook Port 202
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-[#1E1F2E] text-[#8E8EA0] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Visitor Name Bar */}
          <div className="px-4 py-2 bg-[#10111A] border-b border-[#1E1F2E] flex items-center justify-between text-[11px]">
            <span className="text-[#8E8EA0]">Nama Anda:</span>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="bg-transparent border-b border-transparent focus:border-[#FF5500] text-right text-white font-medium outline-none px-1 text-[11px]"
            />
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, idx) => {
              const isUser = m.senderType === "EXTERNAL";
              return (
                <div
                  key={m.messageId || idx}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <span className="text-[9px] text-[#6E6E82] mb-1 px-1">
                    {m.senderName || (isUser ? "Anda" : "Marka CRM")}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      isUser
                        ? "bg-[#FF5500] text-white rounded-br-xs"
                        : "bg-[#181926] text-[#E0E0E8] border border-[#262738] rounded-bl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[9px] text-[#6E6E82]">
                      {m.createdAt
                        ? new Date(m.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                    {isUser && (
                      <span className="text-[10px]">
                        {m.status === "sending" ? (
                          <Loader2 className="w-2.5 h-2.5 animate-spin text-[#8E8EA0]" />
                        ) : m.status === "error" ? (
                          <span className="text-red-400 text-[9px]">Gagal</span>
                        ) : (
                          <CheckCheck className="w-2.5 h-2.5 text-emerald-400" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#141522] border-t border-[#232435] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan untuk staf CRM..."
              className="flex-1 h-10 px-3.5 rounded-xl bg-[#0E0F18] border border-[#232435] text-xs text-white placeholder-[#6E6E82] focus:outline-none focus:border-[#FF5500] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="h-10 w-10 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] disabled:opacity-40 disabled:hover:bg-[#FF5500] text-white flex items-center justify-center transition-all cursor-pointer"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          {/* Footer badge */}
          <div className="px-3 py-1.5 bg-[#0A0A10] text-[9px] text-center text-[#6E6E82] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#FF5500]" />
            <span>Terkoneksi ke Marka ERP & CRM Inbox via HMAC-SHA256</span>
          </div>
        </div>
      )}
    </>
  );
}
