// File: src/app/api/solve/route.js
import OpenAI from 'openai';

// Initialize the OpenAI client with your API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  // Get the user's problem from the request body
  const { problem } = await req.json();

  try {
    // This is the call to the OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      // We use gpt-3.5-turbo as it's fast and cost-effective
      model: 'gpt-3.5-turbo', 
      messages: [
        // This is the "system prompt" that instructs the AI on its role
        { 
          role: 'system', 
          content: 'You are an expert Math Olympiad coach specializing in preparing students for IOQM and IMO. Provide clear, step-by-step solutions based on pre-college mathematics. Explain your reasoning for each step.' 
        },
        // This is the user's actual problem
        { 
          role: 'user', 
          content: problem 
        },
      ],
    });

    // Extract the AI's response text
    const solutionText = chatCompletion.choices[0].message.content;

    // Send the response back to the frontend
    return Response.json({ solution: solutionText });

  } catch (error) {
    console.error("Full OpenAI error object:", error);
    return Response.json({ solution: "Sorry, I encountered an error with the OpenAI API." }, { status: 500 });
  }
}