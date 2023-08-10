---  
title: Scripting    
permalink: Linux/Scripting    
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
    
# Variables    
    
## Special Variables    
    
### The name of the Bash script.    
    
> ```$0```    
    
### The first 9 arguments to the Bash script. (As mentioned above.)    
    
> ```$1``` - ```$9```    
    
### How many arguments were passed to the Bash script.    
    
> ```$#```    
    
### All the arguments supplied to the Bash script.    
    
> ```$@```    
    
### The exit status of the most recently run process.    
    
> ```$?```    
    
### The process ID of the current script.    
    
> ```$$```    
    
### The username of the user running the script.    
    
> ```$USER```    
    
### The hostname of the machine the script is running on.    
    
> ```$HOSTNAME```    
    
### The number of seconds since the script was started.    
    
> ```$SECONDS```    
    
### Returns a different random number each time is it referred to.    
    
> ```$RANDOM```    
    
### Returns the current line number in the Bash script.    
    
> ```$LINENO```    
    
## Use    
    
### The first, second, etc command line arguments to the script.    
    
> ```$1, $2, ...```    
    
### To set a value for a variable. Remember, no spaces on either side of =    
    
> ```variable=value```    
    
### Double will do variable substitution, single will not.    
    
> ```Quotes " '```    
    
### Save the output of a command into a variable    
    
> ```variable=$( command )```    
    
### Make the variable var1 available to child processes.    
    
> ```export var1```    
    
# Std In and Out    
    
## use a string put int script that needs a user response    
    
```shell    
export GH_TOKEN=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;    
act=$(gh auth status -t >>(tee -a) 2>&1 | sed -n 's/.*Token: //p');    
if [ "$act" == *"$GH_TOKEN"* ](%22$act%22%20==%20*%22$GH_TOKEN%22*.md#)    
then echo $GH_TOKEN | gh auth login --with-token;      
```    
    
## use output from a script to set a variable    
    
> ```tee``` can be used to create a file from output    
    
`here i take the out put pipe that and error output`    
    
```shell    
 2 >&1    
```    
    
> File descriptor 1    
    
`is the standard output (stdout)`    
    
> File descriptor 2    
    
`is the standard error (stderr)`    
    
> ```2>``` redirects stderr to an (unspecified) file.    
    
> ```&1``` redirects ```stderr``` to ```stdout```  