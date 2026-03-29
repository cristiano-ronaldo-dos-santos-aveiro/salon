// No need to import fetch if using Node.js 18+ on Vercel
module.exports = async function handler(req, res) {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_API;
  const miniAppUrl = process.env.MINI_APP_URL;

  if (!token) {
    console.error("Missing TELEGRAM_BOT_TOKEN");
    return res.status(500).send('Bot token missing');
  }

  // 2. Vercel usually parses JSON automatically. 
  // If req.body is already an object, use it; otherwise, parse it.
  const update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  
  const message = update?.message;
  if (!message || !message.text) {
    return res.status(200).json({ ok: true });
  }

  const text = message.text;
  const chatId = message.chat.id;

  if (text.startsWith('/start')) {
    const greeting = `✨ Добро пожаловать в L'Atelier!\n\n` +
                     `Мы рады видеть вас. Здесь вы можете записаться на процедуры красоты, выбрать мастера и удобное время.`;

    const payload = {
      chat_id: chatId,
      text: greeting,
      reply_markup: miniAppUrl ? {
        inline_keyboard: [[
          {
            text: '💅 Открыть L\'Atelier',
            web_app: { url: miniAppUrl },
          },
        ]],
      } : undefined,
    };

    try {
      // 3. CRITICAL: You MUST await this call
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!result.ok) {
        console.error("Telegram API Error:", result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  // 4. Always respond to Telegram with 200 OK immediately
  return res.status(200).json({ ok: true });
};