const { handleAIResponse } = require("./ai/aiResponder");
const bot = require("./config/botConfig");
const { BOT_USERNAME } = require("./config/botInfo");

const GREETINGS = ["hi", "hello", "hey", "good morning", "good evening"];
const TRIGGER_KEYWORDS = [
  "support",
  "help",
  "issue",
  "problem",
  "question",
  "name",
  "password",
  "who are you",
  "what do you do",
  "how to",
  "where can I",
  "guide for",
];

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text ? msg.text.toLowerCase() : "";
  const replyToMessage = msg.reply_to_message;
  const username = msg.from?.username
    ? `@${msg.from.username}`
    : `[User](tg://user?id=${msg.from?.id})`;

  // If the bot is being replied to, respond and tag the user
  if (replyToMessage && replyToMessage.from?.username === BOT_USERNAME) {
    const response = await handleAIResponse(text);
    bot.sendMessage(chatId, `${username}, ${response}`, {
      reply_to_message_id: msg.message_id,
      parse_mode: "Markdown",
    });
    return;
  }

  // Friendly greetings
  if (GREETINGS.includes(text)) {
    bot.sendMessage(chatId, `Hey there! 👋 How can I assist you today? 😊`, {
      reply_to_message_id: msg.message_id,
      parse_mode: "Markdown",
    });
    return;
  }

  // Respond only to relevant queries
  if (TRIGGER_KEYWORDS.some((word) => text.includes(word))) {
    const response = await handleAIResponse(text);
    bot.sendMessage(chatId, ` ${response}`, {
      reply_to_message_id: msg.message_id,
      parse_mode: "Markdown",
    });
  }
});
