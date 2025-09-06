// File: src/app/api/solve/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { problem } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // We use the older model which is available in your region
  const model = genAI.getGenerativeModel({ model: "text-bison-001"});

  const prompt = `
    You are an expert Math Olympiad coach.
    A student has submitted the following problem:
    ---
    ${problem}
    ---
    Please provide a step-by-step solution based on pre-college mathematics.
  `;
  
  try {
    // THIS IS THE FIX: We go back to using generateContent, which works for all models.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ solution: text });

  } catch (error) {
    console.error("Full error object:", error);
    return Response.json({ solution: "Sorry, I encountered an error." }, { status: 500 });
  }
}