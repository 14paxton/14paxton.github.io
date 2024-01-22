---
title:        HTML
permalink:    HTML&CSS/HTML
category:     HTML&CSS
parent:       HTML&CSS
layout:       default
has_children: false
share:        true
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

---

<br/>

# TidBits

## embed, inject, or load an HTML file into HTML document using object tag

```html

<object data="css.html" height="10000" type="text/html" width="1000"></object>
```

```html

<embed src="./HTMLSnippets/Nav.html" style="width:400px; height: 400px;"/>
```

```html

<iframe
        src="./HTMLSnippets/Nav.html"
        style="width:400px; height: 400px;"
></iframe>
```

### load html into page

```javascript
const response = await fetch("/path/to/template.html");
const body = await response.text();

document.querySelector("#some.selector").innerHTML = body;
```

- [JS Code Reference](https://www.paxtonb.com/JavaScript/Clever-Algos#load-html-and-css-file-into-html-doc)

- [Read HTML Doc with scripst and css into HTML page](https://gist.github.com/14paxton/a5a6b17131a2791b757973f866e3eb98)

### HTML Include

> HTML

```html

<div w3-include-html="content.html"></div>
```

> using XMLHttpRequest

```html

<script>
    function includeHTML() {
        let z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("w3-include-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            elmnt.innerHTML = this.responseText;
                        }
                        if (this.status === 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("w3-include-html");
                        includeHTML();
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }
    }

    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
        }
        else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    ready(includeHTML);
</script>
```

# Attributes

## hide element attribute

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    <span>the hidden rule is a User Agent style, which means it's less specific than a moderate sneeze [ref]. This means that your favourite display style will override it</span>       
</div>

```html
<p hidden></p>
```

```html

<button>
    <span class="fa fa-tweet" aria-hidden="true"></span>
    <span class="label"> Tweet </span>
</button>
```

> in the case of form data, input type = "hidden"

```html
<input type="hidden" id="postId" name="postId" value="34657"/>
```

## [JS Events As Attributes](https://developer.mozilla.org/en-US/docs/Web/Events)

> inline event in html tag

```html

<div onMouseover="this.style.transform='scale(2)';">//content</div>
```

> or

```html

<div onmouseover="this.childNodes[1].childNodes[1].style.background='green';">
    //content
</div>
```

> or

```html

<div
        class="pdf-icon-box"
        onmouseout="this.getElementsByClassName('name')[0].style.backgroundColor = 'green';"
        onmouseover="this.getElementsByClassName('name')[0].style.backgroundColor = 'yellow'"
        style="position:relative;"
>
  <span class="pdf-style">
    <span class="name" style="display:inline-block;background-color:orange;">
      T E S T
    </span>
  </span>
</div>
```

### [On Load (onload) / Window Load Event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)

```html
<!doctype html>
<html>
<body onload="myFunction()">
<h1>HTML DOM Events</h1>
<h2>The onload Event</h2>

<script>
    function myFunction() {
        alert("Page is loaded");
    }
</script>
</body>
</html>
```

> or use an element and js

```javascript
div.onload = Promise.resolve(addPadding(div, keyAsHeader
                                             ? 60
                                             : 71, 0));
```

### [mouseover](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event)

> use js to create an element and add function to element event/attribute

```javascript
div.onmouseover = (e) => (e.target.style.transform = "scale(2)");
div.onmouseout = (e) => (e.target.style.transform = "scale(1)");
```

> pure js

```javascript
addEventListener("mouseover", (event) => {});
onmouseover = (event) => {};
```

# UI Elements

<div class="py-0 xs:ml-xs inline-block max-w-full" id="-post-rtjson-content">
<h2 class="text-18 xs:text-20">Buttons.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/m7g1MQ1d3m" rel="noopener nofollow ugc" target="_blank">7 Basic Rules for Button Design</a> by <a
            href="https://twitter.com/101babich" rel="noopener nofollow ugc" target="_blank"
    >@101babich</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/srbgqAOvyV" rel="noopener nofollow ugc" target="_blank">Button Design</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/4BXUNTEzIw" rel="noopener nofollow ugc" target="_blank">Cheatsheet for buttons</a> by <a href="https://twitter.com/tessgadd" rel="noopener nofollow ugc" target="_blank">@tessgadd</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Text fields.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/92eqmsxJz5" rel="noopener nofollow ugc" target="_blank">UI cheat sheet: text fields (Awesome article!)</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/a5OAlsBYYz" rel="noopener nofollow ugc" target="_blank">Text fields &amp; Forms design — UI components series</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/BzjdsNLbGp" rel="noopener nofollow ugc" target="_blank">The Anatomy of Input Field</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Checkboxes &amp; Toggles.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/2qwRITZ7xl" rel="noopener nofollow ugc" target="_blank">Checkbox vs Toggle Switch</a> by <a href="https://twitter.com/uxplanet" rel="noopener nofollow ugc" target="_blank">@uxplanet</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/ftcHGs20zy" rel="noopener nofollow ugc" target="_blank">Toggle-Switch Guidelines</a> by <a href="https://twitter.com/NNgroup" rel="noopener nofollow ugc" target="_blank">@NNgroup</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/jtc0K2esSa" rel="noopener nofollow ugc" target="_blank">Toggle design patterns</a> from <a
            href="https://twitter.com/just_in_mind" rel="noopener nofollow ugc" target="_blank"
    >@just_in_mind</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/xuuGxX4wle" rel="noopener nofollow ugc" target="_blank">38 Checkbox Designs</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Radio Buttons.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/iYM2TOwJJJ" rel="noopener nofollow ugc" target="_blank">Selection controls — UI component series (AWESOME)</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/toIB4ATFsy" rel="noopener nofollow ugc" target="_blank">Radio Buttons UX Design</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/ju5EKVnCCv" rel="noopener nofollow ugc" target="_blank">Radio button design: easy selection and decision-making</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Tables.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/LkviePrdOS" rel="noopener nofollow ugc" target="_blank">Design better data tables</a> by <a
            href="https://twitter.com/CoyleAndrew" rel="noopener nofollow ugc" target="_blank"
    >@CoyleAndrew</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/trFjRmCPsO" rel="noopener nofollow ugc" target="_blank">The Ultimate Guide to Designing Data Tables</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/IjBCF2SB3P" rel="noopener nofollow ugc" target="_blank">Designing better data tables for enterprise UX</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Datepickers. (It's a pain)</h2><ul>
      <li>
    <p>
    <a href="https://t.co/DMoKDpJ6Ri" rel="noopener nofollow ugc" target="_blank">How to Design a Perfect Date Picker Control?</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/PXcZGQ66Zv" rel="noopener nofollow ugc" target="_blank">Date Picker Design Best Practices</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/cF41bhB5dn" rel="noopener nofollow ugc" target="_blank">A hunt for the perfect date picker UI</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Sliders.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/NoSRmlHN1A" rel="noopener nofollow ugc" target="_blank">UNBELIEVABLE article</a> <a href="https://twitter.com/smashingmag" rel="noopener nofollow ugc" target="_blank">@smashingmag</a> is a golden resource really.
  </p>
  </li><li>
    <p>
    <a href="https://t.co/G8ymVAlh6l" rel="noopener nofollow ugc" target="_blank">Slider design UI patterns and examples</a> from <a
            href="https://twitter.com/just_in_mind" rel="noopener nofollow ugc" target="_blank"
    >@just_in_mind</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/0iXm3teB7F" rel="noopener nofollow ugc" target="_blank">Slider Design: Rules of Thumb from NNGroup</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Tabs.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/hLUpxfTUzf" rel="noopener nofollow ugc" target="_blank">Module Tabs in Web Design: Best Practices and Solutions</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/HmPNXiNoLV" rel="noopener nofollow ugc" target="_blank">12 Tabs Design guidelines</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Dropdowns</h2><ul>
      <li>
    <p>
    <a href="https://t.co/XMF5mE4jjc" rel="noopener nofollow ugc" target="_blank">UI cheat sheet: dropdown field (Like this one)</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/wnqYIWvAxF" rel="noopener nofollow ugc" target="_blank">Dropdowns: Design Guidelines</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/gRqNsCawTl" rel="noopener nofollow ugc" target="_blank">Drop down list design: the complete guide</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Pagination</h2><ul>
      <li>
    <p>
    <a href="https://t.co/M4qLpZHwxV" rel="noopener nofollow ugc" target="_blank">Paging, Scrolling, and Infinite Scroll</a> by <a
            href="https://twitter.com/uxmatters" rel="noopener nofollow ugc" target="_blank"
    >@uxmatters</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/AZN4ttXUli" rel="noopener nofollow ugc" target="_blank">UX: Infinite Scrolling vs. Pagination</a> by <a
            href="https://twitter.com/101babich" rel="noopener nofollow ugc" target="_blank"
    >@101babich</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/h74qKS8emt" rel="noopener nofollow ugc" target="_blank">Users' Pagination Preferences and "View All"</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Search inputs</h2><ul>
      <li>
    <p>
    <a href="https://t.co/g3qOCcYJ5U" rel="noopener nofollow ugc" target="_blank">Best UX practices for search inputs</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/O5tt2zIXKq" rel="noopener nofollow ugc" target="_blank">Design a Perfect Search Box</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/ua5Mfvqnk7" rel="noopener nofollow ugc" target="_blank">Site Search Suggestions</a> by <a href="https://twitter.com/nngroup" rel="noopener nofollow ugc" target="_blank">@nngroup</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Breadcrumbs.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/KQs8QvBJiS" rel="noopener nofollow ugc" target="_blank">Breadcrumbs: 11 Design Guidelines for Desktop and Mobile</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/Zet4DHNEb6" rel="noopener nofollow ugc" target="_blank">Are breadcrumbs still fresh for UX?</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/huUIxvox55" rel="noopener nofollow ugc" target="_blank">Breadcrumb examples for inspiration</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Carousels.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/TQsCzXfb3S" rel="noopener nofollow ugc" target="_blank">Carousel/slider design best practices (with examples)</a>
by <a href="https://twitter.com/webflow" rel="noopener nofollow ugc" target="_blank">@webflow</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/rv2II2WhM9" rel="noopener nofollow ugc" target="_blank">Carousel Usability: Designing an Effective UI for Websites with Content Overload</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/XmNcvJL7jt" rel="noopener nofollow ugc" target="_blank">Designing a User-Friendly Homepage Carousel</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Modals.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/WxYMZhG61p" rel="noopener nofollow ugc" target="_blank">Best Practices
for Designing UI Overlays</a> by <a href="https://twitter.com/oliverlindberg" rel="noopener nofollow ugc" target="_blank">@oliverlindberg</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/uPVaJ1CLDk" rel="noopener nofollow ugc" target="_blank">Big,
bold UX—using modal windows for in-app user engagement</a> from <a href="https://twitter.com/appcues" rel="noopener nofollow ugc" target="_blank">@appcues</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/5GJw7sl3VL" rel="noopener nofollow ugc" target="_blank">Modal &amp; Nonmodal Dialogs: When (&amp; When Not) to Use Them</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/TXEnv10keD" rel="noopener nofollow ugc" target="_blank">Modal dialogs</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Cards.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/22QfczOP7O" rel="noopener nofollow ugc" target="_blank">Card UI design: fundamentals and examples</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/4oRf8kwvn8" rel="noopener nofollow ugc" target="_blank">Simple Design Tips for Crafting Better UI Cards</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/nW1BQamhng" rel="noopener nofollow ugc" target="_blank">Designing cards</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Tooltips.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/Jct5q7ydeR" rel="noopener nofollow ugc" target="_blank">Tooltip Guidelines</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/QUwNvDM3NI" rel="noopener nofollow ugc" target="_blank">Designing Better Tooltips For Mobile User Interfaces</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/9XPdAFwR6s" rel="noopener nofollow ugc" target="_blank">Tooltips:
your secret weapon for improving feature discovery</a> by <a href="https://twitter.com/sofiaqt" rel="noopener nofollow ugc" target="_blank">@sofiaqt</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Navigation.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/4NUG9KoLwN" rel="noopener nofollow ugc" target="_blank">Navigation design: Almost everything you need to know</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/d3otgDaTMh" rel="noopener nofollow ugc" target="_blank">UX Design for Navigation Menu</a> from <a
            href="https://twitter.com/Prototypr" rel="noopener nofollow ugc" target="_blank"
    >@Prototypr</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/fNwZQzSFrb" rel="noopener nofollow ugc" target="_blank">The Fastest Navigation Layout for a Three-Level Menu</a> from <a
            href="https://twitter.com/uxmovement" rel="noopener nofollow ugc" target="_blank"
    >@uxmovement</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Loaders.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/jOmtMPQ8nU" rel="noopener nofollow ugc" target="_blank">Progress Indicators Make a Slow System Less Insufferable</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/0O0RBNyX0W" rel="noopener nofollow ugc" target="_blank">Stop Using A Loading Spinner, There’s Something Better</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/lgLY2zJaPm" rel="noopener nofollow ugc" target="_blank">Best Practices For Animated Progress Indicators</a>
  </p>
  </li>
    </ul><h2 class="text-18 xs:text-20">Forms.</h2><ul>
      <li>
    <p>
    <a href="https://t.co/xJWs2vhuJQ" rel="noopener nofollow ugc" target="_blank">Design Better Forms</a> by <a href="https://twitter.com/CoyleAndrew" rel="noopener nofollow ugc" target="_blank">@CoyleAndrew</a> (Really good read!)
  </p>
  </li><li>
    <p>
    <a href="https://t.co/7ptPrcUQEq" rel="noopener nofollow ugc" target="_blank">Form Design:
13 Empirically Backed Best Practices</a> by <a href="https://twitter.com/iamalexbirkett" rel="noopener nofollow ugc" target="_blank">@iamalexbirkett</a>
  </p>
  </li><li>
    <p>
    <a href="https://t.co/nIV8MfUGLY" rel="noopener nofollow ugc" target="_blank">The UX behind designing better forms</a> by <a
            href="https://twitter.com/charmiekapoor" rel="noopener nofollow ugc" target="_blank"
    >@charmiekapoor</a>
  </p>
</li>
</ul>
</div>
