---
title:     Clever-Algos
permalink: JavaScript/Clever-Algos
category:  JavaScript
parent:    JavaScript
layout:    default
has_children: false
share:     true
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

# Gists

## [AddToCustomFeed.js](https://gist.github.com/14paxton/63944ec7e8bcd0e7ee9b97e3dc6fd48e)

## [FormFillScript.js](https://gist.github.com/14paxton/fedc95a9b660e1625373bea6f92e4648)

## [GetCSSFromElement.js](https://gist.github.com/14paxton/70018ca1b4b990db4fbf4edfd1907af8)

## [JsEnumUnion.js](https://gist.github.com/14paxton/685637fd8c513c7539a10f66b2386cfe)

## [NewDocumentAndWindow.js](https://gist.github.com/14paxton/fb7f33fd6f5fa7a15077b6ebf18fca44)

## [ReadHTMLToNewDocument.js](https://gist.github.com/14paxton/a5a6b17131a2791b757973f866e3eb98)

## [SeeFormChange.js](https://gist.github.com/14paxton/f7f177713ec7e8effcdeec086c22e43a)

## [SendFormWithFileInput.js](https://gist.github.com/14paxton/eeeb29357613698bd877eb35dcf0ad89)

## [groupArrayOfObjectsByKey.js](https://gist.github.com/14paxton/a87f5d47aaf678e89a1dfeffa51b46d9)

# Custom Ready / Load / onLoad

```javascript
window.addEventListener("load", async function () {
    const promise = await fetchHTMLFile(pathToHTML);
    document.querySelector("#insertion").innerHTML = await promise.text();
}, false,);
```

> or

```javascript
function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  }
  else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(loadHTML);
```

# Custom Sort Array

```javascript
function sortOptions(a, b) {
  var at = a.textContent, bt = b.textContent;
  return at > bt
         ? 1
         : at < bt
           ? -1
           : 0;
}

if (selectBox) {
  let options = Array.from(selectBox.children).sort(sortOptions);
  selectBox.append(...options);
  addBlankSelectOption(selectBox);
}
```

# Group and object by key and possible subkey

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">            
<em>Returns: </em>   
<br/>
<code>{(key to group by) : [{(secondary key) : (key to group by)}]}</code>          
</div>

<a href="https://gist.github.com/14paxton/a87f5d47aaf678e89a1dfeffa51b46d9"> groupArrayOfObjectsByKey</a>

# Union / Enum for JS

## java like enum can be used for pointer type function

> [resource](https://dev.to/avalander/union-types-with-javascript-4emo)

<a href="https://gist.github.com/14paxton/685637fd8c513c7539a10f66b2386cfe"> Union Example </a>

# Print separate page from current page

<a href="https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879"> print pre-defined page </a>

# Script to fill form example

<a href="https://gist.github.com/14paxton/fedc95a9b660e1625373bea6f92e4648"> fill form </a>

# Get All CSS for element and children- returns css string

> [recursive css](https://gist.github.com/14paxton/70018ca1b4b990db4fbf4edfd1907af8)

# embed, inject, or load an HTML file into an HTML document

## fetch and insert html into onload

```javascript
const pathToHTML = '/assets/HTMLSnippets/Nav.html';

async function fetchHTMLFile(path) {
  return await fetch(path);
}

async function loadHTML() {
  console.log(navigator.userAgent);
  if (/(iphone|android|blackberry|webos)/i.test(navigator.userAgent)) {
    const promise = await fetchHTMLFile(pathToHTML);
    document.querySelector('#insertion').innerHTML = await promise.text();
  }
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  }
  else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(loadHTML);
```

## load html and css file into html doc

```javascript
//************** Add path to files to test **********************//
//path to html file you want to use
const pathToHTML = "/Yuma_Regional/yuma_regional_launch.html";
//path to html file you want to use

//path to css file
const cssFilePath = "01Launch_Page_Default_Template.css";
//path to css file
//************** Add path to files to test **********************//

const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.href = cssFilePath;
document.querySelector("head").appendChild(cssLink);

window.addEventListener("load", async function () {
    const promise = await fetchHTMLFile(pathToHTML);
    const html = await promise.text();
    document.querySelector("body").innerHTML = html;
}, false,);

async function fetchHTMLFile(path) {
  return await fetch(path);
}
```

## Create a new document and open in a new window using ReadableStream

> using readable stream takes html file and inserts it into a current window document

> [inject html file into the current window](https://gist.github.com/14paxton/fb7f33fd6f5fa7a15077b6ebf18fca44)

# [Add to Reddit Custom Feed](https://gist.github.com/14paxton/63944ec7e8bcd0e7ee9b97e3dc6fd48e)

---

# get middle of webpage

```javascript
const x = window.innerWidth / 2;
const y = window.innerHeight / 2;

const eye = document.documentElement;
const {left, top, width, height} = eye.getBoundingClientRect();
const centerX = left + width / 2;
const centerY = top + height / 2;
```

# run an async await inline

```javascript
(async () => {
  await createDataUrls(clonedTableArray, dimensionsObj, additionalSlides, resolveURLCreation, rejectURL,);
})();
```

# Conditional load scripts included in HTML by manipulating the type attribute

```javascript
if (conditional === true) {
  const cScripts = document.querySelectorAll(".conditional");

  cScripts.forEach((item) => {
    const script = document.createElement("script");

    const attrs = item.getAttributeNames();

    attrs.forEach((attr) => {
      script.setAttribute(attr, item.getAttribute(attr));
    });

    script.type = "text/javascript";

    script.async = false;

    item.remove();

    document.head.appendChild(script);
  });
}
```

# Currying

> Basically, it allows you to transform a function like `f(a, b, c)` into something like `f(a)(b)(c)`.
> What that means is that you can split up a function with multiple arguments into a
> sequence of functions with one argument each.

```javascript
const newUser = function (name, age, skill) {
  return {
    name, age, skill,
  };
};

newUser("John", 27, "JS");
```

- > Now to the curry part:

  ```javascript
  const newUser = function (name) {
    return function (age) {
      return function (skill) {
        return {
          name,
          age,
          skill,
        };
      };
    };
  };

  newUser("John")(27)("JS");
  ```

- > Add in some arrow functions and voila:

  ```javascript
  const newUser = (name) => (age) => (skill) => {
    name, age, skill;
  };
  ```

> The purpose of all this you might ask?

> Think about situations when you don't have the complete data available in the beginning and you still need your function to gradually pass through
> your app and receive its arguments step by step as
> more and more data is arriving, until you add the final argument and receive the output.