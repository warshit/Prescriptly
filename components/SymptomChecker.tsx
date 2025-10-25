import React, { useState } from 'react';
import { analyzeSymptoms } from '../services/geminiService';
import { SymptomAnalysisResult } from '../types';
import Loader from './Loader';
import { StethoscopeIcon } from './Icons';

const SymptomChecker: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SymptomAnalysisResult | null>(null);

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const analysisResult = await analyzeSymptoms(symptoms);
            setResult(analysisResult);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <StethoscopeIcon className="mx-auto h-12 w-12 text-brand-primary" />
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    AI Symptom Checker
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Describe your symptoms and our AI will provide potential insights.
                </p>
                <p className="mt-2 text-sm font-semibold text-red-600 bg-red-100 p-2 rounded-md">
                    This tool is not a substitute for professional medical advice. Always consult a doctor.
                </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe your symptoms, e.g., 'I have a high fever, a persistent cough, and body aches...'"
                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                    aria-label="Symptom Description"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !symptoms.trim()}
                    className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
                </button>
            </div>

            {isLoading && <div className="mt-8"><Loader message="AI is analyzing your symptoms..." /></div>}
            
            {error && <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">{error}</div>}

            {result && (
                <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Analysis Results</h3>
                    
                    <div className="mb-6">
                        <h4 className="text-xl font-semibold text-gray-700 mb-3">Potential Conditions</h4>
                        <div className="space-y-4">
                            {result.conditions.map((condition, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <p className="font-bold text-lg text-brand-primary-dark">{condition.name}</p>
                                    <p className="text-sm font-medium text-gray-600">
                                        Likelihood: <span className="font-bold">{condition.likelihood}</span>
                                    </p>
                                    <p className="mt-2 text-gray-700">{condition.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-xl font-semibold text-gray-700 mb-3">General Advice</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{result.advice}</p>
                    </div>

                    <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50">
                        <h4 className="font-bold text-red-800">Important Disclaimer</h4>
                        <p className="text-red-700">{result.disclaimer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SymptomChecker;