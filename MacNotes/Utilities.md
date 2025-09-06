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

#### run

`createinstallmedia` command provided by Apple (opens a new window). Note that the command is made for USB's formatted
with the name MyVolume:

```shell
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

> Note for users on Apple Silicon installing macOS older than Big Sur  
> If the `createinstallmedia` fails with `zsh: killed ` or `Killed: 9` then it's most likely an issue with the
> installer's code signature.  
> To fix this, you can run the following command:

```shell
cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/
codesign -s - -f --deep /Applications/Install\ macOS\ Big\ Sur.app
```

> You will need the command line tools for Xcode installed:

```shell
xcode-select --install
```

# [dscl](https://ss64.com/osx/dscl.html)

## unhide a user account

```shell
sudo dscl . create /Users/hiddenuser IsHidden 0
```

# [chflags](https://ss64.com/osx/chflags.html)

## Hide Home folder

```shell
sudo chflags hidden /Users/username
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

```shell
diskutil eraseDisk format name [APM[Format]|MBR[Format]|GPT[Format]]MountPoint|DiskIdentifier|DeviceNode
```

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
> > When a single APFS container has multiple volumes, the container’s free space is shared and is automatically
> > allocated
> > to any of the individual volumes as needed.
> > If desired, you can specify reserve and quota sizes for each volume.
> > Each volume uses only part of the overall container, so the available space is the
> > total size of the container, minus the size of all the volumes in the container.

> > `APFS`: Uses the APFS format. Choose this option if you don’t need an encrypted or case-sensitive format.

> > `APFS (Encrypted)`: Uses the APFS format and encrypts the volume.

> > `APFS (Case-sensitive)`: Uses the APFS format and is case-sensitive to file and folder names. For example, folders
> > named “Homework” and “HOMEWORK”
> > are two different folders.

> > `APFS (Case-sensitive, Encrypted)`: Uses the APFS format, is case-sensitive to file and folder names, and encrypts
> > the volume.
> > For example, folders named “Homework” and “HOMEWORK” are two
> > different folders.

| File System                 | Abbreviation |
|-----------------------------|--------------|
| Mac OS Extended (Journaled) | JHFS+        |
| Mac OS Extended             | HFS+         |
| MS-DOS fat32                | FAT32        |
| ExFAT                       | ExFAT        |

## Diskutil SecureErase

> Now we need to select the level of secure erase we want. There are five levels of secure erasing you can use labeled
> from 0-4.

> `Level 0 `just erases the drive by writing the number zero across every sector of the drive.

> `Level 1` does the same but with random data, thus taking longer.

> `Level 2 `erases the drive 7 times with 1’s and 0’s except the last pass where it uses random data.

> `Level 3` is a special algorithm that erases the drives with random data as well as data compiled from a special
> collection of 1’s and 0’s.

> `Level 4` is a little different and erases it three times, with random data on the first two passes and one set of
> zeroes on the last pass.

```shell
diskutil secureErase 4 /dev/disk2
```

# [csrutil](https://ss64.com/osx/csrutil.html)

# [pwpolicy](https://www.manpagez.com/man/8/pwpolicy/)

- [alt man page](https://www.unix.com/man-page/osx/8/pwpolicy/)
- [alt man page - config](https://mosen.github.io/profiledocs/macos/pwpolicy.html#macos-10-10)

## Set Global Policy

```shell
pwpolicy -setglobalpolicy minChars=0
```

# [Supported File Systems](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemDetails/FileSystemDetails.html#//apple_ref/doc/uid/TP40010672-CH8-SW26)

- > APFS
  -
  `The default file system for Apple platforms in macOS High Sierra and later, iOS 10.3 and later, watchOS 4.0 and later, and tvOS 10.2 and later.`
- > HFS Plus
  - `Mac OS Extended file system. The standard file system for prior versions of macOS, iOS, watchOS, and tvOS.`
- > HFS
  -
  `Mac OS Standard file system. The standard file system for older versions of macOS. File systems of this type are treated as read only in macOS 10.6 and later.`
- > WebDAV
  - `Used for directly accessing files on the web. For example, iDisk uses WebDAV for accessing files.`
- > UDF
  -
  `Universal Disk Format. The standard file system for all forms of DVD media (video, ROM, RAM and RW) and some writable CD formats.`
- > FAT
  - `The MS-DOS file system, with 16- and 32-bit variants. Fat 12-bit is not supported.`
- > ExFAT
  - `An interchange format used by digital cameras and other peripherals.`
- > SMB/CIFS
  - `Used for sharing files with Microsoft Windows SMB file servers and clients.`
- > AFP
  - `Apple Filing Protocol. The primary network file system for all versions of Mac OS.`
- > NFS
  -
  `Network File System. A commonly-used UNIX file sharing standard. macOS supports NFSv2 and NFSv3 over TCP and UDP. macOS 10.7 and later also supports NFSv4 over TCP.`
- > FTP
  - `A file system wrapper for the standard Internet File Transfer Protocol.`
- > Xsan
  - `Apple’s 64-bit cluster file system used in storage area networks.`
- > NTFS
  - `A standard file system for computers running the Windows operating system.`
- > CDDAFS
  - `A file system used to mount audio CDs and present audio tracks on disc to users as AIFF-C encoded files.`
- > ISO 9660
  - `The file system format used by CD-ROMs.`

# TimeMachine

Time Machine is a great tool for ensuring that your data is safe, and it's pretty [easy to set up and use][1]. But for some users, the basic Time Machine interface isn't enough. As with most of OS X's functions, there is a command-line tool that lets you do many things with Time Machine. Here's how you can use the `tmutil` command to control and tweak Time Machine from Apple's command-line tool, Terminal.

## The basics

![][2]

Most people won't need to use this command for their backups because the Time Machine interface will suffice. Who will need it? People who want to manage remote Macs or who want to run scripts containing commands for Time Machine.

The basics of the `tmutil` command can be found by typing `man tmutil` in Terminal. (You'll find the Terminal app in your /Applications/Utilities folder.) The `man` page tells you what you can do with this command.

For example, to turn Time Machine on or off, you can run these commands:

`sudo tmutil enable`

`sudo tmutil disable`

The `sudo` command is required for many of the commands you issue with `tmutil` because you need administrative privileges; you'll have to enter your password after running the above commands.

If you want to run a Time Machine backup right away, on a Mac that either has Time Machine disabled, or, say, just before updating to a new version of OS X, you can run this command:

`tmutil startbackup`

This is the same as choosing _Back Up Now_ from the Time Machine menu in the menu bar at the top of your screen.

And if you ever want to stop a backup, just run this:

`tmutil stopbackup`

## Save disk space on your laptop

Since your laptop isn't always connected to its backup disk, Time Machine retains "local snapshots," or files that it will copy to your backup disk the next time it is available. However, these local snapshots take up space, and you may want to turn this feature off if you don't have much room on your hard disk. You can do so with the following command:

`sudo tmutil disablelocal`

Running this command will also delete any local snapshots. You can turn local snapshots back on by running:

`sudo tmutil enablelocal`

If you love delving into the nitty-gritty, and especially if you manage remote Macs, you'll find this to be a very useful tool.

## Exclude files and folders

You can exclude certain files and folders from your Time Machine backups from the Time Machine pane in System Preferences. Naturally, you can also do this from the command line, too. Run this command:

`sudo tmutil addexclusion `

The part stands for the path to a file or folder. For example, if I want to exclude my Downloads folder from Time Machine backups, I would run the following:

`sudo tmutil addexclusion ~/Downloads`

The `tmutil addexclusion` command has an interesting property: it's sticky. When you use this command, the item you exclude remains in the Time Machine exclusion list even if you move it, which is not the case when you exclude items from the Time Machine preference pane. If you use the above command with the `-p `flag, then it will not be sticky, and will be the same as an exclusion you add from the Time Machine preference pane.

## Manage remote backups

If you're managing a remote Mac, such as a server, you may want to change Time Machine settings for that computer. You can start by finding where Time Machine backups are stored. Run this command:

`tmutil destinationinfo`

You'll see something like this in Terminal:

` Name : TM Backup `

`Kind : Local `

`Mount Point : /Volumes/TM Backup `

`ID : B9DAT9A6-0C37-4C39-A2AE-10A3403C97F9`

To change the destination, you can use two commands. First, remove the current destination like this:

`tmutil removedestination `

In place of , type in the text string returned by the `destinationinfo` command. Then run this command to set up a new destination disk:

`tmutil setdestination _volume_name_`

Replace `_volume_name_` with the name of the disk or volume you want to use. You can add multiple destinations as well, since Time Machine can rotate its backups on several disks or volumes. See `man tmutil` for more on setting up multiple backup destinations. (You can now do this without the command line too, see ["How to create redundant Time Machine backups."][3])

## Get Time Machine stats

Time Machine saves a lot of backups: one per hour for the past 24 hours; one a day for the past week; and one a week before that. You can get a list of all the backups on your Time Machine disk with this command:

`tmutil listbackups`

This will show the full path of each backup.

If you're curious about how much has changed in your Time Machine backups, there's a command that will let you find out how much of each backup is new. Run this command to see the delta between each of the Time Machine backups on your backup disk or volume:

`tmutil calculatedrift _backup_folder_`

Replace `_backup_folder_` with the path of the folder containing your backups. This is not the Backups.backupdb folder at the top level of your Time Machine volume, but rather the next folder down; this is generally labeled with your Mac's name.

For example, when I ran this command on my backups, I saw data like this:

![][4]

Here's what I saw when I ran the tmutil calculatedrift backup_folder command on my Mac.

Note that this command takes a long time to run, as your Mac has to calculate a lot of information.

The `tmutil` command offers many other options, such as the ability to inherit destinations, perform detailed comparisons of backups, restore items and much more. See `man tmutil` to find out all that you can do.

If you love delving into the nitty-gritty, and especially if you manage remote Macs, you'll find this to be a very useful tool.

*Article via [MacWorld](http://www.macworld.com/article/2033804/control-time-machine-from-the-command-line.html "Permalink to Control Time Machine from the command line")*

[1]: http://www.macworld.com/article/1164963/mac_basics_how_to_set_up_time_machine.html
[2]: http://images.techhive.com/images/article/2013/04/terminal-100032775-medium.png
[3]: http://www.macworld.com/article/2026503/how-to-create-redundant-time-machine-backups.html
[4]: http://images.techhive.com/images/article/2013/04/timemachine_commandline-100032773-large.png
