---
title: CliApplication
permalink: Micronotes/CliApplication
category:  Micronotes
parent:   Micronotes
layout: default
has_children: false        
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

# Run

## From Jar
  ```shell
    java -jar build/libs/mailercli-0.1-all.jar "cotdc.com"
  ```

## From Native File
  ```shell
    ./build/native/nativeCompile/mailercli cotdc.com
  ```
# Debug

## Gradle

- `:run -Dmicronaut.environments=dev`

```shell
./gradlew run \
  -Dmicronaut.environments=dev \
  -Dorg.gradle.jvmargs="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
```

## Application Run/Debug Template

![img.png](Assets/img.png)

## Micronaut Run/Debug Template

![img_1.png](Assets/img_1.png)