export function updateLS(key, cb) {
  const result = cb(getLS(key));
  localStorage.setItem(key, JSON.stringify(result));
}

export function getLS(key) {
  const present = localStorage.getItem(key);
  return present ? JSON.parse(present) : null;
}
