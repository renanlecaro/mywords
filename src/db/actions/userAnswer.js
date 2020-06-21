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
  stats.minStepToAskAgain = step + stepsDelay(stats);
  return { words, lastWordAsked: id, step: step + 1 };
}

function stepsDelay({ s, f, siar }) {
  // 90% success rate on that word, dont ask too much
  if (s / (f + s) > 0.9) {
    return Math.floor(100 * Math.pow(5, siar));
  }

  // Learning and successfully guessed at least once, ask less and less often
  if (siar) {
    return Math.floor(5 * Math.pow(3, siar));
  }
  // Still learning, ask super often
  return 2;
}
