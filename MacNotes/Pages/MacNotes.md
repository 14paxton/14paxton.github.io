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
# diskutil  
## Format harddrive
| File System 		    |	Abbreviation  
Mac OS Extended (Journaled) |	JHFS+  
Mac OS Extended		    |	HFS+  
MS-DOS fat32		    |   FAT32  
ExFAT 			    |	ExFAT  
  
```bash  
diskutil eraseDisk JHFS+ CleanDrive /dev/disk1  
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
     > All updates that are recommended for your system:  
     
```bash
	sudo softwareupdate -r  
```

## Updating Mac using the Terminal app  
    > To install all updates that are applicable to your system, enter:  
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
> Once finished, you'll find in your ~/macOS-Installer/

```bash
mkdir -p ~/macOS-installer && cd ~/macOS-installer && curl https://raw.githubusercontent.com/munki/macadmin-scripts/main/installinstallmacos.py > installinstallmacos.py && sudo python installinstallmacos.py
```

### create installer
#### run ```createinstallmedia``` command provided by Apple (opens new window). Note that the command is made for USB's formatted with the name MyVolume:
```bash
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
```

---

#RECOVERY
## [csrutil](https://ss64.com/osx/csrutil.html)

---

# Slow Java app  
       
First you need to find the hostname of your Mac. You do this from System Preferences. Click the Sharing icon in System Preferences.  
javahosts_1.png  
  
  
You will see a box that shows the Computer Name, under that will be the hostname ending in .local. That's what you will need, so take note of it. In my case it was Enzyme.local.  
javahosts_2.png  
  
The next step is to update your /etc/hosts file. This must be done as root, so at the Terminal, type in "sudo vi /etc/hosts". This will ask for your password...  
  
Add the hostname you noted from earlier at the end of lines that start with "127.0.0.1" and "::1". If you don't know how to use vi, look here. You can also use nano instead, just replace "vi" in the command above with "nano".  
  
In the end this is what my /etc/hosts file looked like:  
127.0.0.1       TPLNK-BPAXTON3.local  
255.255.255.255 broadcasthost  
::1             TPLNK-BPAXTON3.local  
       
# Create Ram Disk For Intellij  
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://XXXXX`  
Replace the X characters with a number that represents the block size for the total capacity of your RAM Disk. Calculate this number by multiplying your desired size of disk in megabytes by 2048. In our example, we’ll create a 4 GB RAM Disk, which requires a number of 8388608 (4096 * 2048). Input this number in place of the X characters in the command above:  
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://8388608`  
  
 ex.  
  
``if [ ! -d /Volumes/JetBrainsKeys/tbcore/intellij ]; then    
    diskutil erasevolume HFS+ JetBrainsKeys `hdiutil attach -nomount ram://6291456`;  
    mkdir -p /Volumes/JetBrainsKeys/intellij;  
    chmod -R 777 /Volumes/JetBrainsKeys;  
   #mkdir -p /Volumes/JetBrainsKeys/tbcore/intellij/caches;  
   #ln -s /Volumes/JetBrainsKeys/intellij/caches /Users/bpaxton/Library/Caches/JetBrains/IntelliJIdea2022.1/caches;  
 fi``  
  
# JAVA  
- On Mac OS X 10.5 or later, we can use  
`/usr/libexec/java_home`  
to return the location of the default JDK  
  
         /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home    
  
- Also, find all installed JDKs.  
 `/usr/libexec/java_home -V`  
  
   Matching Java Virtual Machines (4):  
    16 (x86_64) "Oracle Corporation" - "OpenJDK 16-ea" /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home  
    15.0.1 (x86_64) "UNDEFINED" - "OpenJDK 15.0.1" /usr/local/Cellar/openjdk/15.0.1/libexec/openjdk.jdk/Contents/Home  
    14.0.2 (x86_64) "AdoptOpenJDK" - "AdoptOpenJDK 14" /Library/Java/JavaVirtualMachines/adoptopenjdk-14.jdk/Contents/Home  
    1.8.0_275 (x86_64) "UNDEFINED" - "OpenJDK 8" /usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home  
    /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home    
  
- Also, run a specified JDK command.  
`/usr/libexec/java_home -v1.8`  
  
  /usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home    
    
- On macOS 10.15 Catalina and later, the zsh is the default Terminal shell, and we can set the $JAVA_HOME environment variable in either `~/.zshenv` or `~/.zshrc`  
  
1) Open Terminal  
	Confirm you have JDK by typing “which java”. It should show something like /usr/bin/java.  
	  
2) Check you have the needed version of Java, by typing `java -version`.  
	JAVA_HOME is essentially the full path of the directory that contains a sub-directory named bin which in turn contains the java.  
	- For Mac OSX – it is /Library/Java/Home  
3) Set JAVA_HOME using this command in Terminal:   
	`export JAVA_HOME=/Library/Java/Home`  
4) `echo $JAVA_HOME` on Terminal to confirm the path  
  
You should now be able to run your application  
Note that this sets JAVA_HOME only for this session. If you want it to persist, you will have to add the command to your `~/.profile file`.  Below are instructions on how to accomplish this instead:  
  
1) Open up Terminal.app (Applications >> Utilities >> Terminal)  
	 `emacs .profile`  
2) add this to the end of the .profile file:  
	`JAVA_HOME=/Library/Java/Home`  
	`export JAVA_HOME;`  
  
3) Open the ~/.zshenv  
	`nano ~/.zshenv`  
  
4) Add the following content  
	`export JAVA_HOME=$(/usr/libexec/java_home)`  
  
5) Source the file and print the $JAVA_HOME, done.  
	 `source ~/.zshenv`  
	`echo $JAVA_HOME`  
  
    /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home `  
