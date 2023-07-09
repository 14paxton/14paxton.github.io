---
title: MacNotes  
category: MacNotes/Pages  
share: true  
repo:  
  owner: 14paxton  
  repo: 14paxton.github.io  
  branch: master  
  autoclean: false  
---

# Resources
- [CLI Gist Resource](https://gist.github.com/bzerangue/dca8fc2d63309ba2bd9f)
- [Making OS installer ](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/mac-install.html#setting-up-opencore-s-efi-environment)
- [Mac Official Doc , Make bootable insaller ](https://support.apple.com/en-us/HT201372) 

# QUICK SCRIPTS
## Copy terminal output directly to clip board  
```bash  
pbcopy < ~/.ssh/id_rsa.pub  
```  

## restart
```bash
	sudo shutdown now

	#specific time
	sudo shutdown hhmm
```

## check permissions
```bash
	ls -lO /System
```

---
# [DISKUTIL  ](https://ss64.com/osx/diskutil.html)

## find disk
```bash
diskutil list
```

## unmount
```bash
diskutil unmountDisk /dev/disk#
```

## force unmount
```bash
diskutil unmountDisk /force /dev/disk#
```

## Format drive/Volume

	diskutil eraseDisk
	Usage: diskutil eraseDisk format name [APM[Format]|MBR[Format]|GPT[Format]]
	MountPoint|DiskIdentifier|DeviceNode
	Completely erase an existing whole disk. All volumes on this disk will be
	destroyed. Ownership of the affected disk is required.
	Format is the specific file system name you want to erase it as (HFS+, etc.).
	Name is the (new) volume name (subject to file system naming restrictions),
	or can be specified as %noformat% to skip initialization (newfs).
	You cannot erase the boot disk.
	Example: diskutil eraseDisk JHFS+ UntitledUFS disk3
	

```bash  
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

| File System 		    |	Abbreviation  |
| --- | ----------- |
| Mac OS Extended (Journaled) |	JHFS+  |
| Mac OS Extended		    |	HFS+ |  
| MS-DOS fat32		    |   FAT32  |
| ExFAT 			    |	ExFAT | 
  
## diskutil secureErase.  Now we need to select the level of secure erase we want.  There are 5 levels of secure erasing you can use labeled from 0-4. 
```
Level 0 just erases the drive by writing the number zero across every sector of the drive. 
Level 1 does the same but with random data, thus taking longer.
Level 2 erases the drive 7 times with 1’s and 0’s except the last pass where it uses random data.
Level 3 is a special algorithm that erases the drives with random data as well as data compiled from a special collection of 1’s and 0’s.
Level 4 is a little different and erases it 3 times, with random data on the first 2 passes and 1 set of zeroes on the last pass.
```

```bash
diskutil secureErase 4 /dev/disk2
```

---

# Users  
## Get User List  
```bash  
dscl . list /Users | grep -v “^_”  
```  
  
## Add user to group  
```bash
 sudo dseditgroup -o edit -a john -t user admin  
 sudo dseditgroup -o edit -a john -t user wheel  
```

## add user to SUDO  
 ```bash
 su AdminUser
 authentication, and then:  
 ```
    
   > Now, as Adminuser, use the visudo command to edit the sudoers file:  
  
```bash
      Adminuser % sudo visudo  
      # Add the following line to the sudoers file:  
      StandardJoeUser ALL = (ALL) ALL  
```
  
## Change Password  
```bash
sudo dscl . -passwd /Users/username password  
```  

# Command Line Software Update Utility
## How do I apply all recommended updates?  
>  All updates that are recommended for your system:  
     
```bash
	sudo softwareupdate -r  
```

## Updating Mac using the Terminal app  
>  To install all updates that are applicable to your system, enter:  

```bash
	sudo softwareupdate -i -a  
```

## Install all but make sure you ignore ‘JavaForOSX’ updates:  
```bash
	 sudo softwareupdate --ignore JavaForOSX  
```

## To clear the list ignored updates, enter:  
```bash
     sudo softwareupdate --reset-ignored  
```       

## Update/Install OS
### This gives you a list of available releases you can choose from. Once downloaded it will be saved in your Applications folder
```bash
softwareupdate --list-full-installers;echo;echo "Please enter version number you wish to download:";read;$(if [ -n "$REPLY" ]; then; echo "softwareupdate --fetch-full-installer --full-installer-version "$REPLY; fi);
```

#### Munki's InstallInstallMacOS utility
>  Once finished, you'll find in your ~/macOS-Installer/

```bash
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python installinstallmacos.py
```

### [create installer](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/mac-install.html#setting-up-opencore-s-efi-environment)
#### run ```createinstallmedia``` command provided by Apple (opens new window). Note that the command is made for USB's formatted with the name MyVolume:
```bash
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

> Note for users on Apple Silicon installing macOS older than Big Sur
> If the `createinstallmedia` fails with `zsh: killed ` or `Killed: 9` then it's most likely an issue with the installer's code signature. To fix this, you can run the following command:

```bash
cd /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/
codesign -s - -f --deep /Applications/Install\ macOS\ Big\ Sur.app
```

> You will need the command line tools for Xcode installed:

```bash
xcode-select --install
```

---

# RECOVERY

## [csrutil](https://ss64.com/osx/csrutil.html)

---

# Create Ram Disk For Intellij  
```bash
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://XXXXX`  
```

==Replace the X characters with a number that represents the block size for the total capacity of your RAM Disk.== 
	Calculate this number by multiplying your desired size of disk in megabytes by 2048. In our example, we’ll create a 4 GB RAM Disk, which requires a number of 8388608 (4096 * 2048). Input this number in place of the X characters in the command above:  
	
```bash
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://8388608 
```

## script to create ramdisk  
```bash
if [ ! -d /Volumes/JetBrainsKeys/tbcore/intellij ]; then diskutil erasevolume HFS+ JetBrainsKeys `hdiutil attach -nomount ram://6291456`;  
	mkdir -p /Volumes/JetBrainsKeys/intellij;  
	chmod -R 777 /Volumes/JetBrainsKeys;  
	
	#mkdir -p /Volumes/JetBrainsKeys/tbcore/intellij/caches;  
	#ln -s /Volumes/JetBrainsKeys/intellij/caches/Users/bpaxton/Library/Caches/JetBrains/IntelliJIdea2022.1/caches;  
fi```
  
# JAVA  
## On Mac OS X 10.5 or later, we can use  
```/usr/libexec/java_home``` 

**`to return the location of the default JDK `** 
```/Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home  ```

## find all installed JDKs.  
 `/usr/libexec/java_home -V` 
  
   ==Matching Java Virtual Machines (4):  
    16 (x86_64) "Oracle Corporation" - "OpenJDK 16-ea" /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home  
    15.0.1 (x86_64) "UNDEFINED" - "OpenJDK 15.0.1" /usr/local/Cellar/openjdk/15.0.1/libexec/openjdk.jdk/Contents/Home  
    14.0.2 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 14" /Library/Java/JavaVirtualMachines/adoptopenjdk-14.jdk/Contents/Home  
    1.8.0_275 (x86_64) "UNDEFINED" - "OpenJDK 8" /usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home  
    /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home==    
  
##  run a specified JDK command.  
`/usr/libexec/java_home -v1.8`  
  ==/usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home==    
    
##  set the JAVA_HOME environment variable
> On macOS 10.15 Catalina and later, the zsh is the default Terminal shell, and we can in either `~/.zshenv` or  `~/.zshrc`  
  
1)  Confirm you have JDK by typing 
	`which java`
	
	 output ->  ==/usr/bin/java==
2) Check you have the needed version of Java, by typing 
	`java -version`
	==`JAVA_HOME` is essentially the full path of the directory that contains a sub-directory named `bin` which in turn contains the java.  
		For Mac OSX  it is `/Library/Java/Home`==  
3) Set JAVA_HOME  
	`export JAVA_HOME=/Library/Java/Home`  
4) `echo $JAVA_HOME` on Terminal to confirm the path  
    
==Note that this sets JAVA_HOME only for this session. If you want it to persist, you will have to add the command to your `~/.profile file`==
	1)  `vim .profile`  
	2) add this to the end of the .profile file:  
		`JAVA_HOME=/Library/Java/Home`  
		`export JAVA_HOME;`    
	3) `nano ~/.zshenv`  
	4) Add the following content  
		`export JAVA_HOME=$(/usr/libexec/java_home)`  
	5) Source the file and print the $JAVA_HOME 
		 `source ~/.zshenv`  
		`echo $JAVA_HOME`    
		output -> ==`/Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home`==

## Slow Java app  
First you need to find the hostname of your Mac. You do this from System Preferences. Click the Sharing icon in System Preferences.  
javahosts_1.png  
  
You will see a box that shows the Computer Name, under that will be the hostname ending in .local. That's what you will need, so take note of it. In my case it was Enzyme.local.  
javahosts_2.png  
  
The next step is to update your `/etc/hosts` file. This must be done as root, so at the Terminal, type in `sudo vi /etc/hosts`. This will ask for your password...  
  
Add the hostname you noted from earlier at the end of lines that start with "127.0.0.1" and "::1". 

In the end this is what my `/etc/hosts `file looked like:  
	==`127.0.0.1       TPLNK-BPAXTON3.local  
	255.255.255.255 broadcasthost  
	::1             TPLNK-BPAXTON3.local`

---

# DEBUGGING - OBSCURE ISSUES

##  *[How to fix Mac OSX stuck/hanging on progress bar after login](https://smyl.es/how-to-fix-mac-osx-stuckhanging-on-progress-bar-will-not-boot/)*

