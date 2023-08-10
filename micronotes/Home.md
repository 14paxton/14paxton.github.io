---  
title:        Home    
permalink:    micronotes/Home    
category:     micronotes    
parent:       micronotes    
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