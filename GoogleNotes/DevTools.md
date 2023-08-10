---  
title: DevTools    
permalink: GoogleNotes/DevTools    
category:  GoogleNotes    
parent:   GoogleNotes    
layout: default    
has_children: false    
share: true    
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
    
***                    
    
<br/>    
    
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
    (typeof event.stopPropagation === 'function') && event.stopPropagation();    
    (typeof event.cancelBubble === 'function') && event.cancelBubble();    
}    
    
enableContextMenu();    
```    
    
```javascript    
$(document).unbind();    
```    
    
```javascript    
javascript:function enableContextMenu(aggressive = true) {    
    void (document.ondragstart = null);    
    void (document.onselectstart = null);    
    void (document.onclick = null);    
    void (document.onmousedown = null);    
    void (document.onmouseup = null);    
    void (document.body.oncontextmenu = null);    
    enableRightClickLight(document);    
    if (aggressive) {    
        enableRightClick(document);    
        removeContextMenuOnAll('body');    
        removeContextMenuOnAll('img');    
        removeContextMenuOnAll('td');    
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
    el.addEventListener('contextmenu', bringBackDefault, true);    
}    
    
function enableRightClick(el) {    
    el || (el = document);    
    el.addEventListener('contextmenu', bringBackDefault, true);    
    el.addEventListener('dragstart', bringBackDefault, true);    
    el.addEventListener('selectstart', bringBackDefault, true);    
    el.addEventListener('click', bringBackDefault, true);    
    el.addEventListener('mousedown', bringBackDefault, true);    
    el.addEventListener('mouseup', bringBackDefault, true);    
}    
    
function restoreRightClick(el) {    
    el || (el = document);    
    el.removeEventListener('contextmenu', bringBackDefault, true);    
    el.removeEventListener('dragstart', bringBackDefault, true);    
    el.removeEventListener('selectstart', bringBackDefault, true);    
    el.removeEventListener('click', bringBackDefault, true);    
    el.removeEventListener('mousedown', bringBackDefault, true);    
    el.removeEventListener('mouseup', bringBackDefault, true);    
}    
    
function bringBackDefault(event) {    
    event.returnValue = true;    
    (typeof event.stopPropagation === 'function') && event.stopPropagation();    
    (typeof event.cancelBubble === 'function') && event.cancelBubble();    
}    
    
function enablePointerEvents(el) {    
    if (!el) return;    
    el.style.pointerEvents = 'auto';    
    el.style.webkitTouchCallout = 'default';    
    el.style.webkitUserSelect = 'auto';    
    el.style.MozUserSelect = 'auto';    
    el.style.msUserSelect = 'auto';    
    el.style.userSelect = 'auto';    
    enablePointerEvents(el.parentElement);    
}    
    
enableContextMenu();    
```  