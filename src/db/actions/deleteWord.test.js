import { change, resetForTest } from "../db.js";

describe("updateWord", () => {
  beforeEach(resetForTest);

  describe("deleteWord", () => {
    it("removes the word", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then((store) => {
          return change({
            action: "deleteWord",
            id: store.words[0].id,
          });
        })
        .then((store) => expect(store.words).toEqual([]));
    });
  });
});
