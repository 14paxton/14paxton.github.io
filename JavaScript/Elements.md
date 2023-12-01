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

---

<br/>

# Hide/Show

## CSS Style Hide

```javascript
element.style.display = "block"; // Show
element.style.display = "inline"; // Show
element.style.visibility = "visible"; // Show
element.style.display = "inline-block"; // Show

element.style.display = "none"; // Hide
element.style.visibility = "hidden"; // Hide
element.style.opacity = 0; // Hide
element.setAttribute("hidden", true); //hide

element.toggle(); // hide/show
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
"element".show();

//also

$("element").toggle();
```

# find / search / get by Attributes

```javascript
document.querySelector("input[name=rate]:checked").value;
```

## wild card / search ids where id is like

```javascript
document.querySelector('[id^="poll-"]').id;
```

## check if exists

```javascript
document.body.contains(document.getElementById("test"));
```

## jQuery

```javascript
$("input[type='radio'][name='scheduleType']:not(:checked)").attr(
  "disabled",
  true,
);
```

> find by text jQuery `:contains(text)`

# Attribute Value

> dataset returns DOMStringMap

> [Using Custom data- attributes](https://html5doctor.com/html5-custom-data-attributes/)

> Attribute must be camel cased `Element.dataset.attributeNameCamelCased`

## Get

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
<ul>
<li>
Attributes can be set and read by the <code>camelCase</code> <code>name/key</code> as an object property of the dataset: <code>element.dataset.keyname</code>
</li>
<li>
Attributes can also be set and read using bracket syntax: <code>element.dataset['keyname']</code>
</li>
<li>The in operator can check if a given attribute exists: 'keyname' in <code>element.dataset</code>       
</li>
</ul>
</div>

```javascript
document
  .getElementById("groupsWrapper-" + id)
  .getAttribute("data-saved-assessment-count");
```

> or

```javascript
imageContainer.dataset.images;
```

## Set

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
 <p>
When the attribute is set, its value is always converted to a string. For example: <code>element.dataset.example = null</code> is converted into <code>data-example="null"</code>
To remove an attribute, you can use the <code>delete</code> operator: <code>delete element.dataset.keyname</code>     
</p>    
</div>

```javascript
document
  .getElementById("groupsWrapper-" + id)
  .setAttribute("data-saved-assessment-count", "my text value");
```

> or

```javascript
// set a data attribute
el.dataset.dateOfBirth = "1960-10-03";
// Result on JS: el.dataset.dateOfBirth === '1960-10-03'
// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth="1960-10-03">Carina Anand</div>
```

## Remove

```javascript
document
  .getElementById("groupsWrapper-" + id)
  .removeAttribute("data-saved-assessment-count");
```

> or

```javascript
delete el.dataset.dateOfBirth;
// Result on JS: el.dataset.dateOfBirth === undefined
// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand">Carina Anand</div>
```

## null check

```javascript
if (!("someDataAttr" in el.dataset)) {
  el.dataset.someDataAttr = "mydata";
  // Result on JS: 'someDataAttr' in el.dataset === true
  // Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-some-data-attr="mydata">Carina Anand</div>
}
```

## jQuery

```javascript
$(selectElement).data("saved-assessment-count", currentTotalResultCount);
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
if (element.tagName === "OL") {
}
```

```javascript
if (elementsObject && elementsObject?.body?.nodeName === "TABLE") {
}
```

```javascript
const tagName = el.tagName || el.nodeName;
```

> [Node Types](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)

```javascript
if (node?.nodeType) {
}
```

## Node.ELEMENT_NODE (1)

> An Element node like `<p>` or `<div>`.

## Node.ATTRIBUTE_NODE (2)

> An Attribute of an Element.

## Node.TEXT_NODE (3)

> The actual Text inside an Element or Attr.

## Node.CDATA_SECTION_NODE(4)

> A CDATASection, such as `<!CDATA[ … ](%E2%80%A6.md#)>`

## Node.PROCESSING_INSTRUCTION_NODE (7)

> A ProcessingInstruction of an XML document, such as `<?xml-stylesheet … ?>`

## Node.COMMENT_NODE (8)

> A Comment node, such as `<!-- … -->`.

## Node.DOCUMENT_NODE (9)

> A Document node.

## Node.DOCUMENT_TYPE_NODE (10)

> A DocumentType node, such as `<!DOCTYPE html>`.

## Node.DOCUMENT_FRAGMENT_NODE (11)

> A DocumentFragment node.

- HTML:

```html
<div class="a">a</div>
```

- Js:

```javascript
node = e;
node.nodeType === 1;
node.nodeName === "DIV";
node.tagName === "DIV";

node = e.getAttributeNode("class");
node.nodeType === 2;
node.nodeName === "class";
node.tagName === undefined;

node = e.childNodes[0];
node.nodeType === 3;
node.nodeName === "#text";
node.tagName === undefined;
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
only use nodeType to get the node type: nodeName breaks for nodeType === 1
 <br>
only use tagName for nodeType === 1   
</div>

## Deconstruct element to get names

```javascript
function addBlankSelectOption(selectBox) {
  const { nodeName, tagName } = selectBox;
  if (nodeName === "SELECT" || tagName === "SELECT") {
    const blankOption = document.createElement("option");
    blankOption.setAttribute("selected", true);
    blankOption.setAttribute("disabled", true);
    blankOption.setAttribute("hidden", true);
    selectBox.prepend(blankOption);
  }
}
```

## Get Type

```javascript
Object.prototype.toString
  .call(obj)
  .replace(/^\[object (.+)\]$/, "$1")
  .toLowerCase();
```

# create clone

```javascript
function createClone(element, setCSS, width, height) {
  const newElement = element.cloneNode(true);

  const createStyles = new Promise((resolve) => {
    if (!setCSS) {
      resolve(true);
    } else {
      generateRulesAll(element)
        .then((css) => {
          newElement.setAttribute("style", css);
        })
        .then(resolve);
    }
  });

  createStyles.then((css) => {
    if (width) {
      newElement.width = width;
      newElement.style.width = `${width}`;
    }

    if (height) {
      newElement.height = height;
      newElement.style.height = `${height}`;
    }
  });

  return newElement;
}
```

# clone element to base64 png

```javascript
function svgToDataURL(svg) {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(svg))
    .then(encodeURIComponent)
    .then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}

function nodeToDataURL(node, width, height) {
  return new Promise((resolve) => {
    const xmlns = "http://www.w3.org/2000/svg";

    const foreignObject = document.createElementNS(xmlns, "foreignObject");
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    foreignObject.setAttribute("externalResourcesRequired", "true");

    const svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    resolve(svgToDataURL(svg));
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.decoding = "sync";
    img.src = url;
  });
}

function buildCanvas(img) {
  return new Promise((resolveCanvas) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const canvasHeight = img.height + 50;
    const canvasWidth = img.width + 50;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    resolveCanvas(
      defaultSlideObject(canvas.toDataURL(), canvas.width, canvas.height),
    );
  });
}

//this is similar to how html2canvas and html-to-image libraries work
// take element -> get generated css -> create ans svg(needed to paint canvas element) ->
// use svg to create xml then uri then uri data string -> use data uri to create image element by adding uri to src attribute ->
// create a canvas element inserting/drawing image in -> get dataURL to use
export function createElementToPNGBase64(
  arrayOfElementObjects,
  dimensionsObj,
  addIndividualElementCSS,
) {
  if (arrayOfElementObjects) {
    return new Promise((resolve) => {
      elementsToNewDocument(
        arrayOfElementObjects,
        dimensionsObj,
        addIndividualElementCSS,
      )
        .then(({ clonedDocument, width, height, newElementArray }) =>
          nodeToDataURL(clonedDocument.documentElement, width, height),
        )
        .then(createImage)
        .then(buildCanvas)
        .then(resolve);
    });
  }
}

export function cloneNodeToDocument(
  node,
  elementToAppend,
  idToSet,
  width,
  height,
  addIndividualElementCSS,
) {
  if (node) {
    const w = width ? width : node.scrollWidth;
    const h = height ? height : node.scrollHeight;
    const newNode = createClone(node, !!addIndividualElementCSS, w, h);
    newNode.id = idToSet;
    elementToAppend.appendChild(newNode);
    return newNode;
  }
}

//array of element objects example: [{key: element}]
// dimension object key should match element if custom dimension needed
// example: {key:{height: number, width: number}}
export function elementsToNewDocument(
  arrayOfElementObjects,
  dimensionsObj,
  addIndividualElementCSS,
) {
  return new Promise((resolveNewDocument) => {
    const usableArray = Array.isArray(arrayOfElementObjects)
      ? arrayOfElementObjects
      : [arrayOfElementObjects];

    const clonedDocument = document.cloneNode(true);
    // documentElement.querySelectorAll("noscript").forEach(el => el.remove())
    const body = clonedDocument.body;
    body.innerHTML = "";

    let totalWidth = 0;
    let totalHeight = 0;

    const clonedElementArray = usableArray.map((elementObj) => {
      const key = Object.keys(elementObj)[0];
      const element = elementObj[key];
      const width = Object.hasOwn(dimensionsObj, key)
        ? dimensionsObj[key]?.width
        : element.scrollWidth;
      const height = Object.hasOwn(dimensionsObj, key)
        ? dimensionsObj[key]?.height
        : element.scrollHeight;

      totalWidth = totalWidth > width ? totalWidth : width;
      totalHeight += height;
      cloneNodeToDocument(
        element,
        body,
        key,
        width,
        height,
        addIndividualElementCSS,
      );
    });

    resolveNewDocument({
      clonedDocument: clonedDocument,
      width: totalWidth,
      height: totalHeight,
      newElementArray: clonedElementArray,
    });
  });
}
```

# create table

```javascript
export const createRow = async (row, index, newBody) => {
  const newRow = newBody.insertRow(index);
  newRow.innerHTML = row.innerHTML;
  return newRow;
};

export const createTable = async (
  tableRows,
  rowIndex,
  elementsObject,
  divToAppend,
) => {
  if (elementsObject && elementsObject?.body?.nodeName === "TABLE") {
    const table = elementsObject.body;
    const tableId = `clone_table_${rowIndex + 1}`;
    const {
      nodeClone: newTable,
      widthToSet,
      heightToSet,
    } = buildNewNodeClone(table, tableId, null, null, true, true);
    newTable.tBodies[0].remove();
    const tBody = newTable.createTBody();
    const tFoot = newTable.createTFoot();
    const tHead = newTable.createTHead();
    tHead.innerHTML = table.tHead.innerHTML;
    tFoot.innerHTML = table.tFoot.innerHTML;

    const rowPromises = tableRows.map(
      (row, index) =>
        new Promise((resolve) => resolve(createRow(row, index, tBody))),
    );
    await Promise.all(rowPromises).then((resolved) => {
      console.log(`rows for table ${tableId} added`);
    });

    const tableWrapper = document.createElement("div");
    tableWrapper.id = `clone_table_wrapper_${rowIndex + 1}`;
    if (elementsObject?.header) {
      const {
        nodeClone: newHeader,
        widthToSet,
        heightToSet,
      } = buildNewNodeClone(
        elementsObject?.header,
        null,
        null,
        null,
        true,
        true,
      );
      tableWrapper.appendChild(newHeader);
    }

    tableWrapper.appendChild(newTable);
    if (divToAppend) divToAppend.appendChild(tableWrapper);

    return tableWrapper;
  }
};
```

# get children

```javascript
export const getChildren = (element) => {
  let childArray = [];
  childArray.push(element);

  const children = element?.children;
  if (children) {
    for (let child of children) {
      childArray.push.apply(childArray, getChildren(child));
    }
  }

  return childArray;
};
```

# [get un-rendered element dimensions](https://gist.github.com/remarkablemark/51ff6d8405d8c023d4aa30c5d0826225)

```javascript
function getWidthAndHeight(node) {
  const width =
    node.scrollWidth || node.offsetWidth || measure(node, "scrollWidth");
  const height =
    node.scrollHeight || node.offsetHeight || measure(node, "scrollHeight");
  return { width, height };
}

function measure(element, returnValue, parentNode) {
  parentNode = parentNode || window.document.documentElement.lastElementChild;
  const display = element.style.display;
  const zIndex = element.style.zIndex;
  const visibility = element.style.visibility;

  element.style.display = "block";
  element.style.visibility = "hidden";
  element.style.zIndex = -1;
  parentNode.appendChild(element);
  const {
    clientWidth,
    clientHeight,
    offsetWidth,
    offsetHeight,
    scrollWidth,
    scrollHeight,
  } = element;
  parentNode.removeChild(element);
  element.style.display = display;
  element.style.visibility = visibility;
  element.style.zIndex = zIndex;

  const returnObj = {
    clientWidth: clientWidth,
    clientHeight: clientHeight,
    offsetWidth: offsetWidth,
    offsetHeight: offsetHeight,
    scrollWidth: scrollWidth,
    scrollHeight: scrollHeight,
  };

  if (returnObj.hasOwnProperty(returnValue)) {
    return returnObj[returnValue];
  }

  return {
    clientWidth,
    clientHeight,
    offsetWidth,
    offsetHeight,
    scrollWidth,
    scrollHeight,
  };
}
```

# Script Type

> Classic `<script>`s block the `HTML` parser by default.
> You can work around it by adding the `defer` attribute, which ensures that the script download happens in parallel with `HTML`
> parsing.

## Script Element defer / async / module, fetch, load, and execution timeline

<style>
#scriptelement {
/*display: inline-block;*/
width: 820px;
height: 200px;
margin: 0 auto;
background-size: auto;
background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MjAgMjAwIj48c3R5bGU+PCFbQ0RBVEFbLmxhYmVsLC50YWd7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbH0udGFne2ZvbnQtd2VpZ2h0OjcwMDtmb250LWZhbWlseTptb25vc3BhY2U7Zm9udC1zaXplOjEzcHh9LmxhYmVse2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHh9LnBhcnNlcntzdHJva2U6IzZlYWUwMDtmaWxsOiM2ZWFlMDB9LmZldGNoe3N0cm9rZTojMDAzNWZmO2ZpbGw6IzAwMzVmZn0uZXhlY3V0aW9ue3N0cm9rZTpyZWQ7ZmlsbDpyZWR9LnByb2dyZXNze3N0cm9rZS13aWR0aDoyfS5wcm9ncmVzcy5wYXJzZXI6bm90KC5maXJzdCl7bWFya2VyLXN0YXJ0OnVybCgjcGFyc2VyLW1hcmtlcil9LnByb2dyZXNzLnBhcnNlcjpub3QoLmxhc3Qpe21hcmtlci1lbmQ6dXJsKCNwYXJzZXItbWFya2VyKX0ucHJvZ3Jlc3MuZmV0Y2g6bm90KC5maXJzdCl7bWFya2VyLXN0YXJ0OnVybCgjZmV0Y2gtbWFya2VyKX0ucHJvZ3Jlc3MuZmV0Y2g6bm90KC5sYXN0KXttYXJrZXItZW5kOnVybCgjZmV0Y2gtbWFya2VyKX0ucHJvZ3Jlc3MuZXhlY3V0aW9uOm5vdCguZmlyc3Qpe21hcmtlci1zdGFydDp1cmwoI2V4ZWN1dGlvbi1tYXJrZXIpfS5wcm9ncmVzcy5leGVjdXRpb246bm90KC5sYXN0KXttYXJrZXItZW5kOnVybCgjZXhlY3V0aW9uLW1hcmtlcil9bWFya2VyPmNpcmNsZXtzdHJva2Utd2lkdGg6MH0uY29ubmVjdG9ye3N0cm9rZTojY2VjZWNlO3N0cm9rZS13aWR0aDoxfV1dPjwvc3R5bGU+PHBhdGggZD0iTTAgMzMuNWg4MjBNMCA2Ni41aDgyME0wIDk5LjVoODIwbS04MjAgMzNoODIwTTI0NS41IDF2MjhtMCA5djI0bTAgNnYyN20wIDl2MjRtMCA5djI4IiBzdHJva2U9IiM2YTk0MDAiIHN0cm9rZS1kYXNoYXJyYXk9IjEsMSIvPjxkZWZzPjxtYXJrZXIgaWQ9InBhcnNlci1tYXJrZXIiIHJlZlg9IjEuNSIgcmVmWT0iMS41Ij48Y2lyY2xlIGN4PSIxLjUiIGN5PSIxLjUiIHI9IjEuNSIgY2xhc3M9InBhcnNlciIvPjwvbWFya2VyPjxtYXJrZXIgaWQ9ImZldGNoLW1hcmtlciIgcmVmWD0iMS41IiByZWZZPSIxLjUiPjxjaXJjbGUgY3g9IjEuNSIgY3k9IjEuNSIgcj0iMS41IiBjbGFzcz0iZmV0Y2giLz48L21hcmtlcj48bWFya2VyIGlkPSJleGVjdXRpb24tbWFya2VyIiByZWZYPSIxLjUiIHJlZlk9IjEuNSI+PGNpcmNsZSBjeD0iMS41IiBjeT0iMS41IiByPSIxLjUiIGNsYXNzPSJleGVjdXRpb24iLz48L21hcmtlcj48L2RlZnM+PHRleHQgeD0iMTIiIHk9IjE2Ljc1IiBjbGFzcz0idGFnIj4mbHQ7c2NyaXB0Jmd0OzwvdGV4dD48dGV4dCB5PSI5IiBjbGFzcz0ibGFiZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MikiPlNjcmlwdGluZzo8L3RleHQ+PHRleHQgeT0iMjQiIGNsYXNzPSJsYWJlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUyKSI+SFRNTCBQYXJzZXI6PC90ZXh0PjxwYXRoIGNsYXNzPSJjb25uZWN0b3IiIGQ9Ik01MDkgOXYxNU02NTYgOXYxNSIvPjxwYXRoIGNsYXNzPSJwYXJzZXIgcHJvZ3Jlc3MgZmlyc3QiIGQ9Ik0zNTggMjRoMTUxIi8+PHBhdGggY2xhc3M9ImZldGNoIHByb2dyZXNzIiBkPSJNNTA5IDloOTciLz48cGF0aCBjbGFzcz0iZXhlY3V0aW9uIHByb2dyZXNzIiBkPSJNNjA2IDloNTAiLz48cGF0aCBjbGFzcz0icGFyc2VyIHByb2dyZXNzIGxhc3QiIGQ9Ik02NTYgMjRoMTI4Ii8+PHRleHQgeD0iMTIiIHk9IjE2Ljc1IiBjbGFzcz0idGFnIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMzKSI+Jmx0O3NjcmlwdCBkZWZlciZndDs8L3RleHQ+PHRleHQgeT0iOSIgY2xhc3M9ImxhYmVsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTIgMzMpIj5TY3JpcHRpbmc6PC90ZXh0Pjx0ZXh0IHk9IjI0IiBjbGFzcz0ibGFiZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MiAzMykiPkhUTUwgUGFyc2VyOjwvdGV4dD48cGF0aCBjbGFzcz0iY29ubmVjdG9yIiBkPSJNNzM2IDQydjE1Ii8+PHBhdGggY2xhc3M9InBhcnNlciBwcm9ncmVzcyBmaXJzdCIgZD0iTTM1OCA1N2gzNzgiLz48cGF0aCBjbGFzcz0iZmV0Y2ggcHJvZ3Jlc3MiIGQ9Ik01MDkgNDJoOTciLz48cGF0aCBjbGFzcz0iZXhlY3V0aW9uIHByb2dyZXNzIGxhc3QiIGQ9Ik03MzYgNDJoNDgiLz48Zz48dGV4dCB4PSIxMiIgeT0iMTYuNzUiIGNsYXNzPSJ0YWciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNjYpIj4mbHQ7c2NyaXB0IGFzeW5jJmd0OzwvdGV4dD48dGV4dCB5PSI5IiBjbGFzcz0ibGFiZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MiA2NikiPlNjcmlwdGluZzo8L3RleHQ+PHRleHQgeT0iMjQiIGNsYXNzPSJsYWJlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUyIDY2KSI+SFRNTCBQYXJzZXI6PC90ZXh0PjxwYXRoIGNsYXNzPSJjb25uZWN0b3IiIGQ9Ik02MDYgNzV2MTVtNTAtMTV2MTUiLz48cGF0aCBjbGFzcz0icGFyc2VyIHByb2dyZXNzIGZpcnN0IiBkPSJNMzU4IDkwaDI0OCIvPjxwYXRoIGNsYXNzPSJmZXRjaCBwcm9ncmVzcyIgZD0iTTUwOSA3NWg5NyIvPjxwYXRoIGNsYXNzPSJleGVjdXRpb24gcHJvZ3Jlc3MiIGQ9Ik02MDYgNzVoNTAiLz48cGF0aCBjbGFzcz0icGFyc2VyIHByb2dyZXNzIGxhc3QiIGQ9Ik02NTYgOTBoMTI4Ii8+PC9nPjxnPjx0ZXh0IHg9IjEyIiB5PSIxNi43NSIgY2xhc3M9InRhZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA5OSkiPiZsdDtzY3JpcHQgdHlwZT0mcXVvdDttb2R1bGUmcXVvdDsmZ3Q7PC90ZXh0Pjx0ZXh0IHk9IjkiIGNsYXNzPSJsYWJlbCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUyIDk5KSI+U2NyaXB0aW5nOjwvdGV4dD48dGV4dCB5PSIyNCIgY2xhc3M9ImxhYmVsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTIgOTkpIj5IVE1MIFBhcnNlcjo8L3RleHQ+PHBhdGggY2xhc3M9ImNvbm5lY3RvciIgZD0iTTczNiAxMDh2MTUiLz48cGF0aCBjbGFzcz0icGFyc2VyIHByb2dyZXNzIGZpcnN0IiBkPSJNMzU4IDEyM2gzNzgiLz48cGF0aCBjbGFzcz0iZmV0Y2ggcHJvZ3Jlc3MiIGQ9Ik01MDkgMTA4aDk3bTAgMGgyMG0tMjAgMGwyMCA3LjVtMCAwaDIwbTAgMGgyMG0tMjAgMGwyMC03LjUiLz48cGF0aCBjbGFzcz0iZXhlY3V0aW9uIHByb2dyZXNzIGxhc3QiIGQ9Ik03MzYgMTA4aDQ4Ii8+PC9nPjxnPjx0ZXh0IHg9IjEyIiB5PSIxNi43NSIgY2xhc3M9InRhZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxMzIpIj4mbHQ7c2NyaXB0IHR5cGU9JnF1b3Q7bW9kdWxlJnF1b3Q7IGFzeW5jJmd0OzwvdGV4dD48dGV4dCB5PSI5IiBjbGFzcz0ibGFiZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MiAxMzIpIj5TY3JpcHRpbmc6PC90ZXh0Pjx0ZXh0IHk9IjI0IiBjbGFzcz0ibGFiZWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MiAxMzIpIj5IVE1MIFBhcnNlcjo8L3RleHQ+PHBhdGggY2xhc3M9ImNvbm5lY3RvciIgZD0iTTY2NiAxNDF2MTVtNTAtMTV2MTUiLz48cGF0aCBjbGFzcz0icGFyc2VyIHByb2dyZXNzIGZpcnN0IiBkPSJNMzU4IDE1NmgzMDgiLz48cGF0aCBjbGFzcz0iZmV0Y2ggcHJvZ3Jlc3MiIGQ9Ik01MDkgMTQxaDk3bTAgMGgyMG0tMjAgMGwyMCA3LjVtMCAwaDIwbTAgMGgyMG0tMjAgMGwyMC03LjUiLz48cGF0aCBjbGFzcz0iZXhlY3V0aW9uIHByb2dyZXNzIiBkPSJNNjY2IDE0MWg1MCIvPjxwYXRoIGNsYXNzPSJwYXJzZXIgcHJvZ3Jlc3MgbGFzdCIgZD0iTTcxNiAxNTZoNjgiLz48L2c+PGcgY2xhc3M9ImxlZ2VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzU3LjUgMTcyKSI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiIGNsYXNzPSJwYXJzZXIiLz48dGV4dCB4PSI5IiB5PSIzIiBjbGFzcz0ibGFiZWwiPnBhcnNlcjwvdGV4dD48Y2lyY2xlIGN4PSI1MCIgY3k9IjMiIHI9IjMiIGNsYXNzPSJmZXRjaCIvPjx0ZXh0IHg9IjU2IiB5PSIzIiBjbGFzcz0ibGFiZWwiPmZldGNoPC90ZXh0PjxjaXJjbGUgY3g9IjkwIiBjeT0iMyIgcj0iMyIgY2xhc3M9ImV4ZWN1dGlvbiIvPjx0ZXh0IHg9Ijk2IiB5PSIzIiBjbGFzcz0ibGFiZWwiPmV4ZWN1dGlvbjwvdGV4dD48L2c+PHRleHQgeD0iNzgyIiB5PSIxNzUiIHRleHQtYW5jaG9yPSJlbmQiIGNsYXNzPSJsYWJlbCI+cnVudGltZSDihpI8L3RleHQ+PC9zdmc+");
}
</style>
<div style="background-color: cornsilk; width: 820px; height: 200px;"><div id="scriptelement"></div></div>
