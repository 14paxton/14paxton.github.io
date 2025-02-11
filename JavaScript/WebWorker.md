---
title:        WebWorker
permalink:    JavaScript/WebWorker
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

# Webworker

> [React Example](ReactNotes/WebWorker.md)

```javascript
const items = new Array(100).fill(null);

const workerScript = `
  function waitSync(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
  }

  self.onmessage = function(e) {
    waitSync(50);
    self.postMessage('Process complete!');
  }
`;

const blob = new Blob([workerScript], {type: "text/javascipt"});
const worker = new Worker(window.URL.createObjectURL(blob));

for (const i of items) {
    worker.postMessage(items);

    await new Promise((resolve) => {
        worker.onmessage = function (e) {
            loopCount.innerText = Number(loopCount.innerText) + 1;
            resolve();
        };
    });
}
```

# [Scheduler](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler?ref=cms.macarthur.me)

> Unfortunately, the entire Scheduler interface comes with a bummer: it's not that well-supported across all browsers yet. But it is easy enough
> to [polyfill](https://github.com/GoogleChromeLabs/scheduler-polyfill?ref=cms.macarthur.me) with existing
> asynchronous APIs. So, at least a strong portion of users would benefit from it.

```javascript
const items = new Array(100).fill(null);

for (const i of items) {
    loopCount.innerText = Number(loopCount.innerText) + 1;

    await new Promise((resolve) => scheduler.postTask(resolve));

    waitSync(50);
}
```

- ## Yield

  > The yield() method of the Scheduler interface is used for yielding to the main thread during a task and continuing execution later, with the continuation scheduled as a
  prioritized task... This allows long-running work to be broken up so the browser stays responsive.

  ```javascript
    const items = new Array(100).fill(null);
    
    for (const i of items) {
    loopCount.innerText = Number(loopCount.innerText) + 1;
    
    await scheduler.yield();
    
    waitSync(50);
    }
  ```