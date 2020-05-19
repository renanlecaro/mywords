import { wordMatch } from "./wordMatch";

export function buildIndex(list) {
  const index = {};
  list.forEach(({ from, to }, i) => {
    const raw = from + " " + to;
    const words = raw.split(/\b/gi);
    const starts = words
      .map((w) => simplify(w))
      .map((w) => w.slice(0, 3))
      .filter((w) => w.length === 3);

    unique(starts).forEach((start) => {
      index[start] = index[start] || [];
      index[start].push(i);
    });
  });

  return function search(search, max = 10) {
    const chars = simplify(search).slice(0, 3);

    let trimmedList =
      chars.length < 3 ? list : (index[chars] || []).map((id) => list[id]);

    return xResults(trimmedList, wordMatch(search), max);
  };
}

function xResults(list, matcher, limit = 10) {
  const res = [];
  let i = 0;
  while (res.length < limit && i < list.length - 1) {
    const current = list[i];
    if (matcher(current)) res.push(current);
    i++;
  }
  return res;
}

function unique(words) {
  const res = [];
  words.forEach((word) => {
    if (res.indexOf(word) === -1) res.push(word);
  });
  return res;
}

function simplify(stringToCheck = "") {
  const clean = stringToCheck
    .toLowerCase()
    .replace(/[ .,\/#!?$%\^&\*;:{}=\-_`~()]/g, "")
    .trim();
  return removeAccents(clean);
}

function removeAccents(str) {
  //https://stackoverflow.com/a/37511463/3597869
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
