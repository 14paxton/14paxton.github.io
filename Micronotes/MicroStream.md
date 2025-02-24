---
title: MicroStream
permalink: Micronotes/MicroStream
category: Micronotes
parent: Micronotes
layout: default
has_children: false
share: true
shortRepo:

- micronotes
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

---

<br/>

- # [Docs](https://micronaut-projects.github.io/micronaut-microstream/latest/guide/)

# Project Examples

- > [Personal Large Integration SSI ](https://github.com/14paxton/micronaut_microstream)

- > [Personal CRUD app](https://github.com/14paxton/micronotes/tree/master/Projects/crud-data-microstream)

- > [Sergio Video Walkthrough](https://www.youtube.com/watch?v=5W6oVj0h6rQ&t=602s)

- > [Sergio AWS Walkthrough](https://www.youtube.com/watch?v=G5Uy8OODtEg&list=PLFeSAZzYdUofvGVIxNDEQ7lvRjXWdw0rw&index=7)

# [Type Handlers](https://docs.microstream.one/manual/storage/addendum/specialized-type-handlers.html)

# Tid-Bits

## [Copy Object](https://docs.microstream.one/manual/storage/storing-data/deep-copy.html)

```java
public class Copy {
    ObjectCopier objectCopier = ObjectCopier.New();

    Customer customer = root.getCustomer(id);

    Customer customerCopy = objectCopier.copy(customer);
}
```

# Running

```bash
./gradlew run
```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    *** Use in build.gradle to run in dev ***       
</div>

```gradle
 run {
    systemProperty('micronaut.environments', 'dev')
}
```

# [GUI](https://docs.microstream.one/manual/storage/rest-interface/client-gui.html)

> [Micronaut Enable Rest API](https://micronaut-projects.github.io/micronaut-microstream/snapshot/guide/#rest)

> add to `build.gradle`

```gradle
developmentOnly("io.micronaut.microstream:micronaut-microstream-rest")
```

> add to `application.yml`

```yaml
microstream:
  rest:
    enabled: true
```

## Run downloadable jar

[Direct Downlond](https://repo1.maven.org/maven2/one/microstream/microstream-storage-restclient-app/08.01.02-MS-GA/microstream-storage-restclient-app-08.01.02-MS-GA.jar)

```shell
java -jar microstream-storage-restclient-app-08.01.02-MS-GA.jar --server.port=8888
```

> Then just open http://localhost:8888 in your browser, select the base URL of the REST service and click connect.

# Lombok

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;">            
<em>*** Needs to be above micronaut annotations on classpath ***</em>
<br/>
<em> *** For lombok to recognize micronaut annotations and inject into constructor *** </em>
</div>

> create `lombok.config` at `root`

> insert line:

```
lombok.copyableannotations += io.micronaut.core.annotation.Nullable
```

# GraalVM

> - [MicroStream GitHub Source: example-graalvm-native](https://github.com/microstream-one/example-graalvm-native/tree/master/graalvm-native/src/main/resources/META-INF/native-image)

## Configuration

> To run with GraalVM add:
>
> > [reflect-config.json](https://gist.github.com/14paxton/d51cc2f493b8d8f4271c0cf55f2aefab) to `/src/main/resources/META-INF/native-image/[package]`
> > so `Graal` recognizes imported classes that need to be reflective

```bash
touch /src/main/resources/META-INF/native-image/com/ssi/reflect-config.json
```

## Create native image

```bash
./gradlew nativeCompile
```

## Run Native Image in Dev

```bash
./build/native/nativeCompile/graal-vm-ssi -Dmicronaut.environments=dev
```

# Resources

## Micronaut 3.7.2 Documentation

### [User Guide](https://docs.micronaut.io/3.7.2/guide/index.html)

### [API Reference](https://docs.micronaut.io/3.7.2/api/index.html)

### [Configuration Reference](https://docs.micronaut.io/3.7.2/guide/configurationreference.html)

### [Micronaut Guides](https://guides.micronaut.io/index.html)

## Gradle

### [Shadow Gradle Plugin](https://plugins.gradle.org/plugin/com.github.johnrengelman.shadow)

### [Gradle plugin for GraalVM Native Image building : Config Doc](https://graalvm.github.io/native-build-tools/0.9.13/gradle-plugin.html#configuration-options)

### [Gradle Plugin for Micronaut : io.micronaut.graalvm](https://plugins.gradle.org/plugin/io.micronaut.graalvm)

## GraalVM

### [Micronaut Docs: GraalVM ](https://docs.micronaut.io/latest/guide/index.html#graal)

### [GraalVM Docs : Reflection](https://www.graalvm.org/22.2/reference-manual/native-image/metadata/)

### [reflect-config.json Graal SourceCode](https://github.com/oracle/graal/blob/master/docs/reference-manual/native-image/Reflection.md)

## Microstream documentation

### [Micronaut MicroStream documentation](https://micronaut-projects.github.io/micronaut-microstream/latest/guide)

### [https://microstream.one/](https://microstream.one/)

### Microstream-REST documentation

#### [Micronaut MicroStream REST documentation](https://micronaut-projects.github.io/micronaut-microstream/latest/guide/#rest)

#### [https://docs.microstream.one/manual/storage/rest-interface/index.html](https://docs.microstream.one/manual/storage/rest-interface/index.html)

## HTTP-client documentation

### [Micronaut HTTP Client documentation](https://docs.micronaut.io/latest/guide/index.html#httpClient)

## Security-JWT documentation

### [Micronaut Security JWT documentation](https://micronaut-projects.github.io/micronaut-security/latest/guide/index.html)

## Resources

### Micronaut Documentation

- [API Reference](https://docs.micronaut.io/latest/api/index.html)
- [Configuration Reference](https://docs.micronaut.io/latest/guide/configurationreference.html)
- [Micronaut Guides](https://guides.micronaut.io/index.html)

---

- [Shadow Gradle Plugin](https://plugins.gradle.org/plugin/com.github.johnrengelman.shadow)

### GraalVM

- [Micronaut Docs: GraalVM ](https://docs.micronaut.io/latest/guide/index.html#graal)
- [Gradle plugin for GraalVM Native Image building : Config Doc](https://graalvm.github.io/native-build-tools/0.9.13/gradle-plugin.html#configuration-options)
- [Gradle Plugin for Micronaut : io.micronaut.graalvm](https://plugins.gradle.org/plugin/io.micronaut.graalvm)
- [GraalVM Docs : Reflection](https://www.graalvm.org/22.2/reference-manual/native-image/metadata/)
- [reflect-config.json Graal SourceCode](https://github.com/oracle/graal/blob/master/docs/reference-manual/native-image/Reflection.md)

### Microstream documentation

- [Micronaut MicroStream documentation](https://micronaut-projects.github.io/micronaut-microstream/latest/guide)
- [https://microstream.one/](https://microstream.one/)

#### Microstream-REST documentation

- [Micronaut MicroStream REST documentation](https://micronaut-projects.github.io/micronaut-microstream/latest/guide/#rest)
- [https://docs.microstream.one/manual/storage/rest-interface/index.html](https://docs.microstream.one/manual/storage/rest-interface/index.html)

### HTTP-client documentation

- [Micronaut HTTP Client documentation](https://docs.micronaut.io/latest/guide/index.html#httpClient)

### Security-JWT documentation

- [Micronaut Security JWT documentation](https://micronaut-projects.github.io/micronaut-security/latest/guide/index.html)