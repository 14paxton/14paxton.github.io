---  
title: File-Commands    
permalink: Linux/File-Commands    
category:  Linux    
parent:   Linux    
layout: default    
has_children: false    
share: true    
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
    
# [How to create tar a file in Linux](https://www.cyberciti.biz/faq/how-to-tar-a-file-in-linux-using-command-line/)    
    
- Say you want to compress an entire directory named    
    
`/home/vivek/data/` ,    
    
then type:    
    
```bash    
 tar -czvf file.tar.gz /home/vivek/data/    
```    
    
> To compress multiple directories and files, execute:    
    
```bash    
 tar -czvf file.tar.gz /home/vivek/data/ /home/vivek/pics/ /home/vivek/.accounting.db    
```    
    
- One can use `bzip2` compression instead of `gzip` by passing the `-j` option to the `tar` command:    
    
```bash    
tar -cjvf file.tar.bz2 /home/vivek/data/    
```    
    
## Options    
    
### Create a new archive    
    
```- c ```    
    
### Verbose output    
    
```- v ```    
    
### Use archive file    
    
```- f ```    
    
### Filter the archive through gzipfile.tar.gz    
    
```- z ```    
    
### Filter the archive through bzip2    
    
```- j ```    
    
## Un Tar    
    
```    
  tar xvf  <.tar file>    
  tar xzvf <.tar.gz file>    
  tar xjvf <.tar.bz2 file>    
```  