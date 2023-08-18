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

## Move Mouse

```shell
(*tell application "System Events"
	key code 83
	delay 1
	key code 88
	delay 1
	key up 88
end tell*)
```

## using key codes and "normal" AppleScripting to select the Music library and then put focus on the Search field:

```shell
tell application "iTunes"
activate
-- select the Music library
reveal (some playlist whose special kind is Music)
end tell
tell application "System Events"
-- bring focus to Search box - Command-Option-F
key code 3 using {command down, option down}
end tell

```

### A similar version that searches using a string in the clipboard:

```shell
tell application "iTunes"
activate
reveal (some playlist whose special kind is Music)
end tell
tell application "System Events"
-- bring focus to Search box - Command-Option-F
key code 3 using {command down, option down}
-- paste the clipboard - Command-V
key code 9 using command down
end tell


```

## Select all tracks in the selected playlist and make a new "untitled" playlist from them:

```shell
tell application "iTunes"
activate
end tell
tell application "System Events"
-- select all tracks - Command-A
key code 0 using command down
--new playlist from selection- Command-Shift-N
key code 45 using {command down, shift down}
end tell
```

## select all tracks of front playlist - Command-A

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 0 using command down
end tell
```

## toggle browse mode - Command-B

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 11 using command down
end tell
```

## copy selection (or whatever) - Command-C

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 8 using command down
end tell
```

## toggle Right Sidebar - Shift-Command-G

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 5 using {command down, shift down}
end tell
```

## Get Info for selected track(s) - Command-I

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 34 using command down
end tell
```

## open View options window - Command-J

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 38 using command down
end tell
```

## select current track - Command-L

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 37 using command down
end tell
```

## Show File of selected - Shift-Command-R

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 15 using {command down, shift down}
end tell
```

## toggle Zoom of Main Browser - Control-Command-Z

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 6 using {command down, control down}
end tell
```

## Close a window with "Cancel" - Escape key

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 53
end tell
```

## Delete the selected playlist from your Source list without confirming that you want to delete it - Command-Delete

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 51 using command down
end tell
```

### Delete the selected playlist and all the songs it contains from your library

> OR

### Delete the selected song from your library and all playlists

### Option-Delete

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 51 using option down
end tell
```

### Select the search field - Command-Option-F

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 3 using {command down, option down}
-- and optionally, paste the clipboard - Command-V

	-- key code 9 using command down

end tell

```

## playlist and folder

### new playlist - Command-N

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 45 using {command down, shift down}
end tell
````

### new playlist from selection - Command-Shift-N

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 45 using {command down, shift down}
end tell
```

### new Smart Playlist - Command-Option-N

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 45 using {command down, option down}
end tell
```

### new Playlist Folder - Command-Option-Shift-N

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 45 using {command down, option down, shift down}
end tell
```

## toggle Show/Hide Main Browser window - Command-1

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 18 using command down
end tell
```

## toggle Show/Hide Equalizer window - Command-2

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 19 using command down
end tell
```

---

# System Events, Key Code and Keystroke

## Setting Up System Preferences

In order for the "System Events" application to use the key code or keystroke commands, you have to enable the macOS accessibility frameworks in System Preferences.

Mavericks and later. Access must now be set on a per-app basis. See this Apple support document for details.

Pre-OS X 10.9/Mavericks operating systems: Click on the "Accessibility" pane (formerly "Universal Access") in "System Preferences". At the bottom left of the pane is a checkbox setting called "Enable access for assistive devices". Click on the checkbox so the setting is enabled. Close out of System Preferences.

## AppleScript Implementation

"System Events" will send a key code or a keystroke to the frontmost application. So, you have to make sure that iTunes is frontmost—activate it, in AppleScript parlance. Here's an example script that should be self-explanatory. It will select the currently playing iTunes track using the keystroke command:

```shell
tell application "iTunes"
activate
if player state is not stopped then
tell application "System Events" to keystroke "l" using command down
end if
end tell

```

> I have emulated a key press for "Command-L" (the script makes sure iTunes is not stopped first) by providing the lowercase "l", the key you would press for the actual menu command. The using parameter tells the keystroke command to include a key press of the Command key. Here's the same action using the key code command:

```shell
tell application "iTunes"
activate
if player state is not stopped then
tell application "System Events" to key code 37 using command down
end if
end tell

```

> In the example above the number 37 refers to the key "l"—lowercase. As with the keystroke command, the using parameter tells the key code command to include a key press of the Command key.

### You can include multiple helper keys by setting the using parameter to a list. The following scripts each open the iTunes Store in the iTunes browser (Command-Shift-H), first with a keystroke command and then with the key code command. Note the list (stuff in {} brackets) following using:

```shell
tell application "System Events"
tell application "iTunes" to activate
keystroke "h" using {command down, shift down}
end tell

```

```shell
tell application "System Events"
tell application "iTunes" to activate
key code 4 using {command down, shift down}
end tell

```

> The number 4 refers to the key "h". (For more info on how to construct a keystroke or key code command, check out the "System Events" sdef via AppleScript Editor's Window > Library.)


---

# KeyCodes

## How to Get Key Codes

Using the keystroke command is fairly straight forward: just use the key's character as a string. To get the key code number for a key press, [Get KeyCodes Util ](https://manytricks.com/keycodes/)

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

## Move Mouse With Key Codes

Now, there is not a direct command in applescript to control the mouse but there is a way to emulate keystrokes.

Universal Access allows you to use the number pad in place of a mouse

By enabling universal accessibility we can use key strokes to move the mouse.

To enable universal accessibility:

1. open up your system preferences, and go to “Universal Access.”
2. go to “Mouse & Trackpad.”
3. turn on Mouse Keys.

Mouse keys allow you to use the number pad of the keyboard in place of a mouse.
Numpad 5 is click, and the surrounding numbers correspond to direction (2 down, 6 right, 3 down-right, and so on)

Once Mouse Keys are enabled, in applescript we can say
```tell application "System Events" to key code ##```
with ```##``` being replaced with the corresponding integer value of the key code and it will move the cursor roughly 1 pixel in that direction.

# References

## [Complete List Of KeyCodes](https://eastmanreference.com/complete-list-of-applescript-key-codes)

## [Mouse Movement Codes](https://support.apple.com/guide/mac-help/control-the-pointer-using-mouse-keys-mh27469/mac)