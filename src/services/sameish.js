import { getSetting } from "./settings";
import levenshtein from "js-levenshtein";

export function sameish(a, b) {
  return simplify(a) == simplify(b);
}
export function simplify(stringToCheck = "") {
  const clean = stringToCheck
    .toLowerCase()
    .replace(/[ .,\/#!?$%\^&;:{}=\-_`~()]/g, "")
    .trim();
  return getSetting().ignoreAccents ? removeAccents(clean) : clean;
}
export function distance(a, b) {
  return levenshtein(simplify(a), simplify(b));
}
export function removeAccents(str) {
  //https://stackoverflow.com/a/37511463/3597869
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function starsSplit(word) {
  if (word.replace(/[^*]/gi, "").length != 2) {
    return ["", word, ""];
  }
  return (" " + word + " ").split("*").map((w) => (w == " " ? "" : w));
}

export function starredSameish(a, b) {
  // wether an user input would match a starred to field
  return sameish(starsSplit(a)[1], starsSplit(b)[1]);
}

export function starredDistance(a, b) {
  return distance(starsSplit(a)[1], starsSplit(b)[1]);
}
