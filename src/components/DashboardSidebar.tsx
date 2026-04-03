"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Award, CreditCard, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logoutUser } from '@/lib/auth/actions';

interface DashboardSidebarProps {
  userName?: string;
  userEmail?: string;
  userStatus?: string;
  onLogout?: () => void;
}

export default function DashboardSidebar({
  userName = "Student Name",
  userEmail = "Student@Email.Com",
  userStatus = "Active Student",
  onLogout
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard', label: 'My Courses', icon: BookOpen },
    { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
    { href: '/dashboard/payment-history', label: 'Payment History', icon: CreditCard },
    { href: '/dashboard/profile-settings', label: 'Profile Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  const navContent = (
    <nav>
      <ul className="space-y-2 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      {onLogout ? (
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      ) : (
        <form action={logoutUser}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </form>
      )}
    </nav>
  );

  return (
    <>
      {/* ── Desktop: full sidebar ── */}
      <aside className="hidden lg:block w-full lg:w-90 bg-white rounded-3xl shadow-lg p-6 h-fit">
        {/* User Profile Section */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
          <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
            <User className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{userName}</h3>
            <p className="text-sm text-gray-600 truncate">{userEmail}</p>
            <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {userStatus}
            </span>
          </div>
        </div>
        {navContent}
      </aside>

      {/* ── Mobile: compact toggle card ── */}
      <aside className="lg:hidden bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Compact header — always visible */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left"
        >
          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">{userName}</h3>
            <span className="text-xs text-green-600 font-medium">{userStatus}</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expandable menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3 truncate">{userEmail}</p>
                {navContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
