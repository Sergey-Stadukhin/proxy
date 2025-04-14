import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method } = req;
  const baseUrl = 'http://89.111.155.239:8000';

  const query = url?.replace('/api/proxy', '') || '';
  const targetUrl = `${baseUrl}${query}`;

  try {
    // Выполнение запроса с добавленными заголовками CORS
    const apiRes = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Разрешение всех доменов
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Разрешенные HTTP методы
      },
    });

    // Обработка ответа от целевого API
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
