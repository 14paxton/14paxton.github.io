---
title:        CSS  
permalink: JavaScript/CSS  
category:  JavaScript  
parent:   JavaScript  
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
# RGB to HEX  
  
https://css-tricks.com/converting-color-spaces-in-javascript/  
  
```javascript  
function RGBToHex(rgb) {  
    let sep = rgb.indexOf(",") > -1  
              ? ","  
              : " ";  
    rgb = rgb.substr(4).split(")")[0].split(sep);  
  
    // Convert %s to 0–255  
    for (let R in rgb) {  
        let r = rgb[R];  
        if (r.indexOf("%") > -1) rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);  
        /* Example:  
         75% -> 191  
         75/100 = 0.75, * 255 = 191.25 -> 191  
         */  
    }  
```  
  
# Create Style element insert into document head  
  
```javascript  
generateRulesAll(tableRef.current).then((css) => {  
    const styleElement = document.createElement('style');  
    styleElement.innerText = css;  
    iframeRef?.current.contentWindow.document.head.appendChild(styleElement);  
});  
```