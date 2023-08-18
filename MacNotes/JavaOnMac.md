---
title:        JavaOnMac
permalink:    MacNotes/JavaOnMac
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


<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
<em>On Mac OS X 10.5 or later, we can use: </em>
<br/>
<code>  /usr/libexec/java_home</code>
<br/>
<em>to return the location of the default JDK : </em>     
<br/>
<code>  /Library/Java/JavaVirtualMachines/jdk-16.jdk/Contents/Home  </code>    
</div> 

# find all installed JDKs.

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

# run a specified JDK command.

```
/usr/libexec/java_home -v1.8
```            

```
/usr/local/Cellar/openjdk@8/1.8.0+275/libexec/openjdk.jdk/Contents/Home
```

# set the JAVA_HOME environment variable

- On macOS 10.15 Catalina and later, the zsh is the default Terminal shell, and we can in either ```~/.zshenv``` or  ```~/.zshrc```

1) Confirm you have JDK by typing
   ```shell
   which java
   ```  
   output ->  ```/usr/bin/java```
2) Check you have the needed version of Java, by typing            
   `java -version`            
   `JAVA_HOME` is essentially the full path of the directory that contains a sub-directory named `bin` which in turn contains the java.            
   For Mac OSX it is `/Library/Java/Home`==
3) Set JAVA_HOME            
   ` export JAVA_HOME=/Library/Java/Home`
4) `echo $JAVA_HOME` on Terminal to confirm the path

- Note that this sets JAVA_HOME only for this session. If you want it to persist, you will have to add the command to your ```~/.profile file```

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

# Slow Java app

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
   Add the hostname you noted from earlier at the end of lines that start with ```127.0.0.1``` and ```::1```.

   In the end this is what my `/etc/hosts `file looked like:
   ```text            
   127.0.0.1       TPLNK-BPAXTON3.local            
   255.255.255.255 broadcasthost            
   ::1             TPLNK-BPAXTON3.local`            
   ```