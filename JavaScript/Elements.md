---
title:        Elements
permalink: JavaScript/Elements
category:  JavaScript
parent:   JavaScript
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

# get unrendered element dimensions

https://gist.github.com/remarkablemark/51ff6d8405d8c023d4aa30c5d0826225

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