---
title:     LooseNotes
layout:    default
parent:    Java
permalink: JavaNotes/LooseNotes
category:  JavaNotes
share:     true
shortRepo:
  - java
  - default  
---

# Optionals

```java
Optional<Map<String, String>>aorMap=Optional.ofNullable(this.customAORMap);
```

# Streams

## Map and Collect

```java

clientEntityMap.entrySet()
        .stream()
        .collect(Collectors.toMap(Map.Entry::getKey,entry->entry
        .getValue()
        .stream()
        .map(e->{
        String externalCode=e.getDescription();
        String externalCode=e.getDescription();
        String externalCode=e.getDescription();

        return Map.of("externalCode","");
        })
        .collect(Collectors.toList())
        ));
```

## ConcurrentHashMap and LinkedList

```java
return this.clientEntityMap.entrySet()
        .stream()
        .map(entry->Map.entry(entry.getKey(),entry.getValue().stream().map(ClientEntityDetails::toMap).collect(Collectors.toCollection(LinkedList::new))))
        .collect(Collectors.toConcurrentMap(Map.Entry::getKey,Map.Entry::getValue,(a,b)->b,ConcurrentHashMap::new));
```

## Map to String

```java
map.keySet().stream()
        .map(key->key+"="+map.get(key))
        .collect(Collectors.joining(", ","{","}"));
```