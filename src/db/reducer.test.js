import { change, resetForTest } from "./db";
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
});
