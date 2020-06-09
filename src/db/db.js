import * as actions from "./actions/_index";

import deepEqual from "deep-equal";

import EventEmitter from "events";

function reducer(store, params) {
  store = { words: [], ...store };
  const action = actions[params.action];
  if (!action) {
    console.warn("no action named " + params.action);
    return {};
  }
  return action(store, params);
}

export function change(payload) {
  return new Promise((resolve, reject) => {
    checkJSONserialization(payload);

    if (!payload.action) {
      return reject("Missing an action");
    }
    payload.time = payload.time || Date.now();

    applyEvent(payload);

    logs.push(payload);
    storeContentChanged();
    resolve(store);
  });
}

export function subscribe(cb) {
  events.addListener("change", cb);
  setTimeout(() => cb(store));
  return function () {
    events.removeListener("change", cb);
  };
}

let store = {};
let logs = [];
const events = new EventEmitter();

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
    JSON.parse(json).forEach((payload) => {
      logs.push(payload);
      applyEvent(payload);
    });
  }
}

if (!logs.length) {
  loadLogsFromLS();
}

function checkJSONserialization(object) {
  if (
    process.env !== "production" &&
    !deepEqual(object, JSON.parse(JSON.stringify(object)))
  ) {
    throw "Change must be serializable";
  }
}
export function resetForTest() {
  events.removeAllListeners();
  store = {};
  logs = [];
}
