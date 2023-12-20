---
title:        DevTools
permalink:    GoogleNotes/DevTools
category:     GoogleNotes
parent:       GoogleNotes
layout:       default
has_children: false
share:        true
shortRepo:
  - googlenotes
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

# Console

- ## Logging Messages

    ```javascript
    console.log ( 'Printing on the console');
    console.error ('Error: Something went wrong' );
    consolewarn( 'No Internet: try again later');
    ```

- ### Grouping the logs (in the console)

    ```javascript
    console-group();
    console. log( 'logging user status');
    console. log('user logged into the website');
    console. log ('user has visited profile page');
    console. log/'user has just liked a post from
    ... certain page');
    console.groupEnd();
    ```

- ## Using console.dir()

    ```javascript
    console.dir(Object) ;
    console.dir(Array);
    console.dir(Function);
    ```

- ## Using console table() to output in the form of table */

    ```javascript
    console.table({ firstName: 'First', lastName: 'Last' }) ;
    ```

- ## Examining the time taken for a block of code to execute */

    ```javascript
    console.time( 'loopExaminer');
    for ( leti = 0; i <= 9999999; i++ ) (0)
    console.timeEnd('loopExaminer');
    ```

- ## Clear the console

    ```javascript
    console.clear();
    ```

- ## Start a collapsed group

    ```javascript
    console.groupCollapsed( "Website Performance stats");
    console.log( 'Animation started');
    console.log( 'Animation running smoothly since 9:00 AM');
    console.groupEnd ();
    ```

## [Monitor Events](https://stackoverflow.com/questions/10213703/how-do-i-view-events-fired-on-an-element-in-chrome-devtools)

1. > Inspect your element (right mouse click → Inspect on a visible element or go to Elements tab in Chrome Developer Tools and select wanted element) then go to Console tab and write:
   ```shell
       monitorEvents($0)
   ```
2. > Now when you move mouse over this element, focus or click it, the name of the fired event will be displayed with its data.
   To stop getting this data, just write this to console:

  ```shell
   unmonitorEvents($0)
  ```

`$0` is just the last DOM element selected by Chrome Developer Tools.

# [Re-Enable Right click](https://stackoverflow.com/questions/21335136/how-to-re-enable-right-click-so-that-i-can-inspect-html-elements-in-chrome)

```javascript
function enableContextMenu(aggressive = true) {
    void (document.ondragstart = null);
    void (document.onselectstart = null);
    void (document.onclick = null);
    void (document.onmousedown = null);
    void (document.onmouseup = null);
    void (document.body.oncontextmenu = null);
    enableRightClickLight(document);
    if (aggressive) {
        enableRightClick(document);
        removeContextMenuOnAll("body");
        removeContextMenuOnAll("img");
        removeContextMenuOnAll("td");
    }
}

function removeContextMenuOnAll(tagName) {
    let elements = document.getElementsByTagName(tagName);
    for (let i = 0; i < elements.length; i++) {
        enableRightClick(elements[i]);
    }
}

function enableRightClickLight(el) {
    el || (el = document);
    el.addEventListener("contextmenu", bringBackDefault, true);
}

function enableRightClick(el) {
    el || (el = document);
    el.addEventListener("contextmenu", bringBackDefault, true);
    el.addEventListener("dragstart", bringBackDefault, true);
    el.addEventListener("selectstart", bringBackDefault, true);
    el.addEventListener("click", bringBackDefault, true);
    el.addEventListener("mousedown", bringBackDefault, true);
    el.addEventListener("mouseup", bringBackDefault, true);
}

function restoreRightClick(el) {
    el || (el = document);
    el.removeEventListener("contextmenu", bringBackDefault, true);
    el.removeEventListener("dragstart", bringBackDefault, true);
    el.removeEventListener("selectstart", bringBackDefault, true);
    el.removeEventListener("click", bringBackDefault, true);
    el.removeEventListener("mousedown", bringBackDefault, true);
    el.removeEventListener("mouseup", bringBackDefault, true);
}

function bringBackDefault(event) {
    event.returnValue = true;
    typeof event.stopPropagation === "function" && event.stopPropagation();
    typeof event.cancelBubble === "function" && event.cancelBubble();
}

enableContextMenu();
```

```javascript
$(document).unbind();
```

```javascript
javascript: function enableContextMenu(aggressive = true) {
    void (document.ondragstart = null);
    void (document.onselectstart = null);
    void (document.onclick = null);
    void (document.onmousedown = null);
    void (document.onmouseup = null);
    void (document.body.oncontextmenu = null);
    enableRightClickLight(document);
    if (aggressive) {
        enableRightClick(document);
        removeContextMenuOnAll("body");
        removeContextMenuOnAll("img");
        removeContextMenuOnAll("td");
    }
}

function removeContextMenuOnAll(tagName) {
    let elements = document.getElementsByTagName(tagName);
    for (let i = 0; i < elements.length; i++) {
        enableRightClick(elements[i]);
        enablePointerEvents(elements[i]);
    }
}

function enableRightClickLight(el) {
    el || (el = document);
    el.addEventListener("contextmenu", bringBackDefault, true);
}

function enableRightClick(el) {
    el || (el = document);
    el.addEventListener("contextmenu", bringBackDefault, true);
    el.addEventListener("dragstart", bringBackDefault, true);
    el.addEventListener("selectstart", bringBackDefault, true);
    el.addEventListener("click", bringBackDefault, true);
    el.addEventListener("mousedown", bringBackDefault, true);
    el.addEventListener("mouseup", bringBackDefault, true);
}

function restoreRightClick(el) {
    el || (el = document);
    el.removeEventListener("contextmenu", bringBackDefault, true);
    el.removeEventListener("dragstart", bringBackDefault, true);
    el.removeEventListener("selectstart", bringBackDefault, true);
    el.removeEventListener("click", bringBackDefault, true);
    el.removeEventListener("mousedown", bringBackDefault, true);
    el.removeEventListener("mouseup", bringBackDefault, true);
}

function bringBackDefault(event) {
    event.returnValue = true;
    typeof event.stopPropagation === "function" && event.stopPropagation();
    typeof event.cancelBubble === "function" && event.cancelBubble();
}

function enablePointerEvents(el) {
    if (!el) return;
    el.style.pointerEvents = "auto";
    el.style.webkitTouchCallout = "default";
    el.style.webkitUserSelect = "auto";
    el.style.MozUserSelect = "auto";
    el.style.msUserSelect = "auto";
    el.style.userSelect = "auto";
    enablePointerEvents(el.parentElement);
}

enableContextMenu();
```