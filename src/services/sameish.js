
export function sameish(a,b) {
  return simplify(a)==simplify(b)
}
export function simplify(stringToCheck='') {
  return stringToCheck.toLowerCase()
    .replace(/[ .,\/#!?$%\^&\*;:{}=\-_`~()]/g,"")
    .replace(/ё/g,'е')
    .trim()
}