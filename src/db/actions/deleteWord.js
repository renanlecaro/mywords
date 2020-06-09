export function deleteWord({ words }, { id }) {
  return {
    words: words.filter((w) => w.id !== id),
  };
}
