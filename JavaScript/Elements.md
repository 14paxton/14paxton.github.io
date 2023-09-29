---
title: Elements
permalink: JavaScript/Elements
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

***                      

<br/>      

# Hide/Show

## CSS Style Hide

```javascript

element.style.display = 'block'; // Show
element.style.display = 'inline'; // Show
element.style.visibility = 'visible'; // Show
element.style.display = 'inline-block'; // Show

element.style.display = 'none'; // Hide
element.style.visibility = 'hidden'; // Hide
element.style.opacity = 0; // Hide
element.setAttribute("hidden", true); //hide

element.toggle() // hide/show
```

## Aria Hidden

```javascript
let el = document.getElementById("hidden");
console.log(el.ariaHidden); // true
el.ariaHidden = "false";
console.log(el.ariaHidden); // false
```

## jQuery

```javascript
('element').show()

//also

$('element').toggle()
```

# find / search / get

```javascript
document.querySelector("input[name=rate]:checked").value

```

## wild card / search ids where id is like

```javascript
document.querySelector('[id^="poll-"]').id;
```

## check if exists

```javascript
document.body.contains(document.getElementById('test'))
```

## jQuery

```javascript
$("input[type='radio'][name='scheduleType']:not(:checked)").attr("disabled", true);
```

> find by text jQuery ```:contains(text)```

# Attribute Value

> [Using Custom data- attributes](https://html5doctor.com/html5-custom-data-attributes/)

> Attribute must be camel cased ```Element.dataset.attributeNameCamelCased```

## Get

```javascript
document.getElementById('groupsWrapper-' + id).getAttribute('data-saved-assessment-count')

```

## Set

```javascript
document.getElementById('groupsWrapper-' + id).setAttribute('data-saved-assessment-count', "my text value")

```

## Remove

```javascript
document.getElementById('groupsWrapper-' + id).removeAttribute('data-saved-assessment-count')

```

## jQuery

```javascript
$(selectElement).data('saved-assessment-count', currentTotalResultCount);
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;">            
<p>
If using <code>.data()</code> to modify, you need to retrieve by <code>.data()</code> so new value will be reflected
</p>      
</div>            



[You Can pass arguments to functions that do no accept parameters]{.underline}

[call arguments in method to see what has been passed]{.underline} Properties

# Check Type

```javascript    
if (element.tagName === 'OL') {}    
```    

```javascript    
if (elementsObject && elementsObject?.body?.nodeName === 'TABLE') {}    
```    

```javascript    
const tagName = el.tagName || el.nodeName    
```    

> [Node Types](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)

```javascript    
if (node?.nodeType) {}    
```    

## Node.ELEMENT_NODE (1)

> An Element node like ```<p>``` or ```<div>```.

## Node.ATTRIBUTE_NODE (2)

> An Attribute of an Element.

## Node.TEXT_NODE (3)

> The actual Text inside an Element or Attr.

## Node.CDATA_SECTION_NODE(4)

> A CDATASection, such as ``` <!CDATA[ … ](%E2%80%A6.md#)> ```

## Node.PROCESSING_INSTRUCTION_NODE (7)

> A ProcessingInstruction of an XML document, such as ```<?xml-stylesheet … ?>```

## Node.COMMENT_NODE (8)

> A Comment node, such as ```<!-- … -->```.

## Node.DOCUMENT_NODE (9)

> A Document node.

## Node.DOCUMENT_TYPE_NODE (10)

> A DocumentType node, such as ```<!DOCTYPE html>```.

## Node.DOCUMENT_FRAGMENT_NODE (11)

> A DocumentFragment node.

- HTML:

```html    

<div class="a">a</div>    
```    

- Js:

```javascript    
node = e
node.nodeType === 1
node.nodeName === 'DIV'
node.tagName === 'DIV'

node = e.getAttributeNode('class')
node.nodeType === 2
node.nodeName === 'class'
node.tagName === undefined

node = e.childNodes[0]
node.nodeType === 3
node.nodeName === '#text'
node.tagName === undefined    
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
only use nodeType to get the node type: nodeName breaks for nodeType === 1
 <br>
only use tagName for nodeType === 1   
</div> 

## Deconstruct element to get names

```javascript
function addBlankSelectOption(selectBox) {
    const {nodeName, tagName} = selectBox
    if (nodeName === 'SELECT' || tagName === "SELECT") {
        const blankOption = document.createElement('option')
        blankOption.setAttribute('selected', true)
        blankOption.setAttribute('disabled', true)
        blankOption.setAttribute('hidden', true)
        selectBox.prepend(blankOption)
    }
}
```

## Get Type

```javascript
Object.prototype.toString
      .call(obj)
      .replace(/^\[object (.+)\]$/, '$1')
      .toLowerCase();
```

# create clone

```javascript      
function createClone(element, setCSS, width, height) {
    const newElement = element.cloneNode(true)

    const createStyles = new Promise(resolve => {
        if (!setCSS) {
            resolve(true)
        }
        else {
            generateRulesAll(element).then(css => {
                newElement.setAttribute('style', css)
            }).then(resolve)
        }
    })

    createStyles.then(css => {
        if (width) {
            newElement.width = width
            newElement.style.width = `${width}`
        }

        if (height) {
            newElement.height = height
            newElement.style.height = `${height}`
        }
    })

    return newElement
}      
```      

# create table

```javascript      
export const createRow = async (row, index, newBody) => {
    const newRow = newBody.insertRow(index)
    newRow.innerHTML = row.innerHTML
    return newRow
}

export const createTable = async (tableRows, rowIndex, elementsObject, divToAppend) => {
    if (elementsObject && elementsObject?.body?.nodeName === 'TABLE') {
        const table = elementsObject.body
        const tableId = `clone_table_${rowIndex + 1}`
        const {nodeClone: newTable, widthToSet, heightToSet} = buildNewNodeClone(table, tableId, null, null, true, true)
        newTable.tBodies[0].remove()
        const tBody = newTable.createTBody()
        const tFoot = newTable.createTFoot()
        const tHead = newTable.createTHead()
        tHead.innerHTML = table.tHead.innerHTML
        tFoot.innerHTML = table.tFoot.innerHTML

        const rowPromises = tableRows.map((row, index) => new Promise(resolve => resolve(createRow(row, index, tBody))))
        await Promise.all(rowPromises).then(resolved => {
            console.log(`rows for table ${tableId} added`)
        })

        const tableWrapper = document.createElement('div')
        tableWrapper.id = `clone_table_wrapper_${rowIndex + 1}`
        if (elementsObject?.header) {
            const {nodeClone: newHeader, widthToSet, heightToSet} = buildNewNodeClone(elementsObject?.header, null, null, null, true, true)
            tableWrapper.appendChild(newHeader)
        }

        tableWrapper.appendChild(newTable)
        if (divToAppend) divToAppend.appendChild(tableWrapper);

        return tableWrapper
    }
}      
```      

# get children

```javascript      
export const getChildren = (element) => {
    let childArray = []
    childArray.push(element)

    const children = element?.children;
    if (children) {
        for (let child of children) {
            childArray.push.apply(childArray, getChildren(child))
        }
    }

    return childArray;
}      
```      

# [get un-rendered element dimensions](https://gist.github.com/remarkablemark/51ff6d8405d8c023d4aa30c5d0826225)

```javascript      
function getWidthAndHeight(node) {
    const width = node.scrollWidth || node.offsetWidth || measure(node, 'scrollWidth')
    const height = node.scrollHeight || node.offsetHeight || measure(node, 'scrollHeight')
    return {width, height}
}

function measure(element, returnValue, parentNode) {
    parentNode = parentNode || window.document.documentElement.lastElementChild;
    const display = element.style.display
    const zIndex = element.style.zIndex
    const visibility = element.style.visibility

    element.style.display = 'block';
    element.style.visibility = 'hidden';
    element.style.zIndex = -1;
    parentNode.appendChild(element);
    const {clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight} = element;
    parentNode.removeChild(element);
    element.style.display = display
    element.style.visibility = visibility
    element.style.zIndex = zIndex

    const returnObj = {clientWidth: clientWidth, clientHeight: clientHeight, offsetWidth: offsetWidth, offsetHeight: offsetHeight, scrollWidth: scrollWidth, scrollHeight: scrollHeight}

    if (returnObj.hasOwnProperty(returnValue)) {
        return returnObj[returnValue]
    }

    return {
        clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight,
    };
}      
```