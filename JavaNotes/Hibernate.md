---
title: Hibernate
layout: default
parent: Java
permalink: JavaNotes/Hibernate
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

---

<br/>

# Accessing

- > If you use f`ield-based ` access, your JPA implementation uses `reflection` to read or write your entity attributes directly.
  > It also expects
  > that you place your mapping annotations on your entity attributes.

- > If you use `property-based` access, you need to annotate the getter methods of your entity attributes with the required mapping annotations.  
  > Your `JPA` implementation then calls the getter and setter methods to access your entity attributes.

# Collections

> The persistent collections injected by `Hibernate` behave like `ArrayList`, `HashSet`, `TreeSet`, `HashMap` or `TreeMap`, depending on the interface
> type.

- `java.util.List`
- `java.util.Set`
- `java.util.SortedSet`
- `java.util.Map`
- `java.util.SortedMap`
- `java.util.Collection`

## Mapping to database examples

### [Mapping Annotations](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#annotations)

> types that I have used for mapping json or hashmap to mysql db

- > `VARCHAR(16384) `
  >
  > > must have a max length to survive `MariaDB DDL parser` + `hibernate validator`

- > `LONGTEXT`
- > `json`
- > `longvarchar`
- > `tinyblob`
- > `longblob`

### map to blob

```java
public class MapBlob {
    @ElementCollection
    @Column(columnDefinition = "BLOB NOT NULL")
    @MapKeyColumn(columnDefinition = "BLOB NOT NULL")
    private final Map<String, String> userFiles = new HashMap<>();
}
```

### use collection table

#### with join

```java
public class MapBlob {
    @ElementCollection
    @MapKeyColumn(name = "key")
    @Column(name = "value")
    @CollectionTable(name = "preference", joinColumns = @JoinColumn(name = "user_id"))
    private Map<String, String> preferences;
}
```

#### with more hibernate annotations

```java
public class MapBlob {
    @CollectionOfElements(targetElement = java.lang.String.class)
    @JoinTable(name = "BOOK_CHAPTER", joinColumns = @JoinColumn(name = "BOOK_ID"))
    @MapKey(columns = @Column(name = "CHAPTER_KEY"))
    @Column(name = "CHAPTER")
    private Map<String, String> chapters;

}
```

#### with mapkeycolumn

##### field access

```java
public class MapBlob {
    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "MAP")
    @MapKeyColumn(name = "key")
    @Column(name = "value")
    private Map<String, String> map;
}
```

##### property access

```java
public class MapBlob {
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "TABLENAME")
    @MapKeyColumn(name = "KEY")
    @Column(name = "VALUE")
    public Map<String, String> getMap() {
        return _map;
    }
}
```

### use json type class

> in `build.gradle`

```gradle
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
public class MapBlob {
    @org.hibernate.annotations.Type(
            type = "org.hibernate.type.SerializableToBlobType",
            parameters = {@Parameter(name = "classname", value = "java.util.HashMap")}
    )
    public Map<String, SentimentFrequencyCounts> getModelData() {
        return modelData;
    }
}
```

```java
public class MapBlob {
    @org.hibernate.annotations.Type(type = "org.hibernate.type.SerializableType")
    public Map<String, SentimentFrequencyCounts> getModelData() {
        return modelData;
    }
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

    public void setPreferences(String preferences) {
        this.preferences   = preferences;
        this.preferncesObj = new ObjectMapper().readValue(preferences, Preferences.class);
    }

    public Prefrences getPreferencesObj() {
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
                "country='" + country + ' ' +
                ", city='" + city + ' ' +
                '}';
    }
}
```

# Type Comparison

| Hibernate Type                          | Database Type                          | JDBC Type                                                                                | Type Registry                                                                                                                                                                                                    |
|-----------------------------------------|----------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| org.hibernate.type.StringType           | string                                 | VARCHAR                                                                                  | string, java.lang.String                                                                                                                                                                                         |
| org.hibernate.type.MaterializedClob     | string                                 | CLOB                                                                                     | materialized_clob                                                                                                                                                                                                |
| org.hibernate.type.TextType             | string                                 | LONGVARCHAR                                                                              | text                                                                                                                                                                                                             |
| org.hibernate.type.CharacterType        | char, java.lang.Character              | CHAR                                                                                     | char, java.lang.Character                                                                                                                                                                                        |
| org.hibernate.type.BooleanType          | boolean                                | BIT                                                                                      | boolean, java.lang.Boolean                                                                                                                                                                                       |
| org.hibernate.type.NumericBooleanType   | boolean                                | INTEGER, 0 is false, 1 is true                                                           | numeric_boolean                                                                                                                                                                                                  |
| org.hibernate.type.YesNoType            | boolean                                | CHAR, ‘N’/’n’ is false, ‘Y’/’y’ is true. The uppercase value is written to the database. | yes_no                                                                                                                                                                                                           |
| org.hibernate.type.TrueFalseType        | boolean                                | CHAR, ‘F’/’f’ is false, ‘T’/’t’ is true. The uppercase value is written to the database. | true_false                                                                                                                                                                                                       |
| org.hibernate.type.ByteType             | byte, java.lang.Byte                   | TINYINT                                                                                  | byte, java.lang.Byte                                                                                                                                                                                             |
| org.hibernate.type.ShortType            | short, java.lang.Short                 | SMALLINT                                                                                 | short, java.lang.Short                                                                                                                                                                                           |
| org.hibernate.type.IntegerTypes         | int, java.lang.Integer                 | INTEGER                                                                                  | int, java.lang.Integer                                                                                                                                                                                           |
| org.hibernate.type.LongType             | long, java.lang.Long                   | BIGINT                                                                                   | long, java.lang.Long                                                                                                                                                                                             |
| org.hibernate.type.FloatType            | float, java.lang.Float                 | FLOAT                                                                                    | float, java.lang.Float                                                                                                                                                                                           |
| org.hibernate.type.DoubleType           | double, java.lang.Double               | DOUBLE                                                                                   | double, java.lang.Double                                                                                                                                                                                         |
| org.hibernate.type.BigIntegerType       | java.math.BigInteger                   | NUMERIC                                                                                  | big_integer                                                                                                                                                                                                      |
| org.hibernate.type.BigDecimalType       | java.math.BigDecimal                   | NUMERIC                                                                                  | big_decimal, java.math.bigDecimal                                                                                                                                                                                |
| org.hibernate.type.TimestampType        | java.sql.Timestamp                     | TIMESTAMP                                                                                | timestamp, java.sql.Timestamp                                                                                                                                                                                    |
| org.hibernate.type.TimeType             | java.sql.Time                          | TIME                                                                                     | time, java.sql.Time                                                                                                                                                                                              |
| org.hibernate.type.DateType             | java.sql.Date                          | DATE                                                                                     | date, java.sql.Date                                                                                                                                                                                              |
| org.hibernate.type.CalendarType         | java.util.Calendar                     | TIMESTAMP                                                                                | calendar, java.util.Calendar                                                                                                                                                                                     |
| org.hibernate.type.CalendarDateType     | java.util.Calendar                     | DATE                                                                                     | calendar_date                                                                                                                                                                                                    |
| org.hibernate.type.CurrencyType         | java.util.Currency                     | VARCHAR                                                                                  | currency, java.util.Currency                                                                                                                                                                                     |
| org.hibernate.type.LocaleType           | java.util.Locale                       | VARCHAR                                                                                  | locale, java.utility.locale                                                                                                                                                                                      |
| org.hibernate.type.TimeZoneType         | java.util.TimeZone                     | VARCHAR (Using the TimeZone ID)                                                          | timezone, java.util.TimeZone                                                                                                                                                                                     |
| org.hibernate.type.UrlType              | java.net.URL                           | VARCHAR                                                                                  | url, java.net.URL                                                                                                                                                                                                |
| org.hibernate.type.ClassType            | java.lang.Class                        | VARCHAR (Using the class name)                                                           | class, java.lang.Class                                                                                                                                                                                           |
| org.hibernate.type.BlobType             | java.sql.Blob                          | BLOB                                                                                     | blog, java.sql.Blob                                                                                                                                                                                              |
| org.hibernate.type.ClobType             | java.sql.Clob                          | CLOB                                                                                     | clob, java.sql.Clob                                                                                                                                                                                              |
| org.hibernate.type.BinaryType           | primitive byte[]                       | VARBINARY                                                                                | binary, byte[]                                                                                                                                                                                                   |
| org.hibernate.type.MaterializedBlobType | primitive byte[]                       | BLOB                                                                                     | materized_blob                                                                                                                                                                                                   |
| org.hibernate.type.ImageType            | primitive byte[]                       | LONGVARBINARY                                                                            | image                                                                                                                                                                                                            |
| org.hibernate.type.BinaryType           | java.lang.Byte[]                       | VARBINARY                                                                                | wrapper-binary                                                                                                                                                                                                   |
| org.hibernate.type.CharArrayType        | char[]                                 | VARCHAR                                                                                  | characters, char[]                                                                                                                                                                                               |
| org.hibernate.type.CharacterArrayType   | java.lang.Character[]                  | VARCHAR                                                                                  | wrapper-characters, Character[], java.lang.Character[]                                                                                                                                                           |
| org.hibernate.type.UUIDBinaryType       | java.util.UUID                         | BINARY                                                                                   | uuid-binary, java.util.UUID                                                                                                                                                                                      |
| org.hibernate.type.UUIDCharType         | java.util.UUID                         | CHAR, VARCHAR                                                                            | uuid-char                                                                                                                                                                                                        |
| org.hibernate.type.PostgresUUIDType     | java.util.UUID                         | PostgreSQL UUID                                                                          | pg-uuid                                                                                                                                                                                                          |
| org.hibernate.type.SerializableType     | Implementors of java.lang.Serializable | VARBINARY                                                                                | Unlike the other value types, multiple instances of this type are registered. It is registered once under java.io.Serializable and registered under the specific java.io.Serializable implementation class names |