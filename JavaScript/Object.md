---
title:        Object
permalink:    JavaScript/Object
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

---

<br/>

# Filter and rebuild Object

```javascript
Object.fromEntries(Object.entries(props).filter(([k, v]) => !customProps.includes(k)),);
```

# ForEach on Object Keys

```javascript
for (let param of Object.keys(params)) {
    routeUrl = routeUrl.replace(`:${param}`, params[param]);
}
```

# ForEach on Entries

> destructure tuple for key value

```javascript
for (const [key, value] of Object.entries(unionObject)) {
    if (value
            .matchName((enumInfo) => enumInfo.value)
            .replace(/\s/g, "")
            .toLowerCase() === enumValue.replace(/\s/g, "").toLowerCase()) return key;
}
```

# If Object Key Exists

```javascript
Object.hasOwn(dimensionsObj, key)
? dimensionsObj[key]?.height
: null;
```

# Get Object Key By Value

```javascript
export const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};
```

# Create New With Default Props

```javascript
const defaultObj = passedDefaultPPTReturnObject
                   ? {...passedDefaultPPTReturnObject}
                   : {};

for (const newProp of newProps) {
    Object.assign(defaultObj, newProp);
}
```

# Flatten Nested Objects

```javascript
export const flattenMessages = (nestedMessages, prefix = "") => {
    if (nestedMessages === null || nestedMessages === undefined) {
        return {};
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix
                            ? `${prefix}.${key}`
                            : key;

        if (typeof value === "string") {
            Object.assign(messages, {[prefixedKey]: value});
        }
        else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
};
```