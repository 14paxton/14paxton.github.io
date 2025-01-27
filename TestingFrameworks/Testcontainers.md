---
title: Testcontainers
permalink: TestingFrameworks/Testcontainers
category: TestingFrameworks
parent: TestingFrameworks
layout: default
has_children: false
share: true
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

# JUnit

## pom.xml

```xml

<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.11.4</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>1.20.4</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>testcontainers</artifactId>
        <version>1.20.4</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>oracle-free</artifactId>
        <version>1.20.4</version>
        <scope>test</scope>
    </dependency>
</dependencies>

```

## Test Container Build

```java
import oracle.ucp.jdbc.PoolDataSource;
import oracle.ucp.jdbc.PoolDataSourceFactory;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.oracle.OracleContainer;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;

@Testcontainers
public class OracleDatabaseContainerTest {
    static String image = "gvenzl/oracle-free:23.5-slim-faststart";

    @Container
    static OracleContainer oracleContainer = new OracleContainer(image)
            .withStartupTimeout(Duration.ofMinutes(3))
            .withUsername("testuser")
            .withPassword(("testpwd"));

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("JDBC_URL", oracleContainer::getJdbcUrl);
        registry.add("USERNAME", oracleContainer::getUsername);
        registry.add("PASSWORD", oracleContainer::getPassword);
    }

    @Test
    void getConnection() throws SQLException {
        PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource();
        pds.setUser(oracleContainer.getUsername());
        pds.setPassword(oracleContainer.getPassword());
        pds.setURL(oracleContainer.getJdbcUrl());
        pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
        pds.setConnectionPoolName("OracleDatabaseTest");

        try (
                Connection conn = pds.getConnection();
                Statement stmt = conn.createStatement()
        ) {
            stmt.executeQuery("select * from v$version");
        }
    }
}
```

## Test Seeding Data and Table

- ### SQL

{%raw%}

  <details markdown="block"> 
  <summary>
  Seeding Example
  </summary>

```oracle
CREATE TABLE products
(
    id   int          not null,
    code varchar(255) not null,
    name varchar(255) not null,
    primary key (id),
    unique (code)
);

INSERT ALL
    INTO products (id, code, name)
VALUES (1, 'P001', 'Product A')
INTO products (id, code, name)
VALUES (2, 'P002', 'Product B')
INTO products (id, code, name)
VALUES (3, 'P003', 'Product C')
SELECT 1
FROM DUAL;
```

- ### Test

```java
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.oracle.OracleContainer;
import org.testcontainers.utility.DockerImageName;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Duration;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Slf4j
@Testcontainers
@ActiveProfiles("test-containers")
public class SeedDatabaseContainerTest {

    @Container
    static OracleContainer oracleContainer = new OracleContainer(DockerImageName.parse("gvenzl/oracle-free:23.5-slim-faststart"))
            .withDatabaseName("TCPTDBA")
            .withInitScript("sql/init.sql")
            .withUsername("testuser")
            .withPassword(("testpwd"))
            .withExposedPorts(1521)
            .withStartupTimeout(Duration.ofMinutes(3));


    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("JDBC_URL", oracleContainer::getJdbcUrl);
        registry.add("USERNAME", oracleContainer::getUsername);
        registry.add("PASSWORD", oracleContainer::getPassword);
    }

    @BeforeAll
    public static void setUp() throws Exception {
        oracleContainer.start();
    }

    @AfterAll
    public static void tearDown() {
        if (oracleContainer != null) {
            oracleContainer.stop();
        }
    }

    @Test
    void testThatDBTableExists() throws SQLException {
        try (Connection connection = DriverManager.getConnection(oracleContainer.getJdbcUrl(), oracleContainer.getUsername(), oracleContainer.getPassword())) {

            ResultSet resultSet = connection.createStatement()
                                            .executeQuery("SELECT table_name FROM user_tables where table_name like '%PRODUCTS%'");
            var tableExists = resultSet.next();
            assertTrue(tableExists, "Table PERSONNEL should exist in the database");
        }
    }


    @Test
    void testThatDataIsInTable() throws SQLException {
        try (Connection connection = DriverManager.getConnection(oracleContainer.getJdbcUrl(), oracleContainer.getUsername(), oracleContainer.getPassword())) {
            List<Long> expectedIds = Arrays.asList(1L, 2L, 3L);
            List<String> expectedNames = Arrays.asList("Product A", "Product B", "Product C");
            HashMap<Long, String> productMap = new HashMap<>();

            ResultSet resultSet = connection.createStatement()
                                            .executeQuery("SELECT * FROM PRODUCTS");

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");

                productMap.put(Long.valueOf(id), name);
            }

            assertTrue(productMap.size() > 0, "No products were found in the database");
            assertThat(productMap.keySet()).containsAll(expectedIds);
            assertThat(productMap.values()).containsAll(expectedNames);
        }
    }
}
```

</details>

{%endraw%}