---
title: LooseNotes
layout: default
parent: Java
permalink: JavaNotes/LooseNotes
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

# Optionals

```java            
public class OptEx {
    Optional<Map<String, String>> aorMap = Optional.ofNullable(this.customAORMap);

}
```            

# Streams

## Map and Collect

```java            

public class MapExample {

    Map newMap = clientEntityMap.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().stream().map(e -> {
        String externalCode = e.getDescription();
        String externalCode = e.getDescription();
        String externalCode = e.getDescription();

        return Map.of("externalCode", "");
    }).collect(Collectors.toList())));
}          
```            

## ConcurrentHashMap and LinkedList

```java  
public class LinkedListEx {
    Map newMap = this.clientEntityMap.entrySet().stream().map(entry -> Map.entry(entry.getKey(), entry.getValue().stream().map(ClientEntityDetails::toMap).collect(Collectors.toCollection(LinkedList::new)))).collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue, (a, b) -> b, ConcurrentHashMap::new));

}          
```            

## Map to String

```java            
public class MapToString {
    Map mapToString = this.clientEntityMap.entrySet().stream().map(entry -> Map.entry(entry.getKey(), entry.getValue().stream().map(ClientEntityDetails::toMap).collect(Collectors.toCollection(LinkedList::new)))).collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue, (a, b) -> b, ConcurrentHashMap::new));

}         
```

# Sealed Classes

![img.png](../assets/images/JavaSealedClasses.png)

# Pattern Matching

![img.png](../assets/images/JavaPaternMatching.png)

## Scope of Variables

![img.png](../assets/images/JavaPatternMatchingScopeVar.png)

# Records

![img.png](../assets/images/JavaRecords.png)

# Text Block (String)

![img.png](../assets/images/JavaTextBlock.png)
![img.png](../assets/images/JavaTextBlockHowWeUse.png)

# Switch (Case)

![img.png](../assets/images/JavaSwitch.png)
![img.png](../assets/images/JavaSwitchCase.png)

# Local Variable Type Interface (Var)

![img_1.png](../assets/images/JavaVarType.png)

## var with lambda

![img.png](../assets/images/JavaVarTypeWithLambda.png)

# Private Interface Methods

![img.png](../assets/images/JavaPrivateInterfaceMethods.png)

# Try

![img.png](../assets/images/JavaTryWithResources.png)

# Diamond Operator

## For Anonymous Inner Class

![img.png](../assets/images/JavaDiamondOperatorForInnerClass.png)