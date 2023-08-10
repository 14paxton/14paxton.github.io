---  
title:        PackageManagers    
permalink:    Windows_Notes/PackageManagers    
category:     Windows_Notes    
parent:       Windows_Notes    
layout:       default    
has_children: false    
share:        true    
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
    
***    
    
<br/>    
    
# [WingetCLI](https://github.com/microsoft/winget-cli)    
    
- [WingetRun](https://github.com/winget-run)    
- [Customize Settings](https://github.com/microsoft/winget-cli/blob/master/doc/Settings.md)    
    
> [Logitech Package Repo](https://github.com/microsoft/winget-pkgs/tree/master/manifests/l/Logitech/UnifyingSoftware)    
>> install ex.    
    
```powershell    
winget install --id Logitech.UnifyingSoftware --force --accept-package-agreements --accept-source-agreements -h -l "C:\Users\Brandon003842\LogiTech"    
```    
    
---   
    
## Quick Scripts    
    
- Upgrade    
    
```bash    
winget upgrade --all --include-unknown    
```    
    
***    
    
# Chocolatey    
    
> install using nuget