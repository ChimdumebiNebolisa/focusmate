// Voice recognition utility for speech-to-text functionality

export function initSpeechRecognition(onResult: (text: string) => void) {
  const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (e: any) => {
    const result = e.results[e.results.length - 1][0].transcript;
    onResult(result);
  };

  return recognition;
}
