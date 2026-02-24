import { cookies } from 'next/headers';

const TOKEN_NAME = 'auth_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT payload without verification (for display purposes)
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const base64 = token.split('.')[1];
    const json = Buffer.from(base64, 'base64').toString();
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Set the auth token in an HTTP-only cookie
 */
export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

/**
 * Get the auth token from cookies
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);
  return token?.value ?? null;
}

/**
 * Remove the auth token (logout)
 */
export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}
