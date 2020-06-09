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
    f: 0, // Failures
    fiar: 0, // failures in a row
    ltr: [], // last ten results
  };
}
export function preventDuplicate(words, { id, to }) {
  if (words.find((w) => sameish(w.to, to) && w.id != id)) {
    throw "This russian word is already in your list";
  }
}
