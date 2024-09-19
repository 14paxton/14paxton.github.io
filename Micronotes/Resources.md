---
title:        Resources
permalink:    Micronotes/Resources
category:     Micronotes
parent:       Micronotes
layout:       default
has_children: false
share:        true
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

***                

<br/>

# Getting Resources

- ```java
   ClassLoader classLoader = getClass().getClassLoader();
   URL resource = classLoader.getResource(path);
  ```

- ```java
    Optional<URL> url = resourceResolver.getResource("classpath:" + path);
  ```

# Set Resources

## Gradle

```groovy
shadowJar {
    // Ensure resources are included
    mergeServiceFiles()
    include 'EmailTemplate/**'
}

sourceSets {
    main {
        resources {
            srcDirs = ['src/main/resources']
            include '**/*.properties', '**/*.yml'  // Add any specific file patterns if needed
        }
    }
}

graalvmNative {
    toolchainDetection = false

    binaries {

        resources.autodetect()

    }
}
}
```