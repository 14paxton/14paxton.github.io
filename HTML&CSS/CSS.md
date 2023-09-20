---
title: CSS
permalink: HTML&CSS/CSS
category: HTML&CSS
parent: HTML&CSS
layout: default
has_children: false
share: true
shortRepo:
  - default          
---

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

# Adding to HTML

## Inline

```html
<h2>Inline CSS Example</h2>
<p>Thanks to <span style="color: #FF7A59">inline</span> CSS, I can change the color of a word in a paragraph.</p>
```

## Internal

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            p {
                color: #FF7A59;
            }
        </style>
    </head>
    <body>
        <h2>Internal CSS Example</h2>
        <p>The default text color for the page is black. However I can change the color of every paragraph element on the page using internal CSS.</p>
        <p>Using internal CSS, I only need to write one rule set to change the color of every paragraph elemnet.</p>
        <p>With inline CSS, I'd have to add a style attribute to every single paragraph in my HTML.</p>
    </body>
</html>
```

## External

```css
div {
    background-color: #EAF0F6;
    color: #33475B;
    border: 3px solid #00A4BD;
    padding: 5px;
}
```

```html
<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" type="text/css" rel="noopener" target="_blank" href="mystyle.css">
        </head>
        <body>
            <div>
                <h1>External CSS Example</h1>
                <p>In the external stylesheet, the div is styled to have a background color, text color, border, and padding.</p>
            </div>
        </body>
</html>

```

# Selectors

![cssSelectors.png](..%2Fassets%2Fimages%2FcssSelectors.png)
    
---

# Tricks

<object data="css.html" width="1000" height="10000" type="text/html"></object>