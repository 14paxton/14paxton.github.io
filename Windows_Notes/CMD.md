---  
title:        CMD    
permalink:    Windows_Notes/CMD    
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
    
# CMD    
    
## Quick Scripts    
    
### XCopy    
    
```cmd    
#/y	Suppresses prompting to confirm that you want to overwrite an existing destination file.    
# /q	Suppresses the display of xcopy messages.    
# /s	Copies directories and subdirectories, unless they are empty. If you omit /s, xcopy works within a single directory.    
#/i	If source is a directory or contains wildcards and destination does not exist, xcopy assumes destination specifies a directory name and creates a new directory. Then, xcopy copies all specified files into the new directory. By default, xcopy prompts you to specify whether destination is a file or a directory.    
# /r	Copies read-only files.    
# /c	Ignores errors.    
#/e	Copies all subdirectories, even if they are empty. Use /e with the /s and /t command-line options.    
# /h	Copies files with hidden and system file attributes. By default, xcopy does not copy hidden or system files    
# /j	Copies files without buffering. Recommended for very large files. This parameter was added in Windows Server 2008 R2.    
    
cd "C:\Users\%USERNAME%\source\repos\GitHub\Veridian";    
git pull    
#xcopy "C:\Users\%USERNAME%\source\repos\GitHub\Veridian\Google\Default\*" "C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\"/y /q /s /i /r    
xcopy "C:\Users\%USERNAME%\source\repos\GitHub\Veridian\Google\Default" "C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default"/y /q /s /i /r /c /e /j    
```    
    
### run msi for only current user    
    
From an elevated process call ```msiexec /jm foo.msi ``` to perform an advertisement. This blesses the package.    
    
From a standard user process call ``` msiexec /I foo.msi REBOOT=R /qb``` and this will start the installation off as the user but elevate seamlessly as needed.    
    
### Check time    
    
```    
        echo %date% %time% & tzutil /g    
```    
    
- output    
    
> "Central Standard Time"    
    
### Force delete    
    
```    
      RMDIR /S /Q    
```    
    
### Change TimeZone    
    
- check timezone    
  tzutil /g    
    
- list timezones    
  tzutil /l    
    
- set timezone    
  tzutil /s    
    
### Create symbolic link    
    
- mklink /D \"E:\\Path\\newFolder\" \"F:\\folderIwantToLinkFrom\"    
    
### Get WIFI password    
    
```cmd    
         netsh wlan show profile ALLO1D67CF_5G key=clear    
```     
    
### power managment    
    
- Power saver:    
    
```    
    powercfg -duplicatescheme a1841308-3541-4fab-bc81-f71556f20b4a    
```    
    
- Balanced:\    
    
```    
     powercfg -duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e    
```    
    
- High Performance:\    
    
```    
      powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c    
```    
    
- Ultimate Performance (available since Windows 10 April 2018    
  Update):\    
    
```    
       powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61    
```