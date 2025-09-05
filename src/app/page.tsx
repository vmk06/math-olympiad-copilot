// File: src/app/page.tsx
"use client"; 

// CHANGE #1: We need to import 'FormEvent' from React
import { useState, FormEvent } from 'react';

export default function HomePage() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // CHANGE #2: We add the type information to the 'event' parameter here
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setIsLoading(true); 
    setSolution(''); 

    const response = await fetch('/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ problem: problem }),
    });

    const data = await response.json();
    setSolution(data.solution); 
    setIsLoading(false); 
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
          value={problem} 
          onChange={(e) => setProblem(e.target.value)}
          className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="For example: 'Prove that for any prime p > 3, p^2 ≡ 1 (mod 24).'"
        ></textarea>
        
        <button 
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-500"
          disabled={isLoading || !problem}
        >
          {isLoading ? 'Thinking...' : 'Solve Problem'}
        </button>
      </form>

      {solution && (
        <div className="w-full max-w-2xl mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Solution:</h2>
          <div className="prose prose-invert max-w-none">
             <p style={{ whiteSpace: 'pre-wrap' }}>{solution}</p>
          </div>
        </div>
      )}
    </main>
  );
}