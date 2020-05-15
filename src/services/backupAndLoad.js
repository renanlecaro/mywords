import { addWordToList, getListOfRussianWords, getWordList } from "./trainer";
import { sameish } from "./sameish";
import { showToast } from "../components/notify";

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
  console.log(JSON.stringify(object));

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
