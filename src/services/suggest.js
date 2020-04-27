import all from "./dicts/alltypes";
import phrases from "./dicts/phrases";
import common from "./dicts/common";

import { getListOfRussianWords } from "./trainer";
import { sameish } from "./sameish";

import Worker from "worker-loader!./search.worker.js";

import { getSetting } from "./settings";

function forAutoAdd() {
  switch (getSetting().whenEmptyList) {
    case "add-word":
      return common
        .filter((w) => w.from.match(/noun|verb|adjective/))
        .concat(all);
    case "add-sentence":
      return phrases;
  }
}

const worker = new Worker();

export function tellWorkerAboutBanedWords() {
  worker.postMessage({
    action: "updateWords",
    banned: getListOfRussianWords(),
  });
}

export function getWordToAddToList() {
  const reject = getListOfRussianWords();
  return forAutoAdd().find(
    (word) => !reject.find((rejected) => sameish(rejected, word.to))
  );
}

let msgId = 0;
export function suggestions(search = "", cb) {
  search = search.replace(/^ +/, "").toLowerCase();
  const currentMsgId = msgId++;
  const onResult = (ev) => {
    if (ev.data.msgId == currentMsgId) {
      ev.data.result && cb(ev.data.result);
      worker.removeEventListener("message", onResult);
    }
  };
  worker.addEventListener("message", onResult);
  worker.postMessage({ action: "search", search, msgId: currentMsgId });

  //
}
