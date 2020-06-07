import big from "./dictionnary";
import { makeSearchFunction } from "./indexList";

export const forAutocomplete = big;

const searchFn = makeSearchFunction(forAutocomplete);

self.addEventListener("message", (e) => {
  const { action, ...content } = e.data;
  switch (action) {
    case "search":
      const { search, msgId } = content;
      const resultMsg = {
        action: "searchResult",
        result: searchFn(search),
        msgId,
      };
      self.postMessage(resultMsg);
  }
});
