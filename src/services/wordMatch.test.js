import { wordMatch } from "./wordMatch";

describe("wordMatch", () => {
  it("matches everything with empty string", () => {
    expect(wordMatch("")({ from: "my", to: "search" })).toBe(true);
  });

  it("matches one word", () => {
    expect(wordMatch("my")({ from: "my", to: "" })).toBe(true);
  });
  it("matches on the search being contained in the word", () => {
    expect(wordMatch("he")({ from: "hello", to: "" })).toBe(true);
  });
  it("needs each search part to be at the beginning of a word", () => {
    expect(wordMatch("bor")({ from: "hello neighbor", to: "" })).toBe(false);
    expect(wordMatch("he ne")({ from: "hello neighbor", to: "" })).toBe(true);
    expect(wordMatch("he ne")({ from: "helloneighbor", to: "" })).toBe(false);
  });
  it("matches two words with an and condition", () => {
    expect(wordMatch("my cat")({ from: "my", to: "" })).toBe(false);
    expect(wordMatch("my cat")({ from: "my", to: "dog" })).toBe(false);
    expect(wordMatch("my cat")({ from: "my", to: "cat" })).toBe(true);
  });

  it("ignores extra words and fields", () => {
    expect(wordMatch("my")({ from: "my", to: "dog" })).toBe(true);
    expect(wordMatch("my")({ from: "my", to: "", index: 444 })).toBe(true);
  });
});
