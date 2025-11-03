import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash slaptažodžio funkcija
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Patikrina ar slaptažodis atitinka hash
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT token generavimas
export function generateToken(username: string): string {
  const secret = process.env.SESSION_SECRET || 'your-secret-key';
  return jwt.sign({ username }, secret, { expiresIn: '24h' });
}

// JWT token verifikacija
export function verifyToken(token: string): { username: string } | null {
  try {
    const secret = process.env.SESSION_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as { username: string };
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

