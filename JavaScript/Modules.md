---
title:        Modules
permalink:    JavaScript/Modules
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

# Preload modules

> You can optimize the delivery of your modules further by using ```<link rel="modulepreload">```.
> This way, browsers can preload and even preparse and precompile modules and their dependencies.

```html

<link rel="modulepreload" href="lib.mjs">
<link rel="modulepreload" href="main.mjs">
<script type="module" src="main.mjs"></script>
<script nomodule src="fallback.js"></script>
```

> This is especially important for larger dependency trees.
> Without ```rel="modulepreload"```,
> the browser needs to perform multiple ```HTTP``` requests to figure out the full dependency tree.
> However, if you declare the full list of dependent module scripts with ```rel="modulepreload"```,
> the browser doesn’t have to discover these dependencies progressively.