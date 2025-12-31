---
title: Collections
layout: default
parent: Java
permalink: JavaNotes/Collections
category: JavaNotes

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

- `Collectors.tolist()` -> Collects into a List

- `Collectors.toSet()` -> Collects into a Set

- `Collectors.toMap(keyMapper, valueMapper)` -> Collects into a Map
- `Collectors.groupingBy(Function)` -> Groups elements by a key
- `Collectors.partitioningBy(Predicate)` —> Partitions elements into two groups
  (true/false)

```java
List<String> names = List.of("Alice", "Bob", "Charlie");
```

```java
Map<Integer, List<String>> groupedByLength = names.stream()
                                                  .collect(Collectors.groupingBy(String: :length));
```