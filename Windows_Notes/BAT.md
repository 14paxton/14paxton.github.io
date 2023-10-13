---
title:        BAT
permalink:    Windows_Notes/BAT
category:     Windows_Notes
parent:       Windows_Notes
layout:       default
has_children: false
share:        true
shortRepo:
  - windows_notes
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

___    

<br/>    

# Common Commands

*  ```bat
        echo
      ```
   > This parameter will allow you to view your working script in the command prompt.
   > This parameter is useful for viewing your working code.
   > If any issues arise from the batch file, you will be able
   to view the issues associated with your script using the echo function.
   > Adding the following off to this parameter will allow you to quickly close your script after it has finished.

---
___

* ```bat
      cls
     ```
  > Clear your command prompt, best used when extraneous code can make what you're accessing had to find.

---
___

* ```bat
      rem
     ```
  > Shorthand for remark provides the same functionality as ```<!-- ``` tag in ```HTML```.
  > statements are not entered into your code.
  > Instead, they are used to explain and give information
  regarding the code.

---
___

* ```bat
      %%a
     ```
  > Each file in the folder.

---
___

* ```bat
     (".\")
     ```
  > The root folder.
  > When using the command prompt, one must direct the prompt to a particular directory before changing a file name, deleting a file, and so on.
  > With batch files, you only need to
  paste your ```BAT``` file into the directory of your choosing.

---
___

* ```bat
      pause
     ```
  > Allows a break in the logical chain of your ```BAT``` file.
  > This allows for users to read over command lines before proceeding with the code.
  > The phrase "Press any key to continue..." will denote a
  pause.

---
___

* ```bat
      start "[website]"
     ```
  > Will head to a website of your choice using your default web browser.

---
___

* ```bat
      ipconfig
     ```
  > This is a classic command prompt parameter that releases information concerning network information. This information includes ```MAC``` addresses, ```IP``` addresses, and ```sub-net masks```.

---
___

* ```bat
     ping
     ```
  > Pings an ```IP``` address, sending data packets through server routes to gauge their location and latency (response time).

---
___