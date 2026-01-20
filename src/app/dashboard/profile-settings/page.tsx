"use client";

import DashboardSidebar from '@/components/DashboardSidebar';
import { User, Mail, Phone, Lock } from 'lucide-react';

export default function ProfileSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}

          <div className="lg:w-90 shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Profile Information Card */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
              <div className="bg-purple-200 p-8">
                <div className="flex items-center gap-3 ">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-sm text-gray-600">Update Your Personal Details</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Student Name"
                      defaultValue="Student Name"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Student@Gmail.Com"
                      defaultValue="Student@Gmail.Com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0172345672"
                      defaultValue="0172345672"
                    />
                  </div>

                  <div className="flex justify-end items-end ">
                    <button
                      type="submit"
                      className="px-10 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Save Change
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {/* Upper Half - Purple Background */}
              <div className="bg-red-600 p-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Security</h2>
                    <p className="text-sm text-white  ">Manage Your Password</p>
                  </div>
                </div>
              </div>

              {/* Lower Half - White Background */}
              <div className="p-8">
                <button
                  type="button"
                  className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
