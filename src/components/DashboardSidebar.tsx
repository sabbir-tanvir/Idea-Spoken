"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Play, Award, CreditCard, Settings, LogOut, User } from 'lucide-react';

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

  const menuItems = [
    { href: '/dashboard', label: 'My Courses', icon: BookOpen },
    { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
    { href: '/dashboard/payment-history', label: 'Payment History', icon: CreditCard },
    { href: '/dashboard/profile-settings', label: 'Profile Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-full lg:w-90 bg-white rounded-3xl shadow-lg p-6 h-fit">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
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

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
