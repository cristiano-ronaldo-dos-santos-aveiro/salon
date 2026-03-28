/**
 * Vercel serverless: forwards booking to Telegram Bot API.
 * Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel Project → Environment Variables
 * (or .env locally with `vercel dev`).
 */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      ok: false,
      error: 'Server is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  const { name, phone, service, master, time } = body || {};
  if (!name || !phone || !service || !master || !time) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const text =
    `🚀 Новая запись!\n` +
    `👤 Клиент: ${name}\n` +
    `📞 Тел: ${phone}\n` +
    `💇‍♀️ Услуга: ${service}\n` +
    `👩‍🎨 Мастер: ${master}\n` +
    `📅 Время: ${time}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const data = await tgRes.json().catch(() => ({}));

    if (!tgRes.ok || !data.ok) {
      return res.status(502).json({
        ok: false,
        error: data.description || 'Telegram API error',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'Request failed' });
  }
};
