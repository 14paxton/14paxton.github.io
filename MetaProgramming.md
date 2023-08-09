---
title: MetaProgramming
permalink: GroovyNotes/MetaProgramming
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

# Objects

## properties to map

```groovy
intCmd.class
        .declaredFields
        .findAll { !it.synthetic }
        .collectEntries { [it.name, intCmd."$it.name"] }
```

### can also use slurper

```groovy
class BaseObject {
    Map asMap() {
        def jsonSlurper = new groovy.json.JsonSlurperClassic()
        Map map = jsonSlurper.parseText(this.asJson())
        return map
    }

    String asJson() {
        def jsonOutput = new groovy.json.JsonOutput()
        String json = jsonOutput.toJson(this)
        return json
    }
}
```

# Object Extensions

## if you don’t know the  name of method at runtime

`   peter.invokeMethod(“walk”, 10)`

# MetaProgramming

## Create Class Prop Dynamically

> code example from class constructor

```groovy
dynamicProperties.eachWithIndex { String newProp, Integer index ->
    if (index < 4) {
        String propName = newProp.substring(1).replaceAll("\\s", "")
        String propNameCamelCased = Character.toString(newProp.charAt(0)).toUpperCase() + noWhite
        this.metaClass["get${propNameCamelCased}"] = raw.get(newProp)
    }
}
```

## to invoke a property dynamically

` obj[usrRequestedProperty], obj.”$usrRequestedProperty”`

## iterate over an objects properties

` obj.properties.each {}`

## check if property exists

` object.hasProperty(methodName)`

## iterate through objects methods

`   object.methods.each{}`

## iterate through methods

`test.metaClass.methods.each{ method -> if (method.name == ‘thismethod’) method.invoke(arg)}`

## check if method exists

` object.respondsTo(methodName)     `

# Class object -- reflection

## dynamically create class

```java
Class<?> clazz=Class.forName("java.util.Date");
        Object date=clazz.newInstance();
```

```java
Class<?> clazz=Class.forName("com.foo.MyClass");
        Constructor<?> constructor=clazz.getConstructor(String.class,Integer.class);
        Object instance=constructor.newInstance("stringparam",42);
```

```groovy
def p3 = Class.forName("Person").newInstance()
assert p3
```

> using groovy classLoader

```groovy
def instance = this.class.classLoader.loadClass('Item', true, false)?.newInstance()
```

> ***Code Example***

```groovy
Class clazz = configMap.get(name)
Object typeConfigProps = wSConfigCommand.getProperty(name)
Object newInstance = clazz.newInstance([*: newClientOrderConfig.properties, *: typeConfigProps.properties] as Object)
newInstance.wSConfigType = type
newInstance.clientSetup = newClientSetup
def err = validatingClosure(newInstance)
if (err) {
    returnObj.errors = [(err.name): err]
} else {
    returnObj = [(type.getKey()): newInstance.save(flush: true).id]
}
```

> possible errors

1) the JVM can't find or can't load your class
2) the class you're trying to instantiate doesn't have the right sort of constructors
3) the constructor itself threw an exception
4) the constructor you're trying to invoke isn't public
5) a security manager has been installed and is preventing reflection from occurring
