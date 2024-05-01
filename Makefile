LOCAL_UID	?= $(shell id -u)
LOCAL_GID	?= $(shell id -g)
DOCKER_USER	?= ${LOCAL_GID}:${LOCAL_UID}

all: help;
default: help;

.PHONY: all up clean configure shell root-shell help

up: #: Start the development environment services
	docker compose up --attach logo-service

# test: #: Run tests using jest
# 	docker compose run --rm logo-service npm run test

clean: #: Bring down containers, remove all data
	docker compose down --remove-orphans --volumes

configure: #: Fix permissions, deal with dependencies
	docker compose pull
	docker compose run -u ${DOCKER_USER} --rm -ti --no-deps logo-service npm install

shell: #: Enter user-mode shell (same UID:GID as host user)
	docker compose run -u ${DOCKER_USER} --rm -ti logo-service bash

root-shell: #: Enter root-mode shell (as root user in container)
	docker compose run --rm -ti logo-service bash

help: #: Show this help
	@fgrep -h "#-" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/#-\s//'
	@printf "\n"
	@printf "Common targets:\n"
	@fgrep -h "#+" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -Ee "s/([^:]+)(.*)(#\+(.*))/- \1:\4/g"
	@printf "\nAvailable target groups:\n"
	@fgrep -h "#?" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -Ee "s/^\#\? ([^:]+)\: (.*)/- \1: \2/g" | sort -bfi
	@printf "\nAvailable targets:\n"
	@fgrep -h "#:" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -Ee "s/([^:]+)(.*)(#:(.*))/- \1:\4/g" | sort -bfi

# Catch all
%:
	@echo 'ERROR: invalid stage'
