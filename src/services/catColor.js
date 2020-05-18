import { rangeMax } from "./trainer";

const colors = `
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

if (colors.length != rangeMax + 1)
  alert("we need " + (rangeMax + 1) + " colors");
console.info(colors);
export function catColor(cat) {
  cat = parseInt(cat) || 0;
  if (cat > rangeMax) cat = rangeMax;
  console.log(colors[cat]);
  return colors[cat];
  // const r = cat / rangeMax;
  // let smooth = (a, b) => Math.floor((b - a) * r + a);
  // return `hsl(${smooth(199, 62)},${smooth(100, 96)}%,${smooth(19, 62)}%)`;
}
