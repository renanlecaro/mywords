import {getSetting} from "./settings";
import levenshtein from 'js-levenshtein';

export function sameish(a,b) {
  return simplify(a)==simplify(b)
}
export function simplify(stringToCheck='') {
  const clean=stringToCheck.toLowerCase()
    .replace(/[ .,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")
    .trim()
  return getSetting().ignoreIo ? clean.replace(/ё/g,'е') : clean
}
export function distance(a,b){
  return levenshtein(simplify(a),simplify(b))
}