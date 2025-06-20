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

## Using `java.lang.invoke`

- Why Use `findVirtual()` (MethodHandles) Instead of `invoke()` (Reflection)?

  1. Performance ⚡

  - MethodHandle via findVirtual is much faster than reflection after warmup.
  - Reflection uses internal access checks and boxing, while MethodHandles are optimized by the JVM's JIT compiler.

```java
import javax.swing.text.html.parser.Entity;

public void useMethodHandles() {

    // ****************************************************************************************
    // Dynamically call a private method
    // ****************************************************************************************

    Entity before = new Entity();
    java.lang.invoke.MethodHandles.Lookup lookup = java.lang.invoke.MethodHandles.privateLookupIn(
            Entity.class,
            java.lang.invoke.MethodHandles.lookup());
    java.lang.invoke.MethodHandle getterHandle = lookup.findVirtual(Entity.class,
                                                                    "methodToCall",
                                                                    java.lang.invoke.MethodType.methodType("returnType"));

    Object oldValue = getterHandle.invoke(before);


    // ****************************************************************************************
    // Junit Example: Dynamically call a private method with a void return value
    // ****************************************************************************************

    RealForm realForm = new RealForm();
    RealForm formSpy = Mockito.spy(realForm);

    MethodHandles.Lookup lookup = MethodHandles.privateLookupIn(RealForm.class, MethodHandles.lookup());
    MethodHandle methodHandleJunit = lookup.findVirtual(RealForm.class,
                                                        "configureVmcInfo_edits",
                                                        MethodType.methodType(void.class,
                                                                              ResourceManagerVmcInfoForm.class));
    methodHandleJunit.invoke(builder, formSpy);


    // ****************************************************************************************
    // Non-private example 
    // ****************************************************************************************

    MethodHandles.Lookup lookup = MethodHandles.lookup();
    MethodHandle methodHandleNonPrivate = lookup.findVirtual(Entity.class,
                                                             "methodName",
                                                             MethodType.methodType(void.class));
    methodHandleNonPrivate.invoke(before);


    // ****************************************************************************************
    // Dynamically use Getter by field
    // ****************************************************************************************

    Class<?> clazz = instance.getClass();
    // We must use privateLookupIn for private/protected fields
    MethodHandles.Lookup lookupGetter = MethodHandles.privateLookupIn(clazz, MethodHandles.lookup());

    // Discover the field reflectively just to get its type
    Field field = clazz.getDeclaredField(fieldName);
    Class<?> fieldType = field.getType();

    // Get a MethodHandle to the field getter
    MethodHandle getter = lookupGetter.findGetter(clazz, fieldName, fieldType);
    return getter.invoke(instance);

    // ****************************************************************************************
    // Dynamically use Setter by field
    // ****************************************************************************************

    try {
        Class<?> clazz = instance.getClass();
        MethodHandles.Lookup lookup = MethodHandles.privateLookupIn(clazz, MethodHandles.lookup());

        Field field = clazz.getDeclaredField(fieldName);
        MethodHandle setter = lookup.findSetter(clazz, fieldName, field.getType());
        setter.invoke(instance, value);
    }
    catch (Throwable t) {
        throw new RuntimeException("Unable to set field via MethodHandle: " + fieldName, t);
    }

    // ****************************************************************************************
    //    MethodHandle.invokeExact()
    // method on java.lang.invoke.MethodHandle that invokes the target method —
    // but with absolutely strict type checking at both compile-time and runtime.
    // ****************************************************************************************

    String result = (String) MethodHandles.lookup()
                                          .findVirtual(String.class,
                                                       "substring",
                                                       MethodType.methodType(String.class, int.class, int.class))
                                          .invokeExact("hello world", 0, 5);


    // ****************************************************************************************
    // Dynamically get a field 
    // ****************************************************************************************

    Class<?> fieldType = Entity.class.getDeclaredField(property.getValue())
                                     .getType();

    MethodHandle methodHandle = MethodHandles.privateLookupIn(Entity.class, MethodHandles.lookup())
                                             .findGetter(Entity.class, property.getValue(), fieldType);

    Object oldValue = methodHandle.invoke(before);


}
```

## Using `java.lang.reflect`

```java
public void Reflection() {


    // ****************************************************************************************
    // dynamically call getter, with get method
    // ****************************************************************************************

    String getterName = "get" + Character.toUpperCase(property.getValue()
                                                              .charAt(0)) + property.getValue()
                                                                                    .substring(1);
    java.lang.reflect.Method getter = before.getClass()
                                            .getMethod(getterName);
    Object newValue = getter.invoke(after);


    // ****************************************************************************************
    // uses Lombok's @Accessors(fluent = true), which generates fluent-style getters (e.g., .name()) 
    //  instead of standard JavaBean getters (e.g., .getName()). 
    // ****************************************************************************************

    Entity before = new Entity();
    Entity after = new Entity();

    java.lang.reflect.Method fluentStyleGetter = Entity.class.getDeclaredMethod("fieldName");
    Object oldValue = fluentStyleGetter.invoke(before);
    Object newValue = fluentStyleGetter.invoke(after);


    // ****************************************************************************************
    // calling method with params
    // sets access on private method 
    // ****************************************************************************************

    java.lang.reflect.Method privateMethod = ClassToGetMethod.class.getDeclaredMethod("methodToCall",
                                                                                      ParamType.class);
    privateMethod.setAccessible(true);
    privateMethod.invoke(builder, formSpy);


    // ****************************************************************************************
    // Getting Field
    // sets access on private field 
    // call field getter
    // ****************************************************************************************

    Entity entity = new Entity();
    java.lang.reflect.Field field = entity.getClass()
                                          .getDeclaredField("fieldName");
    field.setAccessible(true);

    var oldValue = field.get(before);
    var newValue = field.get(after);

}
```