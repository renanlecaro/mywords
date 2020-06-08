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
