---
title: Spaces
permalink: IntelliJNotes/Spaces
category:  IntelliJNotes
parent:   IntelliJNotes
layout: default
has_children: false
share: true
shortRepo:
  - intellijnotes
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

***

<br/>

## creating dev env

1) added repo
   2)created application then connected it to repo
3) add ssh
4) spin up
5) add jdk tar gz to packages in space
6) use generated curl to upload

   ```bash
   sudo curl -i -H "Authorization: Bearer {token} -F author="{author}" -F description="jdk7Gzip" -F file=@"/Users/bpaxton/Downloads/depend.tar.gz" https://files.pkg.jetbrains.space/talentplus/p/tb-6/files/
   ```

7) open in ide from project in spaces, then save jdk to environment/client once opened

8) add java file --- can check java ` update-alternatives --config java`
   a) ## use existing container copy files

   `/usr/lib/jvm/java-7.0.232/bin# curl -f -L -H "Authorization: Bearer {token} -o /usr/lib/jvm/java-7.0.232.zip "https://files.pkg.jetbrains.space/talentplus/p/tb-6/files/7.0.232-zulu.zip"; `
   ` unzip java-7.0.232.zip; `
   `mv 7.0.232-zulu/ ./java-7.0.232; `
   `rm 7.0.232-zulu; `

   b) ### alt add java file user docker imaage

          docker pull williamyeh/java7 
          docker run -it williamyeh/java7 bash
          docker cp 123f5c6f5e1f:/usr/lib/jvm/java-7-oracle /usr/lib/jvm

   c) ### install yum

       -RUN yum -y install java-1.7.0-openjdk
       -RUN yum -y install tar
       -ENV JAVA_HOME /usr/lib/jvm/java-1.7.0-openjdk-1.7.0.231-2.6.19.1.amzn2.0.1.x86_64/jre
       -ENV JAVA_VERSION 7u231

   d) ### Example for Java 7 using Ubuntu 14.04

Install Docker - Docker CE free version is fine. See for example https://docs.docker.com/install/linux/docker-ce/ubuntu/ or use the docker.io package in recent Ubuntu versions shipped.

In an empty folder, create a file Dockerfile:

FROM ubuntu:trusty
RUN apt-get update \
&& apt-get install -y \
openjdk-7-jdk \
&& rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/java"]
Add more packages in that command if you need that.

In that folder, run:

docker build -t gertvdijk/java7 .
Run a command inside a single-use-container using that Java 7 image:

E.g. java -version:

docker run --rm -it gertvdijk/java7 -version
Output:

java version "1.7.0_181"
OpenJDK Runtime Environment (IcedTea 2.6.14) (7u181-2.6.14-0ubuntu0.1)
OpenJDK 64-Bit Server VM (build 24.181-b01, mixed mode)
Optionally, create a wrapper for convenience.

Create a file /usr/local/bin/java7-in-docker with contents:

#!/usr/bin/env sh -e

DOCKER_IMAGE=gertvdijk/java7
PWD="$(pwd)"

exec docker run \
--rm -it \
-v ${PWD}:${PWD} \
-v "/etc/passwd:/etc/passwd:ro" \
-v "/etc/group:/etc/group:ro" \
--user "$(id -u):$(id -g)" \
--workdir "${PWD}" \
"${DOCKER_IMAGE}" \
$@
This will make the current working directory available inside the container - not your whole filesystem, and it will impersonate your local user account in the container namespace.

Mark it as executable:

sudo chmod +x /usr/local/bin/java7-in-docker
Run your Java 7 transparently, like this:

java7-in-docker -jar relative/path/to/some.jar