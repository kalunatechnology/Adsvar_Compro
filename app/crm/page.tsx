"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  Trash2,
  Download,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react";
import type { Inquiry } from "@/lib/types";

function AdsvarLogoMark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Adsvar_icon.svg"
      alt="Adsvar Icon"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export default function CrmDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data);
      }
    } catch (e) {
      console.error("Failed to load inquiries:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as Inquiry["status"] } : item
          )
        );
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data inquiry ini dari CRM?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete inquiry:", e);
    }
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) return;
    const headers = [
      "ID",
      "Tanggal",
      "Nama",
      "WhatsApp/Phone",
      "Email",
      "Paket/Layanan",
      "Billing Cycle",
      "Estimasi Harga",
      "Sumber Form",
      "Status",
      "Catatan",
    ];

    const rows = filteredInquiries.map((i) => [
      i.id,
      i.createdAt,
      `"${(i.name || "").replace(/"/g, '""')}"`,
      `"${(i.phone || i.contact || "").replace(/"/g, '""')}"`,
      `"${(i.email || "").replace(/"/g, '""')}"`,
      `"${(i.packageChoice || i.service || "").replace(/"/g, '""')}"`,
      `"${(i.billingCycle || "-").replace(/"/g, '""')}"`,
      `"${(i.price || "-").replace(/"/g, '""')}"`,
      `"${(i.source || "-").replace(/"/g, '""')}"`,
      i.status,
      `"${(i.brandDescription || i.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `adsvar-crm-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.packageChoice || item.service || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.brandDescription || item.message || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSource = sourceFilter === "all" || item.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalCount = inquiries.length;
  const packageCount = inquiries.filter((i) => i.source === "choose_package").length;
  const consultationCount = inquiries.filter((i) => i.source !== "choose_package").length;
  const dealCount = inquiries.filter((i) => i.status === "deal").length;

  return (
    <div className="min-h-screen bg-[#08080E] text-white">
      {/* Top Bar */}
      <header className="border-b border-[#1E1F2E] bg-[#0E0F18]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-[5%] h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-[#181926] hover:bg-[#232435] text-[#8E8EA0] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <div className="h-4 w-px bg-[#262738]" />
            <div className="flex items-center gap-2">
              <AdsvarLogoMark className="h-4 w-auto" />
              <span className="font-bold text-sm tracking-tight text-white font-heading">
                Adsvar CRM Dashboard
              </span>
              <span className="px-2 py-0.5 rounded-[5px] bg-[#FF5500]/15 text-[#FF5500] text-[10px] font-bold uppercase tracking-wider">
                Live SQLite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="p-2 rounded-lg bg-[#181926] hover:bg-[#232435] text-[#8E8EA0] hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#FF5500]" : ""}`} />
            </button>
            <button
              onClick={handleExportCsv}
              className="px-3 py-1.5 rounded-lg bg-[#181926] hover:bg-[#232435] border border-[#27283B] text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-[5%] py-8">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-[18px] bg-[#12131D] border border-[#202130]">
            <div className="flex items-center justify-between text-[#8E8EA0] text-xs font-medium mb-2">
              <span>Total CRM Inquiries</span>
              <Users className="w-4 h-4 text-[#FF5500]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{totalCount}</div>
            <div className="text-[11px] text-[#6E6E82] mt-1">Semua lead masuk</div>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-[#12131D] border border-[#202130]">
            <div className="flex items-center justify-between text-[#8E8EA0] text-xs font-medium mb-2">
              <span>Choose Package</span>
              <Briefcase className="w-4 h-4 text-[#FF5500]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#FF5500]">{packageCount}</div>
            <div className="text-[11px] text-[#6E6E82] mt-1">Lead pesanan paket scaling</div>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-[#12131D] border border-[#202130]">
            <div className="flex items-center justify-between text-[#8E8EA0] text-xs font-medium mb-2">
              <span>Book Consultation</span>
              <MessageSquare className="w-4 h-4 text-[#FF5500]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{consultationCount}</div>
            <div className="text-[11px] text-[#6E6E82] mt-1">Form konsultasi umum</div>
          </div>

          <div className="p-4 sm:p-5 rounded-[18px] bg-[#12131D] border border-[#202130]">
            <div className="flex items-center justify-between text-[#8E8EA0] text-xs font-medium mb-2">
              <span>Deals Closed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{dealCount}</div>
            <div className="text-[11px] text-[#6E6E82] mt-1">Status: deal / closed</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-[16px] bg-[#12131D] border border-[#202130] mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6E6E82] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, WhatsApp, email, paket, atau catatan..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#181926] border border-[#262738] text-xs text-white placeholder-[#6E6E82] focus:border-[#FF5500] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#181926] border border-[#262738] text-xs text-[#8E8EA0]">
              <Filter className="w-3.5 h-3.5" />
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#181926]">Semua Sumber</option>
                <option value="choose_package" className="bg-[#181926]">Choose Package</option>
                <option value="book_consultation" className="bg-[#181926]">Book Consultation</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#181926] border border-[#262738] text-xs text-[#8E8EA0]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#181926]">Semua Status</option>
                <option value="pending" className="bg-[#181926]">Pending</option>
                <option value="contacted" className="bg-[#181926]">Contacted</option>
                <option value="deal" className="bg-[#181926]">Deal</option>
                <option value="completed" className="bg-[#181926]">Completed</option>
                <option value="archived" className="bg-[#181926]">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Table / Cards */}
        {loading ? (
          <div className="py-20 text-center text-[#8E8EA0] text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-[#FF5500]" />
            <span>Memuat data CRM inquiries...</span>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-20 text-center p-8 rounded-[20px] bg-[#12131D] border border-[#202130]">
            <Sparkles className="w-10 h-10 text-[#FF5500] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">Belum Ada Data Inquiry</h3>
            <p className="text-xs text-[#8E8EA0] max-w-md mx-auto mb-4">
              Silakan coba submit form &quot;Book A Consultation&quot; atau klik &quot;Choose this package&quot; pada website Adsvar untuk menguji pencatatan CRM real-time.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5500] text-white text-xs font-semibold hover:bg-[#E04B00] transition-colors"
            >
              Buka Halaman Utama
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredInquiries.map((item) => {
              const isPackageSource = item.source === "choose_package";
              const cleanPhone = (item.phone || item.contact || "").replace(/[^\d+]/g, "");
              const waUrl = cleanPhone
                ? `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                    `Halo ${item.name}, kami dari Adsvar Digital ingin mengonfirmasi permintaan konsultasi/paket ${
                      item.packageChoice || item.service
                    }. Apakah ada waktu luang untuk berdiskusi?`
                  )}`
                : null;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-[18px] bg-[#12131D] border border-[#202130] hover:border-[#323348] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] text-[#6E6E82]">
                        #{String(item.id).padStart(3, "0")}
                      </span>

                      {/* Source Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isPackageSource
                            ? "bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {isPackageSource ? "Choose Package" : "Book Consultation"}
                      </span>

                      {/* Created At */}
                      <span className="flex items-center gap-1 text-[11px] text-[#6E6E82]">
                        <Clock className="w-3 h-3" />
                        <span>{item.createdAt}</span>
                      </span>

                      {/* Price Badge if available */}
                      {item.price && (
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                          {item.price} {item.billingCycle ? `(${item.billingCycle})` : ""}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="text-[#8E8EA0] text-xs font-normal">
                        &bull; {item.packageChoice || item.service}
                      </span>
                    </h4>

                    {/* Contact details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#8E8EA0] mb-2.5">
                      {(item.phone || item.contact) && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Phone className="w-3 h-3 text-[#FF5500]" />
                          <span>{item.phone || item.contact}</span>
                        </span>
                      )}
                      {item.email && (
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Mail className="w-3 h-3 text-[#FF5500]" />
                          <span>{item.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Brand description / message */}
                    {(item.brandDescription || item.message) && (
                      <p className="text-xs text-[#A0A0B5] bg-[#181926] p-2.5 rounded-xl border border-[#232435] leading-relaxed">
                        &quot;{item.brandDescription || item.message}&quot;
                      </p>
                    )}
                  </div>

                  {/* Right Action Controls */}
                  <div className="flex flex-wrap lg:flex-col items-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#202130]">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#6E6E82]">Status:</span>
                      <select
                        value={item.status}
                        disabled={updatingId === item.id}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-semibold outline-none transition-colors cursor-pointer ${
                          item.status === "deal"
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                            : item.status === "contacted"
                            ? "bg-yellow-500/15 border-yellow-500/40 text-yellow-400"
                            : item.status === "archived"
                            ? "bg-zinc-800 border-zinc-700 text-zinc-500"
                            : "bg-[#FF5500]/15 border-[#FF5500]/40 text-[#FF5500]"
                        }`}
                      >
                        <option value="pending" className="bg-[#181926] text-white">Pending</option>
                        <option value="contacted" className="bg-[#181926] text-white">Contacted</option>
                        <option value="deal" className="bg-[#181926] text-white">Deal (Closed)</option>
                        <option value="completed" className="bg-[#181926] text-white">Completed</option>
                        <option value="archived" className="bg-[#181926] text-white">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* WhatsApp Button */}
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>Chat WA</span>
                        </a>
                      )}

                      {/* Delete Lead Button */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-[#181926] hover:bg-red-500/20 text-[#6E6E82] hover:text-red-400 transition-colors cursor-pointer"
                        title="Hapus Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
