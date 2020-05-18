// TODO store version of db
import functionCaller from "less/lib/less/functions/function-caller";
import { showToast } from "../components/notify";

let wordlist = [];
import EventEmitter from "events";
import { getWordToAddToList, tellWorkerAboutBanedWords } from "./suggest";
import { getSetting } from "./settings";
import { dateKey } from "./formatDate";
import { addedWords } from "./persistData";
const events = new EventEmitter();

try {
  wordlist = JSON.parse(localStorage.getItem("wordlist")) || [];
} catch (e) {
  wordlist = [];
}

let trainingData = [
  // {
  //   time:new Date(),
  //   index:0,
  //   id:0,
  //   guessed:false
  // }
];
try {
  trainingData = JSON.parse(localStorage.getItem("trainingData")) || [];
} catch (e) {
  trainingData = [];
}

let stats = {};
let catStats = [];

function trackChange(event, cb) {
  const { id, time, guessed, index } = event;
  if (!wordlist.find((w) => w.id == id)) return cb();
  const day = dateKey(time);
  let lastDay = catStats[catStats.length - 1];
  if (!lastDay) {
    catStats.push({ day });
  } else if (lastDay.day != day) {
    catStats.push({ ...lastDay, day });
  }
  lastDay = catStats[catStats.length - 1];
  if (stats[id]) {
    const prevCat = wordCat(getStatsById(id));
    lastDay[prevCat] = (lastDay[prevCat] || 0) - 1;
  }

  const result = cb();

  const newCat = wordCat(getStatsById(id));
  lastDay[newCat] = (lastDay[newCat] || 0) + 1;
  events.emit("stats", catStats);
  return result;
}

function getStatsById(id) {
  return (
    stats[id] || {
      guessCount: 0,
      failCount: 0,
      guessInARowCount: 0,
      failInARowCount: 0,
    }
  );
}

function analyseTrainingEvent(event) {
  return trackChange(event, () => {
    const { id, time, guessed, index } = event;
    stats[id] = getStatsById(id);
    const s = stats[id];
    s.lastSeen = index;

    if (guessed) {
      s.guessCount++;
      s.guessInARowCount++;
      s.failInARowCount = 0;
    } else {
      s.failCount++;
      s.guessInARowCount = 0;
      s.failInARowCount++;
    }

    const delay = scheduleNext(s);
    s.minStep = index + delay;
    return delay;
  });
}

export const rangeMax = 6;
const l = [];
for (var i = 0; i <= rangeMax; i++) l.push(i + "");

export let wordCatsList = l;
function wordCat(wordStats) {
  if (!wordStats) return "0";
  return Math.min(1 + wordStats.guessInARowCount, rangeMax).toString();
}

export function getCatStats(cb) {
  events.on("stats", cb);
  cb(catStats);
  return () => events.off("stats", cb);
}

function scheduleNext({
  guessCount,
  failCount,
  guessInARowCount,
  failInARowCount,
}) {
  if (guessCount / (failCount + guessCount) > 0.9) {
    return Math.floor(100 * Math.pow(5, guessInARowCount));
  }

  // Learning and successfully guessed at least once, ask less and less often
  if (guessInARowCount) {
    return Math.floor(5 * Math.pow(3, guessInARowCount));
  }
  // Still learning, ask super often
  return 2;
}

trainingData.forEach(analyseTrainingEvent);

export function getWordById(id) {
  return addStatsToWord(wordlist.find((w) => w.id == id));
}

export function getWordList(cb) {
  events.on("change", cb);
  cb(wordlist.map(addStatsToWord));
  return function clear() {
    events.off("change", cb);
  };
}

function listChanged() {
  wordlist = wordlist.filter((w) => w.to || w.from);
  events.emit("change", wordlist.map(addStatsToWord));
  localStorage.setItem("wordlist", JSON.stringify(wordlist));
  tellWorkerAboutBanedWords();
}
listChanged();

export function addWordToList({ from, to }) {
  const word = {
    from,
    to,
    id: Math.max(0, ...wordlist.map((w) => w.id)) + 1,
    addedAt: new Date(),
  };
  wordlist = [word, ...wordlist];
  listChanged();
  addedWords(1);
  return word;
}

function addStatsToWord(word) {
  const currentStep = trainingData.length;
  const stat = stats[word.id];
  return {
    ...word,
    status: wordCat(stat),
    minStep: stat && stat.minStep - currentStep,
  };
}

export function getNextWordToTrain() {
  let stepped = wordlist.map(addStatsToWord);
  return (
    getWordThatNeedsARefresh(stepped) ||
    getWordNeverTrainedBefore(stepped) ||
    addNewWordFromDatasetAndTrainIt() ||
    getWordThatNeedsRefreshEvenIfTooEarly(stepped)
  );
}

function getWordThatNeedsARefresh(stepped) {
  return stepped.filter((word) => word.minStep <= 0)[0];
}

function getWordThatNeedsRefreshEvenIfTooEarly(stepped) {
  const lastTrainedId = trainingData[trainingData.length - 1].id;
  const list = stepped.filter(({ id }) => id !== lastTrainedId);
  if (!list.length) return null;
  let minStep = Math.min(...list.map((word) => word.minStep));
  if (minStep) {
    return list.find((word) => word.minStep == minStep);
  }
}

function getWordNeverTrainedBefore(list) {
  const unseen = list.filter((word) => !word.minStep);
  return unseen[unseen.length - 1];
}

function addNewWordFromDatasetAndTrainIt() {
  if (getSetting().whenEmptyList != "rework") {
    return addWordToList(getWordToAddToList());
  }
}

export function registerResult({ id, guessed, answer }) {
  const event = {
    time: new Date(),
    id,
    guessed,
    index: trainingData.length,
    answer,
  };

  trainingData.push(event);
  analyseTrainingEvent(event);
  localStorage.setItem("trainingData", JSON.stringify(trainingData));
  return {
    prevWord: addStatsToWord(wordlist.find((w) => w.id === id)),
    nextWord: getNextWordToTrain(),
  };
}

export function updateWord(id, change) {
  wordlist = wordlist.map((item) =>
    item.id == id ? { ...item, ...change } : item
  );
  listChanged();
  showToast("Word updated");
}

export function getListOfRussianWords() {
  return wordlist.map((w) => w.to);
}
