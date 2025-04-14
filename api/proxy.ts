import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = 'http://89.111.155.239:8000';
  const queryPath = req.url?.replace('/api/proxy', '') || '';
  const targetUrl = `${baseUrl}${queryPath}`;

  try {
    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method || '') ? JSON.stringify(req.body) : undefined,
    });

    const contentType = apiRes.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    const buffer = await apiRes.arrayBuffer();
    res.status(apiRes.status).send(Buffer.from(buffer));
  } catch (error: any) {
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}