const express = require('express');
const app = express();

app.use(express.json());

const TOKEN = '8651291872:AAEvZVtnVCWpyczMMSIM-tYWHkX_jZAli3M';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

let userMoney = 5000;

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const fullText = update.message.text.trim();
        const args = fullText.split(' ');
        const cmd = args[0];
        const query = args.slice(1).join(' ');
        let reply = "";

        if (cmd === "الالعاب" || cmd === "اوامر" || cmd === "/start") {
            reply = "🎮 *قائمة الألعاب والأوامر المتاحة*\n" +
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
        else if (cmd === "اسئلة") {
            const questions = [
                "س\nكيف الجو عندك اليوم ؟",
                "س\nشخص اذا جان بلطلعة تتونس بوجود؟",
                "س\nكلمة توجهها لوالدك ؟",
                "س\nهل تشعر أن هنالك مَن يُحبك؟",
                "س\nتعطي فرصة ثانية للشخص الي كسرك ؟"
            ];
            reply = questions[Math.floor(Math.random() * questions.length)];
        }
        else if (cmd === "سمايلات") {
            const smiles = ["😀", "😎", "🔥", "❤️", "🌹", "👑", "⚡", "💎"];
            reply = "🎲 لغز السمايلات:\nما هو شعور هذا السمايل؟ " + smiles[Math.floor(Math.random() * smiles.length)];
        }
        else if (cmd === "عواصم") {
            const capitals = [
                "ما هي عاصمة العراق؟ 🇮🇶",
                "ما هي عاصمة مصر؟ 🇪🇬",
                "ما هي عاصمة السعودية؟ 🇸🇦",
                "ما هي عاصمة الإمارات؟ 🇦🇪"
            ];
            reply = capitals[Math.floor(Math.random() * capitals.length)];
        }
        else if (cmd === "رياضيات") {
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 1;
            reply = `🧮 حل المسألة الرياضية:\nكم الناتج؟ ${n1} + ${n2} = ?`;
        }
        else if (cmd === "يوت") {
            if (!query) {
                reply = "🎵 يرجى كتابة اسم الأغنية بعد الأمر، مثل:\n`يوت مريت`";
            } else {
                reply = `🎵 جاري البحث عن أغنية: (${query})\n🔗 رابط البحث المقترح:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            }
        }
        else if (cmd === "بوت") {
            if (!query) {
                reply = "🤖 تفضل، اسألني بشيء بعد كلمة بوت، مثل:\n`بوت من هو العباس؟`";
            } else {
                reply = `🤖 أهلاً بك! لقد سألت: (${query})\n💡 جارٍ معالجة سؤالك... السيرفر يعمل بتمكن تام!`;
            }
        }
        else if (cmd === "فلوسي") {
            reply = `💰 رصيدك الحالي: ${userMoney} نقطة`;
        }
        else if (cmd === "راتب") {
            userMoney += 1000;
            reply = `🎁 تم إضافة الراتب بنجاح! رصيدك أصبح: ${userMoney} نقطة`;
        }
        else {
            reply = "❌ الأمر غير موجود. اكتب 'الالعاب' لعرض قائمة الأوامر المتاحة.";
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
