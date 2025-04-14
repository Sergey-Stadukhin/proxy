import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method } = req;
  const baseUrl = 'http://89.111.155.239:8000';

  const query = url?.replace('/api/proxy', '') || '';
  const targetUrl = `${baseUrl}${query}`;

  try {
    const apiRes = await fetch(targetUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
