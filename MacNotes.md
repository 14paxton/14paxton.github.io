---
title:        MacNotes
layout:       default
has_children: false
permalink:    MacNotes/
category:     MacNotes
share:        true
shortRepo:    ghpages              
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

# QUICK SCRIPTS

## get local ip

```shell
osascript -e "IPv4 address of (system info)"
```

```shell
ifconfig | grep "inet " 
```

## convert file/image to base64

```shell
base64 -i ./post_u_north_gate.jpg | pbcopy 
```

```shell
cat ./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy
```

```shell
./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy    
```

## ENABLE ROOT

```shell          
dsenableroot          
```          

### disable

```shell          
dsenableroot -d          
```          

## Copy terminal output directly to clip board

```shell          
pbcopy < ~/.ssh/id_rsa.pub          
```          

## restart

```shell          
sudo shutdown now          
          
#specific time            
sudo shutdown hhmm          
```          

## check permissions

```shell          
ls -lO /System          
```          

## schedule Mac to power on or wake, M refers to Monday

```shell          
sudo pmset repeat wake M 8:00:00          
```          

## schedule Mac to shut down:

```shell          
sudo pmset repeat shutdown F 20:00:00          
```          

## see your current schedules:

```shell          
pmset -g sched          
```          

## cancel your schedules:

```shell          
sudo pmset repeat cancel          
```          

          
---

# HomeBrew

## Ruby

ruby is keg-only, which means it was not symlinked into

```          
/opt/homebrew          
```          

because macOS already provides this software and installing another version in          
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH, run:

```ruby          
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc          
```          

For compilers to find ruby you may need to set:

```shell          
export LDFLAGS="-L/opt/homebrew/opt/ruby/lib"          
export CPPFLAGS="-I/opt/homebrew/opt/ruby/include"          
```          

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

# Users

## Get User List

```shell          
dscl . list /Users | grep -v “^_”          
```          

## Add user to group

```shell          
sudo dseditgroup -o edit -a john -t user admin          
sudo dseditgroup -o edit -a john -t user wheel          
```          

## Create new user

```shell          
sudo dscl . -create /Users/username          
```          

```shell          
sudo dscl . -create /Users/username UserShell /bin/bash          
```          

```shell          
sudo dscl . -create /Users/username RealName “John Smith”          
```          

```shell          
sudo dscl . -create /Users/username UniqueID 1001          
```          

```shell          
sudo dscl . -create /Users/username PrimaryGroupID 1000          
```          

```shell          
sudo dscl . -create /Users/username NFSHomeDirectory /Local/Users/username          
```          

```shell          
sudo dscl . -passwd /Users/username password          
```          

```shell          
sudo dscl . -append /Groups/admin GroupMembership username          
```          

## add user to SUDO

```shell          
su AdminUser          
authentication, and then:          
```          

> Now, as Adminuser, use the visudo command to edit the sudoers file:

```shell          
sudo visudo          
# Add the following line to the sudoers file:            
username ALL = (ALL) ALL          
```          

> If you want to be able to use sudo without typing a password:

```shell          
username        ALL = (ALL) NOPASSWD:ALL          
```          

## Change Password

```shell          
sudo dscl . -passwd /Users/username password          
```          

# Command Line Software Update Utility

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

#### run ``createinstallmedia`` command provided by Apple (opens a new window). Note that the command is made for USB's formatted with the name MyVolume:

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

# RECOVERY

## [csrutil](https://ss64.com/osx/csrutil.html)

          
---

# Create Ram Disk For Intellij

```shell          
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://XXXXX`          
```

> Replace the `X` characters with a number that represents the block size for the total capacity of your RAM Disk.

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border: 1px solid #bce8f1;">            
           Calculate this number by multiplying your desired size of disk in megabytes by 2048. 

In our example, we’ll create a 4 GB RAM Disk, which requires a number of 8388608 (4096 * 2048).

Input this number in place of the X characters in the command above:
</div>            

```shell          
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://8388608          
```          

## script to create ramdisk

```shell          
if [ ! -d /Volumes/JetBrainsKeys/tbcore/intellij ]; then diskutil erasevolume HFS+ JetBrainsKeys `hdiutil attach -nomount ram://6291456`;          
mkdir -p /Volumes/JetBrainsKeys/intellij;          
chmod -R 777 /Volumes/JetBrainsKeys;          
          
#mkdir -p /Volumes/JetBrainsKeys/tbcore/intellij/caches;            
#ln -s /Volumes/JetBrainsKeys/intellij/caches/Users/bpaxton/Library/Caches/JetBrains/IntelliJIdea2022.1/caches;            
fi          
```          

# JAVA

## On Mac OS X 10.5 or later, we can use

``/usr/libexec/java_home``

**`to return the location of the default JDK `**          
``/Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home  ``

## find all installed JDKs.

```shell          
/usr/libexec/java_home -V          
```          

```shell          
Matching Java Virtual Machines (4):          
16 (x86_64) "Oracle Corporation" - "OpenJDK 16-ea" /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home          
15.0.1 (x86_64) "UNDEFINED" - "OpenJDK 15.0.1" /usr/local/Cellar/openjdk/15.0.1/libexec/openjdk.jdk/Contents/Home          
14.0.2 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 14" /Library/Java/JavaVirtualMachines/adoptopenjdk-14.jdk/Contents/Home          
1.8.0_275 (x86_64) "UNDEFINED" - "OpenJDK 8" /usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home          
/Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home         
```          

## run a specified JDK command.

```/usr/libexec/java_home -v1.8```          
```/usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home```

## set the JAVA_HOME environment variable

> On macOS 10.15 Catalina and later, the zsh is the default Terminal shell, and we can in either ```~/.zshenv``` or  ```~/.zshrc```

   1) Confirm you have JDK by typing          
        ```which java```
          output ->  ```/usr/bin/java```
   2) Check you have the needed version of Java, by typing          
      `java -version`          
      ==`JAVA_HOME` is essentially the full path of the directory that contains a sub-directory named `bin` which in turn contains the java.          
      For Mac OSX it is `/Library/Java/Home`==
   3) Set JAVA_HOME          
      `export JAVA_HOME=/Library/Java/Home`
   4) `echo $JAVA_HOME` on Terminal to confirm the path

> Note that this sets JAVA_HOME only for this session. If you want it to persist, you will have to add the command to your `~/.profile file`==

   1) ```vim .profile```
   2) add this to the end of the .profile file:          
      ```JAVA_HOME=/Library/Java/Home```         
      ```export JAVA_HOME;```
   3) ```nano ~/.zshenv```
   4) Add the following content          
      ```export JAVA_HOME=$(/usr/libexec/java_home)```
   5) Source the file and print the $JAVA_HOME          
      ```source ~/.zshenv```         
      ```echo $JAVA_HOME```         
        output -> ```/Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home```

## Slow Java app
  1. you need to find the hostname of your Mac.        
        You do this from System Preferences.        
        Click the Sharing icon in System Preferences.          

  2. You will see a box that shows the Computer Name, under that will be the hostname ending in ```.local```.        
      That's what you will need, so take note of it.        
       In my case it was ```Enzyme.local```.          

  3. The next step is to update your `/etc/hosts` file. This must be done as root, so at the Terminal, type in 
      ```shell
        sudo vi /etc/hosts
     ```
     This will ask for your password...
     Add the hostname you noted from earlier at the end of lines that start with "127.0.0.1" and "::1".

     In the end this is what my `/etc/hosts `file looked like:
        ```          
          127.0.0.1       TPLNK-BPAXTON3.local          
          255.255.255.255 broadcasthost          
          ::1             TPLNK-BPAXTON3.local`          
        ```          

          
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