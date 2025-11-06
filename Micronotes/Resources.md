---
title: Resources
permalink: Micronotes/Resources
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

***                

<br/>

> you can use `io.micronaut.core.io.ResourceLoader` variants,

- `io.micronaut.core.io.scan.ClassPathResourceLoader`
- `io.micronaut.core.io.file.FileSystemResourceLoader`
- `io.micronaut.core.io.ResourceResolver`

```java
ClassPathResourceLoader loader = new ResourceResolver().getLoader(ClassPathResourceLoader.class)
                                                       .get();
Optional<URL> resource = loader.getResource("classpath:foo/bar.txt");
```

# Getting Resources

## Class Loader

```java
ClassLoader classLoader = getClass().getClassLoader();
URL resource = classLoader.getResource(path);
 ```

## Resourceloader

```java

@Controller("root")
public class MyController {

  private final ResourceLoader loader;

  public MyController(ResourceLoader loader) {
    this.loader = loader;
  }

  @Get("/index")
  @Produces(MediaType.TEXT_HTML)
  public String greet() throws IOException {
    return new String(loader.getResourceAsStream("index.html")
                            .get()
                            .readAllBytes());
  }
}
```

## @Value

```java

@Singleton
public class MyService {

  @Value("classpath:your-file.json")
  private Readable readable;
}
```

```java

@Singleton
public class MyService {

  private final Readable readable;

  public MyService(@Value("classpath:your-file.json") Readable file) {
    this.readable = readable;
  }
}
```

## ConfigurationProperties

```yaml
micronaut:
  application:
    name: Demo
images:
  image-file: "classpath:images/bismarckia-nobilis.jpg"
  # image-file: "file:/path/to/images/bismarckia-nobilis.jpg"
  other-files:
    - "classpath:images/bismarckia-nobilis.jpg"
    - "classpath:images/bamboo.jpg"
    - "classpath:images/hibiscus.jpg"

```

```java
import java.util.List;

@ConfigurationProperties("images")
@Context
public class ImageConfig {
  private Readable imageFile;
  private List<Readable> otherFiles;

  public Readable getImageFile() {
    return imageFile;
  }

  public void setImageFile(Readable imageFile) {
    this.imageFile = imageFile;
  }

  public List<Readable> getOtherFiles() {
    return otherFiles;
  }

  public void setOtherFiles(List<Readable> otherFiles) {
    this.otherFiles = otherFiles;
  }
}
```

```java
import com.oracle.svm.core.annotate.Inject;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.util.Random;

@Controller("/images")
public class ImageController {

  @Inject
  ImageConfig imageConfig;

  @Get(uri = "/single", processes = "images/jpg")
  public StreamedFile getSingleImage() {
    final Readable singleImage = imageConfig.getImageFile();
    try {
      final InputStream is = singleImage.asInputStream();
      return new StreamedFile(is, MediaType.IMAGE_JPEG_TYPE);
    }
    catch (IOException e) {
      throw new IllegalStateException(e);
    }
  }

  @Get(uri = "/random", processes = "images/jpg")
  public StreamedFile getRandomImage() {
    int imageIndex = this.getRandomNumber(imageConfig.getOtherFiles()
                                                     .size());
    final Readable randomImage = imageConfig.getOtherFiles()
                                            .get(imageIndex);
    try {
      final InputStream is = randomImage.asInputStream();
      return new StreamedFile(is, MediaType.IMAGE_JPEG_TYPE);
    }
    catch (IOException e) {
      throw new IllegalStateException(e);
    }
  }

  private int getRandomNumber(int max) {
    final Random random = new Random();
    return random.ints(0, max)
                 .findFirst()
                 .getAsInt();
  }
}
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
            include '**/*.properties', '**/*.yml' // Add any specific file patterns if needed
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