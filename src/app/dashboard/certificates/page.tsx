import DashboardSidebar from '@/components/DashboardSidebar';
import CertificateList from '@/components/dashborad/CertificateList';
import { getCourseProgress } from '@/lib/api/courses';
import { getAuthToken } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

/**
 * Certificates Page - Server Component
 * This page remains server-rendered and can easily integrate with API
 * Replace mockCertificates with API call: const certificates = await fetchCertificates();
 * 
 * To test empty state, use: mockCertificatesEmpty
 * To test with data, use: mockCertificates
 */
export default async function CertificatesPage() {
  const token = await getAuthToken();
  if (!token) redirect('/auth/login');

  const progressItems = await getCourseProgress(token);

  return (
    <div className="flex bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 shrink-0">
            <DashboardSidebar />
          </div>

          <main className="flex-1 ">
            <CertificateList progressItems={progressItems} />
          </main>
        </div>
      </div>
    </div>
  );
}
