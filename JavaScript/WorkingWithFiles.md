---  
title:        WorkingWithFiles    
permalink:    JavaScript/WorkingWithFiles    
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
# download a new file      
    
```javascript      
const formV = document.querySelector("input");    
const btn = document.querySelector("button");    
    
btn.addEventListener("click", (e) => {    
    e.preventDefault();    
    
    filefetch(formV.value);    
})    
    
function filefetch(url) {    
    fetch(url)    
        .then(resp => resp.blob())    
    
    
        .then(file => {    
            let tURL = URL.createObjectURL(file);    
            let aTag = document.createElement("a");    
            aTag.href = tURL;    
            aTag.download = "file name";    
            document.body.appendChild(aTag);    
            aTag.click();    
            aTag.remove();    
            URL.revokeObjectURL(tURL);    
    
        })    
}    
    
```