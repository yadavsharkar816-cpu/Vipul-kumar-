import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const QuizModal = ({ onClose, onComplete }: { onClose: () => void; onComplete: (success: boolean) => void; }) => {
    const [question, setQuestion] = useState<QuizQuestion | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    
    const fetchQuizQuestion = useCallback(async () => {
        setLoading(true);
        setError(null);
        setFeedback(null);
        setSelectedAnswer(null);

        if (!process.env.API_KEY) {
            setError("API key is not configured.");
            setLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Generate a single, fun, general knowledge multiple-choice question with four options. One option must be correct.",
                config: {
                    responseMimeType: "application/json",
                    // FIX: Added descriptions to the response schema to provide more context to the model, improving response quality.
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "The text of the quiz question." },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "An array of four possible answers for the question."
                            },
                            correctAnswer: { type: Type.STRING, description: "The correct answer from the 'options' array." }
                        },
                        required: ["question", "options", "correctAnswer"]
                    },
                },
            });
            
            const text = response.text.trim();
            const quizData = JSON.parse(text);

            if (quizData.options.length !== 4) {
                 throw new Error("Invalid number of options received.");
            }

            setQuestion(quizData);
        } catch (e) {
            console.error(e);
            setError("Failed to load quiz. Please try again later.");
            setQuestion({
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: "4"
            }); // Fallback question
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchQuizQuestion();
    }, [fetchQuizQuestion]);

    const handleAnswer = (option: string) => {
        if (feedback) return; // Prevent changing answer after submission

        setSelectedAnswer(option);
        const isCorrect = option === question?.correctAnswer;
        setFeedback(isCorrect ? "Correct! You earned coins." : "Wrong answer. Better luck next time.");
        
        setTimeout(() => {
            onComplete(isCorrect);
        }, 1500);
    };

    const getButtonClass = (option: string) => {
        if (!selectedAnswer) {
            return "bg-white hover:bg-blue-50";
        }
        if (option === selectedAnswer) {
            return option === question?.correctAnswer ? "bg-green-200 border-green-500" : "bg-red-200 border-red-500";
        }
        if (option === question?.correctAnswer) {
            return "bg-green-200 border-green-500";
        }
        return "bg-gray-100 text-gray-500";
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Quiz</h2>
                {loading && (
                     <div className="flex flex-col items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Generating your question...</p>
                    </div>
                )}
                {error && !loading && (
                    <div className="text-center text-red-500">
                        <p>{error}</p>
                        <button onClick={onClose} className="mt-4