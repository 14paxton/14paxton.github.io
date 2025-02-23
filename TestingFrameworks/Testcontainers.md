---
title:        Testcontainers
permalink:    TestingFrameworks/Testcontainers
category:     TestingFrameworks
parent:       TestingFrameworks
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

# JUnit

## Config

- ### pom.xml

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

    - ### application.properties

      ```properties
        #tag::datasource[]
        jpa.default.properties.hibernate.hbm2ddl.auto=none
        jpa.default.properties.hibernate.dialect=org.hibernate.dialect.Oracle12cDialect
        datasources.default.schema-generate=TCPTDBA
        datasources.default.db-type=oracle
        datasources.default.driver-class-name=oracle.jdbc.OracleDriver
        datasources.default.url=${JDBC_URL}
        datasources.default.username=${USERNAME}
        datasources.default.password=${PASSWORD}
        spring.datasource.username=${USERNAME}
        spring.datasource.password=${PASSWORD}
        spring.datasource.url=${JDBC_URL}
        spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
        spring.datasource.type=oracle.ucp.jdbc.PoolDataSourceImpl
        spring.datasource.oracleucp.initial-pool-size=1
        spring.datasource.oracleucp.min-pool-size=1
        spring.datasource.oracleucp.max-pool-size=30
        spring.datasource.oracleucp.connection-pool-name=OracleDatabaseTest
        spring.datasource.oracleucp.connection-factory-class-name=oracle.jdbc.pool.OracleDataSource
        spring.jpa.properties.hibernate.default_schema=TCPTDBA
        #end::datasource[]
      ```

        - ### Create Instance of Testcontainer

          ```java
                    @Testcontainers
            @SpringBootTest
            class CurrencyExchangeServiceApplicationTests {
            
                @Container
                static OracleContainer oracleContainer = new OracleContainer("gvenzl/oracle-xe:21-slim-faststart");
          
            }
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

  <details markdown="block"> 
  <summary>
   Seeding Example
  </summary>

{%raw%}

- ### resources/init.sql

    ```sql
      CREATE TABLE products
        (
        id   int          not null,
        code varchar(255) not null,
        name varchar(255) not null,
        primary key (id),
        unique (code)
        );
  
      INSERT ALL
        INTO products (id, code, name) VALUES (1, 'P001', 'Product A')
        INTO products (id, code, name) VALUES (2, 'P002', 'Product B')
        INTO products (id, code, name) VALUES (3, 'P003', 'Product C')
      SELECT 1 FROM DUAL;
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

{%endraw%}

- #### Can Also Seed in BeforeAll Statement

   ```java

        @BeforeAll
        public static void setUp() throws Exception {
            oracleContainer.start();
            // Load the init.sql script from the classpath. Any file may be used.
            MountableFile sqlFile = MountableFile.forClasspathResource("init.sql");
            oracleContainer.copyFileToContainer(sqlFile, "/tmp/init.sql");
            // Run the init.sql script as sysdba on the database container.
            oracleContainer.execInContainer("sqlplus", "sys / as sysdba", "@/tmp/init.sql");
        }
   ```

</details>

- ### Seeding Methods
    - execInContainer

       ```java
         @BeforeAll
         static void setUp() throws IOException, InterruptedException {
            String[] command = {"bash", "-c",
                    "echo \"create table currency ( currency_numeric_code number primary key, currency varchar2(255) null, currency_alpha_code varchar2(255) null); " +
                            "\" | sqlplus -S " + oracleContainer.getUsername() + "/" +
                            oracleContainer.getPassword() + "@//localhost:1521/" + oracleContainer.getDatabaseName()
            };
            ExecResult execResult = oracleContainer.execInContainer(command);
            System.out.println("execResult is : " + execResult.getStdout());
            System.out.println("execResult error is : " + execResult.getStderr());
            System.out.println("execResult exit code is : " + execResult.getExitCode());
         }
       ```
        - Mount data with .sql

          ```java
              @Test
              void assertByMountingFilesInContainer() throws IOException, InterruptedException {
              String dataFileName = "currency-dataset.sql";
              oracleContainer.copyFileToContainer(MountableFile.forClasspathResource(dataFileName),"/" + dataFileName);
              String[] command = {"sqlplus", "-s", oracleContainer.getUsername() +
              "/" + oracleContainer.getPassword() + "@//localhost:1521/" + oracleContainer.getDatabaseName(),
              "@/" + dataFileName
              };
          
              ExecResult execResult = oracleContainer.execInContainer(command);
              System.out.println("execResult is : " + execResult.getStdout());
              System.out.println("execResult error is : " + execResult.getStderr());
              System.out.println("execResult exit code is : " + execResult.getExitCode());
          
              // Assert the data load action
              List<Integer> currencyList = new ArrayList<>();
              currencyList.add(554);
              List<Currency> currencies = currencyRepository.findAllById(currencyList);
              System.out.println("Number of currencies found: " + currencies.size());
              System.out.println("Fetched currency is : " + currencies.get(0).getCurrency());
          
              //Thread.sleep(120000);
              assert currencies.size() == 1;
              Assertions.assertEquals("New Zealand Dollar", currencies.get(0).getCurrency());
              }
          ```

        - Flyway

            ```yaml
            spring:
              datasource:
                url: jdbc:tc:postgresql:9.6.8:///test_database
                username: user
                password: password
              jpa:
                hibernate:
                  ddl-auto: create
              flyway:
                enabled: false
           ```

          ```xml
            <dependency>
              <groupId>org.flywaydb</groupId>
              <artifactId>flyway-core</artifactId>
            </dependency>
          ```  

            ```java
              @Test
              void assertFlywayDataInitialization() {
              // Assert the data load action
              List<Integer> currencyList = new ArrayList<>();
              currencyList.add(392);
              List<Currency> currencies = currencyRepository.findAllById(currencyList);
              System.out.println("Number of currencies found: " + currencies.size());
              System.out.println("Fetched currency is : " + currencies.get(0).getCurrency());
              //Thread.sleep(120000);
              assert currencies.size() == 1;
              Assertions.assertEquals("Yen", currencies.get(0).getCurrency());
              }
            ```

## SpringBoot Test

 <details markdown="block"> 
   <summary>
    SpringBoot
   </summary>

{%raw%}

- ### application.yml

    ```yaml
    # application.yaml
    spring:
      datasource:
        username: ${USERNAME}
        password: ${PASSWORD}
        url: ${JDBC_URL}
        driver-class-name: oracle.jdbc.OracleDriver
        type: oracle.ucp.jdbc.PoolDataSourceImpl
        oracleucp:
          initial-pool-size: 1
          min-pool-size: 1
          max-pool-size: 30
          connection-pool-name: OracleDatabaseTest
          connection-factory-class-name: oracle.jdbc.pool.OracleDataSource
    ```

    - ### Test

        ```java
            import javax.sql.DataSource;
            import java.sql.Connection;
            import java.sql.SQLException;
            import java.sql.Statement;
            import java.time.Duration;
          
            import org.junit.jupiter.api.Test;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.boot.test.context.SpringBootTest;
            import org.springframework.test.context.DynamicPropertyRegistry;
            import org.springframework.test.context.DynamicPropertySource;
            import org.testcontainers.junit.jupiter.Container;
            import org.testcontainers.junit.jupiter.Testcontainers;
            import org.testcontainers.oracle.OracleContainer;
          
            @SpringBootTest
            @Testcontainers
            public class OracleDatabaseTest {
              static String image = "gvenzl/oracle-free:23.5-slim-faststart";
          
          @Container
          static OracleContainer oracleContainer = new OracleContainer(DockerImageName.parse("gvenzl/oracle-free:23.5-slim-faststart"))
              .withDatabaseName("DataBase")
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
          
              @Autowired
              DataSource dataSource;
          
              @Test
              void getConnection() throws SQLException {
                try (
                        Connection conn = dataSource.getConnection();
                        Statement stmt = conn.createStatement()
                ) {
                  stmt.executeQuery("select * from v$version");
                }
              }
            }
        
            @Test
          void getConnection() throws SQLException {
            try (Connection connection = DriverManager.getConnection(
                oracleContainer.getJdbcUrl(),
                oracleContainer.getUsername(),
                oracleContainer.getPassword())) {
      
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
        ```

{%endraw%}

 </details>