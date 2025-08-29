---
title: MacNotes
layout: default
permalink: MacNotes/
category: MacNotes
has_children: true
share: true
shortRepo:

- macnotes
- default

---

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

# Remove a nonremovable MDM profile from macos, without a wipe

> Non-removable MDM profiles cannot officially removed without doing a full system wipe.
> This is a problem when you restore a system from Time Machine after you enrolled it into the MDM, as the MDM
> will break, leaving you unable to re-enroll the machine.

1. Boot the Mac into Recovery Mode (hold down command+R during startup).
2. Go to the Utilities menu and open Terminal and type: csrutil disable. This will disable SIP (System Integrity Protection).
3. Reboot into the OS.
4. Open the integrated terminal and type:
   ```shell
      cd /var/db/ConfigurationProfiles
      rm -rf *
      mkdir Settings
      touch Settings/.profilesAreInstalled
   ```
5. Reboot.
6. Boot the Mac into Recovery Mode (hold down command+R during startup).
7. Go to the Utilities menu and open Terminal and type: csrutil enable. This will re-enable SIP.
8. Reboot into the OS.

> The profile will be now removed and you will be able to re-enroll the Mac to your MDM.

## Using Apple Configurator

1. Open Configurator on the host Mac.
2. Power on the target Mac and let it fully boot. You can be at the FileVault login screen, MDM lock screen or even have a user logged in.
3. Connect the host (any port) and target Mac (specific port from Apple’s documentation) with the USB cable.
   > On the target MacBook press and hold these four keys simultaneously: Left Control + Left Option + Right Shift + Power/TouchID button.
4. While holding those four keys the screen on the MacBook will go off as the Mac shuts down; do not let go yet.
5. After the screen goes black continue holding all four keys for an additional three seconds.
6. After three seconds release the Control, Option and Shift keys but continue holding Power/TouchID.
7. After several more seconds Configurator on the host Mac should show the DFU icon and you can release the Power/TouchID button.
8. Now just drag-and-drop the IPSW file you downloaded earlier onto the DFU logo and the Restore process will begin. A few minutes later the target Mac will be securely erased and have a clean install of macOS ready to go.

# System Preferences

## CLI

### Open Pane In System Preferences

- > #### most effective:

  ```shell
      open "x-apple.systempreferences:com.apple.preference.security"
  ```

- > #### but this works as well:

  ```shell
     open -b com.apple.systempreferences /System/Library/PreferencePanes/Security.prefPane
    (to find more preference panes, look at /System/Library/PreferencePanes)
  ```

> The first one, though, offers the ability to open a specific tab on given pane as well.
> This, for example, opens `"System Preferences" ` `-> ` `Security & Privacy` and then activates the `Privacy` tab:

```shell
   open "x-apple.systempreferences:com.apple.preference.security?Privacy"
```
