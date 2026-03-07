export const runtime = "nodejs";

import Groq from "groq-sdk";
import mock from "../src/mock.js";

const portfolioContext = mock.portfolioContext || "";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {

     return Response.json({
      message: "POST works"
    });

  } catch (error) {

    console.error("API error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}