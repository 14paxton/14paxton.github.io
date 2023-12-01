---
title: RegEx
permalink: JavaScript/RegEx
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

# Flags

> - `g` is used for global search which means the search will not return after the first match.
> - `i` is used for case-insensitive search meaning that a match can occur regardless of the casing.
> - `m` is used for multiline search.
> - `u` is used for Unicode search.

# Shortcodes for Metacharacters:

> - `\d` matches any decimal digit and is shorthand for [0-9].
> - `\w` matches any alphanumeric character which could be a letter, a digit, or an underscore. \w is shorthand for [A-Za-z0-9_].
> - `\s` matches any white space character.
> - `\D` matches any non-digit and is the same as [^0-9.]
> - `\W` matches any non-word (that is non-alphanumeric) character and is shorthand for [^A-Za-z0-9_].
> - `\S` matches a non-white space character.
> - `. ` matches any character.

# Negated Character Class

> If you add a caret symbol inside a character class like this `[^...]`, it will match any character that is not listed inside the square brackets.

```javascript
const regexPattern = /[^bc]at/;

console.log(regexPattern.test("bat")); // Output: false

console.log(regexPattern.test("cat")); // Output: false

console.log(regexPattern.test("mat")); // Output: true
```

# RegExp

## TESTS IT EXISTS

```javascript
regEx.test(string);
```

## Exec

```javascript
const regexAlreadyCloned = /clone/i;
regexAlreadyCloned.exec(key);
```

## Test

```javascript
const regex = new RegExp(/ROLE_PERMISSION_.*/);
return currentUser?.authorities?.filter((role) => !regex.test(role));
```

# String

## RETURN MATCHES

> return all matches when using `g` global flag

```javascript
string.match(regEx);
```

## Replace

```javascript
const begginingWhiteSpace = new RegExp(/^((\r\n)+|\r+|\n+|\t+|\s+)*/, "m");
const controlCharacterRegExp = new RegExp(/(\r\n)+|\r+|\n+|\t+/, "g");

return stringToParse
  .replace(begginingWhiteSpace, "")
  .replace(controlCharacterRegExp, " , ");
```

## ReplaceAll

### Leave only Alpha Chars and remove space

```javascript
const removeSpecialChar = /[^a-zA-Z\d ]/g;
const replaceSpace = /\s/g;
const onlyAlpha = (fileName ? fileName : title).replaceAll(
  removeSpecialChar,
  "",
);
const strippedFName = onlyAlpha.replaceAll(replaceSpace, "_");
```
