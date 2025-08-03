// src/middleware/errorHandler.js
import logger from '../utils/logger.js';
// import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const sendToTelegram = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    logger.warn('⚠️ Telegram token или chat_id не заданы.');
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🚨 *Серверная ошибка*\n\n${message}`,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`❌ Telegram API error: ${response.status} - ${errorText}`);
    }
  } catch (err) {
    logger.error('❌ Ошибка при отправке в Telegram: ' + err.message);
  }
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMsg = `[${req.method}] ${req.originalUrl} - ${statusCode} - ${err.message}`;

  logger.error(errorMsg);

  if (statusCode >= 500) {
    sendToTelegram(`${errorMsg}\n\nStack:\n${err.stack}`);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
