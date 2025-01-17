---
title: Micronotes
layout: default
permalink: Micronotes/
category: Micronotes
has_children: true
share: true
shortRepo:

  - micronotes
  - default

---

# relevant docs

[service discovery ](https://micronaut-projects.github.io/micronaut-discovery-client/latest/guide/)

[built in endpoints ](https://docs.micronaut.io/latest/guide/#providedEndpoints)

[grails use micronaut http ](https://guides.grails.org/grails-micronaut-http/guide/index.html)

# Projects

## [MicroMail](https://github.com/14paxton/MicroMail)

> email microservice using sendgrid

# [Install](https://micronaut-projects.github.io/micronaut-starter/latest/guide/#installation)

## [Download and Install](https://micronaut.io/download/)

# [REPO](https://github.com/14paxton/Micronotes)

# Run

```bash
gradlew server:run
```

```bash
gradlew client:start
```

## Create executable jar for multi build

```bash
gradlew assembleServerAndClient
```

> Start

```bash
java -jar
```

```bash
java -jar server/build/libs/server/[nameOfJar].jar
```

## create a groovy app

```bash
mn create-app example.micronaut.complete --lang=groovy
```