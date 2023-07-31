---
title:        Window
permalink:    JavaScript/Window
category:     JavaScript
parent:       JavaScript
layout:       default
has_children: false
share:        true
shortRepo:
  - javascript
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
# creating new window with html document  

```javascript  
function newWindowDimensions(width, height, x_axis, y_axis) {
    const dualScreenLeft = window.screenLeft !== undefined
                           ? window.screenLeft
                           : window.screenX;
    const dualScreenTop = window.screenTop !== undefined
                          ? window.screenTop
                          : window.screenY;

    const w = width
              ? width
              : DEFAULT_PPT_WIDTH.pixels
    const h = height
              ? height
              : DEFAULT_PPT_HEIGHT.pixels

    function compute(screenPx, elementPx) {return (screenPx / 2) - (elementPx / 2);}

    const x = x_axis
              ? x_axis
              : Math.round(compute(window.screen.width, w) + dualScreenLeft);

    const y = y_axis
              ? y_axis
              : Math.round(compute(window.screen.height, h) + dualScreenTop);

    return `width=${w},height=${h},screenX=${x},screenY=${y},status=0,dependent=0,minimizable=0,resizable=0,menubar=0,location=0,toolbar=0,status=0,scrollbars=0,titlebar=0,dialog=0`
}

function openWindowBuildPPTX(theDoc) {
    return new Promise(resolve => {
        let srcNode = theDoc.documentElement;
        const winUrl = URL.createObjectURL(new Blob([srcNode.outerHTML], {type: "text/html"}));

        // //inject in window and open  
        const windowFeatures = newWindowDimensions()
        const pptWindow = window.open(winUrl, '', windowFeatures);
        pptWindow.focus()
        URL.revokeObjectURL(winUrl)

        resolve(pptWindow)
    })
}  
```