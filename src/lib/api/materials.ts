// ─── Course Materials API ─────────────────────────────────────────────

export interface ApiMaterial {
  id: number;
  title: string;
  description: string | null;
  type: "FILE" | "LINK";
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  externalUrl: string | null;
  sortOrder: number;
  isFree: boolean;
  courseId: number;
}

export interface MaterialsApiResponse {
  success: boolean;
  count: number;
  isEnrolledOrAdmin: boolean;
  data: ApiMaterial[];
}

/**
 * Fetch materials for a specific course via the Next.js proxy API route.
 * This is called client-side — the proxy forwards the auth cookie automatically.
 */
export async function getCourseMaterials(
  courseId: number
): Promise<ApiMaterial[]> {
  try {
    const response = await fetch(`/api/materials/${courseId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Materials API error:", response.status);
      return [];
    }

    const data: MaterialsApiResponse = await response.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch course materials:", error);
    return [];
  }
}

/**
 * Format file size from bytes to a human-readable string.
 */
export function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/**
 * Returns an emoji icon based on the material type and MIME type.
 */
export function getFileIcon(
  mimeType: string | null | undefined,
  type: string
): string {
  if (type === "LINK") return "🔗";
  if (!mimeType) return "📄";
  if (mimeType.includes("pdf")) return "📕";
  if (mimeType.includes("zip") || mimeType.includes("rar")) return "📦";
  if (mimeType.includes("word") || mimeType.includes("document")) return "📝";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
    return "📊";
  if (mimeType.includes("image")) return "🖼️";
  if (mimeType.includes("video")) return "🎬";
  if (mimeType.includes("audio")) return "🎵";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "📊";
  return "📄";
}
