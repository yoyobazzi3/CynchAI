import React, { useState } from 'react';
import './Text.css';

function Text() {
    const [inputText, setInputText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleAnalyzeClick = async () => {
        if (!inputText) return;  
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText })
            });
            const data = await response.json();
            setAnalysisResult(` Sentiment: ${data.sentiment}`);
        } catch (error) {
            setAnalysisResult(`Error: ${error.toString()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input
                type='text'
                placeholder='Chat with CynchAI...'
                onChange={handleInputChange}
            />
            <button 
                className='btn' 
                disabled={!inputText.length > 0 || loading}
                onClick={handleAnalyzeClick}
                style={{ backgroundColor: inputText ? 'black' : 'grey' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            </button>
            {loading ? <p>Analyzing...</p> : analysisResult && <p>{analysisResult}</p>}
        </>
    );
}

export default Text;
