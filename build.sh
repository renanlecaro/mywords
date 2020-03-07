#!/bin/bash
git diff-index --quiet HEAD -- || echo "untracked files!" && exit;
set -e
preact build --no-prerender
git co gh-pages
cp build/* ./*
git add .
git commit -m "Build"
git push origin/gh-pages
git co master