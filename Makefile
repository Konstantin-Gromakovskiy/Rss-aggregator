develop:
	npx webpack serve

watch:
	npx webpack --watch

install:
	npm ci

build:
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint .

.PHONY: test