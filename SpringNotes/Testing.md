---
title:        Testing
permalink:    SpringNotes/Testing
category:     SpringNotes
parent:       SpringNotes
layout:       default
has_children: false
share:        true
shortRepo:
  - springnotes
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

# JUnit

## Mock

### Mock Static Method

  ```java
    MockedStatic<QueryUtils> queryUtilsMockedStatic = mockStatic(QueryUtils.class);
    queryUtilsMockedStatic.

when(() ->QueryUtils.

createQuery(entityManager)).

thenReturn(new BlazeJPAQuery<>(entityManager, criteriaBuilderFactory));
  ```

## Annotations

### Apache Camel

```xml

<dependency>
    <groupId>org.apache.camel</groupId>
    <artifactId>camel-test-spring-junit5</artifactId>
    <version>4.9.0</version>
    <scope>test</scope>
</dependency>
```

```java
@CamelSpringBootTest
@ContextConfiguration
@MockEndpointsAndSkip
@EnableAutoConfiguration
@ExcludeRoutes
@DirtiesContext
@DisableJmx
```

### Spring

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = Application.class)
@ContextConfiguration(
        classes = {PersonnelConfig.class},
        loader = AnnotationConfigContextLoader.class)
@AutoConfigureMockMvc
@DataJpaTest
@RunWith(SpringJUnit4ClassRunner.class)
@RunWith(SpringRunner.class)
@RunWith(MockitoJUnitRunner.class)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {PersonnelConfig.class}, loader = AnnotationConfigContextLoader.class)
@ActiveProfiles("test")
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestPropertySource("classpath:/persistence-personnel.properties")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({FindBulkPersonnelAvailabilityManagerHandler.class})
@DirtiesContext
```

## Set Up In Memory DB

### POM

```xml
    <!-- H2 Database -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

### .property Files

- > /test/resources
   ```properties
     jdbc.driverClassName=org.h2.Driver
     jdbc.url=jdbc:h2:mem:testDB;DB_CLOSE_DELAY=-1;NON_KEYWORDS=KEY,VALUE
     hibernate.dialect=org.hibernate.dialect.H2Dialect
     hibernate.hbm2ddl.auto=create
     spring.jpa.defer-datasource-initialization=true
    ```

- > /main/resources
    ```properties
      dbc.driverClassName=com.mysql.jdbc.Driver
      jdbc.url=jdbc:mysql://localhost:3306/testDB
      jdbc.user=sa
      jdbc.pass=
      hibernate.dialect=org.hibernate.dialect.MySQLDialect
      hibernate.hbm2ddl.auto=create-drop
      spring.jpa.defer-datasource-initialization=true
   ```

### Config File

```java
package com.persistence;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages = "persistence package")
@ActiveProfiles("test")
@EnableTransactionManagement
public class PersonnelConfig {

    @Autowired
    private Environment env;

    @Bean
    public FlywayMigrationStrategy flywayMigrationStrategy() {
        return flyway -> {
        }; // Do nothing
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        dataSource.setUrl("jdbc:h2:mem:testDB;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=false;DATABASE_TO_UPPER=false;INIT=CREATE SCHEMA IF NOT EXISTS SCHEMA;");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }

    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("persistence entities");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        em.setJpaProperties(additionalProperties());

        return em;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);

        return transactionManager;
    }

    //  @Bean
    //  public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
    //    return new PersistenceExceptionTranslationPostProcessor();
    //  }

    Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto", "create-drop");
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.H2Dialect");
        properties.setProperty("hibernate.show-sql", "true");
        properties.setProperty("spring.jpa.defer-datasource-initialization", "true");

        return properties;
    }
}
```