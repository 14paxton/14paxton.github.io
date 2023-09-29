---
title: FunctionObject
permalink: JavaScript/FunctionObject
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

# TidBits

## Function Properties

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
<p>
 You Can pass arguments to functions that do no accept parameters:
<br/><br/>
<span>
   call arguments in method to see what has been passed
</span>
</p>       
</div> 

---

> ```arguments.callee```: Reference to the currently executing function that the arguments belong to.

> ```arguments.caller```: Reference to the function that invoked the currently executing function.

> ```arguments.length```: The number of arguments that were passed to the function.

> ```arguments[@@iterator]```: Returns a new Array iterator object that contains the values for each index in arguments.

## Function Methods

> ```Fn.call```: immediately calls a function

> ```Fn.apply```:  allows you to pass in an array for parameters

> ```Fn.bind```: will bind parameters to a new function

```javascript
var newFunc = oldFunc.bind({name: ted}, params["param1", "param2"])
```

# Get function as string

```javascript      
function extractFunctionBody(fn) {
    var reg = /function \((.*)\)[ ]?{(.*)}$/g;
    var match = reg.exec(fn.toString().replace(/\n/g, ";"));
    if (match) {
        return match[2];
    }
    else {
        return "";
    }
}      
```      

```javascript      
console.log("1", Function.prototype.toString.call(cloneNodeToDocument))
console.log("2", cloneNodeToDocument + '')
const entire = cloneNodeToDocument.toString()      
```      

> strip string

```javascript      
    console.log("3", entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}")))
console.log("4", entire.replace(/^[^{]*{\s*/, ''))
console.log("5", entire.match(/^[^{]+\{(.*?)\}$/))
console.log("6", entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}")))
console.log("7", '(' + cloneNodeToDocument.toString() + ')()')
console.log("8", '(' + cloneNodeToDocument + ')()')
console.log("9", extractFunctionBody(cloneNodeToDocument))      
```      

# get function info

```javascript      
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function annotate(fn) {
    var $inject, fnText, argDecl, last;

    if (!($inject = fn.$inject)) {
        $inject = [];
        if (fn.length) {
            fnText = fn.toString().replace(STRIP_COMMENTS, '');
            console.log("text", fnText)
            argDecl = fnText.match(FN_ARGS);
            console.log("args", argDecl)
            argDecl[1].split(FN_ARG_SPLIT).forEach(function (arg) {
                arg.replace(FN_ARG, function (all, underscore, name) {
                    $inject.push(name);
                });
            });
        }
        fn.$inject = $inject;
    }

    console.log(fn)
    console.log(fn.toString())

    return $inject;
}      
```      

# remove imported function

```javascript      
export function cleanWebPackImports(stringFunc) {
    const webPackRegex = /[^\s]*(WEBPACK_IMPORTED)(.*?)(\]\)|\])/g
    const importedFunctionRegex = /\[\"(.*?)\"\]/g
    let cleanedFunc = ''

    const extractedWebpack = Array.from(stringFunc.matchAll(webPackRegex))
    extractedWebpack.forEach(webPackGarbage => {
        const extractedFunction = Array.from(webPackGarbage[0].matchAll(importedFunctionRegex), x => x[1])
        cleanedFunc += stringFunc.replace(webPackGarbage[0], extractedFunction)

        //TODO find way to call function with string then can dynamically add used imports      
        // let imported = ''      
        // if (webPackRegex.test(window[func] + '')) {      
        //     imported = cleanWebPackImports(window[func] + '')      
        //     console.log("imported", imported)      
        // cleanedFunc += `${imported} `      
        // }      
    });

    return cleanedFunc? cleanedFunc : stringFunc
}      
```