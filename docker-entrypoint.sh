#!/bin/bash

if npm list | grep -q 'empty'; then
	yes | npm create vite@latest ./ -- --template react-ts;
	cp /vite.config.ts /app/vite.config.ts;
	rm -rf /vite.config.ts;
	chmod -R o+w ./;
fi

npm install;
exec npm run dev;
