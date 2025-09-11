---
title: DataBase
permalink: JavaNotes/DataBase
category: JavaNotes
parent: Java
layout: default
has_children: false
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

# Querying

## Entity Manager

### Hibernate

```java
void Query() {
  EntityId entityId = EntityId.of(userId, unitId, typeId);
  Entity entity = Entity.of(entityId);
  entityManager.persist(entity);
  entityManager.flush();
}
```

### Native Query

#### Insert

```java
  void Query() {
  entityManager.createNativeQuery("INSERT INTO UNITS (UNIT_ID, ID_UUID, UNIT_NAME, UNIT_CODE, PARENT_ID) VALUES (?, HEXTORAW(REPLACE(?, '-', '')), ?, ?, ?)")
               .setParameter(1, unitId)
               .setParameter(2, unitUuid.toString())
               .setParameter(3, "Test Unit " + unitId)
               .setParameter(4, "TU" + unitId)
               .setParameter(5, 0)
               .executeUpdate();
  entityManager.flush();
}
```

### Create Query

```java
void Query() {
  Metamodel metamodel = entityManager.getMetamodel();
  EntityType<Entity> entityType = metamodel.entity(Entity.class);

  assertNotNull(entityType, "Entity should be registered in metamodel");
  assertDoesNotThrow(() -> entityManager.createQuery("SELECT COUNT(u) FROM Entity u", Long.class)
                                        .getSingleResult());
}
```

### Spring

#### JDBC Template

```java

@Autowired
private JdbcTemplate jdbcTemplate;


@Test
void testTableExists() {
  String tableName = entityManager.getMetamodel()
                                  .entity(UnitEmailSubscriptionEntity.class)
                                  .getJavaType()
                                  .getAnnotation(Table.class)
                                  .name();

  String sql = "SELECT COUNT(*) FROM USER_TABLES WHERE TABLE_NAME = ?";

  Integer count = jdbcTemplate.queryForObject(sql, Integer.class, tableName.toUpperCase());
  assertTrue(count > 0, "Table " + tableName + " should exist in the database");
}
```

### JPQL

#### Select

```java
 String jpql = "SELECT u FROM Entity u WHERE u.id.unitId = :unitId AND u.id.userId = :userId";
List<Entity> subscriptions = entityManager.createQuery(jpql, Entity.class)
                                          .setParameter("unitId", unitId)
                                          .setParameter("userId", userId)
                                          .getResultList();
```

## DataSource

### Insert

```java
void Query() {
  try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
    statement.execute("INSERT INTO TABLE(UNIT_ID, TYPE_ID, USER_ID) VALUES (5, 1, 123)");
  }
  catch (SQLException e) {
    throw new RuntimeException(e);
  }
}
```

### Select

#### Prepared Statment

```java

void Query() {
  String SELECT_QUERY = "SELECT * TABLE";
  Set<Integer> list1 = new HashSet<>();
  Set<Entity> list2 = new HashSet<>();

  try (Connection connection = dataSource.getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_QUERY); ResultSet resultSet = preparedStatement.executeQuery()) {
    List<Integer> expectedIds = Arrays.stream(TYPE_ENUM.values()).map(TYPE_ENUM::getId).toList();

    while (resultSet.next()) {
      Entity newEntity = Entity.build()
                               .unitId(UnitId.of((long) resultSet.getInt("UNIT_ID")))
                               .type(TYPE_ENUM.getType(resultSet.getInt("TYPE_ID")))
                               .userId(UserId.of((long) resultSet.getInt("USER_ID")))
                               .create();

      list2.add(newEntity);
      list1.add(resultSet.getInt("TYPE_ID"));
    }
  }
}
```

#### Execute Query

```java
void Query() {
  try (Connection connection = dataSource.getConnection()) {
    log.debug("Checking if table exists in the database: {}", connection.getMetaData());

    ResultSet resultSet = connection.createStatement().executeQuery("SELECT TABLE_NAME FROM USER_TABLES WHERE TABLE_NAME = 'UNIT_EMAIL_RPT_RCPTS'");
    boolean tableExists = resultSet.next();
    assertTrue(tableExists, "Table UNIT_EMAIL_RPT_RCPTS should exist in the database");
  }
}
```

# Connection

## PostgreSQL

![postgreSQLConnection.png](assets%2Fimages%2FpostgreSQLConnection.png)

## MySQL

![mySQLConnection.png](assets%2Fimages%2FmySQLConnection.png)

## Oracle

![oracleConnection.png](assets%2Fimages%2ForacleConnection.png)

## Azure

![azureSQLConnection.png](assets%2Fimages%2FazureSQLConnection.png)