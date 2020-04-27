const defaultSettings = {
  whenEmptyList: "add-word",
  useSounds: true,
  fullBackup: true,
  restoreProgress: false,
  warnTypo: true,
  ignoreAccents: true,
};

let settings = {};
try {
  settings = JSON.parse(localStorage.getItem("settings")) || {};
} catch (e) {}

settings = { ...defaultSettings, ...settings };

export function getSetting() {
  return settings;
}

export function setSetting(key, value) {
  settings[key] = value;
  localStorage.setItem("settings", JSON.stringify(settings));
  return settings[key];
}
