---
title:        HomeBrew
permalink:    MacNotes/HomeBrew
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

# Ruby

ruby is keg-only, which means it was not symlinked into

```            
/opt/homebrew            
```            

because macOS already provides this software and installing another version in            
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH, run:

```ruby            
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc            
```            

For compilers to find ruby you may need to set:

```shell            
export LDFLAGS="-L/opt/homebrew/opt/ruby/lib"            
export CPPFLAGS="-I/opt/homebrew/opt/ruby/include"            
```            