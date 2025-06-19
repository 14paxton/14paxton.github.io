---
title: Reflection
layout: default
parent: Java
permalink: JavaNotes/Reflection
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

# Dynamically Calling Class Methods

```java
public void Reflection() {
  // ****************************************************************************************
  // dynamically call getter, with get method
  // ****************************************************************************************

  String getterName = "get" + Character.toUpperCase(property.getValue()
                                                            .charAt(0)) + property.getValue()
                                                                                  .substring(1);
  var getter = before.getClass()
                     .getMethod(getterName);
  Object newValue = getter.invoke(after);


  // ****************************************************************************************
  // uses Lombok's @Accessors(fluent = true), which generates fluent-style getters (e.g., .name()) 
  //  instead of standard JavaBean getters (e.g., .getName()). 
  // ****************************************************************************************

  Entity before = new Entity();
  Entity after = new Entity();

  java.lang.reflect.Method fluentStyleGetter = Entity.class.getDeclaredMethod("name");
  Object oldValue = fluentStyleGetter.invoke(before);
  Object newValue = fluentStyleGetter.invoke(after);


  // ****************************************************************************************
  // calling method with params
  // sets access on private method 
  // ****************************************************************************************

  java.lang.reflect.Method privateMethod = ResourceManagerVmcInfoFormBuilder.class.getDeclaredMethod("configureVmcInfo_edits", ParamType.class);
  privateMethod.setAccessible(true);
  privateMethod.invoke(builder, formSpy);


  // ****************************************************************************************
  // Getting Field
  // sets access on private field 
  // call field getter
  // ****************************************************************************************

  Entity entity = new Entity();
  java.lang.reflect.Field field = entity.getClass()
                                        .getDeclaredField("method");
  field.setAccessible(true);

  var oldValue = field.get(before);
  var newValue = field.get(after);

}
```