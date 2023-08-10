---  
title:     String    
layout:    default    
parent:    Java    
permalink: JavaNotes/String    
category:  JavaNotes    
share:     true    
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
System.out.printf("%-15s",str);    
```    
    
> Use the StringUtils class, it also includes null check    
    
```java    
StringUtils.leftPad(String str,int size)    
        StringUtils.rightPad(String str,int size)    
```    
    
## [Format Codes](https://docs.oracle.com/javase/6/docs/api/java/util/Formatter.html#detail)    
    
> if you want to pad a string to a certain length with spaces, use something like this:    
    
```java    
String padded=String.format("%-20s",str);    
    
```    
    
> In a formatter, % introduces a format sequence. The - means that the string will be left-justified (spaces will be added at the end of the string). The 20 means the resulting string will be 20 characters long. The s is the character string format code, and ends the format sequence.