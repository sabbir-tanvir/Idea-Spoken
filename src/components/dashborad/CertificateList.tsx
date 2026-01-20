import Link from 'next/link';
import { Certificate } from '@/lib/data';
import { CertificateCard } from './CertificateCard';
import { Award } from 'lucide-react';

interface CertificateListProps {
  certificates: Certificate[];
}

/**
 * Certificate List Component - Server Component
 * This component can be rendered on the server and will receive data from API
 * Only the animation wrapper (CertificateCard) uses "use client"
 */
export default function CertificateList({ certificates }: CertificateListProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 p-4 rounded-2xl shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificates & Achievements</h1>
            <p className="text-gray-600 mt-1">Your Learning Milestones</p>
          </div>
        </div>
      </div>

      {/* Empty State or Certificate Grid */}
      {certificates.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Empty State Component - Server Component
 * Shown when user has no certificates yet
 */
function EmptyState() {
  return (
    <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-3xl p-12 text-center shadow-sm border border-purple-100">
      {/* Medal Icon */}
      <div className="flex justify-center mb-8">
        <div className="bg-purple-200 rounded-full p-8 shadow-lg">
          <Award className="w-16 h-16 text-purple-600" />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Keep Learning To Earn Certificates!
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Complete Your Enrolled Courses To Unlock Professional Certificates That Showcase Your Achievements.
        </p>
      </div>

      {/* Optional: Call to Action */}
      <div className="mt-8">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Award className="w-5 h-5" />
          <span>Browse Courses</span>
        </Link>
      </div>
    </div>
  );
}
