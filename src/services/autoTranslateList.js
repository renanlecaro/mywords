import { search } from "./search";
import { sameish } from "./sameish";

const translationAPi = "https://mywords-backend.herokuapp.com/";

export function translateWord(to) {
  return fromOfflineDictionary(to).then((w) => {
    if (w) return w;
    else return fromOnlineService(to);
  });
}

function fromOfflineDictionary(to) {
  return new Promise((resolve, reject) => {
    search({ search: to, max: 10 }).then((list) => {
      resolve(list.find((w) => sameish(w.to, to)));
    });
  });
}

function fromOnlineService(to) {
  const clean = to.replace(/\*/gi, "").replace(/\([^)]+\)/gi, " ");
  if (window.location.host.startsWith("localhost")) {
    console.warn("Faked translation for " + clean);
    return Promise.resolve({
      from: "Fake translation for " + clean,
      to,
    });
  }

  const url = translationAPi + "translate/ru/en/" + encodeURIComponent(clean);
  return fetch(new Request(url))
    .then((r) => r.json())
    .then((from) => ({ from, to }));
}

export function checkStatusOfTranslator() {
  return fetch(new Request(translationAPi)).then((response) => {
    if (response.status !== 200) {
      throw "offline";
    }
  });
}
