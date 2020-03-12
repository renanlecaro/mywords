import {getSetting} from "./settings";

const synth=window.speechSynthesis;
synth.getVoices();

export function sayInRussian(toText) {
  if(!getSetting().useSounds) return;

  const utterance=new SpeechSynthesisUtterance(toText.replace(/\*/gi,''))
  utterance.lang='ru_RU'
  synth.speak(utterance)
}