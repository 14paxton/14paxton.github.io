---  
title: Functions    
permalink: GoogleNotes/Functions    
category:  GoogleNotes    
parent:   GoogleNotes    
layout: default    
has_children: false    
share: true    
shortRepo:    
  - googlenotes    
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
    
# Quick Scripts    
    
## [Tips and Tricks](https://cloud.google.com/functions/docs/bestpractices/tips?_ga=2.165287036.-213526365.1679410207#functions-tips-scopes-csharp)    
    
## Enable APIs and services for functions    
    
```shell    
gcloud services enable \    
  cloudfunctions \    
  cloudbuild.googleapis.com \    
  chat.googleapis.com    
```    
    
***    
    
# [Write Function](https://cloud.google.com/functions/docs/writing#event-driven_functions)    
    
***    
    
# Client Libraries    
    
## [DotNet Functions Framework](https://github.com/GoogleCloudPlatform/functions-framework-dotnet)    
    
***    
    
# [Local Development](https://cloud.google.com/functions/docs/running/overview)    
    
## [Running Function with Framework](https://cloud.google.com/functions/docs/running/function-frameworks)    
    
***    
    
# [Triggers](https://cloud.google.com/functions/docs/calling)    
    
## [PubSub 1st Gen](https://cloud.google.com/functions/docs/tutorials/pubsub-1st-gen#functions-prepare-environment-csharp)    
    
## [PubSub 2nd Gen](https://cloud.google.com/functions/docs/tutorials/pubsub)    
    
***    
    
# [Deploy](https://cloud.google.com/functions/docs/deploy#console)    
    
## [Gen 1](https://cloud.google.com/functions/docs/create-deploy-http-dotnet)    
    
> where my-first-function is the registered name by which your function will be identified in the Google Cloud console, and --entry-point specifies your function's fully qualified class name (FQN).    
    
```shell    
gcloud functions deploy my-first-function --entry-point HelloWorld.Function --runtime dotnet6 --trigger-http --allow-unauthenticated    
```    
    
### test    
    
```shell    
gcloud functions describe my-first-function    
```    
    
### logs    
    
```shell    
gcloud functions logs read my-first-function    
```    
    
***    
    
# [Event Driven](https://cloud.google.com/functions/docs/writing/write-event-driven-functions)    
    
# Resources    
    
- [Code Samples](https://cloud.google.com/functions/docs/samples)