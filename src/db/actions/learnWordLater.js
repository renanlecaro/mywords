import { emptyStats } from "./_index";

export function learnWordLater({ words }, { id }) {
  const word = words.find((w) => w.id == id);
  word.stats = emptyStats();
  return {
    words: [...words.filter((w) => w !== word), word],
  };
}
