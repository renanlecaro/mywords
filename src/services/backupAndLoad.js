import { addWordToList, getListOfRussianWords, getWordList } from "./trainer";
import { sameish, starsSplit } from "./sameish";
import { showToast } from "../components/notify";
import { madeABackup } from "./persistData";
import { replayLog } from "../db/db";
import { generateBackup } from "../db/backupRestore";

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
      let split = starsSplit(word.to);
      const fullAnswer = split[0] + answer + split[2];
      return {
        action: "userAnswer",
        id,
        answer: fullAnswer,
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
