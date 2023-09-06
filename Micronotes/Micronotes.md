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

## Create executable jar for multibuild

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