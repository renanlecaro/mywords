import {
  makeSearchFunction,
  buildIndexFromList,
  simplify,
  wordsForSearch,
  wordsKeysForIndex,
  unique,
} from "./indexList";

describe("simplify", () => {
  it("keeps empty string", () => {
    expect(simplify("")).toBe("");
  });
  it("keeps english words", () => {
    expect(simplify("dad")).toBe("dad");
  });
  it("removes accents", () => {
    expect(simplify("мой")).toBe("мои");
  });
});
describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 3, 1])).toEqual([1, 2, 3]);
  });
});

describe("buildIndexFromList", () => {
  it("indexes strings from their start character", () => {
    const fixture = [{ to: "мой", from: "mine" }];
    expect(buildIndexFromList(fixture)).toEqual({
      min: [0],
      мои: [0],
    });
  });
  it("doesn't index words of less than 3 letters", () => {
    const fixture = [{ to: "мо", from: "mi" }];
    expect(buildIndexFromList(fixture)).toEqual({});
  });
  it("doesn't index words between parenthesis in either fields", () => {
    const fixture = [
      { to: "мо (should be ignored)", from: "mi (should be ignored)" },
    ];
    expect(buildIndexFromList(fixture)).toEqual({});
  });
});

describe("wordsKeysForIndex", () => {
  it("returns the first 3 letters of each word", () => {
    expect(wordsKeysForIndex("interesting conversation")).toEqual([
      "int",
      "con",
    ]);
  });
  it("returns nothing for empty search", () => {
    expect(wordsKeysForIndex("")).toEqual([]);
  });
  it("returns nothing for words shorter than 3 chars", () => {
    expect(wordsKeysForIndex("he")).toEqual([]);
  });
  it("removes accents", () => {
    expect(wordsKeysForIndex("мой")).toEqual(["мои"]);
  });
  it("removes duplicates", () => {
    expect(wordsKeysForIndex("мой мой")).toEqual(["мои"]);
  });

  it("splits words by spaces and punctuation", () => {
    expect(wordsKeysForIndex("interesting conversation")).toEqual([
      "int",
      "con",
    ]);
    expect(wordsKeysForIndex("interesting,conversation")).toEqual([
      "int",
      "con",
    ]);
    expect(wordsKeysForIndex("interesting, conversation")).toEqual([
      "int",
      "con",
    ]);
    expect(wordsKeysForIndex("interesting!conversation")).toEqual([
      "int",
      "con",
    ]);
    expect(wordsKeysForIndex("interesting-conversation")).toEqual([
      "int",
      "con",
    ]);
  });
});

describe("wordsForSearch", () => {
  const mine = { to: "мой", from: "mine" };
  const your = { to: "твой", from: "your" };
  const list = [mine, your];

  const index = buildIndexFromList(list);

  it("returns the full list for empty string", () => {
    expect(wordsForSearch(list, index, "")).toEqual(list);
  });
  it("returns the full list for less than 3 characters types", () => {
    expect(wordsForSearch(list, index, "тв")).toEqual(list);
  });
  it("returns the words from index with a one word search", () => {
    expect(wordsForSearch(list, index, "тво")).toEqual([your]);
  });
  it("does an AND condition if multiple words are searched", () => {
    expect(wordsForSearch(list, index, "твой your")).toEqual([your]);
    expect(wordsForSearch(list, index, "your твой")).toEqual([your]);
    expect(wordsForSearch(list, index, "твой mine")).toEqual([]);
  });
});

describe("makeSearchFunction", () => {
  const fixture = [
    { to: "мой", from: "my, mine, my people (ajd)" },
    { to: "большой", from: "big, large, great, important, grown-up (ajd)" },
    { to: "самый", from: "the very, most (ajd)" },
  ];
  const search = makeSearchFunction(fixture);
  const searchResult = (str) =>
    search(str)
      .map((w) => w.to)
      .join(",");

  it("results all words for empty search, capped to 10", () => {
    expect(search("")).toEqual(fixture);
  });

  it("filters by first letters in russian", () => {
    expect(searchResult("м")).toBe("мой");
    expect(searchResult("с")).toBe("самый");
    expect(searchResult("б")).toBe("большой");
  });

  it("filters by first letters in english", () => {
    expect(
      search("m")
        .map((w) => w.to)
        .join(",")
    ).toBe("мой,самый");
  });
  it("ignores text in brackets", () => {
    expect(
      search("ajd")
        .map((w) => w.to)
        .join(",")
    ).toBe("");
  });
  it("matches text with two first letters", () => {
    expect(
      search("бо")
        .map((w) => w.to)
        .join(",")
    ).toBe("большой");
    expect(
      search("im")
        .map((w) => w.to)
        .join(",")
    ).toBe("большой");
  });
});
