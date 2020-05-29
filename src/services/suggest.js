import Worker from "worker-loader!./search.worker.js";

const worker = new Worker();

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
}
