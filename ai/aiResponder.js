const { getAIResponse } = require("../config/aiConfig");
const { loadData } = require("../utils/jsonStorage");

const getMatchingFAQ = (query, faqData) => {
  const words = query.split(" ");

  for (const item of faqData) {
    const faqWords = item.question.toLowerCase().split(" ");
    const commonWords = words.filter((word) => faqWords.includes(word));

    if (commonWords.length >= 2) {
      return item.answer;
    }
  }

  return null;
};

const handleAIResponse = async (query) => {
  const faqData = loadData();

  // Check for FAQ match with 2+ words
  const faqAnswer = getMatchingFAQ(query, faqData);
  if (faqAnswer) return faqAnswer;

  // Get AI-generated response if no FAQ match
  // return await getAIResponse(query);
  return "Sorry! I'm still at development phase and new answers will be added";
};

module.exports = { handleAIResponse };
