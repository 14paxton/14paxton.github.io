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
        datasources.default.schema-generate=UserName
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
        spring.jpa.properties.hibernate.default_schema=UserName
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

  - #### Methods to know
    ```java
    new PostgreSQLContainer(DockerImageName.parse("gvenzl/oracle-free:23.5-slim-faststart"))
            .withNetworkMode("host")
            .withDatabaseName(DB_NAME)
            .withUsername(USERNAME)
            .withPassword(PASSWORD)
            .withCreateContainerCmdModifier(cmd -> cmd.withPrivileged(true))
            .withCreateContainerCmdModifier(cmd -> cmd.withName(CONTAINER_NAME))
            .withStartupTimeout(Duration.ofMinutes(3))
            .withExposedPorts()
            .withCreateContainerCmdModifier(
                    cmd -> {
                      cmd.withHostConfig(cmd.getHostConfig()
                                            .withNetworkMode("host"));
                    });
    ```

- ### Reusable Config File to create TestContainer
  <details><summary>Config Code</summary>
  ```java
                package app.com.config;
            
                import com.blazebit.persistence.Criteria;
                import com.blazebit.persistence.CriteriaBuilderFactory;
                import jakarta.persistence.EntityManagerFactory;
                import lombok.extern.slf4j.Slf4j;
                import org.springframework.context.annotation.Bean;
                import org.springframework.context.annotation.Configuration;
                import org.springframework.jdbc.datasource.DriverManagerDataSource;
                import org.springframework.orm.jpa.JpaTransactionManager;
                import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
                import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
                import org.springframework.test.context.ActiveProfiles;
                import org.springframework.test.context.DynamicPropertyRegistry;
                import org.springframework.test.context.DynamicPropertySource;
                import org.springframework.transaction.PlatformTransactionManager;
                import org.springframework.transaction.annotation.EnableTransactionManagement;
                import org.testcontainers.oracle.OracleContainer;
                import org.testcontainers.utility.DockerImageName;
            
                import javax.sql.DataSource;
                import java.time.Duration;
                import java.util.Properties;
            
                @Slf4j
                @ActiveProfiles("test")
                @Configuration
                @EnableTransactionManagement
                public class TestContainerEntityManagerConfig {
            
                  private static final OracleContainer oracleContainer = new OracleContainer(
                      DockerImageName.parse("gvenzl/oracle-free:23.5-slim-faststart"))
                      .withDatabaseName("UserName")
                      .withUsername("testuser")
                      .withPassword("testpwd")
                      .withExposedPorts(1521)
                      .withStartupTimeout(Duration.ofMinutes(3));
            
                  static {
                    oracleContainer.start();
                  }
            
                  @DynamicPropertySource
                  static void properties(DynamicPropertyRegistry registry) {
                    registry.add("JDBC_URL", oracleContainer::getJdbcUrl);
                    registry.add("USERNAME", oracleContainer::getUsername);
                    registry.add("PASSWORD", oracleContainer::getPassword);
                  }
            
                  @Bean
                  public CriteriaBuilderFactory criteriaBuilderFactory(EntityManagerFactory entityManagerFactory) {
                    return Criteria.getDefault().createCriteriaBuilderFactory(entityManagerFactory);
                  }
            
                  @Bean
                  public DataSource dataSource() {
                    log.info("Creating DataSource for Oracle container at URL: {}", oracleContainer.getJdbcUrl());
                    DriverManagerDataSource dataSource = new DriverManagerDataSource();
                    dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
                    dataSource.setUrl(oracleContainer.getJdbcUrl());
                    dataSource.setUsername(oracleContainer.getUsername());
                    dataSource.setPassword(oracleContainer.getPassword());
                    return dataSource;
                  }
            
                  @Bean(name = "entityManagerFactory")
                  public LocalContainerEntityManagerFactoryBean entityManager() {
                    LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
                    em.setDataSource(dataSource());
                    em.setPackagesToScan("com.package");
                    em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
                    em.setJpaProperties(additionalProperties());
                    return em;
                  }
            
                  @Bean
                  public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
                    return new JpaTransactionManager(entityManagerFactory);
                  }
            
                  private Properties additionalProperties() {
                    Properties properties = new Properties();
                    properties.setProperty("hibernate.hbm2ddl.auto", "update");
                    properties.setProperty("hibernate.dialect", "org.hibernate.dialect.OracleDialect");
                    properties.setProperty("hibernate.show-sql", "true");
                    // properties.setProperty("spring.jpa.defer-datasource-initialization", "true");
                    return properties;
                  }
                }
  ```
</details>

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



### resources/init.sql

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
    INTO products (id, code, name)
VALUES (1, 'P001', 'Product A')
INTO products (id, code, name)
VALUES (2, 'P002', 'Product B')
INTO products (id, code, name)
VALUES (3, 'P003', 'Product C')
SELECT 1
FROM DUAL;
```

### Test

<details><summary>Junit Test</summary>

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
          .withDatabaseName("UserName")
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

      ResultSet resultSet = connection
              .createStatement()
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

      ResultSet resultSet = connection
              .createStatement()
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

#### Can Also Seed in BeforeAll Statement

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

### Seeding Methods

#### init script

```java
static {
  container.withInitScript("test-containers-sql/dev_tctpdb_tables.sql");

}
```

##### after starting seed with delegate

```java
public abstract class OracleTestContainer {

  static {
    TestContainers.localSqlScriptDbContainer.start();
    JdbcDatabaseDelegate delegate = new JdbcDatabaseDelegate(TestContainers.localSqlScriptDbContainer, "");
    ScriptUtils.runInitScript(delegate, "test-containers-sql/dev_tctpdb_tables.sql");
  }

}
```

#### execInContainer either by file or string

   ```java
   static Container.ExecResult exeSqlByFile(String resourceFileName) throws IOException, InterruptedException {
        MountableFile sqlFile = MountableFile.forClasspathResource(resourceFileName);
        String fileName = String.valueOf(Path.of(resourceFileName)
                                             .getFileName());
        
        ISqlScriptDevDbContainer.localSqlScriptDbContainer.copyFileToContainer(sqlFile, "/tmp/" + fileName);
    
        return ISqlScriptDevDbContainer.localSqlScriptDbContainer.execInContainer("sqlplus", "sys / as sysdba", "@/tmp/" + fileName);
      }

    static Container.ExecResult exeSqlByString(String sql) throws IOException, InterruptedException {
        String[] command = {
                    "bash",
                    "-c",
                    "echo \"" + sql + "\" | sqlplus -S ",
                    ISqlScriptDevDbContainer.localSqlScriptDbContainer.getUsername() + "/" + ISqlScriptDevDbContainer.localSqlScriptDbContainer.getPassword(),
                    "@//localhost:1521/" + ISqlScriptDevDbContainer.localSqlScriptDbContainer.getDatabaseName()
                };
    
            return ISqlScriptDevDbContainer.localSqlScriptDbContainer.execInContainer(command);
         }
   ```

#### Mount data with .sql

  ```java

@Test
void assertByMountingFilesInContainer() throws IOException, InterruptedException {
  String dataFileName = "currency-dataset.sql";
  oracleContainer.copyFileToContainer(MountableFile.forClasspathResource(dataFileName), "/" + dataFileName);
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

#### Flyway

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
  System.out.println("Fetched currency is: " + currencies
          .get(0)
          .getCurrency());
  //Thread.sleep(120000);
  assert currencies.size() == 1;
  Assertions.assertEquals("Yen", currencies
          .get(0)
          .getCurrency());
}
  ```

#### SpringBoot Initialize Repository

- > using` @EnableJpaRepositories(basePackageClasses = {Entity.class})` will enable the repository

- > Can use both sql script or entityManager to persist to the db

```java

public void setupData() {
  //** SETUP DATA **//
  try (Connection connection = dataSource.getConnection(); Statement statement = connection.createStatement()) {
    log.info("Setting up UNIT_EMAIL_RPT_RCPTS data...");

    statement.execute("INSERT INTO UNIT_EMAIL_RPT_RCPTS (UNIT_ID, TYPE_ID, USER_ID) VALUES (1, 1, 257)");
    statement.execute("INSERT INTO UNIT_EMAIL_RPT_RCPTS (UNIT_ID, TYPE_ID, USER_ID) VALUES (1, 2, 257)");
    statement.execute("INSERT INTO UNIT_EMAIL_RPT_RCPTS (UNIT_ID, TYPE_ID, USER_ID) VALUES (1, 3, 257)");
    statement.execute("INSERT INTO UNIT_EMAIL_RPT_RCPTS (UNIT_ID, TYPE_ID, USER_ID) VALUES (1, 4, 257)");
    statement.execute("INSERT INTO UNIT_EMAIL_RPT_RCPTS (UNIT_ID, TYPE_ID, USER_ID) VALUES (1, 5, 257)");
  }
  catch (SQLException e) {
    throw new RuntimeException(e);
  }
}
```

```java
public void setupData() {
  var entity1 = Entity.of(EntityId.of(255L, 99L, 1));
  var entity2 = Entity.of(EntityId.of(255L, 99L, 2));
  var entity3 = Entity.of(EntityId.of(255L, 99L, 3));
  entityManager.persist(entity1);
  entityManager.persist(entity2);
  entityManager.persist(entity3);
  entityManager.flush();
}
```

## SpringBoot Test

 <details markdown="block"> 
   <summary>
    SpringBoot
   </summary>



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
              static OracleContainer oracleContainer = new OracleContainer(image)
                      .withStartupTimeout(Duration.ofMinutes(2))
                      .withUsername("testuser")
                      .withPassword(("testpwd"));
            
            
              @DynamicPropertySource
              static void properties(DynamicPropertyRegistry registry) {
                registry.add("JDBC_URL", oracleContainer::getJdbcUrl);
                registry.add("USERNAME", oracleContainer::getUsername);
                registry.add("PASSWORD", oracleContainer::getPassword);
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
        ```


 </details>

# Helper Methods

## TestConfiguration Initializer

```java

@TestConfiguration(proxyBeanMethods = false)
public class TestDemoApplication {

  @Bean
  @ServiceConnection
  MSSQLServerContainer<?> sqlServerContainer() {
    return new MSSQLServerContainer<>(DockerImageName.parse("mcr.microsoft.com/mssql/server:latest"));
  }

  @Bean
  public DataSourceInitializer initializer(DataSource dataSource) {

    DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
    dataSourceInitializer.setDataSource(dataSource);
    // schema.sql and data.sql should be in resources folder under sql folder
    dataSourceInitializer.setDatabasePopulator(new ResourceDatabasePopulator(
            new ClassPathResource("sql/schema.sql")
            , new ClassPathResource("sql/data.sql")));

    return dataSourceInitializer;
  }

  public static void main(String[] args) {
    SpringApplication.from(DemoApplication::main).with(TestDemoApplication.class).run(args);
  }

}
```

## Add Shutdown Hook

```java
static {
  Runtime.getRuntime().addShutdownHook(new Thread(ORACLE_CONTAINER::stop));

}
```

## Annotations

```java

@Testcontainers(disabledWithoutDocker = true)
public class TestThis {

}
```

## Manage State

```java
public class TestContainerState {
  private static final String STATE_FILE = "test-container-state.json";

  @Data
  private static class ContainerState {
    private String containerId;
    private boolean running;
    private LocalDateTime lastUsed;
  }

  public static void saveState() {
    ContainerState state = new ContainerState();
    state.setContainerId(TestContainerConfig.getContainer().getContainerId());
    state.setRunning(TestContainerConfig.getContainer().isRunning());
    state.setLastUsed(LocalDateTime.now());

    try (Writer writer = new FileWriter(STATE_FILE)) {
      new ObjectMapper().writeValue(writer, state);
    }
    catch (IOException e) {
      log.error("Error saving container state", e);
    }
  }

  public static void loadState() {
    try {
      File stateFile = new File(STATE_FILE);
      if (stateFile.exists()) {
        ContainerState state = new ObjectMapper()
                .readValue(stateFile, ContainerState.class);

        if (Duration.between(state.getLastUsed(), LocalDateTime.now())
                    .toHours() > 24) {
          // Container too old, don't restore
          return;
        }

        // Restore container state
        if (state.isRunning()) {
          TestContainerConfig.startContainer();
        }
      }
    }
    catch (IOException e) {
      log.error("Error loading container state", e);
    }
  }
}
```

### Usage

```java

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TestLifecycleExample {

  @BeforeAll
  void setUp() {
    TestContainerConfig.startContainer();
    TestContainerState.loadState();
  }

  @AfterAll
  void tearDown() {
    TestContainerConfig.stopContainer();
    TestContainerState.saveState();
  }
}
```

## Resource Cleanup

```java

@Bean
public ApplicationListener<ContextClosedEvent> containerCleanupListener() {
  return event -> {
    // Cleanup old containers
    DockerClient dockerClient = DockerClientFactory.instance().client();
    List<Container> containers = dockerClient.listContainersCmd()
                                             .withShowAll(true)
                                             .exec();

    containers.stream()
              .filter(c -> c.getNames()[0].startsWith("/test-db-"))
              .filter(c -> c.getStatus().contains("Exited"))
              .forEach(c -> {
                try {
                  dockerClient.removeContainerCmd(c.getId()).exec();
                }
                catch (Exception e) {
                  log.warn("Could not remove container: {}", c.getId());
                }
              });
  };
}
```

# Docker Client

## login

### testcontainers.properties

```properties
# Private Docker registry authentication for Testcontainers
docker.client.strategy=org.testcontainers.dockerclient.EnvironmentAndSystemPropertyClientProviderStrategy
registry.username=myuser
registry.password=mypassword
registry.url=registry.tacticaledge.us
```

### ENV var

```java

@BeforeAll
public static void setUp() {
  // Set environment variables for Docker registry authentication
  System.setProperty("DOCKER_USERNAME", "your-username"); // Replace with your username
  System.setProperty("DOCKER_PASSWORD", "your-password"); // Replace with your password
  System.setProperty("DOCKER_REGISTRY", "your.registry.url"); // Replace with your registry URL
}
```

## Docker Helper Methods

<details><summary>Helper Methods</summary>

```java

@Slf4j
@TestContainer
public class TestContainerConfig {

  private static final String CONTAINER_NAME = "test-db-" + System.currentTimeMillis();

  @Getter
  private static final PostgreSQLContainer<?> container =
          new PostgreSQLContainer<>("postgres:14")
                  .withReuse(true)  // Enable container reuse
                  .withNetworkAliases(CONTAINER_NAME)
                  .withDatabaseName("testdb")
                  .withUsername("test")
                  .withPassword("test");

  static {
    // Start container if not running
    if (!container.isRunning()) {
      container.start();
    }

    // Add shutdown hook for graceful shutdown
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      if (container.isRunning()) {
        log.info("Stopping container without removing...");
        try {
          // Stop container without removing
          DockerClient dockerClient = DockerClientFactory.instance().client();
          dockerClient.stopContainerCmd(container.getContainerId())
                      .withTimeout(10) // seconds
                      .exec();
        }
        catch (Exception e) {
          log.error("Error stopping container: {}", e.getMessage());
        }
      }
    }));
  }

  // Helper method to pause container (without destroying)
  public static void pauseContainer() {
    if (container.isRunning()) {
      try {
        DockerClient dockerClient = DockerClientFactory.instance().client();
        dockerClient.pauseContainerCmd(container.getContainerId()).exec();
        log.info("Container paused: {}", container.getContainerId());
      }
      catch (Exception e) {
        log.error("Error pausing container: {}", e.getMessage());
      }
    }
  }

  // Helper method to resume container
  public static void resumeContainer() {
    try {
      DockerClient dockerClient = DockerClientFactory.instance().client();
      dockerClient.unpauseContainerCmd(container.getContainerId()).exec();
      log.info("Container resumed: {}", container.getContainerId());
    }
    catch (Exception e) {
      log.error("Error resuming container: {}", e.getMessage());
    }
  }

  // Helper method to stop container without destroying
  public static void stopContainer() {
    if (container.isRunning()) {
      try {
        DockerClient dockerClient = DockerClientFactory.instance().client();
        dockerClient.stopContainerCmd(container.getContainerId())
                    .withTimeout(10) // seconds
                    .exec();
        log.info("Container stopped: {}", container.getContainerId());
      }
      catch (Exception e) {
        log.error("Error stopping container: {}", e.getMessage());
      }
    }
  }

  // Helper method to start existing container
  public static void startContainer() {
    if (!container.isRunning()) {
      try {
        DockerClient dockerClient = DockerClientFactory.instance().client();
        dockerClient.startContainerCmd(container.getContainerId()).exec();
        log.info("Container started: {}", container.getContainerId());
      }
      catch (Exception e) {
        log.error("Error starting container: {}", e.getMessage());
      }
    }
  }
}
```

</details>

## Image PreLoad

```java
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Image;
import org.testcontainers.DockerClientFactory;

import java.util.List;

public class ImagePreLoader {

  public static void preload(String repository, String tag) {
    DockerClient dockerClient = DockerClientFactory.instance().client();

    if (!isImagePresent(dockerClient, repository + ":" + tag)) {
      try {
        dockerClient.pullImageCmd(repository)
                    .withTag(tag)
                    .exec(new PullImageResultCallback()) // non-deprecated
                    .awaitCompletion();
      }
      catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        throw new RuntimeException(e);
      }
    }
  }

  private static boolean isImagePresent(DockerClient dockerClient, String fullImageName) {
    List<Image> images = dockerClient.listImagesCmd().exec();
    return images.stream()
                 .flatMap(img -> img.getRepoTags() != null ?
                                 List.of(img.getRepoTags()).stream() :
                                 List.<String>of().stream())
                 .anyMatch(fullImageName::equals);
  }
}

```

## Pull Image Check

```java
    public static OracleContainer createOracleContainer() {
  DockerClient client = DockerClientFactory.instance().client();
  String preferredImage = "gvenzl/oracle-free:23-slim-arm64";
  String fallbackImage = "gvenzl/oracle-free:23-slim";

  try {
    log.info("Trying to pull preferred image: {}", preferredImage);
    client.pullImageCmd(preferredImage)
          .exec(new PullImageResultCallback())
          .awaitCompletion();

    log.info("Successfully pulled {}", preferredImage);
    return new OracleContainer(preferredImage)
            .withDatabaseName("DBNAME")
            .withUsername("tcptdba")
            .withPassword("secret")
            .withStartupTimeout(Duration.ofMinutes(5));
  }
  catch (Exception e) {
    log.warn("Failed to pull preferred image {}, falling back to {}", preferredImage, fallbackImage, e);

    return new OracleContainer(fallbackImage)
            .withDatabaseName("DBNAME")
            .withUsername("tcptdba")
            .withPassword("secret")
            .withStartupTimeout(Duration.ofMinutes(5));
  }
}
```

# Class File

<details><summary>Self Contained Container Class</summary>

```java
package com.config.TestContainers;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import lombok.extern.slf4j.Slf4j;
import org.testcontainers.DockerClientFactory;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.oracle.OracleContainer;
import org.testcontainers.utility.DockerImageName;
import org.testcontainers.utility.TestcontainersConfiguration;

import java.time.Duration;
import java.util.List;

@Slf4j
public class DevelopmentDatabaseContainer extends OracleContainer {
  private static final String LOCAL_CONTAINER_NAME = "oracle-test-db-local-sql";
  private static DevelopmentDatabaseContainer CONTAINER;
  private static final DockerImageName BASE_IMAGE = DockerImageName.parse("gvenzl/oracle-free");

  private static final boolean existing = DockerClientFactory.instance().client()
                                                             .listContainersCmd()
                                                             .withNameFilter(List.of(LOCAL_CONTAINER_NAME))
                                                             .exec()
                                                             .stream()
                                                             .anyMatch(container -> container.getNames()[0].contains(LOCAL_CONTAINER_NAME));

  // Declare your private image as a compatible substitute for gvenzl/oracle-free
  private static final DockerImageName TACTICAL_ARM = DockerImageName
          .parse("private.registry/image")
          .withTag("tag")
          .asCompatibleSubstituteFor(BASE_IMAGE);

  private DevelopmentDatabaseContainer() {
    super(BASE_IMAGE);
    //    super(TACTICAL_ARM);
  }

  public static DevelopmentDatabaseContainer getInstance() {
    if (CONTAINER == null) {
      CONTAINER = (DevelopmentDatabaseContainer) new DevelopmentDatabaseContainer().withDatabaseName("DBNAME")
                                                                                   .withUsername("UserName")
                                                                                   .withPassword("password")
                                                                                   .withCreateContainerCmdModifier(cmd -> cmd.withName(LOCAL_CONTAINER_NAME))
                                                                                   .withCreateContainerCmdModifier(cmd -> cmd.withName("oracle-test-db"))
                                                                                   .withReuse(TestcontainersConfiguration.getInstance().environmentSupportsReuse())
                                                                                   .waitingFor(Wait.forLogMessage(".*DATABASE IS READY TO USE!.*\\n", 1))
                                                                                   .withStartupTimeout(Duration.ofMinutes(30));

      if (!existing) {
        CONTAINER.withInitScript("script_in_resource_folder.sql");
      }

    }

    CONTAINER.withLogConsumer(new Slf4jLogConsumer(log));
    return CONTAINER;
  }

  @Override
  public void start() {
    try {
      super.start();
      System.setProperty("DB_URL", CONTAINER.getJdbcUrl());
      System.setProperty("DB_USERNAME", CONTAINER.getUsername());
      System.setProperty("DB_PASSWORD", CONTAINER.getPassword());
    }
    catch (Throwable e) {
      log.error("Failed to initialize DevelopmentDatabaseContainer", e);
      destroyContainer();
      throw new RuntimeException(e);
    }
  }

  private void destroyContainer() {
    try {
      DockerClient dockerClient = DockerClientFactory.instance().client();
      Container container = dockerClient.listContainersCmd()
                                        .withNameFilter(List.of(LOCAL_CONTAINER_NAME))
                                        .exec().getFirst();

      dockerClient.removeContainerCmd(container.getId())
                  .withForce(true)
                  .exec();
    }
    catch (Exception exception) {
      log.error("Error Removing Testcontainer", exception);
    }
  }

  @Override
  public void stop() {
    // do nothing, JVM handles shut down
  }
}
```
</details>


