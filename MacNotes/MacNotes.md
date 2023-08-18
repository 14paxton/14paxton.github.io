---
title:        MacNotes
layout:       default
permalink:    MacNotes/
category:     MacNotes
has_children: true
share:        true
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

***              

<br/>              

# [DISKUTIL  ](https://ss64.com/osx/diskutil.html)

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

``Usage: diskutil eraseDisk format name [APM[Format]|MBR[Format]|GPT[Format]]MountPoint|DiskIdentifier|DeviceNode``

> Completely erase an existing whole disk.            
> All volumes on this disk will be            
> destroyed.            
> Ownership of the affected disk is required.            
> Format is the specific file system name you want to erase it as (HFS+, etc.).            
> Name is the (new) volume name (subject to file system naming restrictions),            
> or can be specified as %noformat% to skip initialization (newfs).            
> You cannot erase the boot disk.

``Example: diskutil eraseDisk JHFS+ UntitledUFS disk3``

```shell            
diskutil eraseDisk JHFS+ CleanDrive /dev/disk1            
```            

> Formats

```            
APFS allocates disk space within a container (partition) on demand. When a single APFS container has multiple volumes, the container’s free space is shared and is automatically allocated to any of the individual volumes as needed. If desired, you can specify reserve and quota sizes for each volume. Each volume uses only part of the overall container, so the available space is the total size of the container, minus the size of all the volumes in the container.            
            
   APFS: Uses the APFS format. Choose this option if you don’t need an encrypted or case-sensitive format.            
            
   APFS (Encrypted): Uses the APFS format and encrypts the volume.            
            
   APFS (Case-sensitive): Uses the APFS format and is case-sensitive to file and folder names. For example, folders named “Homework” and “HOMEWORK” are two different folders.            
            
   APFS (Case-sensitive, Encrypted): Uses the APFS format, is case-sensitive to file and folder names, and encrypts the volume. For example, folders named “Homework” and “HOMEWORK” are two different folders.            
```            

| File System                 | Abbreviation |            
|-----------------------------|--------------|            
| Mac OS Extended (Journaled) | JHFS+        |            
| Mac OS Extended             | HFS+         |            
| MS-DOS fat32                | FAT32        |            
| ExFAT                       | ExFAT        |            

## diskutil secureErase. Now we need to select the level of secure erase we want. There are 5 levels of secure erasing you can use labeled from 0-4.

```            
Level 0 just erases the drive by writing the number zero across every sector of the drive.            
            
Level 1 does the same but with random data, thus taking longer.            
            
Level 2 erases the drive 7 times with 1’s and 0’s except the last pass where it uses random data.            
            
Level 3 is a special algorithm that erases the drives with random data as well as data compiled from a special collection of 1’s and 0’s.            
            
Level 4 is a little different and erases it 3 times, with random data on the first 2 passes and 1 set of zeroes on the last pass.            
```            

```shell            
diskutil secureErase 4 /dev/disk2            
```            

            
---

# RECOVERY

## [csrutil](https://ss64.com/osx/csrutil.html)

            
---

# Launching Apps From Terminal

Terminal command to launch MacOS gui apps is appropriately called ‘open’ and here is how it works at it’s most simple:

```shell  
open -a ApplicationName  
  
```  

That will open the defined app named “ApplicationName”.

But open is much more powerful than that.          
If you just type ```open``` at the command prompt, you’ll return the basic help file with details on how to properly use the command with a variety of flags and            
syntax.

While the open command exists in all versions of Mac OS X, the abilities vary somewhat depending on what version of MacOS / Mac OS X the Mac is running.          
Nonetheless, in modern releases this is what            
you’ll see:

- Usage:   
  open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-b ] [-a ] [filenames] [--args arguments]

- Help:   
  Open opens files from a shell.            
  By default, opens each file using the default application for that file.            
  If the file is in the form of a URL, the file will be opened as a URL.

- Options:            
  -a Opens with the specified application.            
  -b Opens with the specified application bundle identifier.            
  -e Opens with TextEdit.            
  -t Opens with default text editor.            
  -f Reads input from standard input and opens with TextEdit.            
  -F --fresh Launches the app fresh, that is, without restoring windows.          
  Saved persistent state is lost, excluding Untitled documents.            
  -R, --reveal Selects in the Finder instead of opening.            
  -W, --wait-apps Blocks until the used applications are closed (even if they were already running).            
  --args All remaining arguments are passed in argv to the application's main() function instead of opened.            
  -n, --new Open a new instance of the application even if one is already running.            
  -j, --hide Launches the app hidden.            
  -g, --background Does not bring the application to the foreground.            
  -h, --header Searches header file locations for headers matching the given filenames, and opens them.

In other words, example simple command syntax could look like the following, opening “ApplicationName” with the file located at the path ‘/file/to/open’:

```shell  
open -a ApplicationName /file/to/open  
  
```  

You’ll note you don’t need the full path to the application name, but you would need the full path to a file name.

The usage is likely self explanatory to those who have experience in the command line environment, but for those who are new to the Terminal, don’t be too confused, it is easy to use and we’ll            
explain.          
For example, if you want to edit /etc/motd with TextWrangler to change your Message of the Day, but you hate the command line editors nano and vi, here is what you’d type:

```shell  
open -a TextWrangler /etc/motd  
```  

 <div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">              
     Also worth noting is that if you are launching an application with spaces in its name, you’ll want to add a backslash after each word, opening Adobe Photoshop CS would look like this:  

 </div>   

```shell  
open -a Adobe\ Photoshop\ CS  
```  

> Launching GUI Apps as root from the Command Line

   ```shell  
   sudo open -a TextEdit /tmp/magicfile  
     
   ```  

Creating Shell Aliases for Frequently Launched GUI Apps

1. First launch the profile or .bash_profile into a text editor:
    ```shell  
    nano .profile  
    ```  

   or

    ```shell  
    open -e .profile  
    ```  

2. add the following to a new line:

    ```text  
    alias photoshop="open -a Adobe\ Photoshop\ CS"  
    ```  

   This creates an alias, so that the ```open -a Adobe\ Photoshop CS``` command is now shortened to simply ```photoshop```.

---

# DEBUGGING - OBSCURE ISSUES

## *[How to fix Mac OSX stuck/hanging on progress bar after login](https://smyl.es/how-to-fix-mac-osx-stuckhanging-on-progress-bar-will-not-boot/)*

# Resources

- [ CLI Gist Resource ](https://gist.github.com/bzerangue/dca8fc2d63309ba2bd9f)
- [ Making OS installer ](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/mac-install.html#setting-up-opencore-s-efi-environment)
- [ Mac Official Doc, Make bootable installer ](https://support.apple.com/en-us/HT201372)