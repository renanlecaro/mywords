export function autoStar(word) {
  let { to } = word;
  if (to.indexOf("*") === -1) {
    const autoStarred = autoStarRussian(to);
    if (autoStarred[0] !== "*" || autoStarred[autoStarred.length - 1] !== "*") {
      to = autoStarred;
    }
  }
  return {
    ...word,
    to,
  };
}

function autoStarRussian(to) {
  return "*" + to.replace(/([ ?!.]*)$/gi, (a) => "*" + a);
}
