/**
 * Vercel serverless: Telegram webhook handler.
 * Handles /start command — sends greeting with Mini App button.
 *
 * Setup:
 *   1. Add MINI_APP_URL to Vercel env (your deployment URL, e.g. https://your-app.vercel.app)
 *   2. Register webhook with Telegram once:
 *      curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-app.vercel.app/api/bot"
 *
 * Environment variables:
 *   TELEGRAM_BOT_TOKEN (or TELEGRAM_BOT_API) — bot token from @BotFather
 *   MINI_APP_URL — URL of the Mini App to open (your site URL)
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const token =
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.TELEGRAM_BOT_API;

  const miniAppUrl = process.env.MINI_APP_URL;

  if (!token) {
    return res.status(500).end();
  }

  let update = req.body;
  if (typeof update === 'string') {
    try { update = JSON.parse(update); } catch { return res.status(400).end(); }
  }

  const message = update?.message;
  if (!message) {
    // Not a message update (could be callback_query etc.) — acknowledge and ignore
    return res.status(200).json({ ok: true });
  }

  const text = message.text || '';
  const chatId = message.chat.id;

  if (text === '/start' || text.startsWith('/start ')) {
    const greeting =
      `✨ Добро пожаловать в L'Atelier!\n\n` +
      `Мы рады видеть вас. Здесь вы можете записаться на процедуры красоты, выбрать мастера и удобное время.`;

    const payload = {
      chat_id: chatId,
      text: greeting,
    };

    if (miniAppUrl) {
      payload.reply_markup = {
        inline_keyboard: [[
          {
            text: '💅 Открыть L\'Atelier',
            web_app: { url: miniAppUrl },
          },
        ]],
      };
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  return res.status(200).json({ ok: true });
};
