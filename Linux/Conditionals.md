---  
title:        Conditionals    
permalink:    Linux/Conditionals    
category:     Linux    
parent:       Linux    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - linux    
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
    
# use a variable set by a script    
    
```bash    
act=$(gh auth status -t >>(tee -a) 2>&1 | sed -n 's/.*Token: //p');    
if [ "$act" == *"$GH_TOKEN"* ](%22$act%22%20==%20*%22$GH_TOKEN%22*.md#)    
then do things    
fi    
```    
    
# Check if File does Not Exist    
    
> Similar to many other languages, the test expression can be negated using the ! (exclamation mark) logical not operator:    
    
```bash    
FILE=/etc/docker    
if [ ! -f "$FILE" ]; then    
    echo "$FILE does not exist."    
fi    
```    
    
> Different syntax:    
    
```bash    
[ ! -f /etc/docker ] && echo "$FILE does not exist."    
```    
    
# Check if Multiple Files Exist #    
    
> Instead of using complicated nested if/else constructs you can use -a (or && with [[) to test if multiple files exist:    
    
```bash    
if [ -f /etc/resolv.conf -a -f /etc/hosts ]; then    
    echo "Both files exist."    
fi    
```    
    
> differnt syntax    
    
```bash    
if [hosts ](-f%20/etc/resolv.conf%20&&%20-f%20/etc/hosts.md#); then    
    echo "Both files exist."    
fi    
```    
    
## File test operators    
    
The test command includes the following FILE operators that allow you to test for particular types of files:    
    
### True if the FILE exists and is a special block file.    
    
```shell    
 -b FILE     
 ```    
    
### True if the FILE exists and is a special character file.    
    
```shell    
 -c FILE     
 ```    
    
### True if the FILE exists and is a directory.    
    
```shell    
 -d FILE     
 ```    
    
### True if the FILE exists and is a file, regardless of type (node, directory, socket, etc.).    
    
```shell    
 -e FILE     
 ```    
    
### True if the FILE exists and is a regular file (not a directory or device).    
    
```shell    
 -f FILE     
 ```    
    
### True if the FILE exists and has the same group as the user running the command.    
    
```shell    
 -G FILE     
 ```    
    
### True if the FILE exists and is a symbolic link.    
    
```shell    
 -h FILE     
 ```    
    
### True if the FILE exists and has set-group-id (sgid) flag set.    
    
```shell    
 -g FILE     
 ```    
    
### True if the FILE exists and has a sticky bit flag set.    
    
```shell    
 -k FILE     
 ```    
    
### True if the FILE exists and is a symbolic link.    
    
```shell    
 -L FILE     
 ```    
    
### True if the FILE exists and is owned by the user running the command.    
    
```shell    
 -O FILE     
 ```    
    
### True if the FILE exists and is a pipe.    
    
```shell    
 -p FILE     
 ```    
    
### True if the FILE exists and is readable.    
    
```shell    
 -r FILE     
 ```    
    
### True if the FILE exists and is a socket.    
    
```shell    
 -S FILE    
 ```    
    
### True if the FILE exists and has nonzero size.    
    
```shell    
 -s FILE     
 ```    
    
### True if the FILE exists, and `set-user-id (suid)` flag is set.    
    
```shell    
 -u FILE     
```    
    
### True if the FILE exists and is writable.    
    
```shell    
 -w FILE     
```    
    
### True if the FILE exists and is executable.    
    
```shell     
-x FILE    
```    
    
***    
    
# Resources    
    
- [File Conditionals](https://linuxize.com/post/bash-check-if-file-exists/)