import { addWordToList, getListOfRussianWords, getWordList } from "./trainer";
import { sameish } from "./sameish";
import { showToast } from "../components/notify";
import { madeABackup } from "./persistData";
import { replayLog } from "../db/db";

export function downloadBackup(fullBackup) {
  const data = fullBackup
    ? lsToObject()
    : {
        wordlist: JSON.parse(localStorage.getItem("wordlist")),
      };
  const dt = new Date();
  const filename = [
    "myword",
    fullBackup ? "backup" : "words",
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate(),
  ].join("-");
  downloadJSON(data, filename);
  madeABackup();
}

function lsToObject() {
  const data = {};
  Object.entries(localStorage).forEach(([key, val]) => {
    try {
      data[key] = JSON.parse(val);
    } catch (e) {
      console.warn(key + " could not be parsed");
    }
  });
  return data;
}

function downloadJSON(object, filename = "mywords") {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", filename + ".json");
  dlAnchorElem.style.position = "absolute";
  dlAnchorElem.style.left = "-1000px";
  document.body.appendChild(dlAnchorElem);
  dlAnchorElem.click();
  setTimeout(document.body.removeChild(dlAnchorElem), 1000);
}

export function removeAlreadyListedRussianWords(list) {
  let rejected = 0;
  const reject = getListOfRussianWords();
  const result = [];
  list.forEach((to) => {
    if (reject.find((w) => sameish(w, to))) {
      rejected++;
    } else {
      result.push(to);
    }
  });
  if (rejected) showToast(rejected + " words ignored (already in list)");
  return result;
}
export function importWords(wordlist) {
  const reject = getListOfRussianWords();
  let added = 0;
  wordlist.forEach((word) => {
    if (!reject.find((w) => sameish(w, word.to))) {
      addWordToList(word);
      added++;
    }
  });
  showToast(added + " words added to your list");
}
export function restoreBackup(fileInput, restoreProgress) {
  var reader = new FileReader();
  reader.readAsText(fileInput.files[0]);
  reader.onload = (e) => {
    let text = e.target.result;
    const parsed = JSON.parse(text);
    const { wordlist } = parsed;
    if (restoreProgress) {
      hardResetFromBackup(parsed);
      window.location.pathname = "/";
    } else {
      importWords(wordlist);
    }
  };
}

function hardResetFromBackup(parsed) {
  for (var key in parsed) {
    localStorage.setItem(key, JSON.stringify(parsed[key]));
  }
}

function migrateDataToReducer() {
  const logs = JSON.parse(localStorage.getItem("trainingData")).filter(
    (l) => l.time
  );

  const words = JSON.parse(localStorage.getItem("wordlist"));

  const wordMaps = {};
  words.forEach((w) => (wordMaps[w.id] = w));

  const wordEvents = words.reverse().map(({ from, to, id }, i) => ({
    action: "addWord",
    time: new Date(logs[0].time) - words.length + i,
    from,
    to,
    eid: id,
  }));

  const logEvents = logs
    .map(({ guessed, id, time, isSkip, answer }) => {
      const word = wordMaps[id];
      if (!word) return;

      if (isSkip) {
        return {
          action: "learnWordLater",
          id,
          time: +new Date(time),
        };
      }
      let fakeAnswer;
      if (typeof answer == "undefined") {
        // fake answer
        answer = guessed ? word.to : "";
        fakeAnswer = true;
      }
      return {
        action: "userAnswer",
        id,
        answer,
        isSuccess: guessed,
        time: +new Date(time),
        fakeAnswer,
      };
    })
    .filter((i) => i);

  replayLog(wordEvents.concat(logEvents));
}
if (
  localStorage.getItem("trainingData") &&
  !localStorage.getItem("trainingDataMigrated")
) {
  migrateDataToReducer();
  localStorage.setItem("trainingDataMigrated", "true");
}
