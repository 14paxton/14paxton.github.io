---  
title:        CDN-&-Events  
permalink:    JavaScript/CDN-&-Events.md  
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
# CDN Fallback  
  
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>`  
`<script>!window.jQuery && document.write('<script src="/js/libs/jquery-1.11.1.min.js"><\/script>')</script>`  
  
> place in head or body  
  
```javascript   
<script>  
    const cdnLoadErrorFallback = {"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js",  
    "bootstrap": "https://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",  
    "validator": "https://s3.amazonaws.com/tb.tbex.rsrcs/lib.common/js/bootstrap-validator/dist/validator.min.js",  
    "h5f": "https://s3.amazonaws.com/tb.tbex.rsrcs/lib.common/js/H5F/h5f.min.js"}  
  
    function cdnLoaded(x) {console.log('loaded', x);}  
  
    function buildScript(id) {const script = document.createElement('script');  
    script.id = "test"  
    script.async = true;  
    script.crossOrigin = "anonymous";  
    script.fetchpriority = 'high';  
    script.setAttribute('referrerpolicy', 'origins');  
    script.setAttribute('type', 'text/javascript');  
    script.setAttribute('src', cdnLoadErrorFallback[id]);  
  
    document.write(`<script src=${cdnLoadErrorFallback[id]}>\x3C/script>`)}  
  
    function cdnError(script) {const {id, src} = script  
    console.log(`error loading ${id}`, src);  
  
    if (Object.hasOwn(cdnLoadErrorFallback, id)) {buildScript(id)}}  
  
</script>  
<script id="jquery" onload="cdnLoaded()" onerror="cdnError(this)" src="/TBEX/assets/jquery.min.js"></script>  
<script id="bootstrap" onload="cdnLoaded()" onerror="cdnError(this)" src="/TBEX/assets/bootstrap.min.js"></script>  
<script id="validator" onload="cdnLoaded()" onerror="cdnError(this)" src="/TBEX/assets/validator.min.js"></script>  
<script id="h5f" onload="cdnLoaded()" onerror="cdnError(this)" src="/TBEX/assets/h5f.min.js"></script>  
```  
  
> alt can check for existence of function from package and write or append to document or body or head  
  
```javascript  
<script>  
    if (typeof jQuery === 'undefined') {// \x3c used to keep script from ending  
    document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">\x3C/script>');}  
</script>  
```  
  
# Monitor Events-https://stackoverflow.com/questions/10213703/how-do-i-view-events-fired-on-an-element-in-chrome-devtools  
  
o You can use monitorEvents function.  
  
o Just inspect your element (right mouse click → Inspect on visible element or go to Elements tab in Chrome Developer Tools and select wanted element) then go to Console tab and write:  
` monitorEvents($0)`  
  
o Now when you move mouse over this element, focus or click it, the name of the fired event will be displayed with its data.  
  
o To stop getting this data just write this to console:  
` unmonitorEvents($0)`  
o $0 is just the last DOM element selected by Chrome Developer Tools.  
You can pass any other DOM object there (for example result of getElementById or querySelector).  
  
o You can also specify event "type" as second parameter to narrow monitored events to some predefined set. For example:  
` monitorEvents(document.body, 'mouse')`  
  
# Appending HTML to an element  
  
          ` $.each(arr, function() {appendString += "<div>" + this + "</div>" });  
            $('#parent').append('<div>' + appendString + '</div>');  `  
  
# Document Ready  
  
      `$(function(){ Console.log(“ready”);});`  
  
       `$(document).ready(function() { Console.log(“ready”);});`  
  
use “arguments” keyword in function to get arguments passed or available  
  
`function(){ const argList = arguments}`  
  
# Using on  
  
`$(“selector”).on(“click”, myHandlerFunction);`  
  
Connect multiple events  
  
`$(“selector”).on({“click”: clickFunction,“hover: hoverFunction});`  
  
# Custom Events  
  
`Car.lightTurnedGreen = function(){…}`  
  
`$(trafficLight).on(“green”, car.lightTurnedGreen);`  
  
`$(trafficLight).trigger(“green”);`  
  
· Custom Bindings  
  
# declare event to run when div is visible  
  
`function isVisible(){ alert("works")}`  
  
# hookup the event  
  
`$('#results-table').bind('isVisible', isVisible);`  
  
# show div and trigger custom event in callback when div is visible $('#results-table').show('slow', function(){  
  
     `$(this).trigger('isVisible'); });`