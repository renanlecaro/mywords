import { change, resetForTest } from "./db.js";

// import MockDate from "mockdate";
// const _Math = global.Math;
// const mockMath = Object.create(_Math);
// mockMath.random = () => 0.5;

describe("reducer", () => {
  beforeEach(resetForTest);
  // beforeAll(() => MockDate.set(1591614823733));
  // afterAll(() => MockDate.reset());

  // beforeAll(() => (global.Math = mockMath));
  // afterAll(() => (global.Math = _Math));

  describe("addWord", () => {
    it("adds the word to the list", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" }).then(
        (store) => {
          const word = store.words[0];
          expect(word.from).toBe("Hello");
          expect(word.to).toBe("Привет");
          expect(typeof word.id).toBe("number");
          expect(typeof word.createdAt).toBe("number");
          expect(typeof word.updatedAt).toBe("number");
        }
      );
    });
    it("refuses words without a to field", () => {
      expect.assertions(1);
      return change({ action: "addWord", from: "Hello", to: "" }).catch((e) =>
        expect(e).toEqual("A word needs a 'to' field")
      );
    });
    it("refuses words without a from field", () => {
      expect.assertions(1);
      return change({ action: "addWord", from: "", to: "Привет" }).catch((e) =>
        expect(e).toEqual("A word needs a 'from' field")
      );
    });
    it("refuses duplicates to fields", () => {
      expect.assertions(1);
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then(() => change({ action: "addWord", from: "Hi", to: "Привет" }))
        .catch((e) =>
          expect(e).toEqual("This russian word is already in your list")
        );
    });
    it("checks for duplicates by removing accents", () => {
      expect.assertions(1);
      return change({ action: "addWord", from: "Hello", to: "здравствуйте" })
        .then(() =>
          change({ action: "addWord", from: "Hi", to: "здравствуите" })
        )
        .catch((e) =>
          expect(e).toEqual("This russian word is already in your list")
        );
    });
    it("accepts the same sentence starred in different ways", () => {
      return change({
        action: "addWord",
        from: "my name is",
        to: "*меня* зовут",
      })
        .then(() =>
          change({ action: "addWord", from: "my name is", to: "меня *зовут*" })
        )
        .then((s) => expect(s.words.length).toEqual(2));
    });

    it("Accepts duplicates from fields (multiple russian words for one english word)", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then(() =>
          change({ action: "addWord", from: "Hello", to: "здравствуйте" })
        )
        .then((s) => expect(s.words.length).toEqual(2));
    });
  });

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
