---
title: CDN
permalink: JavaScript/CDN
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

# CDN Fallback

## Load jquery

### inline scripts

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
```

```html
<script>
  !window.jQuery &&
    document.write('<script src="/js/libs/jquery-1.11.1.min.js"><\/script>');
</script>
```

### function in head or body

```html
<script>
  const cdnLoadErrorFallback = {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js",
    bootstrap:
      "https://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
    validator:
      "https://s3.amazonaws.com/tb.tbex.rsrcs/lib.common/js/bootstrap-validator/dist/validator.min.js",
    h5f: "https://s3.amazonaws.com/tb.tbex.rsrcs/lib.common/js/H5F/h5f.min.js",
  };

  function cdnLoaded(x) {
    console.log("loaded", x);
  }

  function buildScript(id) {
    const script = document.createElement("script");
    script.id = "test";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.fetchpriority = "high";
    script.setAttribute("referrerpolicy", "origins");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", cdnLoadErrorFallback[id]);

    document.write(`<script src=${cdnLoadErrorFallback[id]}>\x3C/script>`);
  }

  function cdnError(script) {
    const { id, src } = script;
    console.log(`error loading ${id}`, src);

    if (Object.hasOwn(cdnLoadErrorFallback, id)) {
      buildScript(id);
    }
  }
</script>
<script
  id="jquery"
  onload="cdnLoaded()"
  onerror="cdnError(this)"
  src="/TBEX/assets/jquery.min.js"
></script>
<script
  id="bootstrap"
  onload="cdnLoaded()"
  onerror="cdnError(this)"
  src="/TBEX/assets/bootstrap.min.js"
></script>
<script
  id="validator"
  onload="cdnLoaded()"
  onerror="cdnError(this)"
  src="/TBEX/assets/validator.min.js"
></script>
<script
  id="h5f"
  onload="cdnLoaded()"
  onerror="cdnError(this)"
  src="/TBEX/assets/h5f.min.js"
></script>
```

- > ### check for existence of function from package and write or append to document or body or head

  ```html
  <script>
    if (typeof jQuery === "undefined") {
      // \x3c used to keep script from ending
      document.write(
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">\x3C/script>',
      );
    }
  </script>
  ```