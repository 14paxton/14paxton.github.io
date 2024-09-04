---
title:        File
permalink:    JavaNotes/File
category:     JavaNotes
parent:       Java
layout:       default
has_children: false
share:        true        
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

# Reading Files

```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

byte[] imageBytes = Files.readAllBytes(Path.of("src/main/resources/EmailTemplate/picture.png"));
File file = new File("src/main/resources/EmailTemplate/picture.png");
```

## Read HTML to String

```java
package example.micronaut.services;

import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Singleton
@Requires(property = "html.file.path")
public class HtmlFileService {

    private final String filePath;

    public HtmlFileService(@Value("${html.file.path}") String filePath) {
        this.filePath = filePath;
    }

    public String readHtmlFile() throws IOException {

        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        try (InputStream inputStream = classLoader.getResourceAsStream(filePath)) {
            if (inputStream == null) {
                throw new IOException("File not found: " + filePath);
            }
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
```

## Read JSON file to Map

```java
package example.micronaut.services;

import io.micronaut.context.annotation.Requires;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.serde.ObjectMapper;
import jakarta.inject.Singleton;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@Singleton
@Requires(classes = ObjectMapper.class)
public class JsonFileReader {
    private final ObjectMapper objectMapper;

    @jakarta.inject.Inject
    public JsonFileReader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public @Nullable Map readJsonFileToMap(String filePath) throws IOException {
        byte[] jsonData = Files.readAllBytes(Paths.get(filePath));
        return objectMapper.readValue(jsonData, Map.class);
    }
}
```