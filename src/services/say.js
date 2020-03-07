const synth=window.speechSynthesis
let voice=null
function parseVoices(){
  voice=synth.getVoices()
    .filter(v=>v.lang.startsWith('ru'))[0]
}
parseVoices()
synth.addEventListener('voiceschanged',parseVoices)

export function sayInRussian(toText) {
  if(!voice) return
  const utterance=new SpeechSynthesisUtterance(toText)
  utterance.voice=voice
  synth.speak(utterance)
}