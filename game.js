const gamesList = `
🎮 قائمة الألعاب
----------------
◇ سمايلات • عواصم • بات • مليون
----------------
💰 البنك
◇ فلوسي
◇ راتب
◇ كنز
◇ استثمار [مبلغ]
◇ حظ [مبلغ]
----------------
🎵 اليوتيوب
◇ يوت [اسم الأغنية]
`;

function handleGemSpaceMessage(senderMessage) {
    if (!senderMessage) {
        return "أهلاً بك 👋 اكتب (الالعاب) لعرض القائمة.";
    }

    const msg = senderMessage.trim();

    if (msg === "الالعاب" || msg === "العاب" || msg === "قائمة الألعاب") {
        return gamesList;
    }

    if (msg === "فلوسي") {
        return "💰 رصيدك الحالي: 100000 دينار.";
    }

    if (msg === "راتب") {
        return "💵 استلمت راتبك: +5000 دينار.";
    }

    if (msg === "كنز") {
        return "💎 وجدت كنزاً وربحت 8000 دينار.";
    }

    if (msg.startsWith("استثمار")) {
        return "📈 تم تسجيل استثمارك بنجاح.";
    }

    if (msg.startsWith("حظ")) {
        return Math.random() < 0.5
            ? "🎉 مبروك ربحت!"
            : "😢 خسرت هذه المرة.";
    }

    if (msg === "عواصم") {
        return "🌍 ما هي عاصمة العراق؟";
    }

    if (msg === "سمايلات") {
        return "😀🍎🐍 خمن الكلمة.";
    }

    if (msg === "بات") {
        return "🥊 اكتب اسم الشخص الذي تريد مقاتلته.";
    }

    if (msg === "مليون") {
        return "🏆 السؤال الأول:\nما هي عاصمة أستراليا؟\nأ) سيدني\nب) ملبورن\nج) كانبرا\nد) بريزبان";
    }

    if (msg.startsWith("يوت ")) {
        const query = msg.substring(4).trim();
        return `🔎 https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    }

    return "🤖 الأمر غير معروف. اكتب (الالعاب) لعرض جميع الأوامر.";
}

module.exports = { handleGemSpaceMessage };
