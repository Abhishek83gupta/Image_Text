import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY); // Ensure correct API key

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Function to run the Generative AI model with the image
     */
    async function aiImageRun() {
        if (!imageInlineData) {
            setResponse("Please upload an image.");
            return;
        }
        try {
            setLoading(true);
            setResponse('');

            // Requesting AI to generate content based on the uploaded image
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent([
                "What's in this photo?", imageInlineData
            ]);

            // Wait for the response and extract the result
            const response = await result.response;
            const text = await response.text();

            setResponse(text);
        } catch (error) {
            console.error('Error during AI image generation:', error);
            setResponse("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handle Image Upload
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert the uploaded file to Base64 format and update states
            getBase64(file)
                .then((result) => {
                    setImage(result); // Display the image in the UI
                })
                .catch((e) => console.error('Error converting to Base64:', e));

            // Convert the file to an inline data format for the Generative AI
            fileToGenerativePart(file).then((imageData) => {
                setImageInlineData(imageData);
            });
        }
    };

    /**
     * Helper function to convert file to Base64
     */
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file); // Convert file to Base64 string
        });
    }

    /**
     * Converts file to the format required by Google Generative AI (inlineData)
     */
    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Only get the base64 part
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center">
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="border rounded-lg p-2 bg-white shadow-md"
                />
                <button
                    onClick={aiImageRun}
                    className="ml-4 mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
                >
                    Search
                </button>
            </div>

            {image && (
                <img
                    src={image}
                    alt="Uploaded"
                    className="w-1/3 mt-6 rounded-lg shadow-lg"
                />
            )}

            {loading && !aiResponse ? (
                <p className="mt-6 text-blue-600 text-lg">Loading...</p>
            ) : (
                <p className="mt-6 text-gray-800 text-lg">{aiResponse}</p>
            )}
        </div>
    );
};

export default AiwithImage;
