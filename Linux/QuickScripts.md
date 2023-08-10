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
    
# Mac    
    
## get local ip    
    
```bash    
osascript -e "IPv4 address of (system info)"    
```    
    
```bash    
ifconfig | grep "inet "     
```    
    
## convert file/image to base64    
    
```bash    
base64 -i ./post_u_north_gate.jpg | pbcopy     
```    
    
```bash    
cat ./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy    
```    
    
```bash    
./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy        
```