---
title:        CLI
permalink:    DotNetNotes/CLI
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

---

<br/>

# [Docs](https://learn.microsoft.com/en-us/dotnet/core/tools/)

# [Environment Variables](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables#net-sdk-and-cli-environment-variables)

# [Install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script)

## Windows PowerShell

```powershell
Invoke-WebRequest -Uri https://dot.net/v1/dotnet-install.ps1 -OutFile "$env:temp/dotnet-install.ps1"; powershell -executionpolicy bypass "$env:temp/dotnet-install.ps1"
```

## PowerShell Core

```powershell
Invoke-WebRequest -Uri https://dot.net/v1/dotnet-install.ps1 -OutFile "$env:temp/dotnet-install.ps1"; pwsh "$env:temp/dotnet-install.ps1"
```

## Bash

```shell
wget https://dot.net/v1/dotnet-install.sh && chmod +x ./dotnet-install.sh && sudo ./dotnet-install.sh
```

## Apt

```shell
sudo apt update
sudo apt install dotnet6
```

# WinGet

```cmd
winget install Microsoft.DotNet.SDK.6
```

## Chocolatey

```cmd
choco upgrade dotnet-sdk
```

- [Self Updating Plans](https://github.com/dotnet/sdk/issues/23700)
- [Chocolatey .Net Packages](https://community.chocolatey.org/packages/dotnet-sdk/)

# [Update](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-update)

## Upgrade CLI templates

### Checking for Updates

> Check if there are updates available for the template packs that are currently installed. Available since .NET Core 3.0 SDK.

```cmd
dotnet new --update-check
```

### Applying Updates

> Check if there are updates available for the template packs that are currently installed and installs them. Available since .NET Core 3.0 SDK.

```cmd
dotnet new --update-apply
```

# Linux

## ARM64

### dotnet tool

```shell
dotnet tool install --arch arm64
```

## File Locations

```
 /usr/local/share/dotnet
 /etc/dotnet
 ~/.dotnet
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Anything below 3.1.415 and 5.0.403 is not supported on M1 hardware (because it installs into the wrong location). As per the issues referenced above, the recommended action is to:

- Completely clear the entire /usr/local/share/dotnet

- Install the latest versions only (which should install into the correct locations)

</div>

## Environment Variables

### For Framework dependent apps , x64 , ARCH

> I DON'T KNOW IF THIS HELPS, ENV SHOULD BE SET AUTOMATICALLY WHEN INSTALLING,USE CAUTION
> set in `~/.zshenv`

```shell
export DOTNET_ROOT_ARM64=/usr/local/share/dotnet
export DOTNET_ROOT_X64=/usr/local/share/dotnet/x64
```

# Run

```shell
dotnet run --urls=https://localhost:5101
```

# HttpRepl

```shell
 dotnet tool install;

export PATH="$PATH:/Users/bp/.dotnet/tools";
httprepl http://localhost:5001                  
```

- list and select controllers

> ls , cd

- post

```shell
post -c "{"name":"Hawaii", "isGlutenFree":false}"
```

# Entity Framework

## add

```shell
dotnet add package Microsoft.EntityFrameworkCore.Sqlite;
dotnet add package Microsoft.EntityFrameworkCore.Design;
dotnet tool install --global dotnet-ef;
```

## create db tables

```shell
using ContosoPizza.Data;
```

## apply create

```shell
dotnet ef database update --context PizzaContext
```

## revisions

```shell
dotnet ef migrations add ModelRevisions --context PizzaContext
```

## update

```shell
dotnet ef database update --context PizzaContext
```

## Build scafolding

```shell
dotnet ef dbcontext scaffold "Data Source=./Promotions/Promotions.db" Microsoft.EntityFrameworkCore.Sqlite --context-dir ./Data --output-dir .\Models
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           The preceding command:

- Scaffolds a DbContext and model classes using the provided connection string.
- Specify the Microsoft.EntityFrameworkCore.Sqlite database provider should be used.
- Specify directories for the resulting DbContext and model classes.

</div>            

# Resources

- ## [dotnet 6 and ubuntu](https://devblogs.microsoft.com/dotnet/dotnet-6-is-now-in-ubuntu-2204/)

    - ### [Ubuntu Packages](https://packages.ubuntu.com/search?suite=default&section=all&arch=any&keywords=dotnet&searchon=names)

## - [Build Web API Tutorial](https://learn.microsoft.com/en-us/training/modules/build-web-api-aspnet-core/6-exercise-add-controller)

## - [ASP.net Core](https://dotnet.microsoft.com/en-us/apps/aspnet)