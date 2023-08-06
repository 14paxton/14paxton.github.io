---
title: String
permalink: GroovyNotes/String
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

crea@groovy.transform.ToString

Used for classes to establish to string

# Strings

‘’’ … ‘’’ three single quotes creates a multiline string obj

Str -= “rainy” will remove rainy from the string

Use stripIndent() or stripMargin() remove indents

stripMargin(‘char’) indicates what lines, or | by default

```groovy
"""<p><strong>Scheduled Interview Summary</strong></p>
|<p><strong>Company</strong>: @@company@@<br>""".stripMargin()
```

```groovy
"abc".tr('abc', '321')
```

## Replace characters in string

Java char saved as int per ascii

```groovy
Def x = 'a'

(int) x - 96 = 1
```

## Splitting strings

The split() method returns a string [] instance and the tokenize() method returns a list instance

tokenize() ,which returns a list, will ignore empty string (when a delimiter appears twice in succession) where as split() keeps such string.

## Slice   word[0..3]

Will get letters at index 0 through 3

word[1,6,0] get letters index 1,6, and 0