---
title: JQ
permalink: Linux/JQ
category: Linux
parent: Linux
layout: default
has_children: false
share: true
shortRepo:

- linux
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

# Get My Sync Folder

```shell
(.roots.bookmark_bar.children[] | select(.name == "ComputerShit")).children[] | select(.name == "Sync")
```

# Resources

- [DevDocs](https://devdocs.io/jq/)

- [Examples](https://sher-chowdhury.medium.com/working-with-json-using-jq-ce06bae5545a)