#!/bin/bash

VERSION="3.0.1"

rm m2x-*.js
r.js -o build.js out=m2x-${VERSION}.js optimize=none
r.js -o build.js out=m2x-${VERSION}.min.js
