import EventEmitter from "events";

const defaultSettings = {
  useSounds: true,
  fullBackup: true,
  restoreProgress: false,
  warnTypo: true,
  ignoreAccents: true,
  useCursiveFont: false,
};

const events = new EventEmitter();

let settings = {};
try {
  settings = JSON.parse(localStorage.getItem("settings")) || {};
} catch (e) {}

settings = { ...defaultSettings, ...settings };

export function getSetting() {
  return settings;
}

export function onSettingsChange(key, cb) {
  events.on(key, cb);
}

export function setSetting(key, value) {
  settings[key] = value;
  localStorage.setItem("settings", JSON.stringify(settings));
  events.emit(key);
  return settings[key];
}
