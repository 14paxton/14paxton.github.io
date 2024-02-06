---
title:        ZSH
permalink:    /MacNotes/ZSH
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

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">            
  Zsh is a UNIX command interpreter (shell) usable as an interactive login shell and as a shell script command processor.
Of the standard shells, zsh most closely resembles ksh but includes many enhancements.
It does not provide compatibility with POSIX or other shells in its default operating mode.
Zsh has command line editing, builtin spelling correction, programmable command completion, shell functions (with autoloading), a history mechanism, and a host of other features          
</div> 

# Files to Note

## Order of Operations

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           This is the order in which these files get read.
Keep in mind that it reads first from the system-wide file (i.e. /etc/zshenv) then from the file in your home directory (~/.zshenv) as it goes through the following order.

</div>            

.zshenv → .zprofile → .zshrc → .zlogin → .zlogout

## .zprofile

> ```.zlogin``` and ```.zprofile``` are basically the same thing—they set the environment for login shells1;
> they just get loaded at different times (see below).

> ```.zprofile``` is based on the Bash's ```.bash_profile```
> ```.zlogin``` is a derivative of CSH's .login.
> Since ```Bash``` was the default shell for everything up to ```Mojave```, stick with ```.zprofile```.

## .zshrc

> This sets the environment for interactive shells2.
> This gets loaded after .```zprofile```.
> It's typically a place where you "set it and forget it" type of parameters like ```$PATH```, ```$PROMPT```,
> aliases, and
> functions you would like to have in both login and interactive shells.

## .zshenv (Optional)

> This is read first and read every time.
> This is where you set environment variables.
> I say this is optional because it is geared more toward advanced users where having
> your ```$PATH```, ```$PAGER```, or ```$EDITOR```
> variables may be important for things like scripts that get called by launchd.
> Those run under a non-interactive shell 3 so anything in .
> or .zshrc won't get loaded.
> Personally, I
> don't use
> this one because I set the PATH variable in my script itself to ensure portability.

## .zlogout (Optional)

> But beneficial! This is read when you log out of a session and is great for cleaning things up when you leave (like resetting the Terminal Window Title)

## Caveats

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
Apple does things a little differently, so it's best to be aware of this.
Specifically, Terminal initially opens both a login and interactive shell even though you don't authenticate (enter login credentials).
However, any subsequent shells that are opened are only interactive.

You can test this out by putting an alias or setting a variable in .zprofile, then opening Terminal and seeing if that variable/alias exists.
Then open another shell (type zsh); that variable won't be
accessible anymore.

SSH sessions are login and interactive so they'll behave just like your initial Terminal session and read both .zprofile and .zshrc
</div> 