import { getLogs, replayLog } from "./db";
import pako from "pako";
import { importWords } from "../services/backupAndLoad";
import { madeABackup } from "../services/persistData";

export function restoreBackup(fileInput) {
  var reader = new FileReader();
  console.log("fileInput", fileInput);
  reader.readAsText(fileInput.files[0]);
  reader.onload = (e) => {
    let text = e.target.result;
    const parsed = JSON.parse(pako.inflate(text, { to: "string" }));
    replayLog(parsed);
    window.location.pathname = "/";
  };
}

export function downloadBackup() {
  const data = generateBackup();
  const dt = new Date();
  const filename =
    ["myword", dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join("-") +
    ".mywordsbackup";
  downloadRawText(data, filename);
  madeABackup();
}

export function generateBackup() {
  const content = JSON.stringify(getLogs());
  return pako.gzip(content, { to: "string" });
}

function downloadRawText(compressed, filename = "mywords") {
  var dataStr =
    "data:application/octet-stream;charset=utf-8," +
    encodeURIComponent(compressed);
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", filename);
  dlAnchorElem.style.position = "absolute";
  dlAnchorElem.style.left = "-1000px";
  document.body.appendChild(dlAnchorElem);
  dlAnchorElem.click();
  setTimeout(document.body.removeChild(dlAnchorElem), 1000);
}
