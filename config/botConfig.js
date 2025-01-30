const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config(); // Load environment variables

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

module.exports = bot;
