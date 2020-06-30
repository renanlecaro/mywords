import { reactToMessage } from "./search.worker";

describe("reactToMessage", function () {
  it("respects the max arg", () => {
    const payload = {
      action: "search",
      search: "",
      max: 12,
      msgId: 0,
    };
    const words = reactToMessage(payload).result;
    expect(words.length).toBe(12);
  });
  it("finds words in the dictionnary", () => {
    const payload = {
      action: "search",
      search: "кошка",
      max: 1,
      msgId: 0,
    };
    const words = reactToMessage(payload).result;
    expect(words).toEqual([
      { from: "cat, grapnel, drag, climbing-irons (sg - pl)", to: "кошка" },
    ]);
  });
});
