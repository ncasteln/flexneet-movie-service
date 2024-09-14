#!/bin/bash

if npm list | grep -q 'empty'; then
	yes | npm create vite@latest ./ -- --template react-ts;
	cp /vite.config.ts /app/vite.config.ts;
	rm -rf /vite.config.ts;
	chmod -R o+w ./;
fi

npm install;
exec npm run dev;

# apt-get install wget
# wget https://github.com/sass/dart-sass/releases/download/1.78.0/dart-sass-1.78.0-linux-x64.tar.gz
# extract gzip -d
# extract tar -xvf
# modify .bashrc with export PATH="[dart-sass-folder-path]:$PATH"
# sass input.scss output.css
# <link href="output.css" rel="stylesheet">
