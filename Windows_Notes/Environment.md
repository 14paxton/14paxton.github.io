---  
title:     Environment    
permalink: Windows_Notes/Environment    
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
    
# Env Variables    
    
| VARIABLE                    | WINDOWS 10                                                                            |    
|-----------------------------|---------------------------------------------------------------------------------------|    
| %ALLUSERSPROFILE%           | C:\ProgramData                                                                        |    
| %APPDATA%                   | C:\Users\{username}\AppData\Roaming                                                   |    
| %COMMONPROGRAMFILES%        | C:\Program Files\Common Files                                                         |    
| %COMMONPROGRAMFILES(x86)%   | C:\Program Files (x86)\Common Files                                                   |    
| %CommonProgramW6432%        | C:\Program Files\Common Files                                                         |    
| %COMSPEC%                   | C:\Windows\System32\cmd.exe                                                           |    
| %HOMEDRIVE%                 | C:\                                                                                   |    
| %HOMEPATH%                  | C:\Users\{username}                                                                   |    
| %LOCALAPPDATA%              | C:\Users\{username}\AppData\Local                                                     |    
| %LOGONSERVER%               | \\{domain_logon_server}                                                               |    
| %PATH%                      | C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem                               |    
| %PathExt%                   | .com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh;.msc                                 |    
| %PROGRAMDATA%               | C:\ProgramData                                                                        |    
| %PROGRAMFILES%              | C:\Program Files                                                                      |    
| %ProgramW6432%              | C:\Program Files                                                                      |    
| %PROGRAMFILES(X86)%         | C:\Program Files (x86)                                                                |    
| %PROMPT%                    | $P$G                                                                                  |    
| %SystemDrive%               | C:                                                                                    |    
| %SystemRoot%                | C:\Windows                                                                            |    
| %TEMP%                      | C:\Users\{username}\AppData\Local\Temp                                                |    
| %TMP%                       | C:\Users\{username}\AppData\Local\Temp                                                |    
| %USERDOMAIN%                | Userdomain associated with current user.                                              |    
| %USERDOMAIN_ROAMINGPROFILE% | Userdomain associated with roaming profile.                                           |    
| %USERNAME%                  | {username}                                                                            |    
| %USERPROFILE%               | C:\Users\{username}                                                                   |    
| %WINDIR%                    | C:\Windows                                                                            |    
| %PUBLIC%                    | C:\Users\Public                                                                       |    
| %PSModulePath%              | %SystemRoot%\system32\WindowsPowerShell\v1.0\Modules\                                 |    
| %OneDrive%                  | C:\Users\{username}\OneDrive                                                          |    
| %DriverData%                | C:\Windows\System32\Drivers\DriverData                                                |    
| %CD%                        | Outputs current directory path. (Command Prompt.)                                     |    
| %CMDCMDLINE%                | Outputs command line used to launch current Command Prompt session. (Command Prompt.) |    
| %CMDEXTVERSION%             | Outputs the number of current command processor extensions. (Command Prompt.)         |    
| %COMPUTERNAME%              | Outputs the system name.                                                              |    
| %DATE%                      | Outputs current date. (Command Prompt.)                                               |    
| %TIME%                      | Outputs time. (Command Prompt.)                                                       |    
| %ERRORLEVEL%                | Outputs the number of defining exit status of previous command. (Command Prompt.)     |    
| %PROCESSOR_IDENTIFIER%      | Outputs processor identifier.                                                         |    
| %PROCESSOR_LEVEL%           | Outputs processor level.                                                              |    
| %PROCESSOR_REVISION%        | Outputs processor revision.                                                           |    
| %NUMBER_OF_PROCESSORS%      | Outputs the number of physical and virtual cores.                                     |    
| %RANDOM%                    | Outputs random number from 0 through 32767.                                           |    
| %OS%                        | Windows_NT                                                                            |    
    
## Server 2019    
    
| Name                           | Value                                                                                                                                                              |    
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|    
| ALLUSERSPROFILE                | C:\ProgramData                                                                                                                                                     |    
| APPDATA                        | C:\Users\bp01232023\AppData\Roaming                                                                                                                                |    
| ChocolateyInstall              | C:\ProgramData\chocolatey                                                                                                                                          |    
| ChocolateyLastPathUpdate       | "133207961706168795"                                                                                                                                               |    
| CLIENTNAME                     | 10-LTOP-WD-19                                                                                                                                                      |    
| CommonProgramFiles             | C:\Program Files\Common Files                                                                                                                                      |    
| CommonProgramFiles             | (x86)        C:\Program Files (x86)\Common Files                                                                                                                   |    
| CommonProgramW6432             | C:\Program Files\Common Files                                                                                                                                      |    
| COMPLUS_FusionEnableForcedF    | ... 1                                                                                                                                                              |    
| COMPUTERNAME                   | SRV-WEBDEV-10                                                                                                                                                      |    
| ComSpec                        | C:\Windows\system32\cmd.exe                                                                                                                                        |    
| DevEnvDir                      | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\                                                                                      |    
| DriverData                     | C:\Windows\System32\Drivers\DriverData                                                                                                                             |    
| FACADES_4                      | .5.0.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5\Facades                                                   |    
| FACADES_4                      | .5.1.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5.1\Facades                                                 |    
| FACADES_4                      | .5.2.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5.2\Facades                                                 |    
| FACADES_4                      | .6.0.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.6\Facades                                                   |    
| FACADES_4                      | .6.1.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.6.1\Facades                                                 |    
| FACADES_4                      | .6.2.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.6.2\Facades                                                 |    
| FACADES_4                      | .7.0.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7\Facades                                                   |    
| FACADES_4                      | .7.1.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.1\Facades                                                 |    
| FACADES_4                      | .7.2.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.7.2\Facades                                                 |    
| FACADES_4                      | .8.0.0                C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.8\Facades                                                   |    
| FPS_BROWSER_APP_PROFILE_STRING | Internet Explorer                                                                                                                                                  |    
| FPS_BROWSER_USER_PROFILE_ST    | ... Default                                                                                                                                                        |    
| Framework40Version             | v4.0                                                                                                                                                               |    
| FrameworkDir                   | C:\Windows\Microsoft.NET\Framework\                                                                                                                                |    
| FrameworkDir32                 | C:\Windows\Microsoft.NET\Framework\                                                                                                                                |    
| FrameworkVersion               | v4.0.30319                                                                                                                                                         |    
| FrameworkVersion32             | v4.0.30319                                                                                                                                                         |    
| FSHARPINSTALLDIR               | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\CommonExtensions\Microsoft\FSharp\Tools                                               |    
| HOMEDRIVE                      | C:                                                                                                                                                                 |    
| HOMEPATH                       | \Users\bp01232023                                                                                                                                                  |    
| IIS_BIN                        | C:\Program Files (x86)\IIS Express                                                                                                                                 |    
| IIS_DRIVE                      | C:                                                                                                                                                                 |    
| IIS_SITES_HOME                 | C:\Users\bp01232023\Documents\My Web Sites                                                                                                                         |    
| IIS_USER_HOME                  | C:\Users\bp01232023\Documents\IISExpress                                                                                                                           |    
| INCLUDE                        | C:\Program Files (x86)\Windows Kits\NETFXSDK\4.8\include\um                                                                                                        |    
| LIB                            | C:\Program Files (x86)\Windows Kits\NETFXSDK\4.8\lib\um\x86                                                                                                        |    
| LIBPATH                        | C:\Windows\Microsoft.NET\Framework\v4.0.30319                                                                                                                      |    
| LOCALAPPDATA                   | C:\Users\bp01232023\AppData\Local                                                                                                                                  |    
| LOGONSERVER                    | \\SRV-ADC2                                                                                                                                                         |    
| MSBuildLoadMicrosoftTargets    | ... true                                                                                                                                                           |    
| NETFXSDKDir                    | C:\Program Files (x86)\Windows Kits\NETFXSDK\4.8\                                                                                                                  |    
| NUMBER_OF_PROCESSORS           | 8                                                                                                                                                                  |    
| OS                             | Windows_NT                                                                                                                                                         |    
| Path                           | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\\Extensions\Microsoft\IntelliCode\CLI;C:\Program Files (x86)\Microsoft Visual Stud... |    
| PATHEXT                        | .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL                                                                                                         |    
| PkgDefApplicationConfigFile    | C:\Users\bp01232023\AppData\Local\Microsoft\VisualStudio\16.0_e983c4e7\devenv.exe.config                                                                           |    
| POWERSHELL_DISTRIBUTION_CHA    | ... MSI:Windows Server 2019 Standard                                                                                                                               |    
| PROCESSOR_ARCHITECTURE         | AMD64                                                                                                                                                              |    
| PROCESSOR_IDENTIFIER           | Intel64 Family 6 Model 85 Stepping 7, GenuineIntel                                                                                                                 |    
| PROCESSOR_LEVEL                | 6                                                                                                                                                                  |    
| PROCESSOR_REVISION             | 5507                                                                                                                                                               |    
| ProgramData                    | C:\ProgramData                                                                                                                                                     |    
| ProgramFiles                   | C:\Program Files                                                                                                                                                   |    
| ProgramFiles                   | (x86)              C:\Program Files (x86)                                                                                                                          |    
| PROGRAMFILESDIR                | C:\Program Files (x86)\                                                                                                                                            |    
| ProgramW6432                   | C:\Program Files                                                                                                                                                   |    
| PROMPT                         | $P$G                                                                                                                                                               |    
| PSModulePath                   | C:\Users\bp01232023\Documents\WindowsPowerShell\Modules;C:\Program Files\WindowsPowerShell\Modules;C:\Windows\system32\WindowsPowerShell\v1.0\Modules;C:\Progra... |    
| PUBLIC                         | C:\Users\Public                                                                                                                                                    |    
| ServiceHubClientProcessVersion | 16.11.33214.272 built by: D16.11                                                                                                                                   |    
| ServiceHubCurrentOsLocale      | en-US                                                                                                                                                              |    
| ServiceHubLocationServicePi    | ... 96246ee45046e583025fe831a8e38e5a7f2ea6e5174539fb3b48667531cd120d//\\devenv.exe.config                                                                          |    
| ServiceHubLogSessionKey        | FD032B08                                                                                                                                                           |    
| SESSIONNAME                    | RDP-Tcp#2                                                                                                                                                          |    
| SystemDrive                    | C:                                                                                                                                                                 |    
| SystemRoot                     | C:\Windows                                                                                                                                                         |    
| TEMP                           | C:\Users\BP0123~1\AppData\Local\Temp\4                                                                                                                             |    
| ThreadedWaitDialogDpiContext   | -4                                                                                                                                                                 |    
| TMP                            | C:\Users\BP0123~1\AppData\Local\Temp\4                                                                                                                             |    
| USERDNSDOMAIN                  | AD.JDCCU.ORG                                                                                                                                                       |    
| USERDOMAIN                     | JDCCU                                                                                                                                                              |    
| USERDOMAIN_ROAMINGPROFILE      | JDCCU                                                                                                                                                              |    
| USERNAME                       | bp01232023                                                                                                                                                         |    
| USERPROFILE                    | C:\Users\bp01232023                                                                                                                                                |    
| VisualStudioDir                | C:\Users\bp01232023\Documents\Visual Studio 2019                                                                                                                   |    
| VisualStudioEdition            | Microsoft Visual Studio Professional 2019                                                                                                                          |    
| VisualStudioVersion            | 16.0                                                                                                                                                               |    
| VS160COMNTOOLS                 | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\Tools\                                                                                    |    
| VSAPPIDDIR                     | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\Common7\IDE\                                                                                      |    
| VSAPPIDNAME                    | devenv.exe                                                                                                                                                         |    
| VSCMD_ARG_app_plat             | Desktop                                                                                                                                                            |    
| VSCMD_ARG_HOST_ARCH            | x86                                                                                                                                                                |    
| VSCMD_ARG_TGT_ARCH             | x86                                                                                                                                                                |    
| VSCMD_VER                      | 16.11.23                                                                                                                                                           |    
| VSINSTALLDIR                   | C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\                                                                                                  |    
| VSLANG                         | 1033                                                                                                                                                               |    
| VSSKUEDITION                   | Professional                                                                                                                                                       |    
| windir                         | C:\Windows                                                                                                                                                         |    
| WindowsLibPath                 | References\CommonConfiguration\Neutral                                                                                                                             |    
| WindowsSDK_ExecutablePath_x64  | C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\x64\                                                                                      |    
| WindowsSDK_ExecutablePath_x86  | C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\                                                                                          |    
| WindowsSDKLibVersion           | winv6.3\                                                                                                                                                           |    
| WindowsSDKVersion              | \                                                                                                                                                                  |    
  
----                         -----