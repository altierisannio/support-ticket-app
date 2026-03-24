import { SignJWT, jwtVerify } from 'jose';

const rawSecret = process.env.ADMIN_SESSION_SECRET;

if (!rawSecret) {
  throw new Error('ADMIN_SESSION_SECRET non definita');
}

const secret = new TextEncoder().encode(rawSecret);

export type AdminSessionPayload = {
  role: 'admin';
  email: string;
};

export async function createAdminSession(email: string) {
  return await new SignJWT({
    role: 'admin',
    email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}
