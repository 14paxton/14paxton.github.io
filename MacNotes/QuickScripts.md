---
title: QuickScripts
permalink: MacNotes/QuickScripts
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

# Create Ram Disk For Intellij

```shell
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://XXXXX`
```

> Replace the `X` characters with a number that represents the block size for the total capacity of your RAM Disk.

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border: 1px solid #bce8f1;">              
Calculate this number by multiplying your desired size of disk in megabytes by 2048.

In our example, we’ll create a 4 GB RAM Disk, which requires a number of 8388608 (4096 \* 2048).

Input this number in place of the X characters in the command above:

</div>

```shell
diskutil erasevolume HFS+ 'RAM Disk' `hdiutil attach -nomount ram://8388608
```

## create ramdisk

```shell
if [ ! -d /Volumes/JetBrainsKeys/tbcore/intellij ]; then diskutil erasevolume HFS+ JetBrainsKeys `hdiutil attach -nomount ram://6291456`;
mkdir -p /Volumes/JetBrainsKeys/intellij;
chmod -R 777 /Volumes/JetBrainsKeys;

#mkdir -p /Volumes/JetBrainsKeys/tbcore/intellij/caches;
#ln -s /Volumes/JetBrainsKeys/intellij/caches/Users/bpaxton/Library/Caches/JetBrains/IntelliJIdea2022.1/caches;
fi
```

---

# Launching Apps From Terminal

> Terminal command to launch macOS gui apps is appropriately called `open` and here is how it works at its most simple:

```shell
open -a ApplicationName

```

> That will open the defined app named “ApplicationName”

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           But open is much more powerful than that.          
If you just type <code>open</code> at the command prompt, you’ll return the basic help file with details on how to properly use the command with a variety of flags and            
syntax.
</div>            
<br/>
<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           While the open command exists in all versions of Mac OS X, the abilities vary somewhat depending on what version of macOS / Mac OS X the Mac is running.          
Nonetheless, in modern releases this is what            
you’ll see:
</div>

- `Usage`: `open [-e] [-t] [-f] [-W] [-R] [-n] [-g] [-h] [-b ] [-a ] [filenames] [--args arguments]`

- `Help`: Open opens files from a shell. By default, open each file using the default application for that file. If the file is in the form of a URL,
  the file will be opened as a URL.

- `Options`:  
  `-a ` : Opens with the specified application.  
  `-b ` : Opens with the specified application bundle identifier.  
  `-e ` : Opens with TextEdit.  
  `-t ` : Opens with default text editor.  
  `-f ` : Reads input from standard input and opens with TextEdit.  
  `-F --fresh` : Launches the app fresh, that is, without restoring windows. Saved persistent state is lost, excluding Untitled documents.  
  `-R, --reveal` : Selects in the Finder instead of opening.  
  `-W, --wait-apps ` : Blocks until the used applications are closed (even if they were already running).  
  `--args ` : All remaining arguments are passed in argv to the application's main() function instead of opened.  
  `-n, --new` : Open a new instance of the application even if one is already running.  
  `-j, --hide` : Launches the app hidden.  
  `-g, --background ` : Does not bring the application to the foreground.  
  `-h, --header` : Searches header file locations for headers matching the given filenames, and opens them.

In other words, example simple command syntax could look like the following, opening “ApplicationName” with the file located at the path
`/file/to/open`:

```shell
open -a ApplicationName /file/to/open
```

> You’ll note you don’t need the full path to the application name, but you would need the full path to a file name.

> The usage is likely self-explanatory to those who have experience in the command line environment, but for those who are new to the Terminal, don’t
> be too confused, it is easy to use, and we’ll
> explain.  
> For example, if you want to edit `/etc/motd ` with `TextWrangler` to change your Message of the Day, but you hate the command line editors `nano`
> and `vi`, here is what you’d type:

```shell
open -a TextWrangler /etc/motd
```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">              
     Also worth noting is that if you are launching an application with spaces in its name, you’ll want to add a backslash after each word, opening Adobe Photoshop CS would look like this:  
</div>

```shell
open -a Adobe\ Photoshop\ CS
```

> Launching GUI Apps as root from the Command Line

```shell
sudo open -a TextEdit /tmp/magicfile

```

## Creating Shell Aliases for Frequently Launched GUI Apps

1. First launch the profile or .bash_profile into a text editor:

   ```shell
     nano .profile
   ```

   > or

   ```shell
     open -e .profile
   ```

2. add the following to a new line:

   ```text
     alias photoshop="open -a Adobe\ Photoshop\ CS"
   ```

> This creates an alias, so that the `open -a Adobe\ Photoshop CS` command is now shortened to simply `photoshop`.

---

# DEBUGGING - OBSCURE ISSUES

## _[How to fix Mac OSX stuck/hanging on progress bar after login](https://smyl.es/how-to-fix-mac-osx-stuckhanging-on-progress-bar-will-not-boot/)_

# Resources

- [ CLI Gist Resource ](https://gist.github.com/bzerangue/dca8fc2d63309ba2bd9f)
- [ Making OS installer ](https://dortania.github.io/OpenCore-Install-Guide/installer-guide/mac-install.html#setting-up-opencore-s-efi-environment)
- [ Mac Official Doc, Make bootable installer ](https://support.apple.com/en-us/HT201372)