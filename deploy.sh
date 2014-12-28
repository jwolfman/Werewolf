#!/bin/sh
sed -i 3000 80 ./views/home.ejs ./app.js
sed -i localhost $1 ./views/home.ejs ./app.js
