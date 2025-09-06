// File: test-api.js

// This line loads your API key from the .env.local file

const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is the main function that will run our test
async function runTest() {
  try {
    console.log("Starting API test...");
    
    // 1. Initialize the client with the API key
    const genAI = new GoogleGenerativeAI("AIzaSyCnAqQxqcOpSe_ctrF8IPpGKUlw5gbZSpE");
    console.log("AI Client Initialized.");

    // 2. Get the model (using the last version we tried)
    const model = genAI.getGenerativeModel({ model: "text-bison-001" });
    console.log("Model selected: text-bison-001");
    
    // 3. Define a simple prompt
    const prompt = "What is the formula for the area of a circle?";
    console.log("Sending prompt...");

    // 4. Call the AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 5. If it works, print the result
    console.log("✅ SUCCESS! AI Response:");
    console.log(text);

  } catch (error) {
    // 6. If it fails, print the full error
    console.error("❌ TEST FAILED. Full error object:");
    console.error(error);
  }
}

// Run the function
runTest();