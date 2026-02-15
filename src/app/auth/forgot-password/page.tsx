'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { forgotPassword } from '@/lib/auth/actions';
import { ActionResult } from '@/lib/auth/types';
import { Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    forgotPassword,
    null
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Purple Background with Rounded Corner */}
      <div 
        className="w-full md:w-1/2 bg-[#704FE6] flex items-center justify-center p-8 md:p-16 relative"
        style={{
          borderTopRightRadius: '25%',
          borderBottomRightRadius: '25%'
        }}
      >
        <div className="relative z-10 text-center text-white space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold">Need Help?</h1>
          <p className="text-lg md:text-xl">Remember your password?</p>
          <Link href="/auth/login">
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#704FE6] transition-colors font-medium text-lg">
              Back to Login
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - White Background with Forgot Password Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Forgot Password</h2>
            <p className="mt-3 text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          
          {/* Success Message */}
          {state?.success && state.message && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">{state.message}</p>
                <p className="text-xs text-green-700 mt-1">Please check your email inbox.</p>
              </div>
            </div>
          )}
          
          {/* General Error Message */}
          {state?.errors?.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{state.errors.general[0]}</p>
            </div>
          )}
          
          <form action={formAction} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isPending || state?.success}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || state?.success}
              className="w-full py-3 px-4 bg-[#704FE6] text-white rounded-lg hover:bg-[#5d3ec7] transition-colors font-medium text-lg disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-[#704FE6] hover:underline font-medium">
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
