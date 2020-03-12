const defaultSettings={
  whenEmptyList:'add-word',
  useSounds:true
}

let settings=defaultSettings
try{
  settings=JSON.parse(localStorage.getItem('settings')) || defaultSettings
}catch (e) {
  settings=defaultSettings
}

export function getSetting() {
  return settings
}

export function setSetting(key, value) {
  settings[key]=value
  localStorage.setItem('settings', JSON.stringify(settings))
  return settings[key]
}