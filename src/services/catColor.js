// generated then adjusted
// https://color-range-generator.netlify.app/#0,93,46,141,100,52,6
const colors = `
#013551
hsl(10,83%,36%)
hsl(28,94%,47%)
hsl(56,95%,48%)
hsl(84,97%,49%)
hsl(112,98%,50%)
hsl(141,100%,52%) 
`
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l);

export function catColor(stats) {
  if (!(stats.s + stats.f)) return colors[0];

  return colors[Math.min(1 + stats.siar, colors.length - 2) + 1];
  // const r = cat / rangeMax;
  // let smooth = (a, b) => Math.floor((b - a) * r + a);
  // return `hsl(${smooth(199, 62)},${smooth(100, 96)}%,${smooth(19, 62)}%)`;
}
