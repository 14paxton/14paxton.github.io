---
title:        HTTP
permalink:    JavaScript/HTTP
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

# [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Unlike XMLHttpRequest that is a callback-based API, Fetch is promise-based and provides a better alternative that can be easily used in service workers. 
<br/>
Fetch also integrates advanced HTTP concepts such as CORS and other extensions to HTTP.       
</div> 

```javascript
// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method:         "POST", // *GET, POST, PUT, DELETE, etc.
        mode:           "cors", // no-cors, *cors, same-origin
        cache:          "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials:    "same-origin", // include, *same-origin, omit
        headers:        {
            "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
        }, redirect:    "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body:           JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", {answer: 42}).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
});
```

## Body

> Both requests and responses may contain body data. A body is an instance of any of the following types:

- ```ArrayBuffer```
- ```TypedArray (Uint8Array and friends)```
- ```DataView```
- ```Blob```
- ```File```
- ```String, or a string literal```
- ```URLSearchParams```
- ```FormData```

> The Request and Response interfaces share the following methods to extract a body. These all return a promise that is eventually resolved with the actual content.

- ```Request.arrayBuffer() / Response.arrayBuffer()```
- ```Request.blob() / Response.blob()```
- ```Request.formData() / Response.formData()```
- ```Request.json() / Response.json()```
- ```Request.text() / Response.text()```

# XMLHTTPRequest

```javascript
function reqListener() {
    console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "http://www.example.org/example.txt");
req.send();

```

## Types of requests

> A request made via XMLHttpRequest can fetch the data in one of two ways, asynchronously or synchronously.
> The type of request is dictated by the optional async argument (the third argument) that is
> set on the XMLHttpRequest.open() method.
> If this argument is true or not specified, the XMLHttpRequest is processed asynchronously, otherwise the process is handled synchronously.
> A detailed
> discussion and demonstrations of these two types of requests can be found on the synchronous and asynchronous requests page.
> You can't use synchronous requests outside web workers as it freezes the
> main interface.

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    The constructor XMLHttpRequest isn't limited to only XML documents.
It starts with "XML" because when it was created the main format that was originally used for asynchronous data exchange was XML.       
</div> 