---
title: QuickScripts
permalink: JavaScript/Node/QuickScripts
category: JavaScript/Node
parent: Node
grand_parent: JavaScript
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

---

<br/>

# How to install npm packages from your local machine

> If you need to manually test a package you are developing and don't want to make a release each time you modify something, you can install it directly from your local machine.

> You can achieve this by using the following commands, depending on the package manager you use:

```bash
yarn add [path-to-your-package]
```

```bash
npm install [path-to-your-package]
```

> This will have the following equivalent in package.json:

```json
...
"dependencies": {
"[package]": "file:[relative-path-to-package]",
...
},
```

# Write to file with JavaScript and Node.js

> Sometimes, as a programmer, you might need to write something to a file on the local file system.
> And that can be a piece of cake, case in which you'll use your favorite text editor to do it
> manually.
> However, other times, it needs to be something complex and dynamic and you want your JavaScript to do it for you.

> We'll first require the `fs` module from Node.js into our JS file.

```javascript
const fs = require("fs");
```

> Then we'll grab our content:

```javascript
const content = "Hello World!";
```

> And finally we'll use the `writeFile` function from the `fs` module to populate our file.
> We need to provide the name of our file, the data or content to populate it with, the options (
> optional—for encoding, modes or flags) and a callback (also optional - to show the error message should one arise).

```javascript
fs.writeFile(filename, data, [options], [callback]);
```

> Here I've given it the `a+` flag - _"Open file for reading and appending. The file is created if it does not exist."_. The encoding defaults to 'utf8' if none is given.

```javascript
fs.writeFile("file.txt", content, { flag: "a+" }, (err) => {
  if (err) throw err;
});
```