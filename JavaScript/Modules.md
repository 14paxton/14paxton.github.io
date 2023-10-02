---
title: Modules
permalink: JavaScript/Modules
category: JavaScript
parent: JavaScript
layout: default
has_children: false
share: true
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

# Dynamic Import

```html

<script type="module">
    (async () => {
        const moduleSpecifier = './lib.mjs';
        const {repeat, shout} = await import(moduleSpecifier);
        repeat('hello');
        // → 'hello hello'
        shout('Dynamic import in action');
        // → 'DYNAMIC IMPORT IN ACTION!'
    })();
</script>
```