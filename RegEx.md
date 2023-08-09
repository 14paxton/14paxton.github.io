---
title: RegEx
permalink: GroovyNotes/RegEx
category:  GroovyNotes
parent:   GroovyNotes
layout: default
has_children: false
share: true
shortRepo:
  - groovynotes
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

# RegEX

=~ will look for partial match ==~   look for an exact match

## Use with replace and findall

"LBlsBF4wUp".replaceAll(/[\d\sa-zA-Z.!?\\-\\']/)

## Create String and compare

![](https://github.com/14paxton/GroovyNotes/blob/main/Where.png)

## -closure for where-

![](https://github.com/14paxton/GroovyNotes/blob/main/%40Where.png)

## Use groups

```groovy
def replacedTxt = txt.replaceAll(/.*(\d{2}-\d{2}-\d{4}).*(Gr.*)./) { all, date, lang ->
    def dateObj = Date.parse('dd-MM-yyyy', date)
    "The text '$all' was created with $lang on a ${dateObj.format('EEEE')}."
}
```
