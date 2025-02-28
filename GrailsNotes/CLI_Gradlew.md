---
title:        CLI_Gradlew
permalink: GrailsNotes/CLI_Gradlew
category: GrailsNotes
parent: GrailsNotes
layout:       default
has_children: false
share:        true
shortRepo:

  - GrailsNotes
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

# Run App

## Run with jvm debug

``` bash    
./gradlew bootRun --debug-jvm --full-stacktrace --daemon     
```    

# Testing

## run with spaces in method name

``` bash    
./gradlew test --tests "com.talentbank.core.UserServiceAPISearchSpec.search for name Dick with clientSetupIds"    
```    

## run jvm debug

``` bash    
./gradlew test --debug-jvm --tests "com.talentbank.tbex.SelfServiceIntegration.SelfServiceIntegrationControllerSpec.test_rest_no_request_object"  --full-stacktrace    
```    

## Set system properties

``` bash    
 ./gradlew -Dsample.message=cool run    
```