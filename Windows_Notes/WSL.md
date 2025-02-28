---
title: WSL
permalink: Windows_Notes/WSL
category: Windows_Notes
parent: Windows_Notes
layout: default
has_children: false
share: true
shortRepo:

- windows_notes
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

# [WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

## [Ubuntu for windows](https://docs.microsoft.com/en-us/windows/wsl/reference)

# [Install](https://docs.microsoft.com/en-gb/windows/wsl/install-win10)

## enable

> ps script enable and install

```shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.appx -UseBasicParsing
Add-AppxPackage .\Ubuntu.appx
```

> or

> ps steps

```shell
# enable
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# enable virtual machine
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# use wsl2
wsl --set-default-version 2
```

> or

- use run and enable `windows subsystem for linux` in windows features

> hit `win + R`

> then input `optionalfeatures.exe`

## install linux distro

> available distros

- [Debian](https://aka.ms/wsl-debian-gnulinux)
- [Ubuntu 18.04](https://aka.ms/wsl-ubuntu-1804)
- [Ubuntu 16.04](https://aka.ms/wsl-ubuntu-1604)
- [Ubuntu 20.04](https://aka.ms/wslubuntu2004)
- [openSUSE](https://aka.ms/wsl-opensuse-42)
- [SLES](https://aka.ms/wsl-sles-12)
- [Kali](https://aka.ms/wsl-kali-linux)

### Go to a folder where you would like to download the distro

```shell
cd <somefolder>
```

### Download Ubuntu 20.04

```shell
Invoke-WebRequest -Uri https://aka.ms/wslubuntu2004 -OutFile Ubuntu.appx -UseBasicParsing
```

### install downloaded \*.appx file

```shell
Add-AppxPackage .\Ubuntu.appx
```

> execute in cmd prompt

```shell
PS E:\distro\ubunu> ubuntu2004.exe
```

```shell
wsl --list --verbos
```

```shell
wsl --list --all
```

> convert ubuntu on wsl 1 to wsl 2

```shell
wsl --set-version Ubuntu-20.04 2
```

### restart

```shell
Restart-Service LxssManager
```

> or

```shell
wsl --terminate [YourDistroName]
wsl --shutdown
```

## Points of Interest

### Path from windows file system

> relative path: `\wsl$\Ubuntu\home\bpaxton`

> Absolute Path: `C:\Users\bpaxton\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs`

#### shell exe, (can point ide to this to use ubuntu in terminal)

[Use in JetBrains ides](https://www.jetbrains.com/help/idea/how-to-use-wsl-development-environment-in-product.html)
`C:\Users\bpaxton\AppData\Local\Microsoft\WindowsApps\ubuntu.exe`

### distribution Ubuntu

`wsl.exe`