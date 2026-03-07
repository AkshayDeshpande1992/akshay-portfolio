import Groq from "groq-sdk";
import { portfolioContext } from "../src/mock.js";

function formatChatHistory(chatHistory) {
  return Array.isArray(chatHistory)
    ? chatHistory.filter(h => h.role && h.content).map(h => ({ role: h.role, content: h.content }))
    : [];
}

export default async function handler(req, res) {

  try {

    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are Akshay's portfolio assistant. Use this context for all answers: ${portfolioContext}`
        },
        ...formatChatHistory(chatHistory),
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    return res.status(200).json({ content: response.choices[0].message.content });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

}