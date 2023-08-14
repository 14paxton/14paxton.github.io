---
title:        micronotes    
layout:       default    
permalink:    micronotes/    
category:     micronotes    
has_children: true    
share:        true    
shortRepo:    
    
  - micronotes    
  - default    
---
    
# [REPO](https://github.com/14paxton/micronotes)

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