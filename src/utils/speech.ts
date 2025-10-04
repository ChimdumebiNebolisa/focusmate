// Voice recognition utility for speech-to-text functionality

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
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

export function initSpeechRecognition(onResult: (text: string) => void) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (e: Event) => {
    const event = e as SpeechRecognitionEvent;
    const result = event.results[event.results.length - 1][0].transcript;
    onResult(result);
  };

  return recognition;
}
