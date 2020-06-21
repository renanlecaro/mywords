import { change, reset } from "../db.js";

describe("updateWord", () => {
  beforeEach(reset);

  describe("userAnswer", () => {
    it("stores the id in lastWordAsked", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then((store) =>
          change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: true,
            answer: "Привет",
          })
        )
        .then((store) => {
          expect(store.lastWordAsked).toEqual(store.words[0].id);
        });
    });
    it("updates the step counter and minStepToAskAgain", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then((store) => {
          expect(store.step).toEqual(0);
          return change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: true,
            answer: "Привет",
          });
        })
        .then((store) => {
          expect(store.step).toEqual(1);
          expect(store.words[0].stats.minStepToAskAgain).toEqual(500);

          return change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: false,
            answer: "",
          });
        })
        .then((store) => {
          expect(store.step).toEqual(2);
          expect(store.words[0].stats.minStepToAskAgain).toEqual(3);
        });
    });

    it("updates the stats", () => {
      return change({ action: "addWord", from: "Hello", to: "Привет" })
        .then((store) => {
          // Word just added, no number of successes
          expect(store.words[0].stats).toMatchObject({
            s: 0,
            siar: 0,
            f: 0,
            fiar: 0,
            ltr: [],
          });
          return change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: true,
            answer: "Привет",
          });
        })
        .then((store) => {
          expect(store.words[0].stats).toMatchObject({
            s: 1,
            siar: 1,
            f: 0,
            fiar: 0,
            ltr: [expect.objectContaining({ d: 0 })],
          });
          return change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: true,
            answer: "Привет",
          });
        })
        .then((store) => {
          expect(store.words[0].stats).toMatchObject({
            s: 2,
            siar: 2,
            f: 0,
            fiar: 0,
            ltr: [
              expect.objectContaining({ d: 0 }),
              expect.objectContaining({ d: 0 }),
            ],
          });
          return change({
            action: "userAnswer",
            id: store.words[0].id,
            isSuccess: false,
            answer: "ПриXXXвет",
          });
        })
        .then((store) => {
          expect(store.words[0].stats).toMatchObject({
            s: 2,
            siar: 0,
            f: 1,
            fiar: 1,
            ltr: [
              expect.objectContaining({ d: 0 }),
              expect.objectContaining({ d: 0 }),
              expect.objectContaining({ d: 3 }),
            ],
          });
        });
    });
  });
});