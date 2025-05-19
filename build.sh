#!/bin/bash
npm install
npm run build
mkdir -p public/build
cp -R resources/js public/build/
cp -R resources/css public/build/
cp public/index.html public/build/
