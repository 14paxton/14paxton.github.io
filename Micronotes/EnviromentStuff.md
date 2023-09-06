---
title:        EnviromentStuff
permalink: Micronotes/EnviromentStuff
category: Micronotes
parent: Micronotes
layout:       default
has_children: false
share:        true
shortRepo:
  - micronotes
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

# [Environment Settings](https://docs.micronaut.io/latest/guide/#environments)

> The Micronaut framework uses the following hierarchy for environment processing (lowest to highest priority):

- Deduced environments
- Environments from the ```micronaut.environments``` system property
- Environments from the ```MICRONAUT_ENVIRONMENTS``` environment variable
- Environments specified explicitly through the application context builder

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">            
<a href="https://docs.micronaut.io/latest/api/io/micronaut/context/env/Environment.html">Available Env Fields</a>
</div> 


---

## Run in Development

### replace application

```java    
public class Application {
    public static void main(String[] args) {
        Micronaut.build(args)
                .mainClass(Application.class)
                .defaultEnvironments(Environment.DEVELOPMENT)
                .start();
    }
}

```    

### add to build.gradle

```groovy    
run {
    systemProperty('micronaut.environments', 'dev')
}    
```    

### cli

```shell    
./gradlew -Dmicronaut.environments=dev run    
```    

### ide

<img width="1262" alt="image" src="https://user-images.githubusercontent.com/26972590/212477618-198bc498-6520-44d6-8e20-25b7569e735d.png">