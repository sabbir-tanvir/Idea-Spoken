"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  ExternalLink,
  FolderOpen,
  ChevronDown,
} from "lucide-react";
import {
  ApiMaterial,
  getCourseMaterials,
  formatFileSize,
  getFileIcon,
} from "@/lib/api/materials";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

interface CourseMaterialsSectionProps {
  courseId: number;
}

export default function CourseMaterialsSection({
  courseId,
}: CourseMaterialsSectionProps) {
  const [materials, setMaterials] = useState<ApiMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      setLoading(true);
      try {
        const data = await getCourseMaterials(courseId);
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch course materials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, [courseId]);

  // Don't render anything while loading or if there are no materials
  if (loading) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-md border border-purple-100 bg-white mt-4 animate-pulse">
        <div className="p-4 md:p-5 bg-purple-50 flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-200 rounded-full" />
          <div className="flex-1">
            <div className="h-3 w-20 bg-purple-200 rounded mb-1" />
            <div className="h-4 w-36 bg-purple-200 rounded" />
          </div>
        </div>
        <div className="p-4 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-1">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (materials.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-purple-100 bg-white mt-4">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left bg-purple-50 hover:bg-purple-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Resources
          </p>
          <h4 className="text-base font-bold text-gray-900">
            Course Materials
          </h4>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:block text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
            {materials.length} item{materials.length !== 1 ? "s" : ""}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Materials list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-gray-100 bg-white">
              {materials.map((material) => (
                <MaterialItem key={material.id} material={material} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Material Item ───────────────────────────────────────────────────
function MaterialItem({ material }: { material: ApiMaterial }) {
  const icon = getFileIcon(material.mimeType, material.type);
  const size = formatFileSize(material.fileSize);
  const isFile = material.type === "FILE";
  const url = isFile
    ? `${BACKEND_URL}${material.fileUrl}`
    : material.externalUrl ?? "#";

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-purple-50/60 transition-colors group">
      {/* Icon */}
      <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-base group-hover:scale-105 transition-transform">
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {material.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {material.description && (
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {material.description}
            </p>
          )}
          {size && (
            <span className="text-xs text-gray-400">{size}</span>
          )}
        </div>
      </div>

      {/* Action */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        download={isFile ? material.fileName ?? undefined : undefined}
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shrink-0
          bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
      >
        {isFile ? (
          <>
            <Download className="w-3.5 h-3.5" />
            Download
          </>
        ) : (
          <>
            <ExternalLink className="w-3.5 h-3.5" />
            Open ↗
          </>
        )}
      </a>
    </div>
  );
}
