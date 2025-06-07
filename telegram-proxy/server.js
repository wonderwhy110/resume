const express = require('express');
require('dotenv').config(); // Подключаем .env сразу в начале
// const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
const PORT = 3000;

// подтягиваем из .env
const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('/send-message', cors(corsOptions)); // preflight

app.post('/send-message', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const telegramMessage = `
📧 Новое сообщение с сайта:

📌 Тема: ${subject}
👤 Имя: ${name}
📱 Телефон: ${phone}
✉️ Email: ${email}

💬 Сообщение:
${message}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: telegramMessage
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error?.response?.data || error);
    res.status(500).json({ success: false });
  }
});
console.log('BOT_TOKEN из .env:', botToken);
console.log('CHAT_ID из .env:', chatId);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${PORT}`);
});
