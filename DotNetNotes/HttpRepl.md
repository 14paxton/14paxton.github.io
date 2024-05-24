---
title:        HttpRepl
permalink:    DotNetNotes/HttpRepl
category:     DotNetNotes
parent:       DotNetNotes
layout:       default
has_children: false
share:        true
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

# Setup

```shell
::install
 dotnet tool install -g Microsoft.dotnet-httprepl;

::set path to tools
export PATH="$PATH:/Users/bp/.dotnet/tools";

::test web api
httprepl http://localhost:5001

```

# Run

```shell
dotnet run --urls=https://localhost:5101
```

# HttpRepl

```shell
 dotnet tool install -g Microsoft.dotnet-httprepl;
```

## Set text editor for POST

```shell
pref set editor.command.default "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
```

> set default args

   ```shell
        pref set editor.command.default.arguments "--disable-extensions --new-window"
   ```

## list and select controllers

```shell
ls
```

```shell
cd [controller]
```

## POST

```shell
post -h Content-Type=application/json
```

## GET

```shell
get Order
```

> return

```json
[
  {
    "date": "2024-05-14",
    "summary": "order3"
  },
  {
    "date": "2024-05-15",
    "summary": "order5"
  },
  {
    "date": "2024-05-16",
    "summary": "order4"
  },
  {
    "date": "2024-05-17",
    "summary": "order4"
  },
  {
    "date": "2024-05-18",
    "summary": "order5"
  }
]
```