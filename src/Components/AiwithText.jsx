import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    console.log(import.meta.env.VITE_API_KEY);
    
    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `random meals related to ${search} category with images and prices`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center">
                <input
                    placeholder="Search Food with Category using Generative AI"
                    onChange={handleChangeSearch}
                    className="border rounded-lg p-2 bg-white shadow-md w-full md:w-auto"
                />
                <button
                    onClick={handleClick}
                    className="ml-4 mt-4 md:mt-0 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md"
                >
                    Search
                </button>
            </div>

            {loading && !aiResponse ? (
                <p className="mt-6 text-green-600 text-lg">Loading...</p>
            ) : (
                <p className="mt-6 text-gray-800 text-lg">{aiResponse}</p>
            )}
        </div>
    );
};

export default AiwithText;