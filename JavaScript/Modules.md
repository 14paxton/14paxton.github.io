---
title: Modules
permalink: JavaScript/Modules
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

---

<br/>

# Import

```javascript
// Classic string literals
const module1 = await import("./myModule.js");

// A variable
const path = "./myOtherModule.js";
const module2 = await import(path);

// Function call
const getPath = (version) => `./myModule/versions/${version}.js`;
const moduleVersion1 = await import(getPath("v1.0"));
const moduleVersion2 = await import(getPath("v2.0"));
```

## Import and run in script tag

```html
<script>
    import("/assets/js/modules/createCSSImageContainers.js").then(async (module) => {const {addCSSImageContainers} = module;
    await addCSSImageContainers();});
</script>
```

## Dynamic Import

```html
<script type="module">
  (async () => {
    const moduleSpecifier = "./lib.mjs";
    const { repeat, shout } = await import(moduleSpecifier);
    repeat("hello");
    // → 'hello hello'
    shout("Dynamic import in action");
    // → 'DYNAMIC IMPORT IN ACTION!'
  })();
</script>
```

## Async Import

```javascript
async function loadMyModule() {
  console.log("loadMyModule");
  const { default: runFunc } = await import(moduleSpecifier(file));
  await runFunc();
}

await loadMyModule();
```

## Preload modules

---

> You can optimize the delivery of your modules further by using `<link rel="modulepreload">`.
> This way, browsers can preload and even preparse and precompile modules and their dependencies.

---

```html
<link rel="modulepreload" href="lib.mjs" />
<link rel="modulepreload" href="main.mjs" />
<script type="module" src="main.mjs"></script>
<script nomodule src="fallback.js"></script>
```

---

> This is especially important for larger dependency trees.
> Without `rel="modulepreload"`,
> the browser needs to perform multiple `HTTP` requests to figure out the full dependency tree.
> However, if you declare the full list of dependent module scripts with `rel="modulepreload"`,
> the browser does not have to discover these dependencies progressively.

---

## Use Side Effects

```javascript
(async () => {
  if (somethingIsTrue) {
    // import module for side effects
    await import("/modules/my-module.js");
  }
})();
```

## Defaults

```javascript
(async () => {
  if (somethingIsTrue) {
    const {
      default: myDefault,
      foo,
      bar,
    } = await import("/modules/my-module.js");
  }
})();
```

## On Demand

```javascript
const main = document.querySelector("main");
for (const link of document.querySelectorAll("nav > a")) {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    import("/modules/my-module.js")
      .then((module) => {
        module.loadPageInto(main);
      })
      .catch((err) => {
        main.textContent = err.message;
      });
  });
}
```

## Based on Env

```javascript
let myModule;

if (typeof window === "undefined") {
  myModule = await import("module-used-on-server");
} else {
  myModule = await import("module-used-in-browser");
}
```

## With A non Literal

```javascript
Promise.all(
  Array.from({ length: 10 }).map(
    (_, index) => import(`/modules/module-${index}.js`),
  ),
).then((modules) => modules.forEach((module) => module.load()));
```