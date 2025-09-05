// File: src/app/page.js
// We need to add this line at the top to tell Next.js this is a client component
"use client"; 

// We import two "hooks" from React: useState and useRef
import { useState } from 'react';

export default function HomePage() {
  // useState is used to manage the component's state.
  // We'll track the problem text, the solution, and the loading status.
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This function will be called when the button is clicked
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the page from reloading
    setIsLoading(true); // Show the loading message
    setSolution(''); // Clear any previous solution

    // This is the API call to our own backend
    const response = await fetch('/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ problem: problem }),
    });

    const data = await response.json();
    setSolution(data.solution); // Store the solution from the AI
    setIsLoading(false); // Hide the loading message
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Math Olympiad Co-Pilot</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <label htmlFor="problemInput" className="block text-lg font-medium mb-2">
          Enter your math problem:
        </label>
        <textarea
          id="problemInput"
          value={problem} // The value is now controlled by our state
          onChange={(e) => setProblem(e.target.value)} // Update the state when typing
          className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="For example: 'Prove that for any prime p > 3, p^2 ≡ 1 (mod 24).'"
        ></textarea>
        
        <button 
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-500"
          disabled={isLoading || !problem} // Disable button while loading or if input is empty
        >
          {isLoading ? 'Thinking...' : 'Solve Problem'}
        </button>
      </form>

      {/* This section will display the solution */}
      {solution && (
        <div className="w-full max-w-2xl mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Solution:</h2>
          {/* We use prose to get nice text formatting and whitespace */}
          <div className="prose prose-invert max-w-none">
             <p style={{ whiteSpace: 'pre-wrap' }}>{solution}</p>
          </div>
        </div>
      )}
    </main>
  );
}