export const runtime = "nodejs";

import Groq from "groq-sdk";
import mock from "../src/mock.js";

const portfolioContext = mock.portfolioContext || "";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {

  const { message } = await req.json();

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are Akshay's portfolio assistant. Use this context: ${portfolioContext}`
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return Response.json({
    data: response.choices[0].message.content
  });

}