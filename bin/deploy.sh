#!/bin/bash

# stop on any failed command in this script
set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git stash && git checkout master

git pull --ff-only upstream master

mkdir -p tmp/
cp -R examples tmp/
cp -R dist tmp/

git checkout gh-pages

git pull --ff-only upstream gh-pages

cp -R tmp/examples/* .
cp -R tmp/dist .

rm -rf tmp/

# get silly to fix some path issues with github pages
find ./*.html -type f -exec sed -i '' 's/\/dist/\/uniform\/dist/g' {} \;
find ./*.html -type f -exec sed -i '' 's/\/examples/\/uniform/g' {} \;

git add .
git commit -m "updating docs site"
git push upstream gh-pages

git checkout $CURRENT_BRANCH && git stash pop
