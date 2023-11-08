---
title:        QuickScripts
permalink:    MacNotes/QuickScripts
category:     MacNotes
parent:       MacNotes
layout:       default
has_children: false
share:        true
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

***                

<br/>

# get env variables

```shell
env
```

# get local ip

```shell  
osascript -e "IPv4 address of (system info)"  
```  

```shell  
ifconfig | grep "inet "   
```  

# convert file/image to base64

```shell  
base64 -i ./post_u_north_gate.jpg | pbcopy   
```  

```shell  
cat ./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy  
```  

```shell  
./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy      
```  

# ENABLE ROOT

```shell            
dsenableroot            
```            

## Disable Root

```shell            
dsenableroot -d            
```            

# Copy terminal output directly to clip board

```shell            
pbcopy < ~/.ssh/id_rsa.pub            
```            

# Restart

```shell            
sudo shutdown now            
            
#specific time              
sudo shutdown hhmm            
```            

# Check Permissions

```shell            
ls -lO /System            
```            

# Schedule Mac to power on or wake, M refers to Monday

```shell            
sudo pmset repeat wake M 8:00:00            
```            

# Schedule Mac to shut down:

```shell            
sudo pmset repeat shutdown F 20:00:00            
```            

# View your current schedules:

```shell            
pmset -g sched            
```            

# Cancel your schedules:

```shell            
sudo pmset repeat cancel            
```

# Users

## Get User List

```shell            
dscl . list /Users | grep -v "^_"            
```            

## List existing group

- > IDs in numerical order
     ```shell
       dscl . -list /Groups PrimaryGroupID | awk '{print $2}' | sort -n
     ```
- > List sorted by group name:
     ```shell
      dscl . list /Groups PrimaryGroupID
     ```

- > List sorted by group gid
    ```shell
     dscl . list /Groups PrimaryGroupID | tr -s ' ' | sort -n -t ' ' -k2,2
    ```

- > List groups with members
    ```shell
      dscl . list /Groups GroupMembership
    ```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Note: neither dscacheutil nor dscl list members of the group staff other than root. Use dsmemberutil to confirm a member belongs to the group staff.       
</div> 

> Example a user with uid 501:

   ```shell
    dsmemberutil checkmembership -u 501 -g 20
   ```

### Create the new group 'newgroup' and assign it an ID

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    One thing you have to take care when choosing a group id is that the id is not already used by another group. In order to list the existing group ids in numerical order you can do:
<p>
<code>
dscl . -list /groups PrimaryGroupID | awk '{print $2}' | sort -n
</code> 
</p>      
</div> 

```shell
sudo dscl . -create /Groups/newgroup
sudo dscl . -create /Groups/newgroup PrimaryGroupID 1000
```

#### View the new group

```shell
dscl . -read /Groups/newgroup
```

> output

   ```
    AppleMetaNodeLocation: /Local/Default
    GeneratedUID: 423AF02C-F053-41E0-ABCD-33127EF9A9CA
    PrimaryGroupID: 1000
    RecordName: newgroup
    RecordType: dsRecTypeStandard:Groups
   ```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
OS X conventionally uses different ID ranges for different types of accounts. Here's the current layout as I understand it:

up to 100: Reserved for static system-defined (built in) groups

101 - 199: Used by the OS for dynamically-created groups (e.g. share point access groups)

200 - ?: More static system groups (apparently 100 wasn't enough)

400 - 500: More dynamic system groups

501 and up: Local admin-created groups

1024 and up: Domain-based admin-created groups
</div> 

## Add user to group

```shell            
sudo dseditgroup -o edit -a john -t user admin            
sudo dseditgroup -o edit -a john -t user wheel            
```            

## Create new user

```shell
sudo dscl . -create /Users/newuser
sudo dscl . -create /Users/newuser UserShell /bin/bash
sudo dscl . -create /Users/newuser RealName "New User"
sudo dscl . -create /Users/newuser UniqueID "1000"
sudo dscl . -create /Users/newuser PrimaryGroupID 1000
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

### View the new user

```shell
dscl . -read /Users/newuser
```

> output

```
AppleMetaNodeLocation: /Local/Default
GeneratedUID: 47D6D841-C7F1-4962-9F7E-167E8BFC3A91
PrimaryGroupID: 1000
RealName:
Application
RecordName: newuser
RecordType: dsRecTypeStandard:Users
UniqueID: 1000
UserShell: /usr/bash
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

---