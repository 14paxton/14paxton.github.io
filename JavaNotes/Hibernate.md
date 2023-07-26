---
title:     Hibernate
layout:    default
parent:    Java
permalink: JavaNotes/Hibernate
category:  JavaNotes
share:     true
shortRepo:
  - java
  - default  
---

# Hibernate

## Accessing

```
- If you use field-based access, your JPA implementation uses reflection to read or write your entity attributes directly. It also expects 
   that you place your mapping annotations on your entity attributes.

- If you use property-based access, you need to annotate the getter methods of your entity attributes with the required mapping annotations. 
    Your JPA implementation then calls the getter and setter methods to access your entity attributes.
```

## Collections

> The persistent collections injected by Hibernate behave like ArrayList, HashSet, TreeSet, HashMap or TreeMap, depending on the interface type.

- java.util.List
- java.util.Set
- java.util.SortedSet
- java.util.Map
- java.util.SortedMap
- java.util.Collection

### Mapping to database examples

## [Mapping Annotations](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#annotations)

> types that I have used for mapping json or hashmap to mysql db

- LONGTEXT
- json
- longvarchar
-
    - use VARCHAR(16384) <-- must have a max length to survive MariaDB DDL parser + hibernate validator.
- tinyblob
- longblob

#### map to blob

```java
@ElementCollection
@Column(columnDefinition = "BLOB NOT NULL")
@MapKeyColumn(columnDefinition = "BLOB NOT NULL")
private Map<String, String> userFiles=new HashMap<>();
```

### use collection table

#### with join

```java
 @ElementCollection
@MapKeyColumn(name = "key")
@Column(name = "value")
@CollectionTable(name = "preference",
        joinColumns = @JoinColumn(name = "user_id"))
private Map<String, String> preferences;
```

#### with more hibernate annotations

```java
@CollectionOfElements(targetElement = java.lang.String.class)
@JoinTable(name = "BOOK_CHAPTER",
        joinColumns = @JoinColumn(name = "BOOK_ID"))
@MapKey(columns = @Column(name = "CHAPTER_KEY"))
@Column(name = "CHAPTER")
private Map<String, String> chapters;
```

#### with mapkeycolumn

##### field access

 ```java
@ElementCollection(targetClass = String.class)
@CollectionTable(name = "MAP")
@MapKeyColumn(name = "key")
@Column(name = "value")
private Map<String, String> map;
```

##### property access

```java
@ElementCollection(fetch = FetchType.EAGER)
@CollectionTable(name = "TABLENAME")
@MapKeyColumn(name = "KEY")
@Column(name = "VALUE")
public Map<String, String> getMap(){
        return _map;
        }
```

### use json type class

> in build.gradle

```groovy
implementation("com.vladmihalcea:hibernate-types-52:2.21.1")
```

```java

@TypeDefs({
        @org.hibernate.annotations.TypeDef(name = "JSON", typeClass = JsonBlobType.class),
        @org.hibernate.annotations.TypeDef(name = "JSONB", typeClass = JsonBinaryType.class)
})
public class Entity {
    @Type(type = "json")
    @Column(columnDefinition = "jsonb")
    private String preferences;
}
```

### use hibernate types to map as blob and serializable

```java
@org.hibernate.annotations.Type(
        type = "org.hibernate.type.SerializableToBlobType",
        parameters = {@Parameter(name = "classname", value = "java.util.HashMap")}
)
public Map<String, SentimentFrequencyCounts> getModelData(){
        return modelData;
        }
```

```java
@org.hibernate.annotations.Type(type = "org.hibernate.type.SerializableType")
public Map<String, SentimentFrequencyCounts> getModelData(){
        return modelData;
        }
```

### save as string , map to map

```java
public class User extends AbstractEntity {
    @JsonIgnore //This variable is going to be ignored whenever you send data to a client(ie. web browser)
    private String preferences;

    @Transient //This property is going to be ignored whenever you send data to the database
    @JsonProperty("preferences") //Whenever this property is serialized to the client, it is going to be named "perferences" instead "preferencesObj"
    private Preferences preferencesObj;

    public String getPreferences() {
        return new ObjectMapper().writeValueAsString(preferencesObj);
    }

    pbulic

    void setPreferneces(String preferences) {
        this.preferences = preferences;
        this.preferncesObj = new ObjectMapper().readValue(preferences, Preferences.class);
    }

    pubilc Preferences

    getPreferencesObj() {
        return preferencesObj;
    }

    public void setPreferencesObj(Preferences preferencesObj) {
        this.preferencesObj = preferencesObj;
    }
}
```

### use custom map

```java
public class Location implements Serializable {

    private String country;

    private String city;

    //Getters and setters omitted for brevity

    @Override
    public String toString() {
        return "Location{" +
                "country='" + country + '' ' +
        ", city='" + city + '' ' +
        '}';
    }
}
```