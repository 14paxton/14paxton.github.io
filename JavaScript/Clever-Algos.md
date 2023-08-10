---  
title:        Clever-Algos    
permalink:    JavaScript/Clever-Algos    
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
# Group and object by key and possible subkey      
  
## returns {(key to group by) : [{(secondary key) : (key to group by)}]}  
  
<a href="https://gist.github.com/14paxton/a87f5d47aaf678e89a1dfeffa51b46d9"> groupArrayOfObjectsByKey</a>      
  
# Union / Enum for JS  
  
## java like enum can be used for pointer type function ex. https://dev.to/avalander/union-types-with-javascript-4emo  
  
  <a href="https://gist.github.com/14paxton/685637fd8c513c7539a10f66b2386cfe"> Union Example </a>       
  
# Print separate page from current page  
  
<a href="https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879"> print pre-defined page </a>      
  
# Script to fill form example  
  
<a href="https://gist.github.com/14paxton/fedc95a9b660e1625373bea6f92e4648"> fill form </a>      
  
# Get All CSS for element and children- returns css string  
  
> [recursive css](https://gist.github.com/14paxton/70018ca1b4b990db4fbf4edfd1907af8)  
  
# Create new document and open in new window  
  
> [Paint New Window](https://contest-server.cs.uchicago.edu/ref/JavaScript/developer.mozilla.org/en-US/docs/Web/API/Window/open.html)  
  
- alt  
  
> [paint new window](https://gist.github.com/14paxton/fb7f33fd6f5fa7a15077b6ebf18fca44)  
      
---  
# [Add to Reddit Custom Feed](https://gist.github.com/14paxton/63944ec7e8bcd0e7ee9b97e3dc6fd48e)  
---  
  
# get middle of webpage  
  
```javascript      
   const x = window.innerWidth / 2;  
const y = window.innerHeight / 2;  
  
const eye = document.documentElement  
const {left, top, width, height} = eye.getBoundingClientRect()  
const centerX = left + width / 2  
const centerY = top + height / 2      
```      
  
# run an async await inline  
  
```javascript      
(async () => { await createDataUrls(clonedTableArray, dimensionsObj, additionalSlides, resolveURLCreation, rejectURL)})()      
```      
  
# load html into html doc  
  
```javascript      
//************** Add path to files to test **********************//      
//path to html file you want to use      
const pathToHTML = '/Yuma_Regional/yuma_regional_launch.html';  
//path to html file you want to use      
  
  
//path to css file      
const cssFilePath = '01Launch_Page_Default_Template.css'  
//path to css file      
//************** Add path to files to test **********************//      
  
  
const cssLink = document.createElement('link')  
cssLink.rel = "stylesheet"  
cssLink.type = 'text/css'  
cssLink.href = cssFilePath  
document.querySelector('head').appendChild(cssLink)  
  
window.addEventListener("load", async function () {  
    const promise = await fetchHTMLFile(pathToHTML)  
    const html = await promise.text()  
    document.querySelector('body').innerHTML = html;  
}, false);  
  
  
async function fetchHTMLFile(path) {  
    return await fetch(path)  
}      
```      
  
# Conditionally load scripts included in HTML by manipulating the type attribute  
  
```javascript      
if (conditional === true) {  
  
    const cScripts = document.querySelectorAll('.conditional');  
  
    cScripts.forEach((item) => {  
  
        const script = document.createElement('script');  
  
        const attrs = item.getAttributeNames();  
  
        attrs.forEach((attr) => {  
  
            script.setAttribute(attr, item.getAttribute(attr));  
  
        });  
  
        script.type = 'text/javascript';  
  
        script.async = false;  
  
        item.remove();  
  
        document.head.appendChild(script);  
  
    })  
  
}      
```  
  
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