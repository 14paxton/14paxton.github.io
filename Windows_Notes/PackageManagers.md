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
  - > [WingetRun](https://github.com/winget-run)    
  - > [Customize Settings](https://github.com/microsoft/winget-cli/blob/master/doc/Settings.md)
  - > [Microsoft Winget Docs](https://learn.microsoft.com/en-us/windows/package-manager/winget/) 

# [Installing](https://learn.microsoft.com/en-us/windows/iot/iot-enterprise/deployment/install-winget-windows-iot)

## PowerShell

### Get the download URL of the latest winget installer from GitHub:

```powershell
$API_URL = "https://api.github.com/repos/microsoft/winget-cli/releases/latest"
$DOWNLOAD_URL = $(Invoke-RestMethod $API_URL).assets.browser_download_url |
    Where-Object {$_.EndsWith(".msixbundle")}
```

### Download the installer:

```powershell
Invoke-WebRequest -URI $DOWNLOAD_URL -OutFile winget.msixbundle -UseBasicParsing
```

### Install winget:

```powershell
Add-AppxPackage winget.msixbundle
```

### Remove the installer:

```powershell
Remove-Item winget.msixbundle
```

  > If you get an error that the framework "Microsoft.UI.Xaml.2.7" could not be found, then you can use the following commands to install it:
    ```powershell
      Invoke-WebRequest `
        -URI https://www.nuget.org/api/v2/package/Microsoft.UI.Xaml/2.7.3 `
        -OutFile xaml.zip -UseBasicParsing
      New-Item -ItemType Directory -Path xaml
      Expand-Archive -Path xaml.zip -DestinationPath xaml
      Add-AppxPackage -Path "xaml\tools\AppX\x64\Release\Microsoft.UI.Xaml.2.7.appx"
      Remove-Item xaml.zip
      Remove-Item xaml -Recurse
    ```

  > If you then get another error that the framework "Microsoft.VCLibs.140.00.UWPDesktop" could not be found, then you can additionally use the following commands to install it:
    ```powershell
      Invoke-WebRequest `
          -URI https://aka.ms/Microsoft.VCLibs.x64.14.00.Desktop.appx `
          -OutFile UWPDesktop.appx -UseBasicParsing
      Add-AppxPackage UWPDesktop.appx
      Remove-Item UWPDesktop.appx
    ```

  > Then, repeat the initial commands

> Once you have followed the above steps, you can use winget on the command line. For example, to update PowerShell:
    ```powershell
      winget install --id Microsoft.Powershell --source winget
    ```

> Remember to again run this with administrative privileges. If you want to execute it in PowerShell itself, prefix the line with an ampersand ```&```

## PowerShell 7+

> A prerelease version of the ```Microsoft.WinGet.Client``` ```PowerShell``` module has been published to the PowerShell Gallery and will no longer be included as a release asset. To install the latest version of the ```PowerShell``` module, run the following command in ```PowerShell 7+```

```powershell
Install-Module -Name Microsoft.WinGet.Client
```

> The PowerShell module requires ```App Installer (winget)``` to be installed. The ```Repair-WinGetPackageManager cmdlet``` (work in progress) is designed to install or repair ```App Installer```
  
## Quick Scripts  

### [Install Command](https://learn.microsoft.com/en-us/windows/package-manager/winget/install)

> [Logitech Package Repo](https://github.com/microsoft/winget-pkgs/tree/master/manifests/l/Logitech/UnifyingSoftware)     
    
```powershell    
winget install --id Logitech.UnifyingSoftware --force --accept-package-agreements --accept-source-agreements -h -l "C:\Users\Brandon003842\LogiTech"    
```
    
### Upgrade    
    
```bash    
winget upgrade --all --include-unknown    
```

# Chocolatey    
    
> install using nuget
