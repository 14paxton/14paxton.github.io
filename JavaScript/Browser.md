---
title:        Browser
permalink:    JavaScript/Browser
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

# Bookmark

- ## Add JS as a bookmark
    - > add bookmark
        - > edit and add code for url

           ```javascript 
             javascript:alert("fuckyeah");
           ``` 

# URL

- ## Get Parameters from current URL / paramName

  ```javascript
    const url = new URL(window.location.href); 
    const paramValue = url.searchParams.get("paramName"); 
  
   console.log(paramValue);
  ```