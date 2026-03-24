export async function POST() {
  const response = Response.json({ ok: true });

  response.headers.append(
    'Set-Cookie',
    [
      'admin_session=',
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=0',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ')
  );

  return response;
}
