import DashboardSidebar from '@/components/DashboardSidebar';
import CertificateList from '@/components/dashborad/CertificateList';
import { mockCertificatesEmpty, mockCertificates } from '@/lib/data';

/**
 * Certificates Page - Server Component
 * This page remains server-rendered and can easily integrate with API
 * Replace mockCertificates with API call: const certificates = await fetchCertificates();
 * 
 * To test empty state, use: mockCertificatesEmpty
 * To test with data, use: mockCertificates
 */
export default function CertificatesPage() {
  // TODO: Replace with actual API call when ready
  // const certificates = await fetch('/api/certificates').then(res => res.json());
  
  // Switch between mockCertificatesEmpty and mockCertificates to test both states
  const certificates = mockCertificatesEmpty; // Change to mockCertificates to see certificate cards

  return (
    <div className="flex bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 ">
            <CertificateList certificates={certificates} />
          </main>
        </div>
      </div>
    </div>
  );
}
