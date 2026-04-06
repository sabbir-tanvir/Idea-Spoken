// src/lib/getFullImageUrl.ts

/**
 * Returns a full image URL, prefixing with PUBLIC_BASE_URL if needed.
 * Accepts any path from image/avatar/thumbnailUrl/backgroundImage/foregroundImage fields.
 */
export function getFullImageUrl(path?: string | null): string {
  if (!path) return "";
  const normalizedPath = path.replace(/\\/g, "/");
  if (normalizedPath.startsWith("blob:") || normalizedPath.startsWith("http"))
    return normalizedPath;
  if (normalizedPath.startsWith("/")) {
    // Use env var for prefix
    const base =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL || "";

    const gu = base
      ? `${base.replace(/\/$/, "")}${normalizedPath}`
      : normalizedPath;

    console.log("getFullImageUrl", { path, normalizedPath, base, gu });
    return base
      ? `${base.replace(/\/$/, "")}${normalizedPath}`
      : normalizedPath;
  }
  return normalizedPath;
}
