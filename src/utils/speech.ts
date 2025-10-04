// Voice recognition utility for speech-to-text functionality

export function initSpeechRecognition(onResult: (text: string) => void) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (e: SpeechRecognitionEvent) => {
    const result = e.results[e.results.length - 1][0].transcript;
    onResult(result);
  };

  return recognition;
}

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
