import { wordMatch } from "./wordMatch";
import { sameish } from "./sameish";
import big from "./dicts/big";
import { buildIndex } from "./indexList";

export const forAutocomplete = big;

const searchFn = buildIndex(forAutocomplete);

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
