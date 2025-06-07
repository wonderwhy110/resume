const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// Разрешить CORS
app.use(cors());
app.use(express.json());

// ✅ Путь к корневой папке проекта
const rootDir = path.join(__dirname, '..');

// ✅ Статика из корня проекта (где index.html)
app.use(express.static(rootDir));

// ✅ Отдаём index.html при GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// ✅ Обработка отправки сообщения
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

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
