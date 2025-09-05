// File: src/app/api/solve/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  // Get the user's problem from the request body
  const { problem } = await req.json();

  // Get the API key from environment variables
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

  // This is our carefully crafted prompt
  const prompt = `
    You are an expert Math Olympiad coach specializing in preparing middle school and high school students for the IOQM and IMO.
    A student has submitted the following problem:
    ---
    ${problem}
    ---
    Please provide a solution with the following constraints:
    1. Think step-by-step, explaining your reasoning clearly.
    2. Do not use any mathematics beyond the pre-college level (no calculus or advanced linear algebra).
    3. Clearly state any key theorems or principles used (e.g., "Using the Pigeonhole Principle...").
    4. Format the final output cleanly. Use line breaks for new thoughts or steps.
    5. Explain the 'why' behind each step, as if you are teaching a bright student.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the AI's response back to the frontend
    return Response.json({ solution: text });

  } catch (error) {
    console.error(error);
    return Response.json({ solution: "Sorry, I encountered an error." }, { status: 500 });
  }
}