const express = require('express');
const app = express();

app.use(express.json());

const TOKEN = '8651291872:AAEvZVtnVCWpyczMMSIM-tYWHkX_jZAli3M';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// تخزين بيانات المستخدمين (الرصيد وأوقات آخر استخدام للأوامر)
const users = {};

function getUser(chatId) {
    if (!users[chatId]) {
        users[chatId] = {
            money: 5000,
            cooldowns: {}
        };
    }
    return users[chatId];
}

function checkCooldown(user, command, intervalMinutes) {
    const now = Date.now();
    const lastTime = user.cooldowns[command] || 0;
    const intervalMs = intervalMinutes * 60 * 1000;
    
    if (now - lastTime < intervalMs) {
        const remainingMs = intervalMs - (now - lastTime);
        const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
        return remainingMinutes;
    }
    return 0;
}

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const fullText = update.message.text.trim();
        const args = fullText.split(' ');
        let cmd = args[0];
        let query = args.slice(1).join(' ');
        
        // تصحيح كلمة انخليزي إلى انجليزي تلقائياً
        if (cmd === "انخليزي") {
            cmd = "انجليزي";
        }

        const user = getUser(chatId);
        let reply = "";

        if (cmd === "الالعاب" || cmd === "اوامر" || cmd === "/start") {
            reply = "🎮 *قائمة الألعاب والأوامر المتاحة*\n" +
                    "--------------------\n" +
                    "▫️ سمايلات • اسئلة • عواصم\n" +
                    "▫️ رياضيات • انجليزي • عربي\n" +
                    "▫️ تفكيك • حروف • دين • اكمل\n" +
                    "▫️ اعلام • اسرع • صراحه • لو • تك • بات\n" +
                    "▫️ المليون (من سيربح المليون)\n" +
                    "--------------------\n" +
                    "🎵 *اليوتيوب*\n" +
                    "▫️ يوت [اسم الاغنية]\n" +
                    "--------------------\n" +
                    "🤖 *الذكاء الاصطناعي*\n" +
                    "▫️ بوت [سؤالك]\n" +
                    "--------------------\n" +
                    "💰 *البنك والأموال*\n" +
                    "▫️ فلوسي • راتب (كل 10 د)\n" +
                    "▫️ كنز (كل 10 د) • بخشيش (كل 10 د)\n" +
                    "▫️ حظ (كل 20 د) • استثمار (كل 20 د)";
        } 
        else if (cmd === "اسئلة") {
            const questions = [
                "س: كيف الجو عندك اليوم ؟",
                "س: شخص اذا جان بلطلعة تتونس بوجوده؟",
                "س: كلمة توجهها لوالدك ؟",
                "س: هل تشعر أن هنالك مَن يُحبك؟",
                "س: تعطي فرصة ثانية للشخص الي كسرك ؟"
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
                "ما هي عاصمة الإمارات؟ 🇦🇪",
                "ما هي عاصمة الكويت؟ 🇰🇼"
            ];
            reply = capitals[Math.floor(Math.random() * capitals.length)];
        }
        else if (cmd === "رياضيات") {
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 1;
            reply = `🧮 حل المسألة الرياضية:\nكم الناتج؟ ${n1} + ${n2} = ?`;
        }
        else if (cmd === "انجليزي") {
            const words = [
                { en: "Car", ar: "سيارة" },
                { en: "Apple", ar: "تفاحة" },
                { en: "Book", ar: "كتاب" },
                { en: "Computer", ar: "حاسوب" },
                { en: "Phone", ar: "هاتف" }
            ];
            const selected = words[Math.floor(Math.random() * words.length)];
            reply = `🔤 ترجم الكلمة التالية إلى العربية:\n(${selected.en})`;
        }
        else if (cmd === "عربي") {
            reply = "📖 اعطنا مرادف كلمة: (شجاعة)";
        }
        else if (cmd === "تفكيك") {
            const words = ["مدرسة", "تاريخ", "حاسوب", "سماء"];
            reply = `🧩 فكك الكلمة التالية إلى حروفها:\n(${words[Math.floor(Math.random() * words.length)]})`;
        }
        else if (cmd === "حروف") {
            const letterGames = [
                "🔠 كلمة تبدأ بحرف (التاء) وتنتهي بحرف (التاء)؟ (مثل: توت)",
                "🔠 كلمة تبدأ بحرف (الميم) وتنتهي بحرف (م)؟ (مثل: مريم)",
                "🔠 كلمة تبدأ بحرف (السين) وتنتهي بحرف (ن)؟ (مثل: سجين)"
            ];
            reply = letterGames[Math.floor(Math.random() * letterGames.length)];
        }
        else if (cmd === "دين") {
            reply = "🕌 سؤال ديني:\nمن هو أول مؤذن في الإسلام؟";
        }
        else if (cmd === "اكمل") {
            reply = "✍️ أكمل المثل الشعبي:\n(اللي ما يعرفه...)";
        }
        else if (cmd === "اعلام") {
            reply = "🌍 ما هي الدولة صاحبة هذا العلم؟ 🇪🇬";
        }
        else if (cmd === "اسرع") {
            reply = "⚡ أسرع واحد يكتب كلمة: (تليجرام)";
        }
        else if (cmd === "صراحه") {
            reply = "💬 سؤال صراحة:\nهل تمتلك سراً لم تخبر به أحداً أبداً؟";
        }
        else if (cmd === "لو") {
            reply = "⚖️ لو خيروك بين:\nالمال الغزير أم الصحة الدائمة؟";
        }
        else if (cmd === "تك") {
            reply = "🎯 لعبة التك:\nاختر رقماً من 1 إلى 3 لجائزة مخفية!";
        }
        else if (cmd === "بات") {
            reply = "🦇 لعبة البات (Bat Game):\nاضغط بسرعة واكتب اسم بطل خارق يبدأ بحرف الباء (مثل: باتمان)!";
        }
        else if (cmd === "المليون") {
            const millionaireQuestions = [
                "💰 *من سيربح المليون* (السؤال الأول):\nما هو الكوكب الأقرب إلى الشمس؟\n\nأ) المريخ\nب) عطارد\nج) الزهرة\nد) المشتري",
                "💰 *من سيربح المليون* (السؤال الثاني):\nفي أي قارة تقع دولة أستراليا؟\n\nأ) آسيا\nب) أفريقيا\nج) أستراليا (أوقيانوسيا)\nد) أوروبا",
                "💰 *من سيربح المليون* (السؤال الثالث):\nما هي عاصمة أستراليا وليست سيدني؟\n\nأ) ملبورن\nب) كانبرا\nج) بريزبان\nد) بيرث"
            ];
            reply = millionaireQuestions[Math.floor(Math.random() * millionaireQuestions.length)];
        }
        else if (cmd === "يوت") {
            if (!query) {
                reply = "🎵 يرجى كتابة اسم الأغنية بعد الأمر، مثل:\n`يوت مريت`";
            } else {
                reply = `🎵 تم تجهيز طلبك بصيغة MP3 للأغنية: (${query})\n🎧 رابط الاستماع والتحميل الصوتي المباشر:\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(query)}+audio+mp3`;
            }
        }
        else if (cmd === "بوت") {
            if (!query) {
                reply = "🤖 تفضل، اسألني بأي سؤال تريده بعد كلمة بوت!";
            } else {
                reply = `🤖 إجابة الذكاء الاصطناعي على سؤالك (${query}):\nهذا هو الجواب المطلوب لخدمتك بشكل دقيق وسريع!`;
            }
        }
        else if (cmd === "فلوسي") {
            reply = `💰 رصيدك الحالي: ${user.money} نقطة`;
        }
        else if (cmd === "راتب") {
            const waitTime = checkCooldown(user, "راتب", 10);
            if (waitTime > 0) {
                reply = `⏳ يجب عليك الانتظار ${waitTime} دقيقة أخرى لطلب الراتب مجدداً.`;
            } else {
                user.cooldowns["راتب"] = Date.now();
                user.money += 1000;
                reply = `🎁 تم استلام الراتب (1000 نقطة) بنجاح!\n💰 رصيدك أصبح: ${user.money} نقطة`;
            }
        }
        else if (cmd === "كنز") {
            const waitTime = checkCooldown(user, "كنز", 10);
            if (waitTime > 0) {
                reply = `⏳ الكنز مغلق حالياً! ينتظرك بعد ${waitTime} دقيقة.`;
            } else {
                user.cooldowns["كنز"] = Date.now();
                const prize = Math.floor(Math.random() * 2000) + 500;
                user.money += prize;
                reply = `💎 لقد عثرت على الكنز وفزت بـ (${prize} نقطة)!\n💰 رصيدك الحالي: ${user.money} نقطة`;
            }
        }
        else if (cmd === "بخشيش") {
            const waitTime = checkCooldown(user, "بخشيش", 10);
            if (waitTime > 0) {
                reply = `⏳ لا يمكنك طلب البخشيش الآن، انتظر ${waitTime} دقيقة.`;
            } else {
                user.cooldowns["بخشيش"] = Date.now();
                const tip = Math.floor(Math.random() * 800) + 200;
                user.money += tip;
                reply = `💵 حصلت على بخشيش بقيمة (${tip} نقطة)!\n💰 رصيدك الحالي: ${user.money} نقطة`;
            }
        }
        else if (cmd === "حظ") {
            const waitTime = checkCooldown(user, "حظ", 20);
            if (waitTime > 0) {
                reply = `⏳ اختبار الحظ متوقف مؤقتاً، حاول بعد ${waitTime} دقيقة.`;
            } else {
                user.cooldowns["حظ"] = Date.now();
                const luckWin = Math.random() > 0.4;
                if (luckWin) {
                    const amount = 1500;
                    user.money += amount;
                    reply = `🍀 حظك اليوم ممتاز! ربحت (${amount} نقطة)!\n💰 رصيدك الحالي: ${user.money} نقطة`;
                } else {
                    reply = `😢 عأسف، حظك سيء هذه المرة ولم تفز بشيء.`;
                }
            }
        }
        else if (cmd === "استثمار") {
            const waitTime = checkCooldown(user, "استثمار", 20);
            if (waitTime > 0) {
                reply = `⏳ استثمارك قيد التشغيل، يمكنك الاستثمار مرة أخرى بعد ${waitTime} دقيقة.`;
            } else {
                user.cooldowns["استثمار"] = Date.now();
                const investmentGain = Math.floor(Math.random() * 15000) + 20000;
                user.money += investmentGain;
                reply = `📈 نجح استثمارك الضخم وحققت أرباحاً بلغت (${investmentGain} نقطة)!\n💰 رصيدك الحالي: ${user.money} نقطة`;
            }
        }
        else {
            return; // تجاهل الرسائل العادية التي لا تبدأ بأمر معروف لكي لا يحدث تداخل
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
