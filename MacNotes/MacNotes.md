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

> Non-removable MDM profiles cannot officially removed without doing a full system wipe. This is a problem when you restore a system from Time Machine after you enrolled it into the MDM, as the MDM
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