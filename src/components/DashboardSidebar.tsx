import Link from 'next/link';

export default function DashboardSidebar() {
  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/lessons', label: 'My Lessons', icon: '📚' },
    { href: '/dashboard/certificates', label: 'Certificates', icon: '🏆' },
    { href: '/dashboard/payment-history', label: 'Payment History', icon: '💳' },
    { href: '/dashboard/profile-settings', label: 'Profile Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800 transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
