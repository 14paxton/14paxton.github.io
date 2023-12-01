---
title: Utilities
permalink: MacNotes/Utilities
category: MacNotes
parent: MacNotes
layout: default
has_children: false
share: true
shortRepo:
  - macnotes
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

# Software Update

## How do I apply all recommended updates?

> All updates that are recommended for your system:

```shell
sudo softwareupdate -r
```

## Updating Mac using the Terminal app

> To install all updates that are applicable to your system, enter:

```shell
sudo softwareupdate -i -a
```

## Install all but make sure you ignore ‘JavaForOSX’ updates:

```shell
sudo softwareupdate --ignore JavaForOSX
```

## To clear the list, ignored updates, enter:

```shell
sudo softwareupdate --reset-ignored
```

## Update/Install OS

### This gives you a list of available releases you can choose from. Once downloaded it will be saved in your Applications folder

```shell
softwareupdate --list-full-installers;echo;echo "Please enter version number you wish to download:";read;$(if [ -n "$REPLY" ]; then; echo "softwareupdate --fetch-full-installer --full-installer-version "$REPLY; fi);
```

#### Munki's InstallInstallMacOS utility

> Once finished, you'll find in your ~/macOS-Installer/

```shell
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python installinstallmacos.py
```

### [create installer](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/mac-install.html#setting-up-opencore-s-efi-environment)

#### run `createinstallmedia` command provided by Apple (opens a new window). Note that the command is made for USB's formatted with the name MyVolume:

```shell
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

> Note for users on Apple Silicon installing macOS older than Big Sur  
> If the `createinstallmedia` fails with `zsh: killed ` or `Killed: 9` then it's most likely an issue with the installer's code signature.  
> To fix this, you can run the following command:

```shell
cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/
codesign -s - -f --deep /Applications/Install\ macOS\ Big\ Sur.app
```

> You will need the command line tools for Xcode installed:

```shell
xcode-select --install
```

---

# [dscl](https://ss64.com/osx/dscl.html)

## unhide a user account

```shell
sudo dscl . create /Users/hiddenuser IsHidden 0
```

# [DISKUTIL ](https://ss64.com/osx/diskutil.html)

## find disk

```shell
diskutil list
```

## unmount

```shell
diskutil unmountDisk /dev/disk#
```

## force unmount

```shell
diskutil unmountDisk /force /dev/disk#
```

## Format drive/Volume

```shell
diskutil eraseDisk
```

`Usage: diskutil eraseDisk format name [APM[Format]|MBR[Format]|GPT[Format]]MountPoint|DiskIdentifier|DeviceNode`

> Completely erase an existing whole disk.  
> All volumes on this disk will be destroyed.  
> Ownership of the affected disk is required.  
> Format is the specific file system name you want to erase it as (HFS+, etc.).  
> Name is the (new) volume name (subject to file system naming restrictions),
> or can be specified as `%noformat%` to skip initialization (newfs).  
> You cannot erase the boot disk.

```shell
 diskutil eraseDisk JHFS+ UntitledUFS disk3
```

```shell
diskutil eraseDisk JHFS+ CleanDrive /dev/disk1
```

> Formats

> > `APFS`: Allocates disk space within a container (partition) on demand.
> > When a single APFS container has multiple volumes, the container’s free space is shared and is automatically allocated
> > to any of the individual volumes as needed.
> > If desired, you can specify reserve and quota sizes for each volume.
> > Each volume uses only part of the overall container, so the available space is the
> > total size of the container, minus the size of all the volumes in the container.

> > `APFS`: Uses the APFS format. Choose this option if you don’t need an encrypted or case-sensitive format.

> > `APFS (Encrypted)`: Uses the APFS format and encrypts the volume.

> > `APFS (Case-sensitive)`: Uses the APFS format and is case-sensitive to file and folder names. For example, folders named “Homework” and “HOMEWORK” are two different folders.

> > `APFS (Case-sensitive, Encrypted)`: Uses the APFS format, is case-sensitive to file and folder names, and encrypts the volume.
> > For example, folders named “Homework” and “HOMEWORK” are two
> > different folders.

| File System | Abbreviation | | --------------------------- | ------------ | --- | ----- | ----- | | Mac OS Extended (Journaled) | JHFS+ | | Mac OS Extended | HFS+ | | MS-DOS fat32 | FAT32 | | ExFAT | ExFAT |

## Diskutil SecureErase

> Now we need to select the level of secure erase we want. There are five levels of secure erasing you can use labeled from 0-4.

> `Level 0 `just erases the drive by writing the number zero across every sector of the drive.

> `Level 1` does the same but with random data, thus taking longer.

> `Level 2 `erases the drive 7 times with 1’s and 0’s except the last pass where it uses random data.

> `Level 3` is a special algorithm that erases the drives with random data as well as data compiled from a special collection of 1’s and 0’s.

> `Level 4` is a little different and erases it three times, with random data on the first two passes and one set of zeroes on the last pass.

```shell
diskutil secureErase 4 /dev/disk2
```

---

# RECOVERY

## [csrutil](https://ss64.com/osx/csrutil.html)

---
