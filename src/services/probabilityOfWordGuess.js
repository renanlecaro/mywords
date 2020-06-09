const minute = 1000 * 60;
const day = minute * 60 * 24;

export function probabilityOfWordGuess(word, now) {
  now = now || Date.now();
  const { s, siar, f, fiar, lastTest } = word.stats;
  const time = now - lastTest;
  if (!s && !f) return 0.2;
  if (fiar) return 0.3;
  if (siar === 1)
    return interpolate(time, {
      t0: 0,
      p0: 0.9,
      t1: 60 * minute,
      p1: 0.45,
    });
  return interpolate(time, {
    t0: 0,
    p0: 90,
    t1: Math.pow(2, siar) * 0.25 * day,
    p1: 0.3,
  });
}

function interpolate(t, { t0, p0, t1, p1 }) {
  if (t0 > t1) throw "wrong direction";
  if (t < t0) return p0;
  if (t > t1) return p1;
  const ratio = (t - t0) / (t1 - t0);
  return p0 + ratio * (p1 - p0);
}
