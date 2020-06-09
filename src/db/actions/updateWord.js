import { emptyStats, preventDuplicate } from "./_index";

export function updateWord({ words }, { id, time, from = "", to = "" }) {
  const word = words.find((w) => w.id === id);
  if (!word) throw "Word not found with id " + id;
  from = from.trim();
  to = to.trim();

  if (!to && !from) {
    throw "No change passed";
  }

  if (from) {
    word.from = from;
  }
  if (to) {
    preventDuplicate(words, { id, to });
    // After a significant change stats reset.
    // We ignore changes outside of the starred part or
    // that would have no impact on verification.
    if (!starredSameish(to, word.to)) {
      word.stats = emptyStats();
    }
    word.to = to;
  }

  word.updatedAt = time;
  return { words };
}
