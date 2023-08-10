---  
title:        Window    
permalink:    JavaScript/Window    
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
# [window.open MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)    
    
> The syntax of the `window.open` method is given below: open (URL, windowName[, windowFeatures])    
    
> `URL` The URL of the page to open in the new window. This argument could be blank.    
    
> `windowName` A name to be given to the new window. The name can be used to refer this window again.    
    
> `windowFeatures` A string that determines the various window features to be included in the popup window (like status bar, address bar etc) The following code opens a new browser window with standard features.    
    
```javascript    
window.open("http://jsc.simfatic-solutions.com", "mywindow");    
```    
    
- Changing the features of the Popup    
  You can control the features of the popup using the last argument to the window.open method.    
  The following code opens a window with a status bar and no extra features.    
    
```javascript    
window.open("http://jsc.simfatic-solutions.com", "mywindow", "status=1");    
```    
    
- The code below opens a window with toolbar and status bar.    
    
```javascript    
window.open("http://jsc.simfatic-solutions.com", "mywindow", "status=1,toolbar=1");    
```    
    
The table shows the features and the string tokens you can use:    
    
| token       | def                                                                        |    
|-------------|----------------------------------------------------------------------------|    
| status      | The status bar at the bottom of the window.                                |    
| toolbar     | The standard browser toolbar, with buttons such as Back and Forward.       |    
| location    | The Location entry field where you enter the URL.                          |    
| menubar     | The menu bar of the window                                                 |    
| directories | The standard browser directory buttons, such as What’s New and What’s Cool |    
| resizable   | Allow/Disallow the user to resize the window.                              |    
| scrollbars  | Enable the scrollbars if the document is bigger than the window            |    
| height      | Specifies the height of the window in pixels. (example: height=‘350’)      |    
| width       | Specifies the width of the window in pixels.                               |    
    
Examples    
The following code opens a window with menu bar.    
The window is re-sizable and is having 350 pixels width and 250 pixels height.    
    
```javascript    
window.open("http://jsc.simfatic-solutions.com", "mywindow", "menubar=1,resizable=1,width=350,height=250");    
```    
    
Example 1    
A window with location bar, status bar, scroll bar and of size 100 X 100    
    
```javascript    
window.open("http://jsc.simfatic-solutions.com", "mywindow", "location=1,status=1,scrollbars=1, width=100,height=100");    
```    
    
Example 2    
Moving the window to a desired location    
You can use the window.moveTo function to move the popup window to a desired location.    
The code below shows positioning the popup at a desired location.    
    
```javascript    
function mypopup() {    
    mywindow = window.open("http://jsc.simfatic-solutions.com", "mywindow", "location=1,status=1,scrollbars=1, width=100,height=100");    
    mywindow.moveTo(0, 0);    
}    
```    
    
The code positions the popup on the top left corner of the screen.    
    
Putting it all together    
Now we will combine all these information to create the popup windows of different types.    
The Code below opens a popup window when you enter the page:    
    
```html    
    
<html>    
<head>    
    <title>JavaScript Popup Example 3</title>    
</head>    
<script type="text/javascript">    
    function poponload() {    
        testwindow = window.open("", "mywindow", "location=1,status=1,scrollbars=1,width=100,height=100");    
        testwindow.moveTo(0, 0);    
    }    
</script>    
<body onload="poponload()">    
<h1>JavaScript Popup Example 3</h1>    
</body>    
</html>    
```    
    
## example    
    
```javascript    
//no parameter to the method, no problems still works    
var firstWindow = window.open();    
//gives size to the new window with no url specified    
var secondWindow = window.open("", "", "width=200,height=100");    
//this specified the name parameter as well    
var thirdWindow = window.open("", "NEWWindow", "width=200,height=100");    
// All parameter are specified over here    
var fourthWindow = window.open("https://www.wikipedia.org", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");    
// using the document.write method to write to the new window    
firstWindow.document.write("<p>This is 'firstwindow'. I am 200px wide and 100px tall!</p>");    
```    
    
---  
    
# creating new window with html document    
    
```javascript      
function newWindowDimensions(width, height, x_axis, y_axis) {    
    const dualScreenLeft = window.screenLeft !== undefined    
                           ? window.screenLeft    
                           : window.screenX;    
    const dualScreenTop = window.screenTop !== undefined    
                          ? window.screenTop    
                          : window.screenY;    
    
    const w = width    
              ? width    
              : DEFAULT_PPT_WIDTH.pixels    
    const h = height    
              ? height    
              : DEFAULT_PPT_HEIGHT.pixels    
    
    function compute(screenPx, elementPx) {return (screenPx / 2) - (elementPx / 2);}    
    
    const x = x_axis    
              ? x_axis    
              : Math.round(compute(window.screen.width, w) + dualScreenLeft);    
    
    const y = y_axis    
              ? y_axis    
              : Math.round(compute(window.screen.height, h) + dualScreenTop);    
    
    return `width=${w},height=${h},screenX=${x},screenY=${y},status=0,dependent=0,minimizable=0,resizable=0,menubar=0,location=0,toolbar=0,status=0,scrollbars=0,titlebar=0,dialog=0`    
}    
    
function openWindowBuildPPTX(theDoc) {    
    return new Promise(resolve => {    
        let srcNode = theDoc.documentElement;    
        const winUrl = URL.createObjectURL(new Blob([srcNode.outerHTML], {type: "text/html"}));    
    
        // //inject in window and open      
        const windowFeatures = newWindowDimensions()    
        const pptWindow = window.open(winUrl, '', windowFeatures);    
        pptWindow.focus()    
        URL.revokeObjectURL(winUrl)    
    
        resolve(pptWindow)    
    })    
}      
```    
    
## [Raw JS examples and comments](https://gist.github.com/14paxton/fb7f33fd6f5fa7a15077b6ebf18fca44)    
    
# window size    
    
```javascript    
const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;    
    
const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;      
```    
    
# window.resizeTo(width, height)    
    
```javascript    
let jsWindow = window.open('http://localhost/js/about.html', 'about', 'height=600,width=800');    
    
setTimeout(() => {    
    jsWindow.resizeTo(600, 300);    
}, 3000);    
```    
    
# window.move(x, y)    
    
```javascript    
let jsWindow = window.open('http://localhost/js/about.html', 'about', 'height=600,width=600');    
    
setTimeout(() => {    
    jsWindow.moveTo(500, 500);    
}, 3000);    
```    
    
## Similarly, you can move the current window by a specified amount:    
    
```javascript    
let jsWindow = window.open('http://localhost/js/about.html', 'about', 'height=600,width=600');    
    
setTimeout(() => {    
    jsWindow.moveBy(100, -100);    
}, 3000);    
```    
    
# window.close    
    
```javascript    
let jsWindow = window.open('http://localhost/js/about.html', 'about', 'height=600,width=600');    
    
setTimeout(() => {    
    jsWindow.close();    
}, 3000);    
    
```    
    
# window.opener    
    
> A newly created window can reference back to the window that opened it via the window.opener property. This allows you to exchange data between the two windows.