import Groq from "groq-sdk";
import { portfolioContext } from "../src/mock.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({ message: "API working" });
  }

  try {

    const { message } = req.body || {};

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
          content: `You are Akshay's portfolio assistant. Use this context: ${portfolioContext}`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return res.status(200).json({
      data: response.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

}