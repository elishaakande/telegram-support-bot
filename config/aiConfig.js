const { HfInference } = require("@huggingface/inference");
require("dotenv").config();
const hf = new HfInference(process.env.HUGGINGFACE_ACCESS_TOKEN);

const getAIResponse = async (query) => {
  try {
    // const response = await hf.textGeneration({
    //   model: "google/flan-t5-large",
    //   inputs: query,
    //   provider: "hf-inference",
    // });

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      provider: "together",
      max_tokens: 500,
    });
    console.log(response);

    return (
      response.choices[0].message.content ||
      "I'm not sure how to respond to that. Can you rephrase?"
    );
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return "Oops! I ran into an issue processing your request. Try again later.";
  }
};

module.exports = { getAIResponse };
