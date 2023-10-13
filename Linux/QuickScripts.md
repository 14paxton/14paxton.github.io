---
title:        QuickScripts
permalink:    Linux/QuickScripts
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

# Bash

## find and remove files

```bash    
for st in $(mdfind -name ultdata); do rm -rf "$st"; done    
```    

## find and kill by pid

```bash    
pkill -f '.*GradleDaemon.*'    
```    

## kill by port

```bash    
npx kill-port 18090    
```    

## zip folder with pw

```bash    
zip -er last_resort.zip attachments;    
```    

## Add Table of Contents to mark down doc with pandoc

1) set file name
    ```bash    
    fileMD=CLI_Grailsw.md;    
    ```    

2) run
    ```bash    
     pandoc -s --toc $fileMD -o output.md; rm -f $fileMD; mv output.md ./$fileMD;    
    ```    

### [UseCase Examples](https://gist.github.com/14paxton/0af2e0618a579d1cdc64d2b183af08e6)

## CAT

### Show Line Endings

```shell
cat -e file.txt
```

### Display Line Numbers

```shell
 cat -n file.txt
```

> This command is equivalent to the ‘nl file’ command.

```shell
 nl file.txt
```

### Display Tab Characters

```shell
 cat -T file.txt
```

### Reverse a File using tac

```shell
tac file.txt file2.txt
```

### Remove Blank Lines

```shell
cat -s file.txt
```

### Create Here Document

> A here document (here doc) is a way to interactively input multiple lines of text into a command or program.
> In the case of the cat command, you can use a here doc to provide the content that cat
> should display.
> Here’s an example using a here doc with the cat command:

```shell
cat << EOF
> type text
> more text
> and more text
> more more more text
> EOF
```

> In this example, the << EOF notation indicates the start of the here doc, and the lines following it are treated as input until the EOF delimiter is encountered.
> The cat command will display the
> content of the here doc, which in this case consists of three lines.

# Mac

## get local ip

```zsh    
osascript -e "IPv4 address of (system info)"    
```    

```zsh    
ifconfig | grep "inet "     
```    

## convert file/image to base64

```zsh    
base64 -i ./post_u_north_gate.jpg | pbcopy     
```    

```zsh    
cat ./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy    
```    

```zsh    
./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy        
```

# Gists

## [Sync Chrome Bookmarks ](https://gist.github.com/14paxton/c10cfd597e7e7b487e27d641cf964c59)

> used to sync bookmarks file to a repo to update on both mac and windows using bash and powershell when account can not sync due to admin restrictions