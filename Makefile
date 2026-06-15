.PHONY: install dev build start prod lint typecheck format clean docker-build docker-up docker-down

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

prod: build
	npm run start

lint:
	npm run lint

typecheck:
	npm run typecheck

format:
	npm run format

clean:
	rm -rf .next node_modules

docker-build:
	docker compose --profile prod build

docker-up:
	docker compose --profile prod up -d

docker-down:
	docker compose --profile prod down

docker-dev:
	docker compose --profile dev up
