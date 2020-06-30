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
  const starsCount = word.replace(/[^*]/gi, "").length;
  if (starsCount === 0) {
    return ["", word];
  }
  return word.split("*");
}

export function decompose(word) {
  const split = starsSplit(word);
  const parts = split
    .map((text, i) => {
      const type = i % 2 === 0 ? "text" : "input";
      const part = {
        text,
        type,
      };
      if (type === "input") part.answerIndex = (i - 1) / 2;
      return part;
    })
    .filter((el) => el.text);

  function recompose(answers) {
    return parts
      .map((part) => {
        if (part.type == "text") {
          return part.text;
        } else {
          return answers[part.answerIndex];
        }
      })
      .join("");
  }
  return {
    parts,
    recompose,
  };
}

export function starredSameish(a, b) {
  // wether an user input would match a starred to field
  return sameish(starsSplit(a)[1], starsSplit(b)[1]);
}

export function starredDistance(a, b) {
  return distance(starsSplit(a)[1], starsSplit(b)[1]);
}
