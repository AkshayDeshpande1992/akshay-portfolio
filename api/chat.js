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
  console.log("Incoming request:", req.body);
  console.log("GROQ_API_KEY present:", !!process.env.GROQ_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, chatHistory } = req.body;

  if (!process.env.GROQ_API_KEY) {
    console.error("Missing GROQ_API_KEY");
    return res.status(500).json({ error: "Missing GROQ API key" });
  }
  if (!message) {
    console.error("Missing user message");
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

    console.log("Groq API response:", response);
    res.status(200).json({ content: response.choices[0].message.content });
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
}
