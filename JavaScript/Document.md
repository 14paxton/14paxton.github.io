---  
title:        Document    
permalink:    JavaScript/Document    
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
# CREATE STRING FUNCTION TO INSERT WHEN DYNAMICALLY CREATING NEW HTML DOCUMENT      
    
```javascript      
var s = doc.createElement('script');    
s.type = 'text/javascript';    
let sum = function () {    
    alert('mooo')    
}    
const x = sum.toString()    
var code = `${x}; sum();`    
try {    
    s.appendChild(doc.createTextNode(code));    
    doc.body.appendChild(s);    
}    
catch (e) {    
    s.text = code;    
    doc.body.appendChild(s);    
}      
```      
    
# create an onload function - was using this to insert a string function for a window popup    
    
```javascript      
//can use if making string script and inserting via innertext      
//i.e. const script = `<script>${insertReadyFunctionString}</script>`      
const myOnloadFunction = `()=> console.log("this works")`    
    
export function insertReadyFunctionString() {    
    const readyFunction = `function ready(fn) {      
            if (document.readyState != 'loading'){      
                fn();      
            } else {      
                document.addEventListener('DOMContentLoaded', fn);      
            }      
        }      
      
        ready(${myOnloadFunction})`    
    return readyFunction;    
}      
```      
    
# dynamically create scripts    
    
```javascript      
//Functions for dynamically adding script elements      
export function fireReadyScript(stringOnloadScript) {    
    const readyFunction = `function ready(fn) {      
            if (document.readyState != 'loading'){      
                fn();      
            } else {      
                document.addEventListener('DOMContentLoaded', fn);      
            }      
        }      
      
        ready(${stringOnloadScript})`    
    return readyFunction;    
}    
    
const whereToAddObject = {    
    head: (documentElement, s) => {documentElement.head.prepend(s)}, body_top: (documentElement, s) => {documentElement.body.prepend(s)}, body_bottom: (documentElement, s) => {documentElement.body.appendChild(s)}    
}    
    
async function addScript(documentElement, functionToAdd, stringElementName) {    
    try {    
        let s = documentElement.createElement('script');    
        s.type = 'text/javascript';    
        const stringFunc = cleanWebPackImports(functionToAdd.toString())    
        let code = `${stringFunc}`    
        try {    
            s.appendChild(documentElement.createTextNode(code));    
            if (Object.hasOwn(whereToAddObject, stringElementName)) {    
                return Promise.resolve(whereToAddObject[stringElementName](documentElement, s))    
            }    
        }    
        catch (e) {    
            s.text = code;    
            if (Object.hasOwn(whereToAddObject, stringElementName)) {    
                return Promise.resolve(whereToAddObject[stringElementName](documentElement, s))    
            }    
        }    
    }    
    catch (e) {    
        console.error("Can not add script to window:", e)    
        return Promise.reject("Can not add script to window: " + e)    
    }    
}    
    
//pass object example {elementToAppend: [array of functions]}      
export function addFunctionsAsScript(documentElement, elementFunctionObject) {    
    const promises = []    
    for (let [stringElementName, arrayOfFunctions] of Object.entries(elementFunctionObject)) {    
        const functionArray = Array.isArray(arrayOfFunctions)    
                              ? arrayOfFunctions    
                              : [arrayOfFunctions]    
    
        functionArray.forEach(functionToAdd => {    
            promises.push(addScript(documentElement, functionToAdd, stringElementName))    
        })    
    }    
    
    return Promise.all(promises)    
}    
    
//expecting array of objects {src: cdn url , integrity: (optional) token, nonce: (optional) generated random id for script}      
//and optional documentElement to attach to body      
const scriptAttrObject = {}    
scriptAttrObject.src = (src, scriptTag) => scriptTag.src = src;    
scriptAttrObject.nonce = (nonce, scriptTag) => scriptTag.nonce = nonce;    
scriptAttrObject.integrity = (integrity, scriptTag) => scriptTag.integrity = integrity;    
    
export async function addScriptsWithSRC(scriptSrcArray, documentElement) {    
    const srcArray = Array.isArray(scriptSrcArray)    
                     ? scriptSrcArray    
                     : [scriptSrcArray]    
    
    return srcArray.map(scriptTagInfoObj => {    
        const script = document.createElement('script');    
        script.async = true;    
        script.crossOrigin = "anonymous";    
    
        Object.keys(scriptTagInfoObj).forEach(key => {    
            if (scriptAttrObject.hasOwnProperty(key)) {    
                scriptAttrObject[key](scriptTagInfoObj[key], script)    
            }    
        })    
    
        if (documentElement) documentElement.body.prepend(script);    
        return script    
    })    
}    
    
```      
    
## can pass cdn strings    
    
```javascript      
const jsDependents = [{    
    src: `https://cdn.jsdelivr.net/npm/pptxgenjs@3.10.0/dist/pptxgen.bundle.js`, metaSrcContent: `https://cdn.jsdelivr.net`, integrity: `sha256-Wy9VBv6NL/AYHtNghEzGN525/yDwqqVoNXOScJYakwc=`, nonce: `cdn-${Math.floor(Math.random() * 35)}`    
}, {    
    src: `https://cdn.jsdelivr.net/npm/jszip@3.10.0/dist/jszip.min.js`, metaSrcContent: `https://cdn.jsdelivr.net`, integrity: `sha256-RJEp/lRYoP8E7Mlpwa0GG4iCrDTmCSa8jxO6NrYUrOQ=`, nonce: `cdn-${Math.floor(Math.random() * 35)}`    
}]      
```      
    
# clone element to base64 png    
    
```javascript      
function svgToDataURL(svg) {    
    return Promise.resolve()    
                  .then(() => new XMLSerializer().serializeToString(svg))    
                  .then(encodeURIComponent)    
                  .then((html) => `data:image/svg+xml;charset=utf-8,${html}`)    
}    
    
function nodeToDataURL(node, width, height,) {    
    return new Promise(resolve => {    
        const xmlns = 'http://www.w3.org/2000/svg'    
    
        const foreignObject = document.createElementNS(xmlns, 'foreignObject')    
        foreignObject.setAttribute('width', '100%')    
        foreignObject.setAttribute('height', '100%')    
        foreignObject.setAttribute('x', '0')    
        foreignObject.setAttribute('y', '0')    
        foreignObject.setAttribute('externalResourcesRequired', 'true')    
    
        const svg = document.createElementNS(xmlns, 'svg')    
        svg.setAttribute('width', `${width}`)    
        svg.setAttribute('height', `${height}`)    
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)    
    
        svg.appendChild(foreignObject)    
        foreignObject.appendChild(node)    
        resolve(svgToDataURL(svg))    
    })    
    
}    
    
function createImage(url) {    
    return new Promise((resolve, reject) => {    
        const img = new Image()    
        img.onload = () => resolve(img)    
        img.onerror = reject    
        img.crossOrigin = 'anonymous'    
        img.decoding = 'sync'    
        img.src = url    
    })    
}    
    
function buildCanvas(img) {    
    return new Promise(resolveCanvas => {    
        const canvas = document.createElement('canvas')    
        const context = canvas.getContext('2d')    
        const canvasHeight = img.height + 50    
        const canvasWidth = img.width + 50    
        canvas.width = canvasWidth    
        canvas.height = canvasHeight    
        canvas.style.width = `${canvasWidth}`    
        canvas.style.height = `${canvasHeight}`    
        context.drawImage(img, 0, 0, canvas.width, canvas.height)    
    
        resolveCanvas(defaultSlideObject(canvas.toDataURL(), canvas.width, canvas.height))    
    })    
}    
    
//this is similar to how html2canvas and html-to-image libraries work      
// take element -> get generated css -> create ans svg(needed to paint canvas element) ->      
// use svg to create xml then uri then uri data string -> use data uri to create image element by adding uri to src attribute ->      
// create a canvas element inserting/drawing image in -> get dataURL to use      
export function createElementToPNGBase64(arrayOfElementObjects, dimensionsObj, addIndividualElementCSS) {    
    if (arrayOfElementObjects) {    
        return new Promise(resolve => {    
            elementsToNewDocument(arrayOfElementObjects, dimensionsObj, addIndividualElementCSS)    
                .then(({clonedDocument, width, height, newElementArray}) => nodeToDataURL(clonedDocument.documentElement, width, height))    
                .then(createImage)    
                .then(buildCanvas)    
                .then(resolve)    
        })    
    }    
}    
    
export function cloneNodeToDocument(node, elementToAppend, idToSet, width, height, addIndividualElementCSS) {    
    if (node) {    
        const w = width    
                  ? width    
                  : node.scrollWidth    
        const h = height    
                  ? height    
                  : node.scrollHeight    
        const newNode = createClone(node, !!addIndividualElementCSS, w, h)    
        newNode.id = idToSet    
        elementToAppend.appendChild(newNode)    
        return newNode    
    }    
}    
    
//array of element objects example: [{key: element}]      
// dimension object key should match element if custom dimension needed      
// example: {key:{height: number, width: number}}      
export function elementsToNewDocument(arrayOfElementObjects, dimensionsObj, addIndividualElementCSS) {    
    return new Promise(resolveNewDocument => {    
        const usableArray = Array.isArray(arrayOfElementObjects)    
                            ? arrayOfElementObjects    
                            : [arrayOfElementObjects]    
    
        const clonedDocument = document.cloneNode(true)    
        // documentElement.querySelectorAll("noscript").forEach(el => el.remove())      
        const body = clonedDocument.body    
        body.innerHTML = ''    
    
        let totalWidth = 0    
        let totalHeight = 0    
    
        const clonedElementArray = usableArray.map((elementObj) => {    
            const key = Object.keys(elementObj)[0]    
            const element = elementObj[key]    
            const width = Object.hasOwn(dimensionsObj, key)    
                          ? dimensionsObj[key]?.width    
                          : element.scrollWidth    
            const height = Object.hasOwn(dimensionsObj, key)    
                           ? dimensionsObj[key]?.height    
                           : element.scrollHeight    
    
            totalWidth = (totalWidth > width)    
                         ? totalWidth    
                         : width    
            totalHeight += height    
            cloneNodeToDocument(element, body, key, width, height, addIndividualElementCSS)    
        })    
    
        resolveNewDocument({clonedDocument: clonedDocument, width: totalWidth, height: totalHeight, newElementArray: clonedElementArray})    
    })    
}      
```      
    
# CDN or workaround for Content Security Policy    
    
https://content-security-policy.com/      
https://web.dev/csp/#source-whitelists      
https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po/31219814#31219814    
    
```javascript      
export async function add_Dangerous_CSP_MetaTags(scriptSrcArray, documentElement) {    
    const srcArray = Array.isArray(scriptSrcArray)    
                     ? scriptSrcArray    
                     : [scriptSrcArray]    
    
    const contentType = document.createElement('meta');    
    contentType.httpEquiv = "content-type"    
    contentType.content = "text/html; charset=utf-8 ;"    
    
    return srcArray.map(scriptTagInfoObj => {    
        const metaContentSecurityPolicy = document.createElement('meta');    
        metaContentSecurityPolicy.httpEquiv = 'Content-Security-Policy'    
        metaContentSecurityPolicy.content = `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptTagInfoObj?.metaSrcContent} ${scriptTagInfoObj?.nonce} ${scriptTagInfoObj?.integrity}`    
    
        documentElement.head.prepend(metaContentSecurityPolicy);    
        return metaContentSecurityPolicy    
    })    
}      
```      
    
# Create New Document from html file and insert into window.document    
    
[GIST for HTML to new Document streamer](https://gist.github.com/14paxton/a5a6b17131a2791b757973f866e3eb98)