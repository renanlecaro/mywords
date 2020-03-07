#!/bin/bash
git diff-index --quiet HEAD -- || git commit -am "Auto: untracked files at build time";
set -e
preact build --no-prerender
git co gh-pages
find build -maxdepth 1 -mindepth 1 -exec mv {} . \;
git diff-index --quiet HEAD -- || git commit -am "Build"; 
git push -f
git co master