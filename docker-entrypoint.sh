#!/bin/bash

if npm list | grep -q 'empty'; then
	yes | npm create vite@latest ./ -- --template react-ts;
	cp /vite.config.ts /app/vite.config.ts;
	rm -rf /vite.config.ts;
	chmod -R o+w ./;

  # dart-sass install ----- update <link href="output.css" rel="stylesheet">
  wget -P ../  https://github.com/sass/dart-sass/releases/download/1.78.0/dart-sass-1.78.0-linux-x64.tar.gz;
  gzip -d ../dart-sass-1.78.0-linux-x64.tar.gz;
  tar -xvf ../dart-sass-1.78.0-linux-x64.tar -C ../;
  echo "export PATH=/dart-sass:$PATH" >> ~/.bashrc;
fi

npm install;
exec npm run dev;
