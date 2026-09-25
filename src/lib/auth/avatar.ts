/**
 * Avatar URL resolver utility
 * Ensures relative paths like "/uploads/avatars/..." or "uploads/avatars/..."
 * are properly joined with the backend origin without broken URLs or double slashes.
 */

const DEFAULT_ORIGIN = 'https://api.idealessons.com';

export function getAvatarUrl(avatarPath?: string | null): string {
  if (!avatarPath || typeof avatarPath !== 'string') return '';

  const trimmed = avatarPath.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return '';

  // Normalize Windows backslashes
  const normalized = trimmed.replace(/\\/g, '/');

  // If already absolute URL (http, https, blob, data)
  if (
    normalized.startsWith('http://') ||
    normalized.startsWith('https://') ||
    normalized.startsWith('blob:') ||
    normalized.startsWith('data:')
  ) {
    return normalized;
  }

  // Get backend base origin
  const backendOrigin = (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.PUBLIC_BASE_URL ||
    DEFAULT_ORIGIN
  ).replace(/\/+$/, '');

  const cleanPath = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${backendOrigin}${cleanPath}`;
}
