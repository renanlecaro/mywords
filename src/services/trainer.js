import { pipeError, showToast } from "../components/notify";

import { change, subscribe } from "../db/db";
import { probabilityOfWordGuess } from "./probabilityOfWordGuess";

let storeCache = {};
subscribe((store) => {
  storeCache = store;
});

export function getWordById(id) {
  return storeCache.words.find((w) => w.id == id);
}

export function getWordList(cb) {
  return subscribe((store) => cb(store.words));
}

export function addWordToList({ from, to }) {
  return change({ action: "addWord", from, to }).catch(pipeError);
}

export function getNextWordToTrain(store = storeCache) {
  const list = store.words
    .filter((w) => w.id !== store.lastWordAsked)
    .map((word) => ({
      ...word,
      probability: probabilityOfWordGuess(word),
    }));
  return (
    getWordThatNeedsARefresh(list) ||
    getWordNeverTrainedBefore(list) ||
    getWordThatNeedsRefreshEvenIfTooEarly(list)
  );
}

function getWordThatNeedsARefresh(list) {
  return list.filter(
    (word) => word.stats.s + word.stats.f > 0 && word.probability <= 0.5
  )[0];
}

function getWordThatNeedsRefreshEvenIfTooEarly(list) {
  showToast("You should add some words to your list !");
  return list.sort((a, b) => a.probability - b.probability)[0];
}

function getWordNeverTrainedBefore(list) {
  return list.filter((word) => word.stats.s + word.stats.f === 0)[0];
}

export function registerResult({ id, guessed, answer }) {
  const event = {
    id,
    guessed,
    answer,
  };
  return change({ action: "userAnswer", id, isSuccess: guessed, answer })
    .then((store) => {
      return {
        prevWord: store.words.find((w) => w.id == id),
        nextWord: getNextWordToTrain(store),
      };
    })
    .catch(pipeError);
}

export function updateWord(id, edit) {
  return change({ action: "updateWord", id, ...edit })
    .then(() => showToast("Word updated"))
    .catch(pipeError);
}

export function getListOfRussianWords() {
  return storeCache.words.map((w) => w.to);
}

export function sendToEndOfList(id) {
  return change({ action: "learnWordLater", id })
    .then((store) => getNextWordToTrain(store))
    .catch(pipeError);
}
