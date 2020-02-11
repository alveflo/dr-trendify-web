all: install build

dev:
	cd ./web && npm run dev

install:
	cd ./web && npm install

build:
	cd ./web && npm run build