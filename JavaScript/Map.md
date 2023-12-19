---
title: Map
permalink: JavaScript/Map
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

# [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

> The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

- > Demo

  ```javascript
  const map1 = new Map();
  map1.set("a", 1);
  map1.set("b", 2);
  map1.set("c", 3);

  console.log(map1.get("a"));
  // Expected output: 1

  map1.set("a", 97);

  console.log(map1.get("a"));
  // Expected output: 97

  console.log(map1.size);
  // Expected output: 3

  map1.delete("b");

  console.log(map1.size);
  // Expected output: 2
  ```

# New Map

## From Object

```javascript
new Map(Object.entries(advancedFields));
```

## From Mapped Array

```javascript
new Map(
  data.map((result) => [
    result.id,
    `${result.firstName}${
      result?.middleName && result?.middleName.trim()
        ? ` ${result?.middleName}`
        : ""
    } ${result.lastName}`,
  ]),
);
```

## Combine 2 maps

```javascript
new Map(choiceArrays.map(...).flat().map(...[key, value]))
```

- > create a map in the format {enumKey: readableString} for choices
  > this is es5 to work in Edge and IE

  ```javascript
  const enumKeyMap = [].concat
    .apply(
      [],
      choiceArrays.map((choiceArray) => choiceArray.choices),
    )
    .reduce((map, obj) => {
      map[obj.enumKey] = obj.readableString;
      return map;
    }, {});
  ```
