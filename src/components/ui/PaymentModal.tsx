'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  Copy,
  Check,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
  Landmark,
  CreditCard,
  GitBranch,
  Binary,
} from 'lucide-react';
import Image from 'next/image';
import { submitPayment, PaymentMethod, PaymentActionResult } from '@/lib/api/payments';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  courseId: number;
  amount: number;
  currency?: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNo: string;
  branch: string;
  routingNo: string;
}

interface MethodConfig {
  id: PaymentMethod;
  label: string;
  image?: string;
  bgColor: string;
  sendTo: string;
  numberLabel: string;
  numberPlaceholder: string;
  bankDetails?: BankDetails;
}

/* ------------------------------------------------------------------ */
/*  Static config for payment methods                                  */
/* ------------------------------------------------------------------ */

const PAYMENT_METHODS: MethodConfig[] = [
  {
    id: 'bkash',
    label: 'bKash',
    image: 'https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png',
    bgColor: 'bg-gradient-to-r from-pink-500 to-pink-600',
    sendTo: '০১৯২৯-১৭৯২১৮',
    numberLabel: 'Your bKash Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    image: 'https://freelogopng.com/images/all_img/1679248828Nagad-Logo-PNG.png',
    bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500',
    sendTo: '01712-784041',
    numberLabel: 'Your Nagad Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'rocket',
    label: 'Rocket',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/068/706/013/small_2x/rocket-color-logo-mobile-banking-icon-free-png.png',
    bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    sendTo: '01990-822023',
    numberLabel: 'Your Rocket Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'brac_bank',
    label: 'Bank Transfer (WINI)',
    bgColor: 'bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700',
    sendTo: '0200019105430',
    numberLabel: 'Sender Bank / Account Name',
    numberPlaceholder: 'e.g. Sonali Bank / Rahim Uddin',
    bankDetails: {
      bankName: 'Agrani Bank Limited',
      accountName: 'Bangladesh Sikkatri O Uddakta Group(WINI)',
      branch: 'Jashore Branch, Jashore',
      routingNo: '010410943',
      accountNo: '0200019105430',
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Steps: select → form → result                                     */
/* ------------------------------------------------------------------ */

type Step = 'select' | 'form' | 'result';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PaymentModal({
  isOpen,
  onClose,
  courseName,
  courseId,
  amount,
  currency = 'taka',
}: PaymentModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>('select');
  const [selectedMethod, setSelectedMethod] = useState<MethodConfig | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PaymentActionResult | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---- helpers ---- */

  const reset = useCallback(() => {
    setStep('select');
    setSelectedMethod(null);
    setPhoneNumber('');
    setTransactionId('');
    setCopiedField(null);
    setIsSubmitting(false);
    setResult(null);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSelectMethod = useCallback((method: MethodConfig) => {
    setSelectedMethod(method);
    setStep('form');
  }, []);

  const handleBackToMethods = useCallback(() => {
    setStep('select');
    setSelectedMethod(null);
    setPhoneNumber('');
    setTransactionId('');
    setCopiedField(null);
  }, []);

  const handleCopy = useCallback(async (text: string, field: string = 'sendTo') => {
    try {
      await navigator.clipboard.writeText(text.replace(/-/g, ''));
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback: do nothing
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedMethod || !transactionId.trim()) return;

    setIsSubmitting(true);

    const res = await submitPayment({
      transactionId: transactionId.trim(),
      courseId,
      paymentMethod: selectedMethod.id,
      amount,
      currency,
    });

    setResult(res);
    setStep('result');
    setIsSubmitting(false);
  }, [selectedMethod, transactionId, courseId, amount, currency]);

  const formattedPrice = `৳${amount.toLocaleString('en-IN')}`;

  /* ---- shared header (course info) ---- */
  const CourseHeader = () => (
    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
      <p className="text-sm text-purple-600 font-medium">Course</p>
      <h3 className="text-lg font-bold text-slate-900">{courseName}</h3>
      <p className="text-2xl font-bold text-purple-600 mt-1">{formattedPrice}</p>
    </div>
  );

  /* ---- overlay + modal animation ---- */
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <h2 className="text-xl font-bold text-slate-900">Complete Payment</h2>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <CourseHeader />

              <AnimatePresence mode="wait">
                {/* ═══════════ Step 1: Select method ═══════════ */}
                {step === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-slate-500 mb-4 font-medium">
                      পেমেন্ট মেথড সিলেক্ট করুন
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectMethod(method);
                          }}
                          className="relative group border-2 border-gray-100 rounded-xl p-3 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center h-24 cursor-pointer bg-white"
                        >
                          {method.image ? (
                            <Image
                              src={method.image}
                              alt={method.label}
                              width={140}
                              height={60}
                              className="object-contain max-h-14"
                              unoptimized
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1 text-center">
                              <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Landmark className="w-5 h-5 text-purple-600" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 leading-tight">
                                Bank Transfer
                                <span className="block text-[10px] text-purple-600 font-medium">WINI (Agrani Bank)</span>
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Safety note */}
                    <div className="flex items-center gap-2 mt-5 text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3">
                      <Shield className="w-4 h-4 shrink-0" />
                      <span>আপনার পেমেন্ট সম্পূর্ণ নিরাপদ</span>
                    </div>
                  </motion.div>
                )}

                {/* ═══════════ Step 2: Payment form ═══════════ */}
                {step === 'form' && selectedMethod && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Back link */}
                    <button
                      type="button"
                      onClick={handleBackToMethods}
                      className="flex items-center gap-1 text-sm text-slate-500 hover:text-purple-600 mb-4 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to payment methods
                    </button>

                    {/* Method header / banner */}
                    {selectedMethod.bankDetails ? (
                      /* ── Bank Account Info Card ── */
                      <div className="mb-5 space-y-3">
                        <div className={`${selectedMethod.bgColor} rounded-xl p-4 text-white relative overflow-hidden shadow-sm`}>
                          <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                              <Landmark className="w-5 h-5 text-purple-100" />
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold block">Bank Name</span>
                              <h4 className="text-base font-bold leading-tight">{selectedMethod.bankDetails.bankName}</h4>
                            </div>
                          </div>
                          <Landmark className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 pointer-events-none" />
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-sm">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 uppercase tracking-wider mb-0.5">
                              <CreditCard className="w-3.5 h-3.5" />
                              Account Name / হিসাবের নাম
                            </div>
                            <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                              {selectedMethod.bankDetails.accountName}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-200 pt-2.5">
                            <div>
                              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 uppercase tracking-wider mb-0.5">
                                <CreditCard className="w-3.5 h-3.5" />
                                Account Number / অ্যাকাউন্ট নম্বর
                              </div>
                              <span className="font-mono font-extrabold text-base text-slate-900">
                                {selectedMethod.bankDetails.accountNo}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedMethod.bankDetails!.accountNo, 'accountNo')}
                              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium shadow-xs"
                            >
                              {copiedField === 'accountNo' ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-green-600" />
                                  <span className="text-green-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-200 pt-2.5">
                            <div>
                              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-0.5">
                                <Binary className="w-3.5 h-3.5" />
                                Routing Number / রাউটিং নম্বর
                              </div>
                              <span className="font-mono font-bold text-sm text-slate-800">
                                {selectedMethod.bankDetails.routingNo}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedMethod.bankDetails!.routingNo, 'routingNo')}
                              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium shadow-xs"
                            >
                              {copiedField === 'routingNo' ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-green-600" />
                                  <span className="text-green-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="border-t border-slate-200 pt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
                            <GitBranch className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span><strong>Branch:</strong> {selectedMethod.bankDetails.branch}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── Mobile Banking Header ── */
                      <>
                        <div
                          className={`${selectedMethod.bgColor} rounded-xl p-5 flex items-center justify-center mb-5`}
                        >
                          <Image
                            src={selectedMethod.image!}
                            alt={selectedMethod.label}
                            width={160}
                            height={70}
                            className="object-contain max-h-16 brightness-0 invert"
                            unoptimized
                          />
                        </div>

                        {/* Send-to number */}
                        <div className="mb-5">
                          <p className="text-sm text-slate-400 mb-1">Send money to:</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-slate-900 tracking-wide">
                              {selectedMethod.sendTo}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedMethod.sendTo, 'sendTo')}
                              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Copy number"
                            >
                              {copiedField === 'sendTo' ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy className="w-5 h-5 text-slate-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Phone / Account input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {selectedMethod.numberLabel}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={selectedMethod.numberPlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-800 text-sm"
                      />
                    </div>

                    {/* Transaction ID input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {selectedMethod.bankDetails
                          ? 'Transaction ID / Deposit Slip No / Reference'
                          : 'Transaction ID (TrxID)'}
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder={
                          selectedMethod.bankDetails
                            ? 'e.g. Deposit slip or ref number'
                            : 'e.g-abcd1234bdz'
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-800 text-sm"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !transactionId.trim()}
                      className="w-full py-3.5 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing…
                        </>
                      ) : (
                        <>
                          Confirm Payment
                          <span className="text-lg">→</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* ═══════════ Step 3: Result ═══════════ */}
                {step === 'result' && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-4"
                  >
                    {result.success ? (
                      <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          Payment Submitted!
                        </h3>
                        <p className="text-slate-500 mb-2">{result.message}</p>
                        {result.data && (
                          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-1 mt-4 mb-6">
                            <p>
                              <span className="text-slate-400">Status:</span>{' '}
                              <span className="font-medium text-amber-600">
                                {result.data.status}
                              </span>
                            </p>
                            <p>
                              <span className="text-slate-400">Transaction ID:</span>{' '}
                              <span className="font-medium text-slate-700">
                                {result.data.transactionId}
                              </span>
                            </p>
                            <p>
                              <span className="text-slate-400">Amount:</span>{' '}
                              <span className="font-medium text-slate-700">
                                ৳{Number(result.data.amount).toLocaleString('en-IN')}
                              </span>
                            </p>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={handleClose}
                          className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                          Done
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          Payment Failed
                        </h3>
                        <p className="text-slate-500 mb-6">{result.message}</p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={handleBackToMethods}
                            className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors cursor-pointer"
                          >
                            Try Again
                          </button>
                          <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 bg-gray-100 text-slate-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

