---  
title:        DateAndTime    
permalink:    JavaScript/DateAndTime    
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
# Format date with local      
    
```javascript      
    const userLocale = navigator.languages && navigator.languages.length    
                       ? navigator.languages[0]    
                       : navigator.language;    
new Date().toLocaleDateString(userLocale)      
```