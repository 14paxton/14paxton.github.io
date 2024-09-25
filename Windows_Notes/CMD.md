---
title: CMD
permalink: Windows_Notes/CMD
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

# Common Commands

- ```bat
        echo
  ```
  > This parameter will allow you to view your working script in the command prompt.
  > This parameter is useful for viewing your working code.
  > If any issues arise from the batch file, you will be able to view the issues associated with your script using the echo function.
  > Adding the following off to this parameter will allow you to quickly close your script after it has finished.

---

---

- ```bat
         cls
  ```
  > Clear your command prompt, best used when extraneous code can make what you're accessing had to find.

---

---

- ```bat
         rem
  ```
  > Shorthand for remark provides the same functionality as `<!-- ` tag in `HTML`.
  > statements are not entered into your code.
  > Instead, they are used to explain and give information regarding the code

---

---

- ```bat
         %%a
  ```
  > Each file in the folder.

---

---

- ```bat
     (".\")
  ```
  > The root folder.
  > When using the command prompt, one must direct the prompt to a particular directory before changing a file name, deleting a file, and so on.
  > With batch files, you only need to
  > paste your `BAT` file into the directory of your choosing.

---

---

- ```bat
      pause
  ```
  > Allows a break in the logical chain of your `BAT` file.
  > This allows for users to read over command lines before proceeding with the code.
  > The phrase "Press any key to continue..." will denote a
  > pause.

---

---

- ```bat
      start "[website]"
  ```
  > Will head to a website of your choice using your default web browser.

---

---

- ```bat
      ipconfig
  ```
  > This is a classic command prompt parameter that releases information concerning network information. This information includes `MAC` addresses,
  `IP` addresses, and `sub-net masks`.

---

---

- ```bat
     ping
  ```
  > Pings an `IP` address, sending data packets through server routes to gauge their location and latency (response time).

---

---

- ```bat
  net use
  ```
  > Connects a computer to or disconnects a computer from a shared resource, or displays information about computer connections. The command also
  controls persistent net connections. Used without
  > parameters, net use retrieves a list of network connections.
    - > [Microsoft Docs](<https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/gg651155(v=ws.11)>)

---

---

# XCopy

> `/y` Suppresses prompting to confirm that you want to overwrite an existing destination file.  
> `/q` Suppresses the display of xcopy messages.  
> `/s` Copies directories and subdirectories, unless they are empty.
> If you omit /s, xcopy works within a single directory.  
> `/i` If a source is a directory or contains wildcards and destination does not exist, xcopy assumes destination specifies a directory name and
> creates a new directory.
> Then, xcopy copies all specified files into the new directory.
> By default, xcopy prompts you to specify whether the destination is a file or a directory.  
> `/r` Copies read-only files.  
> `/c` Ignores errors.  
> `/e` Copies all subdirectories, even if they are empty.
> Use /e with the /s and /t command-line options.  
> `/h` Copies files with hidden and system file attributes.
> By default, xcopy does not copy hidden or system files  
> `/j` Copies files without buffering.
> Recommended for huge files.
> This parameter was added in Windows Server 2008 R2.

## Personal Use Example

```winbatch
cd "C:\Users\%USERNAME%\source\repos\GitHub\Veridian";
git pull
::xcopy "C:\Users\%USERNAME%\source\repos\GitHub\Veridian\Google\Default\*" "C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\"/y /q /s /i /r
xcopy "C:\Users\%USERNAME%\source\repos\GitHub\Veridian\Google\Default" "C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default"/y /q /s /i /r /c /e /j
```

# Quick Scripts

## run msi for only current user

> From an elevated process call to perform an advertisement. This blesses the package.

```bat
msiexec /jm foo.msi
```

> From a standard user process call and this will start the installation off as the user but elevate seamlessly as needed.

```bat
msiexec /I foo.msi REBOOT=R /qb
```

## Check time

```bat
echo %date% %time% & tzutil /g
```

> output

```text
Central Standard Time
```

## Force delete

```bat
RMDIR /S /Q
```

## Change TimeZone

### check timezone

```bat
 tzutil /g
```

### list timezones

```bat
 tzutil /l
```

### set timezone

```bat
 tzutil /s
```

## Create a symbolic link

```bat
mklink /D \"E:\\Path\\newFolder\" \"F:\\folderIwantToLinkFrom\"
```

## Get WIFI password

```bat
 netsh wlan show profile ALLO1D67CF_5G key=clear
```

## power managment

### Power saver

```bat
  powercfg -duplicatescheme a1841308-3541-4fab-bc81-f71556f20b4a
```

### Balanced

```bat
  powercfg -duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e
```

### High Performance

```bat
  powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
```

### Ultimate Performance (available since Windows 10 April 2018 Update)

```bat
   powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```