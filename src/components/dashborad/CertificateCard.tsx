"use client"

import { motion } from 'motion/react';
import { Certificate } from '@/lib/data';
import { Award, Download, Calendar, Trophy, FileCheck } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

/**
 * Certificate Card - Client Component for animations only
 * This is a minimal client component wrapper to enable motion animations
 * while keeping the parent component server-side
 */
export function CertificateCard({ certificate, index }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Certificate Header with Gradient */}
      <div className="bg-linear-to-r from-purple-600 to-blue-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Award className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm p-2 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="w-6 h-6" />
              </motion.div>
              <div>
                <p className="text-xs text-white/80">Certificate</p>
                <p className="text-sm font-semibold">{certificate.certificateId}</p>
              </div>
            </div>
            {certificate.grade && (
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-bold">Grade: {certificate.grade}</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-1 line-clamp-2">
            {certificate.courseTitle}
          </h3>
          <p className="text-sm text-white/90">{certificate.courseName}</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="p-6">
        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Completed:</span>
            <span>{certificate.completionDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileCheck className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Issued:</span>
            <span>{certificate.issueDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Trophy className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Instructor:</span>
            <span>{certificate.instructorName}</span>
          </div>
          {certificate.score && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-purple-600 font-bold">%</span>
              </div>
              <span className="font-medium">Score:</span>
              <span className="font-bold text-purple-600">{certificate.score}%</span>
            </div>
          )}
          {certificate.validUntil && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Valid Until:</span>
              <span>{certificate.validUntil}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm"
            onClick={() => {
              // TODO: Implement certificate view functionality
              console.log('View certificate:', certificate.id);
            }}
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            onClick={() => {
              // TODO: Implement download functionality
              console.log('Download certificate:', certificate.id);
            }}
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Optional: Certificate Preview Thumbnail */}
      {certificate.thumbnailUrl && (
        <div className="px-6 pb-6">
          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Award className="w-12 h-12" />
            </div>
            {/* Uncomment when you have actual images */}
            {/* <Image 
              src={certificate.thumbnailUrl} 
              alt={`${certificate.courseTitle} Certificate`}
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      )}
    </motion.div>
  );
}
