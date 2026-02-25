'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Copy, Check, Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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

interface MethodConfig {
  id: PaymentMethod;
  label: string;
  image: string;
  bgColor: string;
  sendTo: string;
  numberLabel: string;
  numberPlaceholder: string;
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
    sendTo: '01783-414354',
    numberLabel: 'Your Bkash Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    image: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png',
    bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500',
    sendTo: '01783-414354',
    numberLabel: 'Your Nagad Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'rocket',
    label: 'Rocket',
    image: 'https://freelogopng.com/images/all_img/1656234571dutch-bangla-rocket-logo-png.png',
    bgColor: 'bg-gradient-to-r from-purple-400 to-purple-500',
    sendTo: '01783-4143541',
    numberLabel: 'Your Rocket Number',
    numberPlaceholder: '01XXXXXXXXX',
  },
  {
    id: 'brac_bank',
    label: 'BRAC Bank',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/3e/BRAC_Bank_logo.svg',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    sendTo: '01783-414354',
    numberLabel: 'Your Account Number',
    numberPlaceholder: 'e.g. 1234567890',
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
  const [step, setStep] = useState<Step>('select');
  const [selectedMethod, setSelectedMethod] = useState<MethodConfig | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PaymentActionResult | null>(null);

  /* ---- helpers ---- */

  const reset = useCallback(() => {
    setStep('select');
    setSelectedMethod(null);
    setPhoneNumber('');
    setTransactionId('');
    setCopied(false);
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
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/-/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  return (
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
                          onClick={() => handleSelectMethod(method)}
                          className="relative group border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all duration-200 flex items-center justify-center h-24 cursor-pointer"
                        >
                          <Image
                            src={method.image}
                            alt={method.label}
                            width={140}
                            height={60}
                            className="object-contain max-h-14"
                            unoptimized
                          />
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
                      onClick={handleBackToMethods}
                      className="flex items-center gap-1 text-sm text-slate-500 hover:text-purple-600 mb-4 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to payment methods
                    </button>

                    {/* Method banner */}
                    <div
                      className={`${selectedMethod.bgColor} rounded-xl p-5 flex items-center justify-center mb-5`}
                    >
                      <Image
                        src={selectedMethod.image}
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
                          onClick={() => handleCopy(selectedMethod.sendTo)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          aria-label="Copy number"
                        >
                          {copied ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Phone number input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {selectedMethod.numberLabel}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={selectedMethod.numberPlaceholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-800"
                      />
                    </div>

                    {/* Transaction ID input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Transaction ID (TrxID)
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g-abcd1234bdz"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-slate-800"
                      />
                    </div>

                    {/* Submit button */}
                    <button
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
                            onClick={handleBackToMethods}
                            className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors cursor-pointer"
                          >
                            Try Again
                          </button>
                          <button
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
    </AnimatePresence>
  );
}
