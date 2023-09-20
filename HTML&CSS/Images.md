---
title: Images
permalink: HTML&CSS/Images
category: HTML&CSS
parent: HTML&CSS
layout: default
has_children: false
share: true
shortRepo:
  - html&css
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

# SVG

```xml

<svg version="1.1"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">

    <rect width="100%" height="100%" fill="red"/>

    <circle cx="150" cy="100" r="80" fill="green"/>

    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

</svg>

```

## CSS

```html
<a href="/" class="logo">
  Kiwi Corp
</a>
```

```css
.logo {
    display: block;
    text-indent: -9999px;
    width: 100px;
    height: 82px;
    background: url(kiwi.svg);
    background-size: 100px 82px;
}
```

> or

```css
.main-header {
    background: url(logo.svg) no-repeat top left;
    background-size: contain;
}

.no-svg .main-header {
    background-image: url(logo.png);
}
```

> or

```css
.illustration {
    background-image: url('image.svg');
}
```

And just like raster graphics, you can base64 encode them right into the stylesheet to help reduce HTTP requests:

```css
.illustration {
    background-image: url('data:image/svg+xml;base64,[data]');
}
```

To aid readability you may even attempt such audacity as this:

```css
.illustration {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg></svg>');
}
```

## html

### svg element

```html

<svg baseProfile="full" height="200" version="1.1" width="300" xmlns="http://www.w3.org/2000/svg">
  <rect fill="black" height="100%" width="100%"/>
  <circle cx="150" cy="100" fill="blue" r="90"/>
</svg>
```

### image element

```html
<img src="image.svg" onerror="this.onerror=null; this.src='image.png'">
```

### body element

```html
body {background: url(fallback.png);background-image: url(image.svg), none;}
```

## inline

```html

<body>

   <!-- paste in SVG code, image shows up!  -->

</body>
```

### iframe element

```html

<iframe height="500" sandbox src="triangle.svg" width="500">
  <img alt="Triangle with three unequal sides" src="triangle.png"/>
</iframe>

```

### object element

```html

<object type="image/svg+xml" data="image.svg">
    <img src="fallback.png">
</object>
```

This is the oldest method we have. And of course, data URIs are possible here too:

```html

<object type="image/svg+xml" data="data:image/svg+xml;base64,[data]">
    <img src="fallback.png">
</object>
```

If the browser doesn’t recognise the object element’s MIME type it won’t download the SVG file but the “fallback” image inside is always downloaded. Again, we’re not doing things quite right. There is a better solution and those crafty devils at ClearLeft are sporting it in their logo markup. The answer? Simply use CSS to apply the fallback image:

```html

<object id="logo" type="image/svg+xml" data="logo.svg">
    <div>logo description</div>
</object>
```

```css
#logo div {
    width: 300px;
    height: 50px;
    background-image: url("logo.png");
}
```

The object element effectively replaces it’s default content with the SVG data. Only if the browser doesn’t support SVG does the element inside get styled. This to my knowledge is the best way to use SVG without any overhead.

#[ Data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

## css

```css
li {
    background: url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7) no-repeat left center;
    padding: 5px 0 5px 25px;
}
```

> or

```css    
html {
    background-image: url('data:image/jpg;base64,/9j/4RkARXhpZgAATU0AKgAAAAgAB6f/9k='), url(/TBEX/resource/src/815-teams-north-gate-path.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
    /*background-color: #FFFFFF; !* match backgroud to bottom of page *!*/
}    
```   

## html

> format
>> data:[<mime type>][;charset=<charset>][;base64],<encoded data>

```html
<img alt="star" height="16" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7" width="16">
```

## Formats

```
<!-- base64 -->
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL...

<!-- UTF-8, not encoded -->
data:image/svg+xml;charset=UTF-8,<svg ...> ... </svg>

<!-- UTF-8, optimized encoding for compatibility -->
data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://...'

<!-- Fully URL encoded ASCII -->
data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//...
```

# Resources

- [CSSTricks](https://css-tricks.com/using-svg/)

## Encoder/Converter

### [URL Encoder for SVG](https://yoksel.github.io/url-encoder/)

### [Image To Data Uri](https://websemantics.uk/tools/image-to-data-uri-converter/)

### [PNG to SVG](https://png2svg.com/)