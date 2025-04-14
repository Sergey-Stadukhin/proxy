import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { value, attribute, page, size } = req.query;

  const url = `http://89.111.155.239:8000/search?value=${value}&attribute=${attribute}&page=${page}&size=${size}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Proxy error' });
  }
}
