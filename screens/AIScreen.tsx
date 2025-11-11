
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { SparklesIcon } from '../components/icons';

interface AnalysisResult {
    distracting_elements: string[];
    focus_elements: string[];
    suggestion: string;
}

const AIScreen: React.FC = () => {
    const [description, setDescription] = useState<string>('A vertical video feed with like, comment, and share buttons on the right. An endless scroll of short videos with music.');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!description) return;
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await getGeminiResponse(description);
            setResult(JSON.parse(response));
        } catch (e) {
            console.error(e);
            setError('Failed to analyze the description. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white">AI Content Analyzer</h1>
                <p className="text-slate-400">Describe a layout to identify distractions.</p>
            </header>

            <div className="space-y-4">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., A grid of photos with stories at the top..."
                    className="w-full h-32 p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    disabled={loading}
                />
                <button
                    onClick={handleAnalyze}
                    disabled={loading || !description}
                    className="w-full flex items-center justify-center p-3 bg-brand-primary text-white font-bold rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors hover:bg-brand-secondary"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <>
                            <SparklesIcon className="h-5 w-5 mr-2" />
                            Analyze with AI
                        </>
                    )}
                </button>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {result && (
                <div className="space-y-4 p-4 bg-slate-700/50 rounded-lg">
                    <div>
                        <h3 className="font-semibold text-lg text-red-400">Distracting Elements</h3>
                        <ul className="list-disc list-inside text-slate-300">
                            {result.distracting_elements.map((el, i) => <li key={i}>{el}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg text-green-400">Focus Elements</h3>
                        <ul className="list-disc list-inside text-slate-300">
                            {result.focus_elements.map((el, i) => <li key={i}>{el}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg text-blue-400">Suggestion</h3>
                        <p className="text-slate-300">{result.suggestion}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIScreen;
