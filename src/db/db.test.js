import { change, subscribe } from "./db";

describe("subscribe", () => {
  it("calls back the subscription with the current store right after starting the sub", (done) => {
    subscribe((store) => done());
  });
});
describe("change", () => {
  it("refuses a payload that changes when jsonified", () => {
    expect.assertions(1);
    return change({ time: new Date() }).catch((e) =>
      expect(e).toEqual("Change must be serializable")
    );
  });
  it("refuses a payload without action", () => {
    expect.assertions(1);
    return change({}).catch((e) => expect(e).toEqual("Missing an action"));
  });
  it("accepts a payload with an action", () => {
    return change({ action: "addWord", from: "Hello", to: "Привет" });
  });
  it("warns on unkown action", () => {
    const spy = jest
      .spyOn(global.console, "warn")
      .mockImplementation(() => null);
    return change({ action: "does not exist" }).then((store) => {
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
