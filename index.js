const express = require('express');
const app = express();
const { handleGemSpaceMessage } = require('./game');

app.use(express.json());

// مسار استلام الرسائل (Webhook) للبوت الجديد
app.post('/webhook', (req, res) => {
    try {
        // استخراج النص المرسل من الرسالة
        const messageText = req.body.message || req.body.text || '';
        console.log("رسالة مستلمة:", messageText);
        
        // استدعاء دالة الألعاب والمعالجة من ملف game.js
        const responseMessage = handleGemSpaceMessage(messageText);
        
        // إرسال الرد التلقائي
        res.status(200).json({
            status: "success",
            reply: responseMessage
        });
    } catch (error) {
        console.error("خطأ في معالجة الرسالة:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// مسار رئيسي لعرض صفحة الباب المفتوح على Render
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
