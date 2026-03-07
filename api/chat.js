import { groq } from "groq-sdk";
import mock from "../src/mock";

const portfolioContext = mock.portfolioContext || "";

const client = new groq({
  apiKey: process.env.GROQ_API_KEY
});

function formatChatHistory(chatHistory) {
  return Array.isArray(chatHistory)
    ? chatHistory.filter(h => h.role && h.content).map(h => ({ role: h.role, content: h.content }))
    : [];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, chatHistory } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Missing GROQ API key" });
  }
  if (!message) {
    return res.status(400).json({ error: "Missing user message" });
  }

  try {
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

    res.status(200).json({ content: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
}
