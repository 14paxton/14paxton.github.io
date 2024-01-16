---
title:        OOP
permalink:    JavaNotes/OOP
category:     JavaNotes
parent:       Java
layout:       default
has_children: false
share:        true
shortRepo:
  - javanotes
  - default
---

<br/>

<link rel="modulepreload" href="/assets/js/imageLoader.js">
<script type="module" async src="/assets/js/imageLoader.js"></script>

---

# Creating a New Object

## new class / new instance

```java
class ClassA {
}

//new Keyword

ClassA b = new ClassA();

// new instance

ClassA c = ClassA.class.newInstance();

// new instance in class constructor

Constructor<ClassA> d = ClassA.class.getConstructor().newInstance();
```

## cloneable

```java
public class ClassA implements Cloneable {
    protected Object clone() throws CloneNotSupportedException {
    }

    ClassA obj1 = new ClassA();
    ClassA obj2 = obj1.clone();
}
```

## serializable

```java
public class ClassA implements Serializable {

}

// Serialization
ClassA classA;
try(
ObjectOutputStream out = new ObjectOutputStream(
        new FileOutputStream("classA.obj"))){
        out.

writeObject(classA);
}

// Deserialization
ClassA deserialClassA;
try(
ObjectInputStream in = new ObjectInputStream(
        new FileInputStream("classA.obj"))){
deserialClassA =(ClassA)in.

readObject();
        }

// deserialClassA Object will be created after deserialization process

```

<div id="imageContainer" data-img-loader="javaOOPImages.js" style="width: auto; height: auto;"></div>