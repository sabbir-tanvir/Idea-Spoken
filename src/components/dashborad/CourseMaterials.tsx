"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  ExternalLink,
  FolderOpen,
  Loader2,
  Search,
} from "lucide-react";
import {
  ApiMaterial,
  getCourseMaterials,
  formatFileSize,
  getFileIcon,
} from "@/lib/api/materials";
import { ApiCourseDetail } from "@/lib/api/courses";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

interface CourseMaterialsProps {
  courses: ApiCourseDetail[];
}

interface CourseWithMaterials {
  courseId: number;
  courseTitle: string;
  materials: ApiMaterial[];
}

export default function CourseMaterials({ courses }: CourseMaterialsProps) {
  const [coursesMaterials, setCoursesMaterials] = useState<
    CourseWithMaterials[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          courses.map(async (course) => {
            const materials = await getCourseMaterials(course.id);
            return {
              courseId: course.id,
              courseTitle: course.title,
              materials,
            };
          })
        );
        // Only keep courses that have materials
        setCoursesMaterials(results.filter((r) => r.materials.length > 0));
      } catch (error) {
        console.error("Failed to load materials:", error);
      } finally {
        setLoading(false);
      }
    }
    if (courses.length > 0) {
      fetchAll();
    } else {
      setLoading(false);
    }
  }, [courses]);

  const totalMaterials = coursesMaterials.reduce(
    (sum, c) => sum + c.materials.length,
    0
  );

  // Filter materials by search query
  const filteredCourses = coursesMaterials
    .map((cm) => ({
      ...cm,
      materials: cm.materials.filter(
        (m) =>
          !searchQuery ||
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cm.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cm) => cm.materials.length > 0);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
          <div>
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-4 w-56 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        {/* Card skeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse"
          >
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                    <div className="h-3 w-32 bg-gray-100 rounded" />
                  </div>
                  <div className="w-24 h-8 bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Empty state ──
  if (totalMaterials === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center">
          <FolderOpen className="w-10 h-10 text-purple-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No Materials Yet
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Your enrolled courses don&apos;t have any downloadable materials or
          resources yet. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Total Resources
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {totalMaterials}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Materials grouped by course */}
      <AnimatePresence mode="wait">
        {filteredCourses.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              No materials match your search.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {filteredCourses.map((cm, courseIdx) => (
              <motion.div
                key={cm.courseId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: courseIdx * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Course header */}
                <div className="px-5 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    {cm.courseTitle}
                    <span className="ml-auto text-xs font-semibold text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {cm.materials.length} item
                      {cm.materials.length !== 1 ? "s" : ""}
                    </span>
                  </h3>
                </div>

                {/* Materials list */}
                <div className="divide-y divide-gray-50">
                  {cm.materials.map((material, matIdx) => (
                    <MaterialRow
                      key={material.id}
                      material={material}
                      index={matIdx}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Material Row ────────────────────────────────────────────────────
function MaterialRow({
  material,
  index,
}: {
  material: ApiMaterial;
  index: number;
}) {
  const icon = getFileIcon(material.mimeType, material.type);
  const size = formatFileSize(material.fileSize);
  const isFile = material.type === "FILE";
  const downloadUrl = isFile
    ? `${BACKEND_URL}${material.fileUrl}`
    : material.externalUrl ?? "#";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-4 px-5 py-4 hover:bg-purple-50/40 transition-colors group"
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-lg group-hover:scale-105 transition-transform">
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {material.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {material.description && (
            <p className="text-xs text-gray-500 truncate max-w-xs">
              {material.description}
            </p>
          )}
          {size && (
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md shrink-0">
              {size}
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <a
        href={downloadUrl}
        target="_blank"
        rel="noreferrer"
        download={isFile ? material.fileName ?? undefined : undefined}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all shrink-0
          bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md active:scale-95"
      >
        {isFile ? (
          <>
            <Download className="w-3.5 h-3.5" />
            Download
          </>
        ) : (
          <>
            <ExternalLink className="w-3.5 h-3.5" />
            Open Link
          </>
        )}
      </a>
    </motion.div>
  );
}
