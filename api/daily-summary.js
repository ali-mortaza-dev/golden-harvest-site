import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // Optional: check for a secret cron header/token to prevent unauthorized triggers
    // if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return res.status(401).end('Unauthorized');
    // }

    try {
        const BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || '8577666021:AAHO1vN5Je8CHC9aDgy5NtbfxxOgAh6ehzU';
        const CHAT_ID = '6378979397';

        // Get current date in YYYY-MM-DD format (UTC based, but we can adjust if needed)
        // For simplicity, we'll use the current UTC date.
        const today = new Date().toISOString().split('T')[0];
        const key = `orders:${today}`;

        // Fetch all orders for today
        const ordersRaw = await kv.lrange(key, 0, -1);

        if (!ordersRaw || ordersRaw.length === 0) {
            const emptyMessage = `<b>📊 Daily Sales Summary (${today})</b>\n\nNo orders were placed today. 🐝`;
            await sendTelegramMessage(BOT_TOKEN, CHAT_ID, emptyMessage);
            return res.status(200).json({ success: true, message: 'Summary sent (no orders)' });
        }

        const orders = ordersRaw.map(o => typeof o === 'string' ? JSON.parse(o) : o);

        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        // Consolidate product counts
        const productCounts = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
        });

        const productList = Object.entries(productCounts)
            .map(([name, qty]) => `• ${name} x ${qty}`)
            .join('\n');

        const formattedTotal = new Intl.NumberFormat('en-IN').format(totalSales) + '৳';

        const message = `<b>📊 Daily Sales Summary (${today})</b>\n\n` +
            `<b>🔢 Total Orders:</b> ${totalOrders}\n` +
            `<b>💰 Total Sales:</b> ${formattedTotal}\n\n` +
            `<b>📦 Products Sold:</b>\n${productList}\n\n` +
            `<i>Keep up the good work! 🍯🚀</i>`;

        await sendTelegramMessage(BOT_TOKEN, CHAT_ID, message);

        return res.status(200).json({ success: true, message: 'Summary sent successfully' });
    } catch (error) {
        console.error('Error generating daily summary:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function sendTelegramMessage(token, chatId, message) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`);
    }
}
