---
title: String
layout: default
parent: Java
permalink: JavaNotes/String
category: JavaNotes
share: true
shortRepo:
  - javanotes
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

# Formatting

> add white space

```java    
public class White {
    string space = System.out.printf("%-15s", str);

}
```    

> Use the StringUtils class, it also includes null check

```java    
StringUtils.leftPad(String str,int size);

```   

```java
 StringUtils.rightPad(String str,int size);
```

## [Format Codes](https://docs.oracle.com/javase/6/docs/api/java/util/Formatter.html#detail)

> if you want to pad a string to a certain length with spaces, use something like this:

```java    
String padded=String.format("%-20s",str);

```    

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    In a formatter, <em>%</em> introduces a format sequence.<br>
    The <em>-</em> means that the string will be left-justified (spaces will be added at the end of the string).<br>
    The <em>20</em> means the resulting string will be 20 characters long.<br>
    The <em>s</em> is the character string format code, and ends the format sequence.       <br>
</div> 