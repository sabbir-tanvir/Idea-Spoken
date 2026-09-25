"use client"

import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';

export default function PdfViewerSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-purple-700 font-semibold text-sm mb-6">
                <FileText className="w-4 h-4" />
                Document Details
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Rise and Thrive Overview
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the detailed insights and guidelines for the Rise and Thrive initiative by viewing our official documentation below.
            </p>
          </div>

          {/* PDF Viewer Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 transform transition-all hover:shadow-purple-500/10">
            {/* Top Toolbar */}
            <div className="px-6 py-4 bg-slate-900 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-300" />
                </div>
                <span className="font-medium tracking-wide">2pages.pdf</span>
              </div>
              <a 
                href="/images/2pages.pdf" 
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
            
            {/* PDF Embed */}
            <div className="w-full h-[600px] md:h-[800px] relative bg-slate-100 flex items-center justify-center">
              {/* Fallback text if iframe doesn't load immediately */}
              <div className="absolute flex flex-col items-center justify-center text-slate-400 gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p>Loading Document...</p>
              </div>
              
              <iframe
                src="/images/2pages.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="absolute inset-0 w-full h-full border-0 z-10"
                title="Rise and Thrive PDF Document"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
