import * as actions from "./actions/_index";

import deepEqual from "deep-equal";

import EventEmitter from "events";
import { appContentChanged } from "../services/persistData";

const events = new EventEmitter();

let store, logs;
export function reset() {
  events && events.removeAllListeners();
  store = { words: [], step: 0 };
  logs = [];
}
reset();

export function getLogs() {
  return logs;
}

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
    appContentChanged();
  });
}

function saveLogsToLS() {
  if (process.env.NODE_ENV === "test") return;
  localStorage.setItem("db-log", JSON.stringify(logs));
  localStorage.setItem("db-cache", JSON.stringify(store));
  localStorage.setItem(
    "db-cache-version",
    JSON.stringify(process.env.COMMIT_REF)
  );
}

function loadLogsFromLS() {
  if (process.env.NODE_ENV === "test") return;
  const lslogs = localStorage.getItem("db-log");
  const cache = localStorage.getItem("db-cache");
  const version = localStorage.getItem("db-cache-version");
  if (cache && lslogs && version && version == process.env.COMMIT_REF) {
    console.info("Using cached version");
    store = JSON.parse(store);
    logs = JSON.parse(lslogs);
    storeContentChanged();
  } else if (lslogs) {
    console.info("App upgraded, re-running log");
    replayLog(JSON.parse(lslogs));
  } else {
    console.info("No previous data");
  }
}

export function replayLog(toReplay) {
  const start = Date.now();
  reset();
  toReplay.forEach((payload) => {
    logs.push(payload);
    try {
      applyEvent(payload);
    } catch (e) {
      debugLog("replay error : " + e, payload);
    }
  });
  storeContentChanged();
  debugLog("replayLog took " + (Date.now() - start) + "ms");
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

export function debugLog(...args) {
  if (process.env.NODE_ENV === "development") {
    console.debug(...args);
  }
}
