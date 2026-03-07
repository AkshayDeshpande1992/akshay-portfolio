export const runtime = "nodejs";

import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function GET() {
  return Response.json({
    message: "Groq import works"
  });
}