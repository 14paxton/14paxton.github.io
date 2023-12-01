---
title: CLI
permalink: DotNetNotes/CLI
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

---

<br/>

# [Docs](https://learn.microsoft.com/en-us/dotnet/core/tools/)

# [Environment Variables](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-environment-variables#net-sdk-and-cli-environment-variables)

# Install

## [Install Scripts](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script)

## Windows PowerShell

```powershell
Invoke-WebRequest -Uri https://dot.net/v1/dotnet-install.ps1 -OutFile "$env:temp/dotnet-install.ps1"; powershell -executionpolicy bypass "$env:temp/dotnet-install.ps1"
```

## PowerShell Core

```powershell
Invoke-WebRequest -Uri https://dot.net/v1/dotnet-install.ps1 -OutFile "$env:temp/dotnet-install.ps1"; pwsh "$env:temp/dotnet-install.ps1"
```

## Bash

```sh
wget https://dot.net/v1/dotnet-install.sh && chmod +x ./dotnet-install.sh && sudo ./dotnet-install.sh
```

## Apt

```sh
sudo apt update
sudo apt install dotnet6
```

# WinGet

```bat
winget install Microsoft.DotNet.SDK.6
```

## Chocolatey

```bat
choco upgrade dotnet-sdk
```

- [Self Updating Plans](https://github.com/dotnet/sdk/issues/23700)
- [Chocolatey .Net Packages](https://community.chocolatey.org/packages/dotnet-sdk/)

# [Update](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-update)

## Upgrade CLI templates

### Checking for Updates

> Check if there are updates available for the template packs that are currently installed. Available since .NET Core 3.0 SDK.

```bat
dotnet new --update-check
```

### Applying Updates

> Check if there are updates available for the template packs that are currently installed and installs them. Available since .NET Core 3.0 SDK.

```bat
dotnet new --update-apply
```

# Linux

## ARM64

### dotnet tool

```bash
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

# Resources

## [dotnet 6 and ubuntu](https://devblogs.microsoft.com/dotnet/dotnet-6-is-now-in-ubuntu-2204/)

### [Ubuntu Packages](https://packages.ubuntu.com/search?suite=default&section=all&arch=any&keywords=dotnet&searchon=names)
