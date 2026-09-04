"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Landmark, Copy, Check, ShieldCheck, CreditCard, GitBranch, Binary } from "lucide-react";

export default function WBankDetails() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankData = {
    accountName: "Bangladesh Sikkatri O Uddakta Group(WINI)",
    bankName: "Agrani Bank Limited",
    branch: "Jashore Branch, Jashore",
    routingNo: "010410943",
    accountNo: "0200019105430",
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-purple-50/50 to-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Official Account Details
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            উইনি (WINI) ব্যাংক অ্যাকাউন্ট তথ্য
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            উইনির যাবতীয় অফিশিয়াল লেনদেন, রেজিস্ট্রেশন ও আর্থিক সহায়তার জন্য নিম্নে বর্ণিত স্বীকৃত ব্যাংক অ্যাকাউন্ট ব্যবহার করুন।
          </p>
        </div>

        {/* Bank Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5 overflow-hidden"
        >
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-6 md:p-8 text-white relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                  <Landmark className="w-7 h-7 text-purple-100" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-purple-200 font-semibold">Bank Name</span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{bankData.bankName}</h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-sm md:text-base font-bold text-white shadow-sm self-start md:self-auto">
                <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-purple-200" />
                <span>Branch: {bankData.branch}</span>
              </div>
            </div>

            {/* Subtle card watermark */}
            <Landmark className="absolute -right-6 -bottom-8 w-48 h-48 text-white/5 pointer-events-none" />
          </div>

          {/* Card Body - Grid Info */}
          <div className="p-6 md:p-10 space-y-6">
            {/* Account Title & Branch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Title */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                  <CreditCard className="w-4 h-4" />
                  Account Name / হিসাবের নাম
                </div>
                <p className="text-lg md:text-xl font-bold text-slate-900">
                  {bankData.accountName}
                </p>
              </div>

              {/* Branch Info */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                  <GitBranch className="w-4 h-4" />
                  Branch Name / শাখার নাম
                </div>
                <p className="text-lg md:text-xl font-bold text-slate-900">
                  {bankData.branch}
                </p>
              </div>
            </div>

            {/* Account Number & Routing Number (2-Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Number */}
              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-2">
                    <CreditCard className="w-4 h-4" />
                    Account Number / অ্যাকাউন্ট নম্বর
                  </div>
                  <p className="text-2xl md:text-3xl font-mono font-extrabold text-slate-900 tracking-wider">
                    {bankData.accountNo}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(bankData.accountNo, "accountNo")}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer"
                  type="button"
                >
                  {copiedField === "accountNo" ? (
                    <>
                      <Check className="w-4 h-4 text-green-300" />
                      অ্যাাকাউন্ট নম্বর কপি হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Account No
                    </>
                  )}
                </button>
              </div>

              {/* Routing Number */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
                    <Binary className="w-4 h-4" />
                    Routing Number / রাউটিং নম্বর
                  </div>
                  <p className="text-2xl md:text-3xl font-mono font-extrabold text-slate-900 tracking-wider">
                    {bankData.routingNo}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(bankData.routingNo, "routingNo")}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer"
                  type="button"
                >
                  {copiedField === "routingNo" ? (
                    <>
                      <Check className="w-4 h-4 text-green-300" />
                      রাউটিং নম্বর কপি হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Routing No
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
