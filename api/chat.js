export const runtime = "nodejs";

import Groq from "groq-sdk";
import mock from "../src/mock.js";

const portfolioContext = mock.portfolioContext || "";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {

    // Safely parse request body
    let body = {};
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const message = body?.message;

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

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
      data: "Call completed"
    });

  } catch (error) {

    console.error("API error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}