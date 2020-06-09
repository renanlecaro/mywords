import { emptyStats, preventDuplicate } from "./_index";

export function addWord({ words }, { time, from, to, id }) {
  from = from.trim();
  to = to.trim();
  if (!from) throw "A word needs a 'from' field";
  if (!to) throw "A word needs a 'to' field";
  if (!id) id = Math.floor(Math.random() * 100000000);
  const newWord = {
    createdAt: time,
    updatedAt: time,
    from,
    to,
    id,
    stats: emptyStats(),
  };
  preventDuplicate(words, { id, to });
  words.push(newWord);
  return { words };
}
