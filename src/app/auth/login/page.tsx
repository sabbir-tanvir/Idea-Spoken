'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { loginUser } from '@/lib/auth/actions';
import { ActionResult } from '@/lib/auth/types';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    loginUser,
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
          <h1 className="text-4xl md:text-5xl font-bold">Hello Welcome !</h1>
          <p className="text-lg md:text-xl">Don&apos;t Have an account?</p>
          <Link href="/auth/register">
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#704FE6] transition-colors font-medium text-lg">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - White Background with Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Login</h2>
          
          {/* General Error Message */}
          {state?.errors?.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{state.errors.general[0]}</p>
            </div>
          )}
          
          <form action={formAction} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isPending}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isPending}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704FE6] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
              {state?.errors?.password && (
                <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#704FE6] focus:ring-[#704FE6] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  accept terms and condition
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#704FE6] hover:underline">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 bg-[#704FE6] text-white rounded-lg hover:bg-[#5d3ec7] transition-colors font-medium text-lg disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
