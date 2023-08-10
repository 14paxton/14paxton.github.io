---  
title: VIM_QuickTips    
permalink: Linux/VIM_QuickTips    
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
    
Vim has two modes.    
    
1. Insert mode (Where you can just type like normal text editor. Press i for insert mode)    
2. Command mode (Where you give commands to the editor to get things done . Press ESC for command mode)    
   Most of them below are in command mode    
    
x - to delete the unwanted character    
u - to undo the last the command and U to undo the whole line    
CTRL-R to redo    
A - to append text at the end    
:wq - to save and exit    
:q! - to trash all changes    
dw - move the cursor to the beginning of the word to delete that word    
2w - to move the cursor two words forward.    
3e - to move the cursor to the end of the third word forward.    
0 (zero) to move to the start of the line.    
d2w - which deletes 2 words .. number can be changed for deleting the number of consecutive words like d3w    
dd to delete the line and 2dd to delete to line .number can be changed for deleting the number of consecutive words    
The format for a change command is: operator [number] motion    
-operator - is what to do, such as d for delete    
    
- [number] - is an optional count to repeat the motion    
- motion - moves over the text to operate on, such as w (word),    
  $ (to the end of line), etc.    
    
p - puts the previously deleted text after the cursor(Type dd to delete the line and store it in a Vim register. and p to put the line)    
    
r - to replace the letter e.g press re to replace the letter with e    
    
ce - to change until the end of a word (place the cursor on the u in lubw it will delete ubw )    
    
ce - deletes the word and places you in Insert mode    
    
G - to move you to the bottom of the file.    
    
gg - to move you to the start of the file.    
Type the number of the line you were on and then G    
    
% to find a matching ),], or }    
    
:s/old/new/g to substitute 'new' for 'old' where g is globally    
    
/ backward search n to find the next occurrence and N to search in opposite direction    
    
? forward search    
    
:! to run the shell commands like :!dir, :!ls    
    
:w - TEST (where TEST is the filename you chose.) . Save the file    
    
v - starts visual mode for selecting the lines and you can perform operation on that like d delete    
    
:r - Filename will insert the content into the current file    
    
R - to replace more than one character    
    
y - operator to copy text using v visual mode and p to paste it    
    
yw - (copy)yanks one word    
    
o - opens a line below the cursor and start Insert mode.    
    
O - opens a line above the cursor.    
    
a - inserts text after the cursor.    
    
A - inserts text after the end of the line.    
    
e - command moves to the end of a word.    
    
y - operator yanks (copies) text, p puts (pastes) it.    
    
R - enters Replace mode until <ESC> is pressed.    
    
ctrl-w to jump from one window to another  