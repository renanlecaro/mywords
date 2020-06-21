import { starredDistance } from "../../services/sameish";

export function userAnswer({ words, step }, { id, isSuccess, answer, time }) {
  const word = words.find((w) => w.id === id);
  const stats = word.stats;
  if (isSuccess) {
    stats.s++;
    stats.siar++;
    stats.msiar = Math.max(stats.msiar, stats.siar);
    stats.fiar = 0;
  } else {
    stats.f++;
    stats.fiar++;
    stats.siar = 0;
    stats.mfiar = Math.max(stats.mfiar, stats.fiar);
  }
  stats.ltr.push({ d: starredDistance(answer, word.to), t: time });
  stats.ltr = stats.ltr.slice(-10);
  stats.lastTest = time;
  return { words, lastWordAsked: id };
}
