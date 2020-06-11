import * as actions from "./actions/_index";

import deepEqual from "deep-equal";

import EventEmitter from "events";

const events = new EventEmitter();

let store, logs;
export function reset() {
  events.removeAllListeners();
  store = { words: [] };
  logs = [];
}
reset();

function reducer(store, params) {
  const action = actions[params.action];
  if (!action) {
    console.warn("no action named " + params.action);
    return {};
  }
  return action(store, params);
}

export function change(payload) {
  debugLog("change:", payload);
  return new Promise((resolve, reject) => {
    checkJSONserialization(payload);

    if (!payload.action) {
      return reject("Missing an action");
    }
    payload.time = payload.time || Date.now();
    payload.eid = payload.eid || Math.floor(Math.random() * 100000000);

    applyEvent(payload);

    logs.push(payload);
    storeContentChanged();
    resolve(store);
  });
}

export function subscribe(cb) {
  events.addListener("change", cb);
  cb(store);
  return function () {
    events.removeListener("change", cb);
  };
}

function applyEvent(event) {
  Object.assign(store, reducer(store, event));
}

function storeContentChanged() {
  setTimeout(() => events.emit("change", store));
  setTimeout(() => {
    checkJSONserialization(store);
    saveLogsToLS();
  });
}

function saveLogsToLS() {
  if (process.env.NODE_ENV === "test") return;
  localStorage.setItem("db-log", JSON.stringify(logs));
}

function loadLogsFromLS() {
  if (process.env.NODE_ENV === "test") return;
  const json = localStorage.getItem("db-log");
  if (json) {
    replayLog(JSON.parse(json));
  }
}

export function replayLog(toReplay) {
  reset();
  toReplay.forEach((payload) => {
    logs.push(payload);
    try {
      applyEvent(payload);
    } catch (e) {
      // if(process.env.NODE_ENV!=='production'){
      //   throw e
      // }else{
      console.warn("replay error : " + e);
      // }
    }
  });
  storeContentChanged();
}

if (!logs.length) {
  loadLogsFromLS();
}

function checkJSONserialization(object) {
  if (
    process.env.NODE_ENV !== "production" &&
    !deepEqual(object, JSON.parse(JSON.stringify(object)))
  ) {
    debugLog(object);
    throw "Change must be serializable";
  }
}

function debugLog(...args) {
  if (process.env.NODE_ENV === "development") {
    console.debug(...args);
  }
}
