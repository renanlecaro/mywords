import big from "./dictionnary";
import { makeSearchFunction } from "./indexList";

export const forAutocomplete = big;
forAutocomplete.sort((a, b) => a.to.length - b.to.length);

const searchFn = makeSearchFunction(forAutocomplete);

export function reactToMessage({ action, ...content }) {
  switch (action) {
    case "search":
      const { search, max, msgId } = content;
      return {
        action: "searchResult",
        result: searchFn(search, max),
        msgId,
      };
  }
}

self.addEventListener("message", (e) => {
  self.postMessage(reactToMessage(e.data));
});
