import { change, reset } from "../db.js";

describe("addWord", () => {
  beforeEach(reset);

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
      .then(() => change({ action: "addWord", from: "Hi", to: "здравствуите" }))
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
  it("Adds the word at the end of the list", () => {
    return change({ action: "addWord", from: "1", to: "Привет" })
      .then(() => change({ action: "addWord", from: "2", to: "здравствуйте" }))
      .then((s) => expect(s.words.map((w) => w.from)).toEqual(["1", "2"]));
  });
});
