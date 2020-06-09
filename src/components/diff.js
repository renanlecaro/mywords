import { h, Component } from "preact";
import { starsSplit } from "../services/sameish";
const jsdiff = require("diff");

export function ShowDiff({ answer = "", to = "" }) {
  let parts = starsSplit(to);
  return (
    <span>
      {jsdiff
        .diffChars(answer, parts[1], { ignoreCase: true })
        .filter((e) => !e.removed)
        .map(
          ({ added, value }) =>
            (added && <ins>{value}</ins>) || <span>{value}</span>
        )}
    </span>
  );
}
