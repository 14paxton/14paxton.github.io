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
  - > [WingetRun - Find WinGet Packages](https://github.com/winget-run)    
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

> install multiple pieces of software

```powershell
winget install Microsoft.AzureStorageExplorer; winget install Microsoft.VisualStudioCode;  winget install Microsoft.AzureCLI
```

#### Options

| **Option** 	| Description 	|
|:---:	|---	|
| **_-m, --manifest_** | Must be followed by the path to the manifest (YAML) file. You can use the manifest to run the install experience from a local YAML file. |
| **_--id_** | Limits the install to the ID of the application. |
| **_--name_** | Limits the search to the name of the application. |
| **_--moniker_** | Limits the search to the moniker listed for the application. |
| **_-v, --version_** | Enables you to specify an exact version to install. If not specified, latest will install the highest versioned application. |
| **_-s, --source_** | Restricts the search to the source name provided. Must be followed by the source name. |
| **_--scope_** | Allows you to specify if the installer should target user or machine scope.|
| **_-e, --exact_** | Uses the exact string in the query, including checking for case-sensitivity. It will not use the default behavior of a substring. |
| **_-i, --interactive_** | Runs the installer in interactive mode. The default experience shows installer progress. |
| **_-h, --silent_** | Runs the installer in silent mode. This suppresses all UI. The default experience shows installer progress. |
| **_--locale_** | Specifies which locale to use (BCP47 format). |
| **_-o, --log_** | Directs the logging to a log file. You must provide a path to a file that you have the write rights to. |
| **_--override_** | A string that will be passed directly to the installer. |
| **_-l, --location_** | Location to install to (if supported). |
| **_--force_** | Overrides the installer hash check. Not recommended. |
    
### [Upgrade](https://learn.microsoft.com/en-us/windows/package-manager/winget/upgrade)    
    
```powwershell    
winget upgrade --all --include-unknown    
```

### Uninstall

```powershell
winget uninstall Microsoft.AzureStorageExplorer
```

#### Options

| **Option** 	| Description 	|
|:---:	|---	|
| **-m, --manifest** 	| Must be followed by the path to the manifest (YAML) file. You can use the manifest to run the uninstall experience from a local YAML file. 	|
| **--id** 	| Limits the uninstall to the ID of the application. 	|
| **--name** 	| Limits the search to the name of the application. 	|
| **--moniker** 	| Limits the search to the moniker listed for the application. 	|
| **-v, --version** 	| Enables you to specify an exact version to uninstall. If not specified, latest will uninstall the highest versioned application. 	|
| **-s, --source** 	| Restricts the search to the source name provided. Must be followed by the source name. 	|
| **-e, --exact** 	| Uses the exact string in the query, including checking for case-sensitivity. It will not use the default behavior of a substring. 	|
| **-i, --interactive** 	| Runs the uninstaller in interactive mode. The default experience shows uninstaller progress. 	|
| **-h, --silent** 	| Runs the uninstaller in silent mode. This suppresses all UI. The default experience shows uninstaller progress. 	|
| **-o, --log** 	| Directs the logging to a log file. You must provide a path to a file that you have the write rights to. 	|
| _--locale_ 	| Specifies which locale to use (BCP47 format). 	|
| _-o, --log_ 	| Directs the logging to a log file. You must provide a path to a file that you have the write rights to. 	|
| _--override_ 	| A string that will be passed directly to the installer. 	|
| _-l, --location_ 	| Location to install to (if supported). 	|
| _--force_ 	| Overrides the installer hash check. Not recommended. 	|

### Find software to install

```powershell
winget search
```

### Browse a Windows Package Manage repository

```powershell
manifests / m / Microsoft / PowerShell / 7.1.4.0
```

# [NuGet](https://learn.microsoft.com/en-us/nuget/)

## Install

### [Using dotnet CLI](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-dotnet-cli)

# Chocolatey    
    
> install using nuget
