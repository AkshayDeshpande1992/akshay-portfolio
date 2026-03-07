import { groq } from "groq-sdk";
import mock from "../src/mock";

const portfolioContext = mock.portfolioContext || "";
const client = new groq({ apiKey: process.env.GROQ_API_KEY });

function formatChatHistory(chatHistory) {
  return Array.isArray(chatHistory)
    ? chatHistory.filter(h => h.role && h.content).map(h => ({ role: h.role, content: h.content }))
    : [];
}

export async function GET() {
  return Response.json({ success: true, data: "Portfolio API is live!" }, { status: 200 });
}

export async function POST(request) {
  try {
    const { message, chatHistory } = await request.json();
    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: "Missing GROQ API key" }, { status: 500 });
    }
    if (!message) {
      return Response.json({ error: "Missing user message" }, { status: 400 });
    }
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
    return Response.json({ content: response.choices[0].message.content }, { status: 200 });
  } catch (error) {
    console.log("Groq API error:", error);
    return Response.json({ error: error.response?.data?.error?.message || error.message }, { status: 500 });
  }
}
