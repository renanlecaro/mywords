import {
  decompose,
  distance,
  removeAccents,
  sameish,
  simplify,
  starsSplit,
} from "./sameish";

describe("sameish", () => {
  it("accepts empty strings as equal", () => {
    expect(sameish("", "")).toBeTruthy();
  });
  it("accepts equal strings as equal", () => {
    expect(sameish("baba", "baba")).toBeTruthy();
  });
  it("ignores whitespaces and punctuation", () => {
    expect(sameish("ba !ba", ",b aba")).toBeTruthy();
  });
  it("ignores accents", () => {
    expect(sameish("Давайте", "Даваите")).toBeTruthy();
  });
});

describe("simplify", () => {
  it("leaves empty string unchanged", () => {
    expect(simplify("")).toEqual("");
  });
  it("removes whitespaces and punctuation", () => {
    expect(simplify("b,ab,a")).toEqual("baba");
  });
  it("removes accents", () => {
    expect(simplify("й")).toEqual("и");
  });
});

describe("distance", () => {
  it("computes levenstein distance", () => {
    expect(distance("AAA", "AA")).toEqual(1);
    expect(distance("AAA", "AAAA")).toEqual(1);
    expect(distance("AAA", "ABAA")).toEqual(1);
  });
  it("ignores whitespaces", () => {
    expect(distance("AA AA", "AAAA")).toEqual(0);
  });
  it("ignores accents", () => {
    expect(distance("Давайте", "Даваите")).toEqual(0);
  });
});
describe("removeAccents", () => {
  it("removes accents in russian text", () => {
    expect(removeAccents("Давайте")).toEqual("Даваите");
  });
  it("also clears accents in other languages", () => {
    expect(removeAccents("élégante ça à ê")).toEqual("elegante ca a e");
  });
});
describe("starsSplit", () => {
  it("cuts non starred words", () => {
    expect(starsSplit("First")).toEqual(["", "First"]);
  });
  it("cuts starred words", () => {
    expect(starsSplit("First *second* last")).toEqual([
      "First ",
      "second",
      " last",
    ]);
  });
  it("has no problem with odd stars numbers", () => {
    expect(starsSplit("First *second")).toEqual(["First ", "second"]);
  });
  it("has no problem with two starred words", () => {
    expect(starsSplit("First *second* third *fourth*")).toEqual([
      "First ",
      "second",
      " third ",
      "fourth",
      "",
    ]);
  });
  it("has no problem with two starred words in a row", () => {
    expect(starsSplit("First *second**third*")).toEqual([
      "First ",
      "second",
      "",
      "third",
      "",
    ]);
  });
});

describe("decompose", () => {
  it("can handle non starred words", () => {
    const { parts, recompose } = decompose("Hello");
    expect(parts).toEqual([{ type: "input", text: "Hello", answerIndex: 0 }]);
    expect(recompose(["Heli"])).toEqual("Heli");
  });
  it("can handle one starred word", () => {
    const { parts, recompose } = decompose("Hello *World* !");
    expect(parts).toEqual([
      { type: "text", text: "Hello " },
      { type: "input", text: "World", answerIndex: 0 },
      { type: "text", text: " !" },
    ]);
    expect(recompose(["Lola"])).toEqual("Hello Lola !");
  });
  it("can handle two starred words", () => {
    const { parts, recompose } = decompose("Hello *World* how *are* you ?");
    expect(parts).toEqual([
      { type: "text", text: "Hello " },
      { type: "input", text: "World", answerIndex: 0 },
      { type: "text", text: " how " },
      { type: "input", text: "are", answerIndex: 1 },
      { type: "text", text: " you ?" },
    ]);
    expect(recompose(["Lola", "is"])).toEqual("Hello Lola how is you ?");
  });
});
