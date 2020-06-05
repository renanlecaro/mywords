import { commits } from "../changeLog";

import IconArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg";
export function DisplayChangeLog() {
  return (
    <div>
      <h2>Changelog</h2>
      <p>
        This app is open source, here's a list to the latest changes to the code
      </p>
      {commits.map(({ message, date, sha }) => (
        <div>
          <h3>
            {date.slice(0, 10)}
            <a href={"https://github.com/renanlecaro/mywords/commit/" + sha}>
              See change <IconArrowRight />
            </a>
          </h3>
          <p>{message}</p>
        </div>
      ))}
    </div>
  );
}
