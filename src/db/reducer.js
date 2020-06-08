import { sameish } from "../services/sameish";

const actions = {
  addWord,
  updateWord,
  deleteWord,
};
export function reducer(store, params) {
  store = { words: [], ...store };
  const action = actions[params.action];
  if (!action) {
    console.warn("no action named " + params.action);
    return {};
  }
  return action(store, params);
}

function addWord({ words }, { time, from, to, id }) {
  from = from.trim();
  to = to.trim();
  if (!from) throw "A word needs a 'from' field";
  if (!to) throw "A word needs a 'to' field";
  if (!id) id = Math.floor(Math.random() * 100000000);
  const newWord = { createdAt: time, updatedAt: time, from, to, id };
  preventDuplicate(words, { id, to });
  words.push(newWord);
  return { words };
}

function updateWord({ words }, { id, time, from = "", to = "" }) {
  const word = words.find((w) => w.id === id);
  if (!word) throw "Word not found with id " + id;
  from = from.trim();
  to = to.trim();
  if (from) {
    word.from = from;
  }
  if (to) {
    preventDuplicate(words, { id, to });
    word.to = to;
  }
  if (!to && !from) {
    throw "No change passed";
  }
  word.updatedAt = time;
  return { words };
}

function deleteWord({ words }, { id }) {
  return {
    words: words.filter((w) => w.id !== id),
  };
}

function preventDuplicate(words, { id, to }) {
  if (words.find((w) => sameish(w.to, to) && w.id != id)) {
    throw "This russian word is already in your list";
  }
}
