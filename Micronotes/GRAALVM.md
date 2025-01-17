---
title: GRAALVM
permalink: Micronotes/GRAALVM
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

# [Micronaut GraalVM](https://docs.micronaut.io/latest/guide/index.html#graalServices)

## CLI

### Create Graal Native Image

   ```shell
    ./gradlew nativeCompile
  ```

### using the following to generate reflection meta-data

   ```shell
     java -agentlib:native-image-agent=config-output-dir=./META-INF/native-image -jar your-micronaut-app.jar
   ```

### Run Native Image In Dev

   ```shell
    ./build/native/nativeCompile/graal-mail -Dmicronaut.environments=dev
   ```

### Build jar

  ```shell
  ./gradlew buildNativeLambda
  ```

- > Optimized

  ```shell
    ./gradlew :optimizedBuildNativeLambda
  ```

# [Reflective Access](https://guides.micronaut.io/latest/micronaut-graalvm-reflection-gradle-java.html#handling-reflection)

- > ## @ReflectionConfig
    - > ### Reflective Access For Using Sendgrid In A GraalVM AWS Lambda

      <details markdown="block">
      <summary>
      Example From SendGrid
      </summary>

      {% raw %}

          ```java
            package example.micronaut;
            
            import com.sendgrid.SendGrid;
            import com.sendgrid.helpers.mail.Mail;
            import com.sendgrid.helpers.mail.objects.Attachments;
            import com.sendgrid.helpers.mail.objects.Content;
            import com.sendgrid.helpers.mail.objects.Email;
            import com.sendgrid.helpers.mail.objects.Personalization;
            import io.micronaut.core.annotation.ReflectionConfig;
            import io.micronaut.core.annotation.TypeHint;
            import io.micronaut.email.Attachment;
            import io.micronaut.email.MultipartBody;
            
            @ReflectionConfig(type = Attachment.Builder.class, accessType = TypeHint.AccessType.ALL_DECLARED_CONSTRUCTORS)
            @ReflectionConfig(type = Attachment.Builder.class, accessType = TypeHint.AccessType.ALL_DECLARED_FIELDS)
            @ReflectionConfig(type = Attachment.Builder.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = MultipartBody.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = MultipartBody.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = MultipartBody.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Attachment.class, accessType = TypeHint.AccessType.ALL_DECLARED_CONSTRUCTORS)
            @ReflectionConfig(type = Attachment.class, accessType = TypeHint.AccessType.ALL_DECLARED_FIELDS)
            @ReflectionConfig(type = Attachment.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = SendGrid.class, accessType = TypeHint.AccessType.ALL_DECLARED_CONSTRUCTORS)
            @ReflectionConfig(type = SendGrid.class, accessType = TypeHint.AccessType.ALL_DECLARED_FIELDS)
            @ReflectionConfig(type = SendGrid.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Content.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Content.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Content.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Personalization.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Personalization.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Personalization.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Mail.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Mail.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Mail.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Attachments.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Attachments.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Attachments.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Email.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Email.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            @ReflectionConfig(type = Email.class, accessType = TypeHint.AccessType.ALL_DECLARED_METHODS)
            class GraalConfig {
            }
          ```
      {% endraw %}

      </details>

- > ## `reflect-config.json`

  > so `Graal` recognizes imported classes that need to be reflective

     ```bash
        touch /src/main/resources/META-INF/native-image/com/ssi/reflect-config.json
     ```

- > [MicroStream Source Reference](https://gist.github.com/14paxton/d51cc2f493b8d8f4271c0cf55f2aefab)

  ```json
    {
    "name": "fts.marketing.utils.deserializers.CampaignEmailStatusDeserializer",
    "allDeclaredConstructors": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true,
    "allPublicMethods": true,
    "allDeclaredClasses": true,
    "allPublicClasses": true
    }
  ```

# GraalVM annotation processor

- > gradle import

  ```groovy
  annotationProcessor("io.micronaut:micronaut-graal")
  ```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    <p>This processor generates additional classes
that implement the <a href="https://docs.micronaut.io/latest/api/io/micronaut/core/graal/GraalReflectionConfigurer.html">GraalReflectionConfigurer Interface</a>
and programmatically register reflection configuration. </p>
</div>

> Example Class:

```java

@ReflectiveAccess
@Serdeable
public class Integration {
    //code
}
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
If you have more advanced requirements and only wish to include certain fields or methods, use the annotation on any constructor,    
field or method to include only the specific field, constructor or method.
</div>

# TidBits

## Bug with GraalVM and Java Records

> include the flag when building the native executable

```
--report-unsupported-elements-at-runtime
```

> Create the file `native-image.properties ` at

```
src/main/resources/META-INF/native-image/example.micronaut/guide/native-image.properties
```

> MY Example, only line in text file

```
Args = --report-unsupported-elements-at-runtime
```

# Gradle

> The Gradle plugin has a new `testNativeImage` task that builds the `GraalVM` Native Image and uses the native application as an embedded
> server enabling the ability to write native integration tests.

## Method to check if GraalVM JDK Distribution

> Method to check if you are running in GraalVM JDK distribution. I have used it often in Gradle build files to decide whether a Gradle task should be
> enabled.

```java
public class GraalStuff {
    private static boolean isGraalVMJava() {
        return (System.getProperty("java.home") != null && Files.exists(Paths.get("${System.getProperty("java.home")}/lib/graalvm")))
                || Arrays.asList("jvmci.Compiler", "java.vendor.version", "java.vendor")
                         .stream()
                         .anyMatch(propertyName -> {
                             String value = System.getProperty(propertyName);
                             return value != null && value.toLowerCase(Locale.ENGLISH)
                                                          .contains("graal");
                         });
    }
}
```

## add tool chain to gradle

You can already build a native executable by running `./gradlew nativeCompile` or run it directly by invoking `./gradlew nativeRun `
However, at this stage, running the native executable will fail because
this application requires additional metadata: you need to provide it with a list of resources to load.

Instruct the plugin to automatically detect resources to be included in the native executable. Add this to your `build.gradle ` file:

```groovy
graalvmNative {
    binaries.all {
        resources.autodetect()
    }
    toolchainDetection = false
}
```

Another thing to note here, the plugin may not be able to properly detect the `GraalVM` installation because of limitations in Gradle.  
By default, the plugin selects a `Java 11 GraalVM Community Edition`
If you want to use `GraalVM Enterprise`, or a particular version of `GraalVM` and `Java`, you need to explicitly tell in plugin’s configuration.  
For example:

```groovy
graalvmNative {
    binaries {
        main(({
            javaLauncher = javaToolchains.launcherFor {
                languageVersion = JavaLanguageVersion.of(8)
                vendor = JvmVendorSpec.matching("GraalVM Community")
            }
        } as java.lang.String))
    }
}
```

> my working example

```groovy
graalvmNative {
    toolchainDetection = false

    binaries {
        main(({
            javaLauncher = javaToolchains.launcherFor {
                languageVersion = JavaLanguageVersion.of(17)
                vendor = JvmVendorSpec.matching("GraalVM Community")
            }
            imageName.set('graal-vm-ssi')
            buildArgs.add('--verbose')
        } as java.lang.String))
    }
}
```

> The workaround to this is to disable toolchain detection with this command

```groovy
toolchainDetection = false
```

### get java toolchains

```shell
./gradlew-q javaToolchains
```

> output

```shell
Oracle JDK 11.0.18+9-LTS-jvmci-22.3-b11
  | Location:           /Library/Java/JavaVirtualMachines/graalvm-ee-java11-22.3.1/Contents/Home
  | Language Version:   11
  | Vendor:             Oracle
  | Architecture:       x86_64
  | Is JDK:             true
  | Detected by:        Current JVM
```

# Plugins

- [Java Assist](https://mvnrepository.com/artifact/org.javassist/javassist)
- [GraalVM Hibernate](https://mvnrepository.com/artifact/org.hibernate/hibernate-graalvm/6.1.5.Final)

# Resources

- [Gradle Plugin](https://micronaut-projects.github.io/micronaut-gradle-plugin/latest/#_micronaut_graalvm_plugin)
- [Micronaut Docs: GraalVM ](https://docs.micronaut.io/latest/guide/index.html#graal)
- [Gradle plugin for GraalVM Native Image building : Config Doc](https://graalvm.github.io/native-build-tools/0.9.13/gradle-plugin.html#configuration-options)
- [Gradle Plugin for Micronaut : io.micronaut.graalvm](https://plugins.gradle.org/plugin/io.micronaut.graalvm)
- [GraalVM Docs : Reflection](https://www.graalvm.org/22.2/reference-manual/native-image/metadata/)
- [reflect-config.json Graal SourceCode](https://github.com/oracle/graal/blob/master/docs/reference-manual/native-image/Reflection.md)
- [Micronaut graalvm Tests Source Code](https://github.com/micronaut-graal-tests/micronaut-liquibase-graal/tree/2.3.x_h2)