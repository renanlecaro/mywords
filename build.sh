#!/bin/bash
git diff-index --quiet HEAD -- || git commit -am "Auto: untracked files at build time";
set -e
preact build --no-prerender
git co gh-pages
cp build/* ./*
git add .
git commit -m "Build"
git push origin/gh-pages
git co master