import { getSetting } from "./settings";

const synth = window.speechSynthesis;

// warm up the tts engine
synth && synth.getVoices();

export function sayInRussian(toText) {
  if (!synth) return;
  const voice = synth.getVoices().find((v) => v.lang.startsWith("ru"));
  if (!getSetting().useSounds) return;
  const cleaned = toText.replace(/\*/gi, "").split(/\(|\//gi)[0];
  const utterance = new SpeechSynthesisUtterance(cleaned);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "ru_RU";
  }
  utterance.rate = 0.9;
  return () => {
    synth.speak(utterance);
  };
}
