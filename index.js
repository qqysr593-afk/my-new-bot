const express = require('express');
const app = express();

app.use(express.json());

const TOKEN = '8090547963:AAGYnFz4M-WjFv82x3u67v_Lh_0s7Q8c3Wk';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

let userMoney = 5000;

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text.trim();
        let reply = "";

        if (text === "الالعاب" || text === "اوامر" || text === "/start") {
            reply = "🎮 *قائمة الألعاب والأوامر*\n" +
                    "--------------------\n" +
                    "▫️ سمايلات • اسئلة • عواصم\n" +
                    "▫️ رياضيات • انخليزي • عربي\n" +
                    "▫️ تفكيك • حروف • دين • اكمل\n" +
                    "▫️ اعلام • اسرع • صراحه • لو • تك\n" +
                    "--------------------\n" +
                    "🎵 *اليوتيوب*\n" +
                    "▫️ يوت [اسم الاغنية]\n" +
                    "--------------------\n" +
                    "🤖 *الذكاء الاصطناعي*\n" +
                    "▫️ بوت [سؤالك]\n" +
                    "--------------------\n" +
                    "💰 *البنـك*\n" +
                    "▫️ فلوسي • راتب";
        } 
        else if (text === "اسئلة") {
            const questions = [
                "س\nكيف الجو عندك اليوم ؟",
                "س\nشخص اذا جان بلطلعة تتونس بوجود؟",
                "س\nكلمة توجهها لوالدك ؟",
                "س\nهل تشعر أن هنالك مَن يُحبك؟",
                "س\nتعطي فرصة ثانية للشخص الي كسرك ؟"
            ];
            reply = questions[Math.floor(Math.random() * questions.length)];
        } 
        else if (text === "فلوسي") {
            reply = `💰 رصيدك الحالي: ${userMoney} نقطة`;
        }
        else if (text === "راتب") {
            userMoney += 1000;
            reply = `🎁 تم إضافة الراتب بنجاح! رصيدك أصبح: ${userMoney}`;
        }
        else {
            reply = "أهلاً بك! اكتب 'الالعاب' لعرض قائمة الأوامر المتاحة.";
        }

        try {
            await fetch(`${TELEGRAM_API}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: reply,
                    parse_mode: "Markdown"
                })
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send("Bot Server is Running Successfully!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
