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

# Regex simplicity vs normal

> There are some cases when making use of regular expressions (regex) can exempt a lot of fuss from a programmers head.
> For example, let's compare the complexity between traditional logic and regex,
> in a function that excludes the vowels from a given string:

- > ## Traditional way:

  ```javascript
  function removeVowel(str) {
    let strList = str.split("");
    for (let i = 0; i < str.length; i++) {
      let char = str[i].toLowerCase();
      if (
        char == "a" ||
        char == "e" ||
        char == "i" ||
        char == "o" ||
        char == "u"
      ) {
        strList[i] = "";
      }
    }
    return strList.join("");
  }
  ```

- > ## Regex Way:

  ```javascript
  function removeVowel(str) {
    return str.replace(/[aeiou]/gi, "");
  }
  ```

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

# Validate your password with regex

## Example password validation regex

- the rules below can be concatenated

```
^(?=.*?[^a-zA-ZÄÖÜäöüß0-9])(?=.*?[0-9])(?=.*?[a-zäöüß])(?=.*?[A-ZÄÖÜ])(?!.*\d{2,}).{8,}$
```

### Special character matching

- Matches (operator is `?=`) any string that has at least a special character e.g.: `sadsds@asdasd`

```
(?=.*?[^a-zA-ZÄÖÜäöüß0-9])
```

### Number matching

- Matches (operator is `?=`) any string that has at least a number: e.g.: `s1adsdsasdasd`

```
(?=.*?[0-9])
```

### Small letter matching

- Matches (operator is `?=`) any string that has at least a small letter: e.g.: `SADSa`

```
(?=.*?[a-zäöüß])
```

### Big letter matching

- Matches (operator is `?=`) any string that has at least a big letter: e.g.: `SADSa`

```
(?=.*?[A-ZÄÖÜ])
```

### Consecutive numbers matching

- Doesn't match (operator is `?!`) strings that have consecutive numbers in them: e.g.: asdasd42dada

```
(?!.*\d{2,})
```

### Sequential numbers matching (cannot be used at the same time with previous rule)

- Doesn't match (operator is `?!`) strings that have sequential numbers in them: e.g.: 12asdasd42dada
- It will allow numbers that are separated by other letters e.g.: adasd1asd2asd3
- It will allow consecutive numbers e.g.: ahadADS22dhsg44

```
(?!.*((12)|(23)|(34)|(45)|(56)|(67)|(78)|(90)|(01)))
```

### Length of string matching (should be placed last)

- This will match any string that is less than 8 characters

```
.{8,}
```