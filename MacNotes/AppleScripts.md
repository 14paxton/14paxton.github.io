---
title:        AppleScripts
permalink:    MacNotes/AppleScripts
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

# QuickScripts

## Hold Key for 2 Seconds

```shell
repeat 100 times
    tell application "System Events"
        key down {command}
        key down "w"
        delay (random number from 0.5 to 3)
        key up "w"

        key down "s"
        delay (random number from 3 to 4)
        key up "s"
        key up {command}
    end tell
end repeat
```

---

# KeyCodes

## SendKeys

> From the AppleScript System Events dictionary:

```key code integer or list of integer : The key code(s) to be sent. May be a list.```

```[using command down/‌control down/‌option down/‌shift down or list of command down/‌control down/‌option down/‌shift down] : modifiers with which the key codes are to be entered```

```keystroke text : The keystrokes to be sent.```

```[using as above]```

- Some examples illustrating their use:

```shell

tell application "System Events"       
key code 124 using {shift down, command down} --> Right arrow
key code 8 using command down --> ⌘-C
key code {4, 14, 37, 37, 31, 47} --> H, e, l, l, o, .

    keystroke "v" using command down --> ⌘-V
    keystroke "Hello." --> H, e, l, l, o, .
end tell

```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    (Note: I stylised ⌘-C and ⌘-V with their uppercase representations, but these indicate Cmd+C or V, respectively, without use of the Shift key.)
</div> 

```keystroke can also accept the AppleScript constants tab, space return, and quote.```

```The target is always the application window that has focus, so it’s important to set the focus to the desired application before issuing these commands (e.g. tell application "Finder" to activate).```

[Reference](https://eastmanreference.com/complete-list-of-applescript-key-codes)