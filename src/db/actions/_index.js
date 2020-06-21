import { sameish } from "../../services/sameish";

export { addWord } from "./addWord";
export { deleteWord } from "./deleteWord";
export { updateWord } from "./updateWord";
export { userAnswer } from "./userAnswer";
export { learnWordLater } from "./learnWordLater";

export function emptyStats() {
  return {
    s: 0, // Successes
    siar: 0, // Successes in a row
    msiar: 0, // Maximum success streak length
    f: 0, // Failures
    fiar: 0, // failures in a row
    mfiar: 0, // Maximum failure streak length
    ltr: [], // last ten results,
    minStepToAskAgain: 0, // Step at which the word should be asked again
  };
}
export function preventDuplicate(words, { id, to }) {
  if (words.find((w) => sameish(w.to, to) && w.id != id)) {
    throw "This russian word is already in your list";
  }
}