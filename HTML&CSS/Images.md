---
title:        Images
permalink:    HTML&CSS/Images
category:     HTML&CSS
parent:       HTML&CSS
layout:       default
has_children: false
share:        true
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

---

<br/>

# [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Image_Tag)

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
<a href="/" class="logo"> Kiwi Corp </a>
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
    background-image: url("image.svg");
}
```

And just like raster graphics, you can base64 encode them right into the stylesheet to help reduce HTTP requests:

```css
.illustration {
    background-image: url("data:image/svg+xml;base64,[data]");
}
```

To aid readability, you may even attempt such audacity as this:

```css
.illustration {
    background-image: url("data:image/svg+xml;charset=utf-8,<svg></svg>");
}
```

## html

### svg element

```html

<svg
        baseProfile="full"
        height="200"
        version="1.1"
        width="300"
        xmlns="http://www.w3.org/2000/svg"
>
    <rect fill="black" height="100%" width="100%"/>
    <circle cx="150" cy="100" fill="blue" r="90"/>
</svg>
```

### image element

```html
<img src="image.svg" onerror="this.onerror=null; this.src='image.png'"/>
```

### body element

```css
body {
    background: url(fallback.png);
    background-image: url(image.svg), none;
}
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
    <img src="fallback.png"/>
</object>
```

This is the oldest method we have. And of course, data URIs are possible here too:

```html

<object type="image/svg+xml" data="data:image/svg+xml;base64,[data]">
    <img src="fallback.png"/>
</object>
```

If the browser doesn’t recognise the object element’s MIME type, it won’t download the SVG file, but the “fallback” image inside is always downloaded.
Again, we’re not doing things quite right.
There
is a better solution and those crafty devils at ClearLeft are sporting it in their logo markup.
The answer?
Simply use CSS to apply the fallback image:

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

The object element effectively replaces its default content with the SVG data.
Only if the browser doesn’t support SVG, does the element inside get styled.
This, to my knowledge, is the best way to
use SVG without any overhead.

# [ Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

> The data URI format is pretty simple and is spelled out in RFC 2397 (which actually is short enough that you can read it all). The basic format is as follows:

`data:[<mime type>][;charset=<charset>][;base64],<encoded data>`

> In this format, `data: ` is the protocol of the URI, indicating that this is a data URI.
> The second part, the `MIME type`, indicates the type of data being represented.
> For PNG images, for
> example, this would be `image/png`.
> When not specified, the `MIME` type defaults to `text/plain`.
> The character set can, most often, safely be omitted and isn’t used at all for images.
> The
> next section indicates the encoding used.
> Contrary to popular belief, you do not have to use `base 64 encoding`.
> If the content isn’t base 64 encoded, then the data is encoded using standard
> URL-encoding (URL-safe `ASCII` characters represented as themselves, all others represented as a hex encoding in the format `%xx`).
> The encoded data may contain white space, which is not
> considered significant.

## Formats

```
<!-- base64 -->
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL...
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Base 64 encoding is a system of encoding whereby data is converted into bits and then grouped numerically into a set of base 64 digits.
Base 64 digits include A through Z, both uppercase and lowercase, numbers, and plus (+) and slash (/).
The equals sign (=) is used to indicate padding has occurred.
All you really need to understand is that base 64 encoding makes the encoded data much smaller.       
</div> 
<br/><br/>
<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;">            
    **Note: **Base 64-encoding actually makes images larger.
If you’re using HTTP compression, however, you likely won’t notice a difference because base 64-encoded data compresses extremely well.
If for some reason you can’t use HTTP compression, you may want to check how many bytes you’re sending over the wire to determine if the tradeoff is worth it.      
</div>

---

```
<!-- UTF-8, not encoded -->
data:image/svg+xml;charset=UTF-8,<svg ...> ... </svg>
```

---

```
<!-- UTF-8, optimized encoding for compatibility -->
data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://...'
```

> example :
> `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M224%20387.814V512L32 320l192-192v126.912C447.375 260.152 437.794 103.016 380.93 0 521.287 151.707 491.48 394.785 224 387.814z'/%3E%3C/svg%3E`

---

```
<!-- Fully URL encoded ASCII -->
data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//...
```

> example :
> `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M224%20387.814V512L32%20320l192-192v126.912C447.375%20260.152%20437.794%20103.016%20380.93%200%20521.287%20151.707%20491.48%20394.785%20224%20387.814z%22%2F%3E%3C%2Fsvg%3E`

## css

```css
.logo {
    background: url("data:image/svg+xml;base64,[data]");
}
```

```css
li {
    background: url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7) no-repeat left center;
    padding: 5px 0 5px 25px;
}
```

> or

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           this uses a fallback url
</div>

```css
html {
    background-image: url(data:image/jpg;base64,/9j/4RkARXhpZgAATU0AKgAAAAgAB6f/9k=),
    url(/TBEX/resource/src/815-teams-north-gate-path.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
}
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    <h1>What I have used to get data uri to work with using as background css</h1>       
<h2> first use at TPlus</h2>

<code>
style = "
background: url(); 
<br>
background-size: cover; 
<br>
background-repeat: no-repeat;
<br>
background-position: center; 
<br>
height: 100%; 
<br>
width: 90%;"
</code>
<h2>Option 2</h2>
<code> 
style="
<br>
background: url() no-repeat;
<br>
display: 100% auto; 
<br>
background-size: 100%; 
<br>
background-position: center; 
<br>
width: 100%; 
<br>
height: 100%; 
<br>
margin:0 auto;"
</code>
<h2>Option 3</h2>
<code>
style="
<br>
background: url() no-repeat; 
<br>
background-position: top; 
<br>
background-size: contain; 
<br>
width: auto; 
<br>
height: auto; 
<br>
margin: auto;"
</code>
<h2>Simple Option</h2>
<code>
style="
<br>
background: url() no-repeat; 
<br>
background-position: center; 
<br>
background-size: 100% auto; "
</code>

</div> 

### Preload Image with CSS and HTML

```css
.masthead {
    height: 100vh;
    background-image: url("[masthead.jpg|<data URI>]");
    background-size: cover;
}
```

```html

<link rel="preload" href="masthead.jpg" as="image"/>

<title>Preloaded Image</title>

<link rel="stylesheet" href="image.css"/>
```

## image

```html
<img src="data:image/svg+xml;base64,[data]"/>
```

```html
<img
        alt="star"
        height="16"
        src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7"
        width="16"
/>
```

## iframe

```html

<iframe
        width="600"
        height="200"
        src="data:text/html;charset=utf-8;base64,PCFET0...C9odG1sPg=="
></iframe>
```

## object

```html

<object type="image/svg+xml" data="data:image/svg+xml;base64,[data]">
    fallback
</object>
```

# Resources

- [CSSTricks](https://css-tricks.com/using-svg/)

## Encoder/Converter

### [URL Encoder for SVG](https://yoksel.github.io/url-encoder/)

### [Data URI Generator](https://dopiaza.org/tools/datauri/index.php)

### [Image To Data Uri](https://websemantics.uk/tools/image-to-data-uri-converter/)

### [PNG to SVG](https://png2svg.com/)