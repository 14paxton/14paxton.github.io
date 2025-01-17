---
title: UsefuleSnippets
permalink: Micronotes/UsefuleSnippets
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

# Util Service

```java

@Singleton
public class UtilService {

    private static final Logger LOG = LoggerFactory.getLogger(UtilService.class);

    private final ResourceResolver resourceResolver;
    private final ObjectMapper objectMapper;

    @Inject
    public UtilService(ResourceResolver resourceResolver, ObjectMapper objectMapper) {
        this.objectMapper     = objectMapper;
        this.resourceResolver = resourceResolver;
    }


    /**
     * Reads the contents of a classpath resource as a byte array.
     *
     * @param path The path to the resource within the classpath.
     * @return An {@link Optional} containing the byte array of the resource content if successful,
     * otherwise an empty {@link Optional} in case of an error or if the resource is not found.
     */
    @NonNull
    public Optional<byte[]> getClasspathResourceAsBytes(@NonNull String path) {
        return getClasspathResource(path).flatMap(url -> {
            try (InputStream inputStream = url.openStream()) {
                return Optional.of(inputStream.readAllBytes());
            }
            catch (IOException e) {
                LOG.error("Error reading bytes from resource: {}", path, e);
                return Optional.empty();
            }
        });
    }

    @NonNull
    private Optional<URL> getClasspathResource(@NonNull String path) {
        return resourceResolver.getResource("classpath:" + path);
    }

    /**
     * Reads a JSON file from the classpath and converts it into a map of strings.
     *
     * @param resourcePath The path to the JSON file within the classpath.
     * @return An Optional containing a map of key-value pairs from the JSON file if successful,
     * otherwise an empty Optional in case of an error or if the resource is not found.
     */
    @NonNull
    public Optional<Map<String, String>> readJsonFileToMap(@NonNull String resourcePath) {
        return getClasspathResource(resourcePath).flatMap(url -> {
            try (InputStream inputStream = url.openStream()) {
                return Optional.of(objectMapper.readValue(inputStream, Argument.mapOf(String.class, String.class)));
            }
            catch (IOException e) {
                LOG.error("Error reading JSON from resource: {}", resourcePath, e);
                return Optional.empty();
            }
        });
    }

    /**
     * Reads the content of an HTML file from the specified path within the classpath.
     *
     * @param path The path to the HTML file within the classpath.
     * @return An Optional containing the content of the HTML file as a String if successful, otherwise an empty Optional.
     */
    @NonNull
    public Optional<String> readHtmlFile(@NonNull String path) {
        return getClasspathResource(path).flatMap(url -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8))) {
                return Optional.of(IOUtils.readText(reader));
            }
            catch (IOException e) {
                LOG.error("Error reading HTML file: {}", path, e);
                return Optional.empty();
            }
        });
    }

    @NonNull
    public Optional<String> getClasspathResourceAsText(@NonNull String path) {
        return getClasspathResource(path).flatMap(url -> {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8))) {
                return Optional.of(IOUtils.readText(reader));
            }
            catch (IOException e) {
                LOG.error("Error reading text from resource: {}", path, e);
                return Optional.empty();
            }
        });
    }
}
```

# Gernerics Map a Map<String, String> to an Object

```java

@Singleton
@ReflectiveAccess
public class GenericServices {

    private static final Logger LOG = LoggerFactory.getLogger(GenericServices.class);

    public <T> T mapToCommandObject(Map<String, String> queryParams, Class<T> clazz) {
        if (queryParams == null) {
            throw new IllegalArgumentException("Query parameters cannot be null");
        }

        BeanIntrospection<T> introspection = BeanIntrospection.getIntrospection(clazz);
        T commandObject = introspection.instantiate();

        queryParams.forEach((key, value) -> {
            BeanProperty<T, Object> property = introspection.getProperty(key).orElseThrow(() -> new IllegalArgumentException("No property found for key: " + key));

            try {
                property.convertAndSet(commandObject, value);
            }
            catch (Exception e) {
                LOG.error("Failed to set property '{}' on command object. Error: {}", key, e.getMessage());
            }
        });

        return commandObject;
    }
}
```