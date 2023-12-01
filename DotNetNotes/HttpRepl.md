---
title: HttpRepl
permalink: DotNetNotes/HttpRepl
category: DotNetNotes
parent: DotNetNotes
layout: default
has_children: false
share: true
shortRepo:
  - dotnetnotes
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

# [HttpRepl](https://learn.microsoft.com/en-us/aspnet/core/web-api/http-repl/?view=aspnetcore-7.0&tabs=windows)

## setup

```bat
::install
dotnet tool install;

::set path to tools
export PATH="$PATH:/Users/bp/.dotnet/tools";

::test web api
httprepl http://localhost:5001
```

## list and select controllers

```bat
ls , cd
```

## post

```bat
post -c "{"name":"Hawaii", "isGlutenFree":false}"
```
