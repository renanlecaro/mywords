import { wordMatch } from "./wordMatch";

export function makeSearchFunction(list) {
  const index = buildIndexFromList(list);
  let lastSearch = null;
  let lastList = null;
  function getTrimmedList(search) {
    const searchKey = wordsKeysForIndex(search).join(",");
    if (lastSearch !== searchKey) {
      lastSearch = searchKey;
      lastList = wordsForSearch(list, index, search);
    }
    return lastList;
  }
  return function search(search = "", max = 10) {
    const result = xResults(getTrimmedList(search), wordMatch(search), max);
    return result;
  };
}

export function buildIndexFromList(list) {
  const index = {};
  list.forEach(({ from, to }, i) => {
    const raw = from + " " + to;
    wordsKeysForIndex(raw).forEach((start) => {
      index[start] = index[start] || [];
      index[start].push(i);
    });
  });
  return index;
}

export function wordsForSearch(list, index, search) {
  const indexLists = wordsKeysForIndex(search)
    .map((i) => index[i])
    .filter((i) => i);
  if (indexLists.length === 0) return list;

  const intersection = indexLists[0].filter(
    (i) => !indexLists.slice(1).find((ids) => ids.indexOf(i) === -1)
  );

  return intersection.map((i) => list[i]);
}

export function wordsKeysForIndex(raw) {
  return unique(
    splitWords(raw)
      .map((w) => w.slice(0, 3))
      .filter((w) => w.length === 3)
  );
}
export function splitWords(raw) {
  return (
    raw
      // They should be already but just making sure
      .toLowerCase()
      // We don't want to index details in brakets
      .replace(/\([^)]*\)/gi, " ")
      // Get the word boundaries, not just spaces
      .split(/\b/gi)
      .map((w) => simplify(w))
      .filter((i) => i)
  );
}

function xResults(list, matcher, limit = 10) {
  const res = [];
  let i = 0;
  while (res.length < limit && i < list.length) {
    const current = list[i];
    if (matcher(current)) res.push(current);
    i++;
  }
  return res;
}

export function unique(words) {
  const res = [];
  words.forEach((word) => {
    if (res.indexOf(word) === -1) res.push(word);
  });
  return res;
}

export function simplify(stringToCheck = "") {
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
