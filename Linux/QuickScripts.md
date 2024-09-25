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

---

<br/>

# Gists

## [Sync Chrome Bookmarks ](https://gist.github.com/14paxton/c10cfd597e7e7b487e27d641cf964c59)

> used to sync a bookmark file to a repo to update on both Mac and windows using bash and PowerShell when an account cannot sync due to admin
> restrictions

# [Tar File](https://www.cyberciti.biz/faq/how-to-tar-a-file-in-linux-using-command-line/)

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
<div>
<H2>Recognized Suffixes</H2>
<span> - .gz : gzip</span><br>
<span> - .tgz : gzip</span><br>
<span> - .taz : gzip</span><br>
<span> - .z : compress</span><br>
<span> - .taZ : compress</span><br>
<span> - .bz2 : bzip2</span><br>
<span> - .tz2 : bzip2</span><br>
<span> - .tbz2 : bzip2</span><br>
<span> - .tbz : bzip2</span><br>
<span> - .lz : lzip</span><br>
<span> - .lzma : lzma</span><br>
<span> - .tlz : lzma</span><br>
<span> - .lzo : lzop</span><br>
<span> - .xz : xz</span><br>
<span> - .zst : zstd</span><br>
<span> - .tzst : zstd</span><br>
</div>
</div>            

- > Compress an entire directory `/home/vivek/data/`

  ```bash
    tar -czvf file.tar.gz /home/vivek/data/
  ```

- > To compress multiple directories and files, execute:
  ```bash
   tar -czvf file.tar.gz /home/vivek/data/ /home/vivek/pics/ /home/vivek/.accounting.db
  ```

> One can use `bzip2` compression instead of `gzip` by passing the `-j` option to the `tar` command:

```bash
tar -cjvf file.tar.bz2 /home/vivek/data/
```

## Options

### Create a new archive

`- c `

### Verbose output

`- v `

### Use archive file

`- f `

### Filter the archive through `gzipfile.tar.gz`

`- z `

### Filter the archive through `bzip2`

`- j `

## Un Tar

```bash
  tar xvf  <.tar file>
  tar xzvf <.tar.gz file>
  tar xjvf <.tar.bz2 file>
```

# ZIP folder and add a password

```bash
zip -er last_resort.zip attachments;
```

# Find

## find and remove files

```bash
for st in $(mdfind -name ultdata); do rm -rf "$st"; done
```

## Find and Delete Empty Directories

<div style="padding: 15px; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           The -type d option searches for directories, -empty selects empty ones and -exec rmdir {} executes the rmdir command to delete them.
</div>            

```shell
$ find . -type d -empty -exec rmdir -v {} +

```

# find and kill by pid

```bash
pkill -f '.*GradleDaemon.*'
```

# kill by port

```bash
npx kill-port 18090
```

# Add Table of Contents to mark down doc with pandoc

1. set file name

   ```bash
   fileMD=CLI_Grailsw.md;
   ```

2. run
   ```bash
    pandoc -s --toc $fileMD -o output.md; rm -f $fileMD; mv output.md ./$fileMD;
   ```

## [UseCase Examples](https://gist.github.com/14paxton/0af2e0618a579d1cdc64d2b183af08e6)

# CAT

## Show Line Endings

```shell
cat -e file.txt
```

## Display Line Numbers

```shell
 cat -n file.txt
```

> This command is equivalent to the ‘nl file’ command.

```shell
 nl file.txt
```

## Display Tab Characters

```shell
 cat -T file.txt
```

## Reverse a File using tac

```shell
tac file.txt file2.txt
```

## Remove Blank Lines

```shell
cat -s file.txt
```

## Create Here Document

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

> In this example, the << EOF notation indicates the start of the here doc, and the lines following it are treated as input until the EOF delimiter is
> encountered.
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