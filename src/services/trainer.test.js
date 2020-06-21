import { change, reset } from "../db/db.js";
import {
  addWordToList,
  getListOfRussianWords,
  getNextWordToTrain,
  getWordById,
  getWordList,
  registerResult,
  sendToEndOfList,
  syncCache,
  updateWord,
} from "./trainer";

describe("trainer", () => {
  beforeEach(() => {
    reset();
    // We clear all listeners with the reset, so if we want to keep
    // the cached version up to date we need to rerun the sub
    syncCache();
  });

  describe("getWordById", () => {
    it("returns the word synchronously", () => {
      return addWordToList({ from: "Hello", to: "Привет" })
        .then(wait)
        .then((store) => {
          expect(getWordById(store.words[0].id)).toEqual(store.words[0]);
        });
    });
  });
  describe("getWordList", () => {
    it("calls back the callback with the list", () => {
      let words = null;
      const rm = getWordList((list) => (words = list));
      expect(words).toEqual([]);
      rm();
    });
    it("gets called for updates", () => {
      let words = null;
      const rm = getWordList((list) => (words = list));
      expect(words).toEqual([]);
      return addWordToList({ from: "Hello", to: "Привет" })
        .then(wait)
        .then((_) => {
          expect(words.length).toEqual(1);
          rm();
        });
    });
  });

  describe("addWordToList", () => {
    it("adds the word to the list", () =>
      addWordToList({ from: "Hello", to: "Привет" }).then((store) =>
        expect(store.words[0]).toMatchObject({ from: "Hello", to: "Привет" })
      ));
  });

  describe("getNextWordToTrain", () => {
    it("returns the first word added (without training)", () =>
      addWordToList({ from: "Hello", to: "Привет" })
        .then(() => addWordToList({ from: "World", to: "Мир" }))
        .then(() => {
          expect(getNextWordToTrain().to).toEqual("Привет");
        }));
  });
  describe("registerResult", () => {
    it("updates scores and returns the prev and next words", () =>
      addWordToList({ from: "Hello", to: "Привет" })
        .then(() => addWordToList({ from: "World", to: "Мир" }))
        .then(() => getNextWordToTrain().id)
        .then((id) => registerResult({ id, guessed: false, answer: "Прив" }))
        .then(({ prevWord, nextWord }) => {
          expect(prevWord.to).toEqual("Привет");
          expect(prevWord.stats.minStepToAskAgain).toEqual(2);
          expect(nextWord.to).toEqual("Мир");
          expect(getNextWordToTrain()).toEqual(nextWord);
        }));
  });

  describe("updateWord", () => {
    it("updates a word", () => {
      let id = null;
      return addWordToList({ from: "Hello", to: "Привет" })
        .then((store) => {
          id = store.words[0].id;
          expect(getWordById(id).from).toEqual("Hello");
          return updateWord(id, { from: "Hey" });
        })
        .then(wait)
        .then(() => {
          expect(getWordById(id).from).toEqual("Hey");
        });
    });
  });

  describe("getListOfRussianWords", () => {
    it("returns a list for duplicates detection", () => {
      return addWordToList({ from: "Hello", to: "Привет" }).then(() => {
        expect(getListOfRussianWords()).toEqual(["Привет"]);
      });
    });
  });
  describe("sendToEndOfList", () => {
    it("updates scores and returns the prev and next words", () =>
      addWordToList({ from: "Hello", to: "Привет" })
        .then(() => addWordToList({ from: "World", to: "Мир" }))
        .then(() => expect(getListOfRussianWords()).toEqual(["Привет", "Мир"]))
        .then(() => sendToEndOfList(getNextWordToTrain().id))
        .then((nextWord) => {
          expect(nextWord.to).toEqual("Мир");
          expect(getNextWordToTrain()).toEqual(nextWord);
          expect(getListOfRussianWords()).toEqual(["Мир", "Привет"]);
        }));
  });
});
