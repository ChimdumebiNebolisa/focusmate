import { useState, useEffect, useRef } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  listening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
  interimTranscript: string;
  confidence: number;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimTranscriptRef = useRef('');

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser');
      return;
    }

    setIsSupported(true);
    
    // Initialize recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Event handlers
    recognition.onstart = () => {
      setListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setListening(false);
      // Add final interim transcript to main transcript
      if (interimTranscriptRef.current) {
        setTranscript(prev => prev + interimTranscriptRef.current + ' ');
        interimTranscriptRef.current = '';
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      let avgConfidence = 0;
      let confidenceCount = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        
        // Calculate confidence
        if (result[0].confidence) {
          avgConfidence += result[0].confidence;
          confidenceCount++;
        }
        
        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update confidence
      if (confidenceCount > 0) {
        setConfidence(avgConfidence / confidenceCount);
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript + ' ');
        interimTranscriptRef.current = '';
        setInterimTranscript('');
      } else {
        interimTranscriptRef.current = interimTranscript;
        setInterimTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
      
      switch (event.error) {
        case 'no-speech':
          setError('🎤 No speech detected. Please speak clearly and try again.');
          break;
        case 'audio-capture':
          setError('🔒 Microphone access denied. Please allow microphone access in your browser settings.');
          break;
        case 'not-allowed':
          setError('🚫 Microphone access blocked. Please allow microphone access and refresh the page.');
          break;
        case 'network':
          setError('🌐 Network error. Please check your internet connection and try again.');
          break;
        case 'service-not-allowed':
          setError('⚠️ Speech recognition service not available. Please try again later.');
          break;
        case 'bad-grammar':
          setError('📝 Speech recognition grammar error. Please try speaking more clearly.');
          break;
        default:
          setError(`❌ Speech recognition error: ${event.error}. Please try again.`);
      }
    };

    recognitionRef.current = recognition;

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not supported');
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    interimTranscriptRef.current = '';
    setInterimTranscript('');
    setError(null);
    setConfidence(0);
  };

  return {
    transcript,
    listening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
    interimTranscript,
    confidence
  };
}
