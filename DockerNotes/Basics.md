---
title: Basics
permalink: DockerNotes/Basics
category: DockerNotes
parent: DockerNotes
layout: default
has_children: false
share: true
shortRepo:

- dockernotes
- default

---

<br/>

<details markdown="block">                
<summary>                
Table of contents                
</summary>                
{: .text-delta }                
1. TOC                
{:toc}                
</details>

<br/>

---

<br/>

# Path for ubuntu for windows

```
C:\\Users\\bpaxton\\AppData\\Local\\Packages\\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\\rootfs
```

# Basic Docker Concepts and Terms

## **Docker Image:**

> A lightweight, stand-alone, executable package **that** includes everything needed **to** run a piece **of** software.

## **Docker Container:**

> A runtime instance of a Docker image.

## **Docker Hub:**

> A cloud-based registry service where Docker users **and** partners create, test, store, **and** distribute container images.

## **Dockerfile:**

> A text document that contains all the commands a user could call on the command line **to** assemble an image.

## **Docker Compose:**

> A tool **for** defining **and** running multi-container Docker applications.

# Basic Docker Commands

## version: Display Docker version.

```shell
docker --version
```

## Display system-wide information.

```shell
docker info
```

## mage: Run a Docker container from an image.

```shell
docker run
```

## List running Docker containers.

```shell
docker ps
```

## List all Docker containers.

```shell
docker ps a
```

## Stop a running container.

```shell
docker stop container_id
```

## Remove a Docker container.

```shell
docker rm container_id
```

## List Docker images.

```shell
docker images
```

## Remove a Docker image.

```shell
docker rm image_id
```

## Pull an image from a Docker registry (Docker Hub by default).

```shell
docker pull
```

## Push an image to a Docker registry.

```shell
docker push
```

## Execute a command in a running container.

```shell
docker exec
```

## Fetch the logs of a container.

```shell
docker logs
```

## Starts one or more stopped containers.

```shell
docker start
```

## Stops one or more running containers.

```shell
docker stop
```

## Build an image from a Dockerfile.

```shell
docker build
```

## Pull an image or a repository from a registry.

```shell
docker pull
```

## Push an image or a repository to a registry.

```shell
docker push
```

## Exports a container's filesystem as a tar archive.

```shell
docker export
```

## Runs a command in a run-time container.

```shell
docker exec
```

## Searches the Docker Hub for images.

```shell
docker search
```

## Attaches to a running container.

```shell
docker attach
```

## Creates a new image from a container's changes.

```shell
docker commit
```

# Intermediate Docker Commands

## Run a Docker container in detached mode.

```shell
docker run -d image:
```

## Map a port from the host to a container.

```shell
docker run -p host_port:container_port image
```

## Mount a volume from the host to a container.

```shell
docker run -v host_volume:container_volume image
```

## Set environment variables in a container.

```shell
 docker run -e VAR=VALUE image
```

## Return low-level information on Docker objects.

```shell
 docker inspect container_id/image_id
```

## Build a Docker image with a tag from a Dockerfile in the current directory.

```shell
 docker build -t tag .
```

# Dockerfile Commands

## `FROM image`

> Set the base image.

## `RUN`

> Run a command.

## `CMD`

> Set a default command that will run when the container starts.

## `ENV VAR=VALUE`

> Set environment variables.

## `ADD source destination`

> Copy files from source to the container\'s filesystem at the destination.

## `COPY source destination`

> Copy new files or directories from source and add them to the filesystem of the container at the destination.

## `ENTRYPOINT`

> Allow you to configure a container that will run as an executable.

## `LABEL`

> Adds metadata to an image.

## `EXPOSE`

> Informs Docker that the container listens on the specified network ports at runtime.

## `ENTRYPOINT`

> Allows you to configure a container that will run as an executable.

## `VOLUME`

> Creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers.

## `USER`

> Set the username (or UID) and optionally the user group (or GID) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that
> follow it in the Dockerfile.

## `WORKDIR`

> Set the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it in the Dockerfile.

## `ARG`

> Define a variable that users can pass at build-time to the builder with the docker build command.

## `ONBUILD`

> Adds a trigger instruction when the image is used as the base for another build.

# Docker Compose Commands

## Create and start containers.

```shell
docker-compose up
```

## Stop and remove containers, networks, images, and volumes.

```shell
docker-compose down
```

## Build or rebuild services.

```shell
docker-compose build
```

## View output from containers.

```shell
docker-compose logs
```

## Restart services.

```shell
docker-compose restart
```

## Pause services.

```shell
docker-compose pause
```

## Unpause services.

```shell
docker-compose unpause
```

## Start existing containers for a service.

```shell
docker-compose start
```

## Stop running containers without removing them.

```shell
docker-compose stop
```

```shell
docker-compose config
```

## CREATE DOCKER HUB IMAGE

### Docker Push:

```bash
docker image push <USERNAME><IMAGE_NAME>:<TAG>
```

### Creating an image for Docker Hub:

```bash
docker image tag <IMAGE_NAME>:<TAG>
```

### Set up your environment:

```bash
 cd docker_images

 mkdir dockerhub

 cd dockerhub
```

### Create the Dockerfile:

```bash
vim Dockerfile
```

> Dockerfile contents:

```dockerfile
# Create an image for the weather-app using multi-stage build

FROM node AS build

RUN mkdir -p /var/node/

ADD src/ /var/node/

WORKDIR /var/node

RUN npm install

FROM node:alpine

ARG VERSION=V1.1

LABEL org.label-schema.version=\$VERSION

ENV NODE_ENV=\"production\"

COPY --from=build /var/node /var/node

WORKDIR /var/node

EXPOSE 3000

ENTRYPOINT \[\"./bin/www\"\]

# Git weather-app code:
git clone "https://github.com/linuxacademy/content-weather-app.git" src

# Use the Git commit hash as the image tag:
cd src
git log -1 --pretty=%H
cd ../
```

### Build the image:

```shell
docker image build -t <USERNAME>weather-app:<HASH> --build-arg
VERSION=1.5 .

Tag the image before pushing it to Docker Hub:

docker image tag linuxacademy/weather-app:<HASH>
<USERNAME>weather-app:<HASH>
```

### Push the image to Docker Hub:

```shell
docker login

docker images
docker tag stacksimplify/mynginx_image1:v1 stacksimplify/mynginx_image1:v1-release
docker push stacksimplify/mynginx_image1:v1-release

# Replace your docker hub account Id
docker tag <your-docker-hub-id>/mynginx_image1:v1 <your-docker-hub-id>/mynginx_image1:v1-release
docker push <your-docker-hub-id>/mynginx_image1:v1-release
```

### Push the latest image to Docker Hub:

```bash
docker login <USERNAME>
docker image push <USERNAME>weather-app:latest
```

# Docker Compose

## INSTALL

### Download the latest version of Docker Compose:

```shell
  sudo curl -L
  \"https://github.com/docker/compose/releases/download/1.23.2/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose
```

### Apply executable permissions:

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

## Test Docker Compose

```shell
docker-compose --version
```