---
title:     Document
permalink: JavaScript/Document
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

# CREATE STRING FUNCTION TO INSERT WHEN DYNAMICALLY CREATING NEW HTML DOCUMENT

```javascript
var s = doc.createElement("script");
s.type = "text/javascript";
let sum = function () {
    alert("mooo");
};
const x = sum.toString();
var code = `${x}; sum();`;
try {
    s.appendChild(doc.createTextNode(code));
    doc.body.appendChild(s);
}
catch (e) {
    s.text = code;
    doc.body.appendChild(s);
}
```

# create an onload function

> was using this to insert a string function for a window popup

```javascript
//can use if making string script and inserting via innertext
//i.e. const script = `<script>${insertReadyFunctionString}</script>`
const myOnloadFunction = `()=> console.log("this works")`;

export function insertReadyFunctionString() {
    const readyFunction = `function ready(fn) {      
            if (document.readyState != 'loading'){      
                fn();      
            } else {      
                document.addEventListener('DOMContentLoaded', fn);      
            }      
        }      
      
        ready(${myOnloadFunction})`;
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
      
        ready(${stringOnloadScript})`;
    return readyFunction;
}

const whereToAddObject = {
    head:           (documentElement, s) => {
        documentElement.head.prepend(s);
    }, body_top:    (documentElement, s) => {
        documentElement.body.prepend(s);
    }, body_bottom: (documentElement, s) => {
        documentElement.body.appendChild(s);
    },
};

async function addScript(documentElement, functionToAdd, stringElementName) {
    try {
        let s = documentElement.createElement("script");
        s.type = "text/javascript";
        const stringFunc = cleanWebPackImports(functionToAdd.toString());
        let code = `${stringFunc}`;
        try {
            s.appendChild(documentElement.createTextNode(code));
            if (Object.hasOwn(whereToAddObject, stringElementName)) {
                return Promise.resolve(whereToAddObject[stringElementName](documentElement, s),);
            }
        }
        catch (e) {
            s.text = code;
            if (Object.hasOwn(whereToAddObject, stringElementName)) {
                return Promise.resolve(whereToAddObject[stringElementName](documentElement, s),);
            }
        }
    }
    catch (e) {
        console.error("Can not add script to window:", e);
        return Promise.reject("Can not add script to window: " + e);
    }
}

//pass object example {elementToAppend: [array of functions]}
export function addFunctionsAsScript(documentElement, elementFunctionObject) {
    const promises = [];
    for (let [stringElementName, arrayOfFunctions] of Object.entries(elementFunctionObject,)) {
        const functionArray = Array.isArray(arrayOfFunctions)
                              ? arrayOfFunctions
                              : [arrayOfFunctions];

        functionArray.forEach((functionToAdd) => {
            promises.push(addScript(documentElement, functionToAdd, stringElementName),);
        });
    }

    return Promise.all(promises);
}

//expecting array of objects {src: cdn url , integrity: (optional) token, nonce: (optional) generated random id for script}
//and optional documentElement to attach to body
const scriptAttrObject = {};
scriptAttrObject.src = (src, scriptTag) => (scriptTag.src = src);
scriptAttrObject.nonce = (nonce, scriptTag) => (scriptTag.nonce = nonce);
scriptAttrObject.integrity = (integrity, scriptTag) => (scriptTag.integrity = integrity);

export async function addScriptsWithSRC(scriptSrcArray, documentElement) {
    const srcArray = Array.isArray(scriptSrcArray)
                     ? scriptSrcArray
                     : [scriptSrcArray];

    return srcArray.map((scriptTagInfoObj) => {
        const script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";

        Object.keys(scriptTagInfoObj).forEach((key) => {
            if (scriptAttrObject.hasOwnProperty(key)) {
                scriptAttrObject[key](scriptTagInfoObj[key], script);
            }
        });

        if (documentElement) documentElement.body.prepend(script);
        return script;
    });
}
```

## can pass cdn strings

```javascript
const jsDependents = [{
    src:                                                   `https://cdn.jsdelivr.net/npm/pptxgenjs@3.10.0/dist/pptxgen.bundle.js`,
    metaSrcContent: `https://cdn.jsdelivr.net`, integrity: `sha256-Wy9VBv6NL/AYHtNghEzGN525/yDwqqVoNXOScJYakwc=`, nonce: `cdn-${Math.floor(Math.random() * 35)}`,
}, {
    src:                                                   `https://cdn.jsdelivr.net/npm/jszip@3.10.0/dist/jszip.min.js`,
    metaSrcContent: `https://cdn.jsdelivr.net`, integrity: `sha256-RJEp/lRYoP8E7Mlpwa0GG4iCrDTmCSa8jxO6NrYUrOQ=`, nonce: `cdn-${Math.floor(Math.random() * 35)}`,
},];
```

# CDN or workaround for Content Security Policy

[content-security-policy](https://content-security-policy.com/)
[source whitelist](https://web.dev/csp/#source-whitelists)
[stack overflow refused-to-load-the-script-because-it-violates-the-following-content-security](https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po/31219814#31219814)

```javascript
export async function add_Dangerous_CSP_MetaTags(scriptSrcArray, documentElement,) {
    const srcArray = Array.isArray(scriptSrcArray)
                     ? scriptSrcArray
                     : [scriptSrcArray];

    const contentType = document.createElement("meta");
    contentType.httpEquiv = "content-type";
    contentType.content = "text/html; charset=utf-8 ;";

    return srcArray.map((scriptTagInfoObj) => {
        const metaContentSecurityPolicy = document.createElement("meta");
        metaContentSecurityPolicy.httpEquiv = "Content-Security-Policy";
        metaContentSecurityPolicy.content = `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptTagInfoObj?.metaSrcContent} ${scriptTagInfoObj?.nonce} ${scriptTagInfoObj?.integrity}`;

        documentElement.head.prepend(metaContentSecurityPolicy);
        return metaContentSecurityPolicy;
    });
}
```