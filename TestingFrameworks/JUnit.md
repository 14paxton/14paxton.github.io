---
title:        JUnit
permalink:    TestingFrameworks/JUnit
category:     TestingFrameworks
parent:       TestingFrameworks
layout:       default
has_children: false
share:        true
shortRepo:

  - testingframeworks
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

# [configure](https://maven.apache.org/surefire/maven-surefire-plugin/examples/junit-platform.html)

 ***

# Maven

## CLI

```shell
//Run all tests
 mvn test

//Run a single test class
 mvn -Dtest=TestClassOne test

//Run multiple test classes
mvn -Dtest=TestClassOne,TestClassTwo test

//Run a single test method
 mvn -Dtest=TestClassOne#methodname test

//Run tests matching name 'testMethod' in all test classes
 mvn -Dtest="*#testMethod" test

//Run tests matching name 'test*' in a test class 
 mvn -Dtest="TestClassOne#test*" test

//Rerun failing tests 2 times
mvn '-Dsurefire.rerunFailingTestsCount=2' -Dtest=ModuleTwoTests test
```

# [StatelessTestsetInfoReporter](https://maven.apache.org/surefire/surefire-extensions-api/apidocs/org/apache/maven/surefire/extensions/StatelessTestsetInfoReporter.html)

```xml    

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.0.0-M4</version>
    <configuration>
        <testFailureIgnore>true</testFailureIgnore>
        <statelessTestsetReporter
                implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5Xml30StatelessReporter">
            <disable>false</disable>
            <version>3.0</version>
            <usePhrasedFileName>true</usePhrasedFileName>
            <usePhrasedTestSuiteClassName>true</usePhrasedTestSuiteClassName>
            <usePhrasedTestCaseClassName>true</usePhrasedTestCaseClassName>
            <usePhrasedTestCaseMethodName>true</usePhrasedTestCaseMethodName>
        </statelessTestsetReporter>
    </configuration>
</plugin>    
```

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

  - #### use value passed to mocked method in action
    ```java
        when(method.execute(Mockito.any(FindDayRangeAvailabilityForPersonnel.class))).thenAnswer(invocation -> {
        FindDayRangeAvailabilityForPersonnel input = invocation.getArgument(0);
        return buildResponse(2, input);
      });
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

# Metadata

> get test info

```java

@Test
public void testDoFetchTableData(TestInfo testInfo) throws Exception {
  String status = "Active";
  String lastName = "Gold";
  String firstName = "Felix";
  String startDay = "2025-01-01";

  var request = createRequest(status, lastName, firstName, startDay);

  logJsonContent(request, " JSON Request : {}", testInfo);

  mockMvc.perform(post("/uri")
                          .contentType(MediaType.APPLICATION_JSON)
                          .header("Jq-Request", "true")
                          .content(request))
         .andExpect(status().isOk());
}
```

# Spring

## Controller

<details markdown="block"> 
  <summary>
  Calling Controller and Action Directly
  </summary>

    {%raw%}

```java
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.AnnotationConfigWebContextLoader;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;


@Slf4j
@ActiveProfiles("test")
@WebMvcTest(controllers = FragmentController.class)
@ComponentScan(basePackageClasses = {FragmentController.class})
@ContextConfiguration(classes = {DefaultTestConfig.class}, loader = AnnotationConfigWebContextLoader.class)
class ControllerTest {

    @Test
    public void test_returns_map_with_subscription_type_ids() {
        NotificationController controller = new NotificationController();

        Map result = controller.fetchAllNotifications();

        List<Integer> expectedIds = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
        assertNotNull(result);
        assertTrue(result.containsKey("emailNotifications"));
        assertEquals(expectedIds, result.get("emailNotifications"));
    }

}
```

    {%endraw%}

</details>

<details markdown="block"> 
  <summary>
   Basic MockMvc
  </summary>

    {%raw%}

```java
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.AnnotationConfigWebContextLoader;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;


@Slf4j
@ActiveProfiles("test")
@WebMvcTest(controllers = FragmentController.class)
@ComponentScan(basePackageClasses = {FragmentController.class})
@ContextConfiguration(classes = {DefaultTestConfig.class}, loader = AnnotationConfigWebContextLoader.class)
class FragmentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles = "ADMIN")
    void testLoadGreeting() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/controller/action").header(HtmxConstants.HDR_HX_REQUEST, "true"))
                                     .andExpect(status().isOk())
                                     .andExpect(view().name("thymeLeafFile :: fragmentId"))
                                     .andReturn();

        log.debug("Response: {}", mvcResult.getResponse()
                                           .getContentAsString());
    }
}
```

    {%endraw%}

</details>

<details markdown="block"> 
  <summary>
   MockMvc With mock functions
  </summary>

{%raw%}

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles("test")
@WebMvcTest(controllers = Controller.class)
@ContextConfiguration(classes = {DefaultTestConfig.class, SpringSecurityConfig.class}, loader = AnnotationConfigWebContextLoader.class)
@ComponentScan(basePackageClasses = {Controller.class})
public class ControllerTest {

    private MockedStatic<TemporalUtils> temporalUtilsMockedStatic;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @AfterEach
    public void afterTest() {
        temporalUtilsMockedStatic.close();
    }

    @BeforeEach
    public void setUp() throws JsonProcessingException, RBACSecurityException {
        MockitoAnnotations.openMocks(this);

        //** Static Mocks ** //
        temporalUtilsMockedStatic = mockStatic(TemporalUtils.class, Mockito.withSettings()
                                                                           .defaultAnswer(Mockito.CALLS_REAL_METHODS));
        temporalUtilsMockedStatic.when(() -> TemporalUtils.between(Mockito.any(LocalDate.class), Mockito.any(LocalDate.class), Mockito.any(LocalDate.class)))
                                 .thenReturn(true);
        temporalUtilsMockedStatic.when(() -> TemporalUtils.between(Mockito.any(Instant.class), Mockito.any(Instant.class), Mockito.any(Instant.class)))
                                 .thenReturn(true);

        //** Mock Function  **//
        when(queryGateway.execute(Mockito.any(FindDayRangeAvailabilityForPerson.class))).thenAnswer(invocation -> {
            FindDayRangeAvailabilityForPerson input = invocation.getArgument(0);
            return buildQueryGatewayResponse(2, input);
        });

    }

    @Test
    public void testDoIndex() throws Exception {
        log.debug("Beginning testDoIndex");
        mockMvc.perform(get("/rest/person/availability/unit/bulk-manager")
                                .with(csrf())
                                .accept(MediaType.TEXT_HTML))
               .andExpect(status().isOk());
    }

    @Test
    public void testDoFetchTableDataReturnValues(TestInfo testInfo) throws Exception {
        String status = "Active";
        String lastName = "Gold";
        String firstName = "Felix";
        String startDay = "2025-01-01";

        var request = buildPersonUnitBulkAvailabilityManagerRequest(status, lastName, firstName, startDay);

        ResultActions actions = mockMvc.perform(post("/rest/person/availability/unit/bulk-manager/fetch-table-data")
                                                        .contentType(MediaType.APPLICATION_JSON)
                                                        .header("Jq-Request", "true")
                                                        .content(request));

        String returnContent = actions.andReturn()
                                      .getResponse()
                                      .getContentAsString();

        logJsonContent(returnContent, " HTTP Response : {}", testInfo);

        actions.andExpect(status().isOk());
        actions.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));

        Map<String, Object> responseMap = objectMapper.readValue(returnContent, new TypeReference<>() {});
        List<HashMap> otherIdList = (List<HashMap>) responseMap.get("data");

        var record = otherIdList.getFirst();
    }
}
```

{%endraw%}

</details>

### Alternate Ways To Instantiate Controller

```java

@Autowired
private Controller controller;
```

```java

@Autowired
public ControllerTest(ApplicationContext applicationContext) {
    ContextUtil.init(applicationContext);
    mockMvc = MockMvcBuilders.standaloneSetup(new Controller())
                             .build();
}
```

```java

@BeforeEach
public void setUp() throws JsonProcessingException, RBACSecurityException {
    controller = new Controller();
    mockMvc    = MockMvcBuilders.standaloneSetup(controller)
                                .build();
}
```

## Test ApplicationContext SpringBootTest

<details markdown="block"> 
  <summary>
   Test Application Starts Up
  </summary>

{%raw%}

```java
import lombok.extern.slf4j.Slf4j;
import mil.usmc.mls2.tcpt.config.DefaultTestConfig;
import mil.usmc.mls2.tcpt.config.InMemoryDBConfig;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {InMemoryDBConfig.class, DefaultTestConfig.class}, loader = AnnotationConfigContextLoader.class)
class DefaultTest {
    @Autowired
    ApplicationContext applicationContext;

    @Test
    void testItWorks() {
        log.debug("Application Context: {}", applicationContext);
        assertNotNull(applicationContext, "Application is running");
    }
}

```

{%endraw%}

</details>

## In Memory h2 database , TestEntityManager , DataJpaTest

<details markdown="block"> 
<summary>
   Create and find Entity Persistence
</summary>

{%raw%}

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@Slf4j
@ActiveProfiles("test")
@DataJpaTest
@RunWith(SpringJUnit4ClassRunner.class)
@EnableJpaRepositories(basePackageClasses = {PersonEntity.class})
@ContextConfiguration(classes = {InMemoryDBConfig.class, DefaultTestConfig.class})
@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InMemoryDBTest {
    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    ApplicationContext applicationContext;

    @MockitoBean
    SystemInstanceService systemInstanceService;

    @BeforeEach
    public void setUp() throws Exception {
        ContextUtil.init(applicationContext);
    }

    @Test
    public void givenANewPersonShouldPersistAsEntity(TestInfo testInfo) throws JsonProcessingException {
        Long id = 9L;
        String firsName = "Chester";
        String lastName = "Gold";
        String email = "test@test.com";
        Long otherId = 99L;

        PersonEntity person = TestDataBuilders.buildTestPersonEntity(id, firsName, lastName, email, otherId);
        log.debug("Person Created: {}", person);

        testEntityManager.persist(person);
        var persistedPerson = testEntityManager.find(PersonEntity.class, 9L);

        assertNotNull(persistedPerson);
        assertEquals(firsName, persistedPerson.firstName());
        assertEquals(lastName, persistedPerson.lastName());
        assertEquals(email, persistedPerson.email());
        assertEquals(id, persistedPerson.id());
        assertEquals(otherId, persistedPerson.otherIdId());
    }
}

```

{%endraw%}

</details>

## Service Layer Test

<details markdown="block"> 
<summary>
Persist and Query an Entity
</summary>

{%raw%}

```java
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static TestUtil.TestDataBuilders.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mockStatic;

@Slf4j
@ActiveProfiles("test")
@EnableJpaRepositories(basePackageClasses = {PersonEntity.class})
@DataJpaTest
@ExtendWith(SpringExtension.class)
@Transactional
@Import({HandlerService.class})
@ContextConfiguration(classes = {InMemoryDBConfig.class, DefaultTestConfig.class})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class HandlerTest {
    private final EntityManager entityManager;
    private final CriteriaBuilderFactory criteriaBuilderFactory;
    private MockedStatic<BaseQueryUtils> baseQueryUtilsMockedStatic;

    @Autowired
    PersonRepository personRepository;
    @Autowired
    HandlerService handlerService;

    @Autowired
    public HandlerServiceTest(ApplicationContext applicationContext, EntityManager entityManager, CriteriaBuilderFactory criteriaBuilderFactory) {
        this.entityManager          = entityManager;
        this.criteriaBuilderFactory = criteriaBuilderFactory;
    }

    @BeforeEach
    void setUp() {
        //** BaseQueryUtils **//
        baseQueryUtilsMockedStatic = mockStatic(BaseQueryUtils.class);
        baseQueryUtilsMockedStatic.when(() -> BaseQueryUtils.createQuery(entityManager))
                                  .thenReturn(new BlazeJPAQuery<>(entityManager, criteriaBuilderFactory));
    }

    @Test
    public void testFindPersonnelForOwningAndAttachedUnitShouldReturnCreatedPersonnel() {
        Long id = 9L;
        String firsName = "zeek";
        String lastName = "kinkade";
        String email = "test@test.com";
        PersonEntity person = buildTestPersonEntity(id, firsName, lastName, email);

        //    personRepository.save(person);
        entityManager.persist(person);
        log.debug("Person: {}", person);

        List<?> foundPerson = handlerService.queryPersonnelForOwningAndAttachedUnit("", "", null);

        assertNotNull(foundPerson);
        assertThat(foundPerson).hasSizeGreaterThan(0);
    }

}

```    

{%endraw%}

</details>