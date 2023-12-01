---
title: Browser
permalink: GoogleNotes/Browser
category: GoogleNotes
parent: GoogleNotes
layout: default
has_children: false
share: true
shortRepo:
  - googlenotes
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

# [Chromium Docs](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md)

## [URIs of interest](chrome://chrome-urls/)

- get profile info

```
chrome://version/
```

- flags

```
chrome://flags/
```

- url list

```
chrome://chrome-urls/
```

```
chrome://about/
```

- ?

```
chrome://proximity-auth
```

### browser apps

> paint app that you can use to draw with.

```
https://canvas.apps.chrome
```

> Screen recording app that only works on Chrome OS. Sort of like Windows step recorder.

```
https://screencast.apps.chrome
```

> Note-taking app that can use handwriting.

```
https://cursive.apps.chrome
```

---

# Extensions

## File Locations

Windows XP: `C:\Documents and Settings\%USERNAME%\Local Settings\Application Data\Google\Chrome\User Data\Default\Extensions\<Extension ID>  `

Windows 10/8/7/Vista: `C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\Extensions\<Extension ID>    `

macOS: `~/Library/Application Support/Google/Chrome/Default/Extensions/<Extension ID>   `

Mac Path: `/Users/<username>/Library/Application Support/Google/Chrome/Default/Extensions/<Extension ID> `

> Extension ID can be found at `chrome://extensions` (with Developer Mode enabled)

Linux: `~/.config/google-chrome/Default/Extensions/<Extension ID> `

Ubuntu: `~/.config/google-chrome/Default/Extensions `

Chrome OS: `/home/chronos/Extensions/<Extension ID>   `

You can copy the extension folder and drop it on a USB or in a network drive.

To install

1. Open Chrome and go to `chrome://extensions`
2. Make sure Developer Mode is checked.
3. Click Load Unpacked Extension....
4. Find your copied directory and click Open.

# [CLI](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)

## MacOS

To run Chrome from the terminal on Mac, you can use the following command:

```shell
open -a "Google Chrome"
```

This will open a new instance of Chrome.

You can also use the following command to open a specific URL in Chrome:

```shell
open -a "Google Chrome" "https://www.google.com"
```

This will open the Google homepage in Chrome.

## Windows

### Open

```winbatch
start chrome
```

### open no address bar

```winbatch
 start chrome --app="http://www.youtube.com/"
```

### Kill all instances

```winbatch
taskkill /F /IM "chrome.exe" /T
```

> or powershell

```powershell
Stop-Process chrome
```

```powershell
Get-Process -Name "chrome" -ErrorAction SilentlyContinue | kill -PassThru
```

### runas admin

```winbatch
runas /user:administrator "C:\Program Files (x86)\Google\Chrome\Application\Chrome.exe"
```

### incognito

```winbatch
start chrome /incognito
```

### at specific site

```winbatch
start chrome www.<websiteURL>.com
```

## [Run With Switches](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)

### Exit any running-instance of Chrome.

1. Right-click on your "Chrome" shortcut.
2. Choose properties.
3. At the end of your "Target:" line adds the command-line switch. For example:  
   `--disable-gpu-vsync    `

> With that example flag, it should look like below (replacing `--disable-gpu-vsync` with any other command-line switch you want to use):

```winbatch
chrome.exe --disable-gpu-vsync
```

> Launch Chrome like normal with the shortcut.

### [Some Switches ](https://peter.sh/experiments/chromium-command-line-switches/)

| Chromium Command            | Description                                                         |
|-----------------------------|---------------------------------------------------------------------|
| --ash-force-desktop         | Forces uses of the desktop version of Chrome                        |
| --disable-3d-apis           | Disables 3D APIs, including WebGL and Pepper 3D                     |
| --disable-accelerated-video | Disables GPU accelerated video                                      |
| --disable-background-mode   | Background apps won't continue to run when Chrome exits.            |
| --disable-gpu               | Disables hardware acceleration using the GPU                        |
| --disable-plugins           | Prevents all plugins from running                                   |
| --disable-plugins-discovery | Disables the discovery of missing plugins                           |
| --disable-preconnect        | Disables speculative TCP/IP preconnections                          |
| --disable-translate         | Disables the Google Translate feature                               |
| --dns-prefetch-disable      | Disable DNS prefetching                                             |
| --enable-kiosk-mode         | Kiosk Mode for Chrome OS                                            |
| --incognito                 | Launches Chrome directly in Incognito private browsing mode         |
| --media-cache-size          | Disk space used by media cache in bytes                             |
| --multi-profiles            | Enable multiple profiles in Chrome                                  |
| --new-profile-management    | Enable the new profile management in Chrome                         |
| --no-experiments            | Run Chrome without experiments set in chrome://flags                |
| --no-pings                  | No hyperlink auditing pings                                         |
| --no-referrers              | Use Chrome without sending referrers                                |
| --purge-memory-button       | Add purge memory button to Chrome                                   |
| --reset-variation-state     | Change the field trials that the browser is currently signed up for |
| --restore-last-session      | Restore the last session on run                                     |
| --ssl-version-min           | Specify the minimum SSL version accepted                            |
| --start-maximized           | Starts the Chrome window maximized.                                 |
| --window-position           | Specify the initial window position using --window-position=x,y     |
| --window-size               | Specify the initial window size using --window-size=x,y             |

---

# Resources

- [List Of CLI switches](https://www.ghacks.net/2013/10/06/list-useful-google-chrome-command-line-switches/)
- [Browser Dev Console Utilities Doc](https://developer.chrome.com/docs/devtools/console/utilities/#debug-function)
- [Developer Tools Documentation](https://developer.chrome.com/docs/)
