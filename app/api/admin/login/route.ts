import { createAdminSession } from '@/lib/admin-session';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    if (
      data.email !== process.env.ADMIN_EMAIL ||
      data.password !== process.env.ADMIN_PASSWORD
    ) {
      return Response.json(
        { error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    const token = await createAdminSession(data.email);
    const response = Response.json({ ok: true });

    response.headers.append(
      'Set-Cookie',
      [
        `admin_session=${token}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        'Max-Age=604800',
        process.env.NODE_ENV === 'production' ? 'Secure' : '',
      ]
        .filter(Boolean)
        .join('; ')
    );

    return response;
  } catch {
    return Response.json({ error: 'Dati non validi' }, { status: 400 });
  }
}
