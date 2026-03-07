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

    return Response.json({
      data: req},
      {status: 200}
    );

  } catch (error) {

    console.error("API error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}