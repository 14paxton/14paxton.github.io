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

- ### Mock Static Method
   ```java
        import org.junit.Test;
        
        public class TestSomething {
            @Test
            public void testDoIndex() throws Exception {
                MockedStatic<QueryUtils> queryUtilsMockedStatic = mockStatic(QueryUtils.class);
                queryUtilsMockedStatic.when(() -> QueryUtils.createQuery(entityManager))
                                      .thenReturn(new BlazeJPAQuery<>(entityManager, criteriaBuilderFactory));
            }
        }
   ```

- ### Mock Service Method
  ```java
   import org.junit.Test;
        
        public class TestSomething {
  
            @MockitoBean
             MyService myService;
  
            @Test
            public void testDoIndex() throws Exception {
                when(myService.findUnitUuid(mockLong)).thenReturn(Optional.of(id));
            }
        }
   ```

- ### Mock Session
  ```java
    MockHttpSession mockSession = new MockHttpSession();
  ```

## Context

- ### ApplicationContext
    - > #### Use Constructor and ApplicationContext to set MockMVC
         ```java
            @Autowired
            public PersonnelUnitBulkAvailabilityManagerControllerTest(ApplicationContext applicationContext) {
              myService = applicationContext.getBean(MyService.class);
              mockMvc = MockMvcBuilders.standaloneSetup(new MyController()).build();
            }
         ```

- ### WebApplicationContext
    - > #### Use Constructor and WebApplicationContext to set MockMVC
         ```java
          @Autowired
          public PersonnelUnitBulkAvailabilityManagerControllerTest(ApplicationContext applicationContext) {
            myService = applicationContext.getBean(MyService.class);
             mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
          }
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
@ActiveProfiles("test")

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = Application.class)

@WebMvcTest(controllers = MyController.class)
@AutoConfigureMockMvc

@WebAppConfiguration
@ContextConfiguration(
        classes = {PersonnelConfig.class},
        loader = AnnotationConfigContextLoader.class)
@ContextConfiguration(classes = {PersonnelConfig.class}, loader = AnnotationConfigContextLoader.class)
@ContextConfiguration(classes = {InMemoryDBConfig.class}, loader = AnnotationConfigWebContextLoader.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)

@AutoConfigureMockMvc
@DataJpaTest

@RunWith(SpringJUnit4ClassRunner.class)
@RunWith(SpringRunner.class)
@RunWith(MockitoJUnitRunner.class)
@ExtendWith(SpringExtension.class)

@TestPropertySource("classpath:/persistence-personnel.properties")

@Transactional
@DirtiesContext

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Import({FindBulkPersonnelAvailabilityManagerHandler.class})
@ComponentScan(basePackages = "com.my.package")
```

## Session

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
- > ### Use Annotation Properties For @SpringBootTest
    - > #### Annotation
         ```java
            @SpringBootTest(properties = {
              "spring.datasource.url=jdbc:h2:mem:testdb",
              "spring.datasource.driver-class-name=org.h2.Driver",
              "spring.datasource.username=sa",
              "spring.datasource.password="
              })
             public class MyTest{}
         ```

- > ### Use Config File
    -  > #### Config File

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

## Security Config

- ### Spring Security
    - > #### Test Security Config file
        ```java
             package mil.usmc.mls2.tcpt.config;
             
             import org.springframework.context.annotation.Bean;
             import org.springframework.context.annotation.Configuration;
             import org.springframework.security.config.annotation.web.builders.HttpSecurity;
             import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
             import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
             import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
             import org.springframework.security.web.SecurityFilterChain;
             
             @Configuration
             @EnableWebSecurity
             public class TestSecurityConfig {
             
                 @Bean
                 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                     http
                             //        .csrf(csrf -> csrf.disable())
                             .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                             .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                             .logout(LogoutConfigurer::permitAll);
             
                     return http.build();
                 }
             }
        ```

## Serialization

- > ### Annotations for class
    ```java
        @JsonSerialize(using = DaySerializer.class)
    
        //or
    
        @JsonComponent
    ```

- > ### Test Inline In a test
     ```java
        @Test
        public void testDaySerialization() throws Exception {
            ObjectMapper objectMapper = new ObjectMapper();
            SimpleModule module = new SimpleModule();
            module.addSerializer(Day.class, new DaySerializer());
            objectMapper.registerModule(module);
    
            Day day = Day.of(2025, 1, 4);
            String json = objectMapper.writeValueAsString(day);
    
            assertEquals("\"2025-01-04\"", json); // Expect serialized output as a string
        }
     ```

- > ### MixIn

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

- > ### Config File
    ```java
        public class JacksonConfig {
        @Autowired
        DaySerializer daySerializer;
        @Bean
        public Jackson2ObjectMapperBuilderCustomizer jacksonObjectMapperBuilderCustomizer() {
        log.debug("jacksonObjectMapperBuilderCustomizer");
        
                return jacksonObjectMapperBuilder -> {
                    SimpleModule module = new SimpleModule();
                    module.addSerializer(Day.class, new DaySerializer());
        //            jacksonObjectMapperBuilder.modules(new CustomJacksonModule());
        };
        }
        
        //    @Bean
        //    public ObjectMapper objectMapper() {
        //        ObjectMapper objectMapper = new ObjectMapper();
        //        objectMapper.configure(com.fasterxml.jackson.databind.SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //        objectMapper.registerModule(new CustomJacksonModule());
        //        return objectMapper;
        //    }
        
            @Bean
            public ObjectMapper objectMapper(DaySerializer daySerializer) {
                ObjectMapper objectMapper = new ObjectMapper();
        
                SimpleModule module = new SimpleModule();
                module.addSerializer(Day.class, daySerializer);
                objectMapper.registerModule(module);
                objectMapper.configure(com.fasterxml.jackson.databind.SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        
                return objectMapper;
            }
        }
  ```