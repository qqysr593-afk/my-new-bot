const express = require('express');
const app = express();
const { handleGemSpaceMessage } = require('./game.js');

app.use(express.json());

app.post('/webhook', (req, res) => {
    try {
        const messageText = req.body.message || req.body.text || '';
        console.log("رسالة مستلمة:", messageText);
        
        const responseMessage = handleGemSpaceMessage({ text: messageText });
        
        res.status(200).json({
            status: "success",
            reply: responseMessage
        });
    } catch (error) {
        console.error("خطأ في معالجة الرسالة:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// استدعاء ملف المعالجة (تأكد من صحة مسار الملف لديك)
const { handleGemSpaceMessage } = require('./handler'); // أو اسم ملفك

app.use(express.json());

app.post('/webhook', (req, res) => {
    try {
        const messageText = req.body.message;
        console.log("رسالة مستلمة:", messageText);

        const responseMessage = handleGemSpaceMessage(messageText);

        res.status(200).json({
            status: "success",
            reply: responseMessage
        });
    } catch (error) {
        console.error("خطأ في معالجة الرسالة:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// هذا السطر مهم جداً لكي يبقى السيرفر شغالاً على Render
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
