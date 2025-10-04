import React, { useState, useRef } from 'react';
import { initSpeechRecognition } from '../utils/speech';

const VoiceMode: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    try {
      recognitionRef.current = initSpeechRecognition((text: string) => {
        setTranscript(prev => prev + ' ' + text);
      });

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsSupported(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Voice Mode Not Supported
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Your browser doesn't support speech recognition. Please use Chrome or Edge for the best experience.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Voice Mode</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-sm text-gray-600">
            {isListening ? 'Listening...' : 'Ready'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex space-x-3">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              isListening
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isListening ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button
            onClick={clearTranscript}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Transcript */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Transcript
          </label>
          <div className="min-h-[200px] p-4 border border-gray-300 rounded-md bg-gray-50">
            {transcript ? (
              <p className="text-gray-900 whitespace-pre-wrap">{transcript}</p>
            ) : (
              <p className="text-gray-500 italic">
                {isListening 
                  ? 'Start speaking...' 
                  : 'Click "Start Recording" to begin voice input'
                }
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {transcript && (
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Process Text
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Extract Tasks
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Summarize
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceMode;
