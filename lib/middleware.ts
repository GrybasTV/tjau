import { NextRequest } from 'next/server';
import { verifyToken } from './auth';

// Middleware funkcija admin autentifikacijai
export function requireAuth(request: NextRequest): { username: string } | null {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

