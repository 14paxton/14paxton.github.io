---
title:        SDKMan
permalink:    Linux/SDKMan
category:     Linux
parent:       Linux
layout:       default
has_children: false
share:        true
shortRepo:
  - linux
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

- https://sdkman.io/usage

# Install sdkman

```bash    
curl -s https://get.sdkman.io | bash     
source "$HOME/.sdkman/bin/sdkman-init.sh"     
```    

# list candidates

```shell    
sdk list     
```    

# list versions

```shell    
sdk list [program]     
```    

# will use for cmd shell only

```shell    
sdk use [program] [version number]     
```    

# will switch default

```shell    
sdk default [program][version number]     
```    

# list all candidates

```bash    
ls -l ~/.sdkman/candidates/java    
```    

# [available canidates](https://api.sdkman.io/2/candidates/java/Darwin/versions/list?installed=)  

# [Environment Switching](https://sdkman.io/usage)

> use a .sdkmanrc file at root of project

- Use sdkman to run "sdk env" to initialize with correct JDK version
- Enable auto-env through the sdkman_auto_env config
- [See https://sdkman.io/usage#config](https://sdkman.io/usage#config)
- A summary is to add the following to ~/.sdkman/etc/config
  ```sdkman_auto_env=true```

```text
# Enable auto-env through the sdkman_auto_env config
# Add key=value pairs of SDKs to use below
java=22.1.0.r17-grl
#java=17041-LibArch64
```
