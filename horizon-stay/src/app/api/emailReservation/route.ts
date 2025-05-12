import { notifyClient } from '@/controllers/emailController';

export async function POST(req: Request) {
  const data = await req.json();
  await notifyClient(data);

  return new Response(JSON.stringify({ ok: true }));
}
