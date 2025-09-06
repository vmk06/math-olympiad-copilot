// File: src/app/api/solve/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { problem } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // *** CHANGE #1: We are now requesting the older PaLM 2 model ***
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
    // *** CHANGE #2: The function to call for this model is generateText ***
    const result = await model.generateText(prompt);
    
    // The result format is simpler for this model
    const solutionText = result;

    return Response.json({ solution: solutionText });

  } catch (error) {
    // We are logging the full error to the server console for debugging
    console.error("Full error object:", error);
    return Response.json({ solution: "Sorry, I encountered an error." }, { status: 500 });
  }
}