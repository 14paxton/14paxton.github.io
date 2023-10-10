# Run Locally

```bash
bundle exec jekyll serve;     

```

# Adding images data uri

```html

<link rel="modulepreload" href="/assets/js/imageLoader.js">
<script type="module" async src="/assets/js/imageLoader.js"></script>

***

<div id="imageContainer" data-key-as-header="true" data-zoom-on-hover="true" data-img-loader="linuxImages.js" style="width: auto; height: auto;"></div></div>
```

> use json object put header as key if you need header, data uri as value