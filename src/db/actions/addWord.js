import { emptyStats, preventDuplicate } from "./_index";

export function addWord({ words }, { time, from, to, eid }) {
  from = from.trim();
  to = to.trim();
  if (!from) throw "A word needs a 'from' field";
  if (!to) throw "A word needs a 'to' field";

  const newWord = {
    createdAt: time,
    updatedAt: time,
    from,
    to,
    id: eid,
    stats: emptyStats(),
  };
  preventDuplicate(words, { id: eid, to });
  words = [...words, newWord];
  return { words };
}
