---
title:        Serialization
permalink:    SpringNotes/Serialization
category:     SpringNotes
parent:       SpringNotes
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

# MixIn

> In that case we need to use MixIn feature. Create interface like below:

   ```java
    interface WrapperModelMixIn {

    @JsonSerialize(using = PropertyListJSONSerializer.class)
    List<Property> getProperties();
}
   ```

> and register it like below:

   ```java
        public class Mapp {
    ObjectMapper mapper = new ObjectMapper();
        mapper.addMixInAnnotations(WrapperModel .class,WrapperModelMixIn .class);
}
   ```

# Register For Generic Type

  ```java
    class PropertyListJSONSerializer extends StdSerializer<List<Property>> {

    public PropertyListJSONSerializer(JavaType type) {
        super(type);
    }

    @Override
    public void serialize(List<Property> value, JsonGenerator gen, SerializerProvider provider)
            throws IOException {
        gen.writeStartObject();
        for (Property p : value) {
            gen.writeStringField(p.getName(), p.getValue());
        }
        gen.writeEndObject();
    }
}
  ```

- > ## Use Case

  ```java
     ObjectMapper mapper = new ObjectMapper();
      CollectionType propertiesListType = mapper.getTypeFactory().constructCollectionType(List.class, Property.class);
      SimpleModule module = new SimpleModule();
      module.addSerializer(new PropertyListJSONSerializer(propertiesListType));
      mapper.registerModule(module);
  ```

# List Serializer

 ```java
public class CollectionTypeJsonSerializer extends SimpleSerializers {
    @Override
    public JsonSerializer<?> findCollectionSerializer(SerializationConfig config,
                                                      CollectionType type,
                                                      BeanDescription beanDesc,
                                                      TypeSerializer elementTypeSerializer,
                                                      JsonSerializer<Object> elementValueSerializer) {
        //if the collection is of type LanguageString, then use custom collection serializer
        if (isLanguageStringListType(type)) {
            return new LanguageStringListSerializer();
        }
        return findSerializer(config, type, beanDesc);
    }

    private boolean isLanguageStringListType(CollectionType type) {
        CollectionType languageStringArrayListType = TypeFactory.defaultInstance()
                                                                .constructCollectionType(ArrayList.class, LanguageString.class);

        CollectionType languageStringListType = TypeFactory.defaultInstance()
                                                           .constructCollectionType(List.class, LanguageString.class);

        return (type.equals(languageStringListType) || type.equals(languageStringArrayListType));
    }
}
```

- > ## Register Serializer

     ```java
        @Configuration
        public class JacksonConfig {
          @Bean
          public ObjectMapper jsonObjectMapper() {
            ArrayList<Module> modules = new ArrayList<>();
        
            //CollectionType Serialization
            SimpleModule collectionTypeSerializerModule = new SimpleModule();
            collectionTypeSerializerModule.setSerializers(new CollectionTypeJsonSerializer());
            modules.add(collectionTypeSerializerModule);
        
            return Jackson2ObjectMapperBuilder.json()
                                              .modules(modules)
                                              .build();
          }
        }
     ```

# Domain Serializer

```java
public class MyCustomModule extends SimpleModule {

    @Override
    public void setupModule(SetupContext context) {

        SimpleSerializers serializers = new SimpleSerializers();
        SimpleDeserializers deserializers = new SimpleDeserializers();

        serializers.addSerializer(MyEntity.class, new MyEntitySerializer());
        deserializers.addDeserializer(MyEntity.class, new MyEntityDeserializer());

        context.addSerializers(serializers);
        context.addDeserializers(deserializers);
    }
}
```