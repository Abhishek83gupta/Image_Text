import React, { useState } from 'react';
import AiwithText from '../Components/AiwithText';
import AiwithImage from '../Components/AiwithImage';

const Home = () => {
  const [aiWith, setLAiWith] = useState('text');

  const handleAiWith = (value) => {
    setLAiWith(value);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Generative AI </h1>
      <p className="text-gray-600 text-lg mb-6">Built with ❤️ using ReactJS + Google Gemini</p>

      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => handleAiWith('text')}
          className={`px-6 py-3 rounded-lg font-semibold ${aiWith === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          AI with Text
        </button>

        <button
          onClick={() => handleAiWith('image')}
          className={`px-6 py-3 rounded-lg font-semibold ${aiWith === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          AI with Image
        </button>
      </div>

      <div className="w-full flex justify-center">
        {aiWith === 'text' ? (
          <AiwithText />
        ) : (
          <AiwithImage />
        )}
      </div>
    </div>
  );
};

export default Home;
