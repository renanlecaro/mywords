import { change, reset } from "../db.js";

describe("learnWordLater", () => {
  beforeEach(reset);

  it("can change the order of the words field", () => {
    return change({ action: "addWord", from: "Hello", to: "Привет" })
      .then(() => change({ action: "addWord", from: "World", to: "Мир" }))
      .then((store) => {
        expect(store.words.map((w) => w.from)).toEqual(["Hello", "World"]);
        return change({
          action: "learnWordLater",
          id: store.words[0].id,
        });
      })
      .then((store) => {
        expect(store.words.map((w) => w.from)).toEqual(["World", "Hello"]);
      });
  });
  it("resets the word stats", () => {
    return change({ action: "addWord", from: "Hello", to: "Привет" })
      .then((store) =>
        change({
          action: "userAnswer",
          id: store.words[0].id,
          isSuccess: true,
          answer: "Привет",
        })
      )
      .then((store) => {
        expect(store.words[0].stats.s).toEqual(1);
        return change({
          action: "learnWordLater",
          id: store.words[0].id,
        });
      })
      .then((store) => {
        expect(store.words[0].stats.s).toEqual(0);
      });
  });
});
