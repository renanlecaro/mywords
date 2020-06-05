// This script pulls the public commits to create a changelog
const fs = require("fs");
const request = require("request");
const url =
  "https://api.github.com/repos/renanlecaro/mywords/commits?sha=master";

request(
  {
    url,
    headers: {
      "User-Agent": "renanlecaro/mywords",
    },
  },
  (err, res, body) => {
    if (err) {
      console.error("error:", error);
      process.exit(1);
    }
    const parsed = JSON.parse(body)
      .map((c) => ({
        sha: c.sha,
        message: c.commit.message,
        date: c.commit.author.date,
      }))
      .filter((c) => c.message.indexOf("Merge pull request") === -1);

    fs.writeFileSync(
      "./src/changeLog.js",
      `
// this file is auto generated, don't edit it my hand 
export const commits=${JSON.stringify(parsed)};  
  `
    );
  }
);
