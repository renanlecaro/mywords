import { change, resetForTest } from "../db.js";

describe("updateWord", () => {
  beforeEach(resetForTest);

  describe("updateWord", () => {
    it("can change the from field", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then((store) => {
          return change({
            action: "updateWord",
            id: store.words[0].id,
            from: "Dada",
          });
        })
        .then((store) => expect(store.words[0].from).toBe("Dada"));
    });
  });
});
