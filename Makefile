#!/bin/bash
include .env


start: ## Start the containers ##
	@docker-compose up -d

stop: ## Stop the containers ##
	@docker-compose stop

down: ## Down the containers ##
	@docker-compose -f docker-compose.yml down


restart: ## Restart the containers ##
	$(MAKE) stop && $(MAKE) start

build: ## Rebuilds all the containers ##
	@docker-compose build


serve: ## starts the course development server in detached mode ##
	docker exec -it ${APP_CONTAINER} ng serve

ssh: ## bash into the be container ##
	docker exec -it ${APP_CONTAINER} bash
