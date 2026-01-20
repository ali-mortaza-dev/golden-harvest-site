import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderInfo, items, totalAmount } = req.body;

        if (!items || !totalAmount) {
            return res.status(400).json({ error: 'Missing order details' });
        }

        const timestamp = new Date().toISOString();
        const orderData = {
            orderInfo,
            items,
            totalAmount,
            timestamp
        };

        // Store order in a list for the current day
        // Key format: orders:YYYY-MM-DD
        const dateKey = `orders:${timestamp.split('T')[0]}`;
        await kv.lpush(dateKey, JSON.stringify(orderData));

        return res.status(200).json({ success: true, message: 'Order recorded successfully' });
    } catch (error) {
        console.error('Error recording order:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
