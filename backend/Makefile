# Variables
IMAGE_REPO=fahminlb33
IMAGE_TAG=latest
IMAGE_NAME=smarteconomy-analysis
IMAGE_FULLNAME=${IMAGE_REPO}/${IMAGE_NAME}:${IMAGE_TAG}
DOCKER_CONTAINER_NAME="smarteconomy-analysis"

# Directives
.PHONY: download run debug docker-build docker-run docker-stop docker-rm

.DEFAULT_GOAL := docker-run

# Commands
run:
	uvicorn app.main:app --port 8080 --log-config logging.conf

dev:
	uvicorn app.main:app --port 8080 --reload --log-config logging.conf

format:
	yapf -i -r -vv .

docker-build:
	docker build -t ${IMAGE_FULLNAME} .

docker-run: docker-stop docker-rm docker-build
	docker run --name ${DOCKER_CONTAINER_NAME} -d -p 8080:80 ${IMAGE_FULLNAME}

docker-stop:
	-docker stop ${DOCKER_CONTAINER_NAME}

docker-rm: docker-stop
	-docker rm -f ${DOCKER_CONTAINER_NAME}
