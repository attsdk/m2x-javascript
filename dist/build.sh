#!/bin/bash

VERSION="2.0.0"

r.js -o build.js out=../m2x-${VERSION}.js optimize=none
r.js -o build.js out=../m2x-${VERSION}.min.js
