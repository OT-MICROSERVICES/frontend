APP_VERSION ?= v0.1.0
IMAGE_REGISTRY ?= quay.io/opstree
IMAGE_NAME ?= frontend-app

install:
	npm install

build: install
	npm run build

docker-build:
	docker build -t ${IMAGE_REGISTRY}/${IMAGE_NAME}:${APP_VERSION} -f Dockerfile .

docker-push:
	docker push ${IMAGE_REGISTRY}/${IMAGE_NAME}:${APP_VERSION}

docker-run:
	docker run -it -p 3000:3000 ${IMAGE_REGISTRY}/${IMAGE_NAME}:${APP_VERSION}
