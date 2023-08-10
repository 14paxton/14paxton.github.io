---  
title:        RegEx    
permalink:    JavaScript/RegEx    
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
# Leave only Alpha Chars and remove space      
    
```javascript      
 const removeSpecialChar = /[^a-zA-Z\d ]/g    
const replaceSpace = /\s/g    
const onlyAlpha = (fileName    
                   ? fileName    
                   : title).replaceAll(removeSpecialChar, '')    
const strippedFName = onlyAlpha.replaceAll(replaceSpace, '_')      
```