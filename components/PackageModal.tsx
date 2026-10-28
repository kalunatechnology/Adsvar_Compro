"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, Check, Sparkles, Building2 } from "lucide-react";
import type { PricingPlan } from "@/lib/types";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  initialBillingCycle?: "monthly" | "project";
  availablePlans?: PricingPlan[];
}

import AdsvarEmblem from "@/components/AdsvarEmblem";

function AdsvarLogoMark({ className = "h-3.5 w-auto" }: { className?: string }) {
  return <AdsvarEmblem className={className} />;
}

export default function PackageModal({
  isOpen,
  onClose,
  selectedPlan,
  initialBillingCycle = "monthly",
  availablePlans = [],
}: PackageModalProps) {
  const [activePlan, setActivePlan] = useState<PricingPlan | null>(selectedPlan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "project">(initialBillingCycle);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedInquiryId, setSavedInquiryId] = useState<number | null>(null);

  // Sync active plan and billing cycle when props change
  useEffect(() => {
    setActivePlan(selectedPlan);
    setBillingCycle(initialBillingCycle);
  }, [selectedPlan, initialBillingCycle, isOpen]);

  // Handle ESC key to close + lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPrice = activePlan
    ? billingCycle === "monthly"
      ? activePlan.priceMonthly
      : activePlan.priceProject
    : "Custom";

  const isCustomPrice =
    currentPrice.toLowerCase() === "custom" || currentPrice.toLowerCase() === "kustom";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const packageName = activePlan ? activePlan.name.replace("\n", " ") : "Custom Package";

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          contact: `${phone.trim()} | ${email.trim()}`.trim(),
          packageChoice: packageName,
          service: packageName,
          billingCycle: billingCycle === "monthly" ? "Monthly" : "Annual Save (-20%)",
          price: currentPrice,
          brandDescription: brandDescription.trim(),
          message: brandDescription.trim(),
          source: "choose_package",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal menyimpan pesanan paket ke CRM.");
      }

      if (result.data?.id) {
        setSavedInquiryId(result.data.id);
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errObj = err as Error;
      setErrorMessage(errObj.message || "Terjadi kesalahan saat memproses pesanan paket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setBrandDescription("");
    setErrorMessage("");
    setSavedInquiryId(null);
    onClose();
  };

  const packageName = activePlan ? activePlan.name.replace("\n", " ") : "Custom Package";
  const billingLabel = billingCycle === "monthly" ? "Monthly" : "Annual (Save 20%)";

  const waText = encodeURIComponent(
    `Hello Adsvar Digital CRM Team, I am ${name || "Client"}.\n` +
    `I would like to choose the package:\n` +
    `• Package: ${packageName}\n` +
    `• Billing Cycle: ${billingLabel}\n` +
    `• Price: ${currentPrice}\n` +
    `• WhatsApp: ${phone || "-"}\n` +
    `• Email: ${email || "-"}\n` +
    `• Brand Notes: ${brandDescription || "-"}\n\n` +
    `Please proceed with onboarding & proposal. Thank you!`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={handleResetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[620px] max-h-[92dvh] sm:max-h-[90vh] rounded-[20px] sm:rounded-[24px] bg-[#13141F] border border-[#27283B] flex flex-col text-white shadow-2xl transition-all duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow in top right */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-[#FF5500]/18 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 w-8 h-8 rounded-full bg-[#1C1D2C]/90 hover:bg-[#27283D] text-[#8E8EA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/5 shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 custom-modal-scroll">
          {isSuccess ? (
            <div className="py-4 sm:py-6 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 flex items-center justify-center mx-auto mb-3.5 shadow-[0_0_24px_rgba(255,85,0,0.2)]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF5500]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF5500] text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CRM LEAD REGISTERED {savedInquiryId ? `#${savedInquiryId}` : ""}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                Package Request Confirmed!
              </h3>
              <p className="text-[12.5px] sm:text-[13px] text-[#8B8B9E] leading-relaxed max-w-sm mx-auto mb-5 sm:mb-6">
                Your package request has been registered in Adsvar CRM. Our account representative will reach out to{" "}
                <span className="text-white font-medium">{phone || email || name}</span> shortly to finalize onboarding.
              </p>

              {/* Recap Card */}
              <div className="p-3.5 sm:p-4 rounded-[14px] bg-[#181926] border border-[#262738] mb-5 sm:mb-6 text-left text-xs space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#262738]">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Building2 className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span className="font-semibold text-white text-[12.5px] sm:text-[13px] truncate">{packageName}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FF5500]/15 text-[#FF5500] font-bold text-[10px] sm:text-[10.5px] shrink-0">
                    {currentPrice}
                  </span>
                </div>
                <div className="flex justify-between text-[#8E8EA0] pt-1">
                  <span>Billing Cycle:</span>
                  <span className="text-white font-medium">{billingLabel}</span>
                </div>
                <div className="flex justify-between text-[#8E8EA0]">
                  <span>Client Name:</span>
                  <span className="text-white font-medium truncate ml-2">{name}</span>
                </div>
                {phone && (
                  <div className="flex justify-between text-[#8E8EA0]">
                    <span>WhatsApp:</span>
                    <span className="text-white font-medium">{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex justify-between text-[#8E8EA0]">
                    <span>Email:</span>
                    <span className="text-white font-medium truncate ml-2">{email}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                <a
                  href={`https://wa.me/6282322308719?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-[12px] bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-[12.5px] sm:text-[13px] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Confirm on WhatsApp Now</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-[12px] bg-[#212233] hover:bg-[#2A2B3D] text-white text-[12.5px] sm:text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <AdsvarLogoMark className="h-3 w-auto" />
                <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#FF5500]">
                  CHOOSE PACKAGE &bull; CRM ONBOARDING
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-white tracking-[-0.03em] leading-[1.14] mb-1.5 font-heading pr-8 sm:pr-0">
                Your package selection.<br />
                Ready to scale.
              </h2>

              {/* Subtitle in orange */}
              <p className="text-[12.5px] sm:text-[14px] text-[#FF5500] font-normal leading-normal mb-4 sm:mb-5">
                Lock in your tier and sync your requirements directly to our CRM team.
              </p>

              {/* Selected Package Highlight Card */}
              {activePlan && (
                <div className="p-3.5 sm:p-4 rounded-[14px] sm:rounded-[16px] bg-[#181927] border border-[#2D2E42] mb-4 sm:mb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-2.5 sm:pb-3 border-b border-[#27283B]">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                        {activePlan.number && (
                          <span className="text-[10px] font-mono text-[#6E6E80] tracking-wider">
                            {activePlan.number}
                          </span>
                        )}
                        {activePlan.isPopular && (
                          <span className="px-2 py-0.5 rounded-[5px] bg-[#FF5500] text-white font-bold text-[8px] sm:text-[8.5px] uppercase tracking-[0.08em]">
                            {activePlan.badge || "MOST POPULAR"}
                          </span>
                        )}
                      </div>
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-white whitespace-pre-line leading-tight">
                        {packageName}
                      </h3>
                    </div>

                    {/* Price & Billing Selector inside modal */}
                    <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2">
                      <div className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight">
                        {currentPrice}
                        {!isCustomPrice && (
                          <span className="text-[10px] sm:text-[11px] text-[#7A7A8E] font-normal ml-1">
                            {billingCycle === "monthly" ? "/mo" : "/th"}
                          </span>
                        )}
                      </div>

                      {/* Cycle switch pills */}
                      <div className="p-0.5 bg-[#12131D] border border-[#262738] rounded-[7px] inline-flex items-center text-[9.5px] sm:text-[10px]">
                        <button
                          type="button"
                          onClick={() => setBillingCycle("monthly")}
                          className={`px-2 py-0.5 rounded-[5px] font-medium transition-all cursor-pointer ${
                            billingCycle === "monthly"
                              ? "bg-[#252638] text-white font-semibold"
                              : "text-[#7A7A8E] hover:text-white"
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingCycle("project")}
                          className={`px-2 py-0.5 rounded-[5px] font-medium transition-all cursor-pointer ${
                            billingCycle === "project"
                              ? "bg-[#252638] text-white font-semibold"
                              : "text-[#7A7A8E] hover:text-white"
                          }`}
                        >
                          Annual -20%
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Features Snippet */}
                  {activePlan.features && activePlan.features.length > 0 && (
                    <div className="pt-2 sm:pt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[10.5px] sm:text-[11px] text-[#A6A6BA]">
                      {activePlan.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#FF5500] stroke-[2.5] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Error banner if any */}
              {errorMessage && (
                <div className="p-3 mb-3.5 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Field 1: Your Name */}
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                  />
                </div>

                {/* Field 2 & 3: Phone & Email in 2 columns on tablet/desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812 3456 7890"
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@brand.com"
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Tier Switcher if user wants to change plan */}
                {availablePlans.length > 1 && (
                  <div>
                    <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1 flex items-center justify-between">
                      <span>Package Tier</span>
                      <span className="text-[10px] sm:text-[11px] text-[#7A7A8E]">Switch tier if desired</span>
                    </label>
                    <select
                      value={activePlan?.id || ""}
                      onChange={(e) => {
                        const found = availablePlans.find((p) => p.id === Number(e.target.value));
                        if (found) setActivePlan(found);
                      }}
                      className="w-full h-[42px] sm:h-[46px] px-3.5 sm:px-4 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white outline-none cursor-pointer"
                    >
                      {availablePlans.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#171826] text-white">
                          {p.number ? `${p.number} ` : ""}{p.name.replace("\n", " ")} — {billingCycle === "monthly" ? p.priceMonthly : p.priceProject}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Field 4: Tell us about your brand & scope */}
                <div>
                  <label className="block text-[12px] sm:text-[13px] font-medium text-white mb-1">
                    Tell us about your brand &amp; scope
                  </label>
                  <textarea
                    rows={2}
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    placeholder="Tell us about your brand goals, campaign timeline, or social media links..."
                    className="w-full h-[70px] sm:h-[82px] p-3 sm:p-3.5 rounded-[12px] bg-[#171826] border border-[#28293D] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-[13px] sm:text-[13.5px] text-white placeholder-[#5A5A72] resize-none outline-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[46px] sm:h-[50px] mt-2 rounded-[14px] bg-[#FF5500] hover:bg-[#E04B00] active:scale-[0.99] text-[13.5px] sm:text-[14px] font-medium text-white shadow-[0_4px_18px_rgba(255,85,0,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting to CRM...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2]" />
                      <span>Confirm Package &amp; Submit to CRM</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
