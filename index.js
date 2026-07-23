const express = require('express');
const { handleMessage } = require('./game');
const app = express();

app.use(express.json());

// صفحة الـ Webhook والسيرفر الأساسية (وهنا نستقبل إشعارات الماكرو)
app.get('/', (req, res) => {
    const notifTitle = req.query.title || "بدون عنوان";
    const notifText = req.query.text || "بدون نص";
    const notifApp = req.query.app || "تطبيق غير معروف";

    // هذا السطر هو الذي سيظهر في سجلات Render مع تفاصيل الإشعار
    console.log(`🔔 إشعار من [${notifApp}] | العنوان: ${notifTitle} | النص: ${notifText}`);
    
    res.send(`
        <html>
            <body style="background:#1a1a2e; color:#ffd700; text-align:center; padding-top:50px; font-family:sans-serif;">
                <h1>🤖 بوت Gem Space شغال</h1>
                <p style="color:#2ecc71;">السيرفر يعمل 24 ساعة وجاهز لاستقبال الأوامر بنجاح!</p>
            </body>
        </html>
    `);
});

app.post('/webhook', (req, res) => {
    const message = req.body.message || req.body.text || "";
    const sender = req.body.senderId || "user";
    
    const reply = handleMessage(message, sender);
    if (reply) {
        return res.json({ reply: reply });
    }
    
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
