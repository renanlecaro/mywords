import Worker from "worker-loader!./search.worker.js";

const worker = new Worker();

let msgId = 0;
export function search({ search, max }) {
  return new Promise((resolve, reject) => {
    const currentMsgId = msgId++;
    const onResult = (ev) => {
      if (ev.data.msgId === currentMsgId) {
        resolve(ev.data.result);
        worker.removeEventListener("message", onResult);
      }
    };
    worker.addEventListener("message", onResult);
    worker.postMessage({ action: "search", search, max, msgId: currentMsgId });
  });
}
