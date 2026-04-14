// src/lib/getFullImageUrl.ts

const BACKEND_ORIGIN = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(
  /\/+$/,
  ""
);

/**
 * Returns an absolute URL for API media paths and keeps local public paths untouched.
 * API media is expected to come from `/uploads/...`.
 */
export function getFullImageUrl(path?: string | null): string {
  if (!path) return "";

  const normalizedPath = path.replace(/\\/g, "/");

  if (
    normalizedPath.startsWith("blob:") ||
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return normalizedPath;
  }

  const isUploadPath =
    normalizedPath.startsWith("/uploads/") ||
    normalizedPath.startsWith("uploads/");

  if (!isUploadPath) {
    // Keep local assets like /images/... as-is.
    return normalizedPath;
  }

  if (!BACKEND_ORIGIN) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is required for media URLs.");
  }

  return `${BACKEND_ORIGIN}${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`;
}
