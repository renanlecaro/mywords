import { splitWords } from "./indexList";

export const wordMatch = (search) => {
  if (!search.trim()) return () => true;
  const mustBePresent = splitWords(search);

  return ({ from, to }) => {
    const present = splitWords(from + " " + to);
    for (var i = 0; i < mustBePresent.length; i++) {
      const word = mustBePresent[i];
      const match = present.find((w) => w.startsWith(word));
      if (!match) return false;
    }
    return true;
  };
};
