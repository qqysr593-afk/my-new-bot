const express = require('express');
const { handleGemSpaceMessage } = require('./game');
const app = express();

app.use(express.json());

// استقبال إشعار Gem Space عبر الماكرو ومعالجته
app.get('/', (req, res) => {
    const notifText = req.query.text || "";
    
    // معالجة النص وإرجاع الرد كـ نص صافي للماكرو
    const botReply = handleGemSpaceMessage(notifText);
    
    console.log(`📩 النص الوارد: ${notifText} | 🤖 الرد: ${botReply}`);
    
    // إرسال النص الصافي فقط لكي يستلمه الماكرو بسهولة
    res.send(botReply);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
