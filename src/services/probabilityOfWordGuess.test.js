import { probabilityOfWordGuess } from "./probabilityOfWordGuess";

describe("fake mearsure of probability of word guess", function () {
  it("makes wild guesses", () => {
    const score = probabilityOfWordGuess(
      {
        stats: {
          s: 1,
          siar: 1,
          f: 0,
          fiar: 0,
          lastTest: 0,
        },
      },
      100
    );
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(1);
  });
});
