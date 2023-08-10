---  
title:        QuerySelector-Examples    
permalink:    JavaScript/QuerySelector-Examples    
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
# [query selector specs](https://www.w3.org/TR/selectors-4/#attribute-selectors)    
    
# get child    
    
```javascript      
let listItems = document.querySelectorAll('ul.nav > li');      
```      
    
# siblings example all `<a>` that follow `<p>` immediatly or not    
    
```javascript      
let links = document.querySelectorAll('p ~ a');      
```      
    
# immediate siblings    
    
```javascript      
let links = document.querySelectorAll('h1 + a');      
```      
    
# sudo elements    
    
```javascript      
// second li element in list      
let listItem = document.querySelectorAll('li:nth-child(2)');    
    
//first line of all divs      
let links = document.querySelector('p::first-line');          
```      
    
# multiple items    
    
```javascript      
document.querySelectorAll('div, span')      
```      
    
# html attribute    
    
```javascript      
document.querySelectorAll('[data-example="test"]')      
```      
    
# css pseudo class    
    
```javascript      
document.querySelectorAll(':nth-child(4n)')      
```      
    
# descendants    
    
```javascript      
document.querySelectorAll('#test li')      
```      
    
# all table cells not right align    
    
```javascript      
document.querySelectorAll(‘tbody    
td:not(.MuiTableCell - alignRight    
)’)      
```      
    
# every other tr starting with first    
    
```javascript      
querySelectorAll('tr:nth - of - type(2n + 1)')      
```      
    
# multi select    
    
```javascript      
querySelectorAll(`tbody td:nth-child(1), tfoot  tr:first-child > td`)      
```      
    
# input    
    
```javascript      
<input type="checkbox" id="c2" name="c2" value="DE039230952"/>    
//Replace $$ with document.querySelectorAll in the examples:      
    
$$('input') //Every input      
$$('[id]') //Every element with id      
$$('[id="c2"]') //Every element with id="c2"      
$$('input,[id]') //Every input + every element with id      
$$('input[id]') //Every input including id      
$$('input[id="c2"]') //Every input including id="c2"      
$$('input#c2') //Every input including id="c2" (same as above)      
$$('input#c2[value="DE039230952"]') //Every input including id="c2" and value="DE039230952"      
$$('input#c2[value^="DE039"]') //Every input including id="c2" and value has content starting with DE039      
$$('input#c2[value$="0952"]') //Every input including id="c2" and value has content ending with 0952      
$$('input#c2[value*="39230"]') //Every input including id="c2" and value has conten      
    
//Use the examples above directly, without the need for additional library, just by adding:      
    
const $$ = document.querySelectorAll.bind(document);    
//Some additions:      
    
$$(.    
) //The same as $([class])      
$$(div > input) //div is parent tag to input      
document.querySelector() //equals to $$()[0] or $()      
```  