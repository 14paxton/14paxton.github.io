---
title:        Testing
permalink:    Micronotes/Testing
category:     Micronotes
parent:       Micronotes
layout:       default
has_children: false
share:        true
shortRepo:

  - micronotes
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

# [Spock](https://micronaut-projects.github.io/micronaut-test/latest/guide/index.html#spock)

## [Example Microstream test suite ](https://github.com/14paxton/SpockMicronautMicrostream/tree/main/test/groovy/com/ssi/integration)

---

# JUnit

---

## HTTPS

---

<details markdown="block">
<summary> Basic HTTPS test for Controller</summary>

```java
package example.micronaut;

import com.micronaut.controller.command.UserCommand;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@MicronautTest // <1>
class UserValidationControllerTest {

    @Inject
    @Client("/")
    HttpClient httpClient; // <2>

    @Test
    void fruitIsValidated() {
        HttpClientResponseException exception = assertThrows(
                HttpClientResponseException.class,
                () -> httpClient.toBlocking().exchange(HttpRequest.POST("/user", new UserCommand("", "", "")))
                                                            );

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
```

</details>

---

## AWS

---

### Lambda

---

- > #### Testing FunctionRequestHandler

  <details markdown="block">
  <summary> JUnit Test for Lambda Function Request Handling</summary>

    ```java
    package example.micronaut;
    
    import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
    import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
    import jakarta.inject.Inject;
    import org.junit.jupiter.api.AfterAll;
    import org.junit.jupiter.api.Assertions;
    import org.junit.jupiter.api.BeforeAll;
    import org.junit.jupiter.api.Test;
    
    import java.util.Map;
    
    public class FunctionRequestHandlerTest {
    
        @Inject
        private static FunctionRequestHandler handler;
    
        @BeforeAll
        public static void setupServer() {
            handler = new FunctionRequestHandler();
        }
    
        @AfterAll
        public static void stopServer() {
            if (handler != null) {
                handler.getApplicationContext().close();
            }
        }
    
        @Test
        public void testHandler() {
            Map<String, String> immutableMap = Map.of("email", "z3r0c00lcrashoverride@gmail.com");
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            request.setHttpMethod("GET");
            request.setPath("/");
            request.setQueryStringParameters(immutableMap);
            APIGatewayProxyResponseEvent response = handler.execute(request);
            Assertions.assertEquals(202, response.getStatusCode().intValue());
        }
    
        @Test
        public void testBlankInput() {
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            request.setHttpMethod("GET");
            request.setPath("/");
            APIGatewayProxyResponseEvent response = handler.execute(request);
            Assertions.assertEquals(202, response.getStatusCode().intValue());
        }
    }
    ```

    </details>

- > #### Testing a controller

    <details markdown="block">
    <summary> JUnit Test For Lambda Controller </summary>

    ```java
    package example.micronaut;
    
    import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
    import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
    import io.micronaut.core.type.Argument;
    import io.micronaut.function.aws.proxy.MockLambdaContext;
    import io.micronaut.function.aws.proxy.payload1.ApiGatewayProxyRequestEventFunction;
    import io.micronaut.http.HttpMethod;
    import io.micronaut.http.HttpStatus;
    import io.micronaut.serde.ObjectMapper;
    import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
    import jakarta.inject.Inject;
    import org.junit.jupiter.api.AfterAll;
    import org.junit.jupiter.api.BeforeAll;
    import org.junit.jupiter.api.Test;
    
    import java.io.IOException;
    import java.util.Collections;
    import java.util.List;
    import java.util.Map;
    
    import static org.junit.jupiter.api.Assertions.assertEquals;
    
    /**
     * Integration tests for the HomeController class, using Micronaut framework and AWS Lambda.
     * Tests various endpoints and methods to ensure correct functionality.
     */
    @MicronautTest
    class HomeControllerTest {
        private static ApiGatewayProxyRequestEventFunction handler;
        @Inject
        ObjectMapper objectMapper;
    
        @BeforeAll
        static void setupSpec() {
            handler = new ApiGatewayProxyRequestEventFunction();
        }
    
        @AfterAll
        static void cleanupSpec() {
            handler.getApplicationContext().close();
        }
    
        @Test
        void testMultiSend() throws IOException {
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            request.setPath("/test");
            request.setHttpMethod(HttpMethod.GET.toString());
            request.setBody("{}");
            APIGatewayProxyResponseEvent response = handler.handleRequest(request, new MockLambdaContext());
    
            Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Argument.mapOf(String.class, Object.class));
            Object responseObject = responseMap.get("body");
            Map<String, Object> sendgridMap = objectMapper.readValue(responseObject.toString(), Argument.mapOf(String.class, Object.class));
            Map<String, Object> sentEmail = (Map<String, Object>) sendgridMap.get("sentEmail");
            List<Object> toList = (List<Object>) sentEmail.get("to");
            List<Object> bccList = (List<Object>) sentEmail.get("bcc");
    
            assertEquals(HttpStatus.OK.getCode(), response.getStatusCode());
            assertEquals(1, toList.size());
            assertEquals(2, bccList.size());
        }
    
        @Test
        void testSingleSendWithBody() throws IOException {
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            Map<String, String> immutableMap = Collections.singletonMap("email", "email@email.com");
            request.setPath("/test");
            request.setBody(objectMapper.writeValueAsString(immutableMap));
            request.setHttpMethod(HttpMethod.GET.toString());
            APIGatewayProxyResponseEvent response = handler.handleRequest(request, new MockLambdaContext());
    
            assertEquals(HttpStatus.OK.getCode(), response.getStatusCode());
        }
    
        @Test
        void testSingleSendWithPathParam() {
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            request.setPath("/test/email@email.com");
            request.setHttpMethod(HttpMethod.GET.toString());
            APIGatewayProxyResponseEvent response = handler.handleRequest(request, new MockLambdaContext());
    
            assertEquals(HttpStatus.OK.getCode(), response.getStatusCode());
        }
    
        @Test
        void testHerpesEmail() {
            APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
            request.setPath("/controller/action");
            request.setHttpMethod(HttpMethod.GET.toString());
            APIGatewayProxyResponseEvent response = handler.handleRequest(request, new MockLambdaContext());
    
            assertEquals(HttpStatus.OK.getCode(), response.getStatusCode());
        }
    }
    ```
    </details>

---

# Spock

---

## Micronaut Controller

<details markdown="block">
<summary> Micronaut Integration Test Controller </summary>

````groovy
import com.ssi.Enums.AssessmentReportUrlType
import com.ssi.request.WSConfigCommand
import com.ssi.result.ClientResultCommand
import io.micronaut.context.ApplicationContext
import io.micronaut.http.HttpResponse
import io.micronaut.http.HttpStatus
import io.micronaut.runtime.server.EmbeddedServer
import io.micronaut.test.extensions.spock.annotation.MicronautTest
import spock.lang.Shared

import java.util.stream.Collectors
import java.util.stream.Stream
import java.util.stream.StreamSupport

@MicronautTest(environments = ["test"], packages = "com.ssi.*", propertySources = "classpath:application-test.yml")
class IntegrationControllerSpec extends BaseTestSpec {
    @Shared
    WSConfigCommand wsCMD = new WSConfigCommand(null, null, null, null, null, null, null, null, null, null, null, null, null, "test me")
    @Shared
    ClientResultCommand resultCMD = new ClientResultCommand(null, null, null, null, AssessmentReportUrlType.REQ_CORE_AUTH, null, null, true, null, true, null, null, "test me result")
    @Shared
    Map<String, LinkedList<ClientEntityDetails>> clientEntityMap = ["GNDR_MAP"  : new LinkedList<ClientEntityDetails>([new ClientEntityDetails("gender stuff", "crankin", "DECLINE")]),
                                                                    "ETHNIC_MAP": new LinkedList<ClientEntityDetails>([new ClientEntityDetails("phone stuff", "crankin", "OTHER")])]
            as Map<String, LinkedList<ClientEntityDetails>>

    void "test controller integration actions"()

    {
        given:
        IntegrationCommand intCMD = new IntegrationCommand("intCMD", null, null, null, "strong_password", wsCMD, resultCMD, clientEntityMap)
        String company2Name = "company2Name"
        String company2Password = "Yellow_and_curved"
        Map<String, Object> properties = new HashMap<>(getProperties())
        EmbeddedServer embeddedServer = ApplicationContext.run(EmbeddedServer, properties)
        IntegrationClient integrationClient = embeddedServer.getApplicationContext().getBean(IntegrationClient)

        when:
        IntegrationCommand newIntCMD = new IntegrationCommand(company2Name, null, null, "company_2", null, wsCMD, resultCMD, clientEntityMap)
        HttpResponse<Integration> response = integrationClient.create(newIntCMD)

        then:
        HttpStatus.CREATED == response.getStatus()
        response.getBody().isPresent()

        when:
        Integration company2 = response.getBody().get()

        List<Integration> integrationList = integrationList(integrationClient)

        then:
        1 == integrationList.size()
        company2.getId() == integrationList.get(0).getId()
        integrationList.get(0).getTbeCompanyCode()

        when:
        Optional<Integration> company2Optional = integrationClient.update(intCMD)

        then:
        !company2Optional.isPresent()

        when:
        response = integrationClient.create(intCMD)

        then:
        HttpStatus.CREATED == response.getStatus()
        integrationStream(integrationClient)
                .anyMatch(f -> "company2Name" == f.getCompanyCode())

        when:
        company2Optional = integrationClient.update(new IntegrationCommand(company2Name, null, null, null, company2Password, wsCMD, resultCMD, clientEntityMap))
        then:
        company2Optional.isPresent()
        Stream.of("Yellow_and_curved", "strong_password").collect(Collectors.toSet()) == integrationStream(integrationClient)
                .map(Integration::getTbexPassword)
                .collect(Collectors.toSet())

        when:
        embeddedServer.close()
        embeddedServer = ApplicationContext.run(EmbeddedServer, properties)
        integrationClient = embeddedServer.getApplicationContext().getBean(IntegrationClient)

        then:
        2 == numberOfIntegrations(integrationClient)

        when:
        integrationClient.delete(intCMD)
        integrationClient.delete(new IntegrationCommand(company2Name, company2Password, null, null, null, wsCMD, resultCMD, clientEntityMap))
        embeddedServer.close()
        embeddedServer = ApplicationContext.run(EmbeddedServer, properties)
        integrationClient = embeddedServer.getApplicationContext().getBean(IntegrationClient)


        then:
        0 == numberOfIntegrations(integrationClient)

        cleanup:
        embeddedServer.close()
    }

    private int numberOfIntegrations(IntegrationClient integrationClient) {
        return integrationList(integrationClient).size()
    }

    private List<Integration> integrationList(IntegrationClient integrationClient) {
        return integrationStream(integrationClient)
                .collect(Collectors.toList())
    }

    private Stream<Integration> integrationStream(IntegrationClient integrationClient) {
        Iterable<Integration> integrations = integrationClient.list()
        return StreamSupport.stream(integrations.spliterator(), false)
    }

}
````

</details>