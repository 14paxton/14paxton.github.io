---
title: Types
permalink: JavaScript/TypeScript/Types
category: JavaScript/TypeScript
parent: TypeScript
grand_parent: JavaScript
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

# Function

> Typescript from v1.4 has the type keyword which declares a type alias (analogous to a typedef in C/C++).

- > You can declare your callback type thus:

  ```typescript
  type CallbackFunction = () => void;
  ```

- > declares a function that takes no arguments and returns nothing. A function that takes zero or more arguments of any type and returns nothing
  would be:
  ```typescript
  type CallbackFunctionVariadic = (...args: any[]) => void;
  ```

```typescript
let callback: CallbackFunctionVariadic = function (...args: any[]) {
    // do some stuff
};
```

- > If you want a function that takes an arbitrary number of arguments and returns anything (including void):

  ```typescript
  type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;
  ```

- > You can specify some mandatory arguments and then a set of additional arguments (say a string, a number and then a set of extra args) thus:

  ```typescript
  type CallbackFunctionSomeVariadic = (
    arg1: string,
    arg2: number,
    ...args: any[]
  ) => void;
  ```

> This can be useful for things like EventEmitter handlers.

> Functions can be typed as strongly as you like in this fashion, although you can get carried away and run into combinatoric problems if you try to
> nail everything down with a type alias.