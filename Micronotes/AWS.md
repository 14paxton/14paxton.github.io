---
title:        AWS
permalink:    Micronotes/AWS
category:     Micronotes
parent:       Micronotes
layout:       default
has_children: false
share:        true
shortRepo:
  - users
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

# [AWS Micronaut Docs](https://micronaut-projects.github.io/micronaut-aws/latest/guide/)

# [Lambda](https://micronaut-projects.github.io/micronaut-aws/latest/guide/#lambdaTutorials)

## Gradle

   ```groovy
   micronaut {
    nativeLambda { lambdaRuntimeClassName = "io.micronaut.function.aws.runtime.APIGatewayV2HTTPEventMicronautLambdaRuntime" }
}
   ```

### Build Zip file To Deploy

   ```shell
     ./gradlew buildNativeLambda
   ```

## Handler

### 1) Custom ```example.micronaut.FunctionRequestHandler```

    - Purpose: This is a custom class, likely created in a Micronaut-based AWS Lambda project to handle specific business logic or Lambda requests.
    - Use Case: Typically, this handler extends from a Micronaut AWS Lambda handler class, like
      io.micronaut.function.aws.proxy.MicronautLambdaHandler. It
      acts as the entry point for AWS Lambda invocations where the developer defines the specific handling of requests.
    - Example: It is used when you want to define your own Lambda function logic. For instance, processing an API request, executing business logic,
      and
      returning a response.

       ```java
        public class FunctionRequestHandler extends MicronautLambdaHandler {
           // Custom logic for handling Lambda events
        }
       ```

### 2) ```io.micronaut.function.aws.proxy.MicronautLambdaHandler```

    - Purpose: This is the primary handler for AWS Lambda requests in a Micronaut application. It integrates the Micronaut framework and makes it
      possible
      to run Micronaut applications inside an AWS Lambda environment.
    - Use Case: MicronautLambdaHandler is used when deploying a Micronaut-based REST API to AWS Lambda. It bridges AWS API Gateway requests with the
      Micronaut framework, enabling the Lambda function to route HTTP requests to Micronaut controllers and services.
    - Example: It acts as the core handler in API Gateway integrations where you want to use Micronaut’s dependency injection, HTTP routing, and other
      framework features inside a Lambda function.

      ```java
        public class MyApiHandler extends MicronautLambdaHandler {
           // Optional: Override methods or add custom behavior if needed
       }
      ```
      > Use Case:

        - When you want to run a full Micronaut application within AWS Lambda, especially for handling HTTP requests routed through AWS API Gateway.
          This
          handler automatically wires up the HTTP request/response handling via Micronaut controllers.

### 3) ```io.micronaut.function.aws.proxy.payload1.ApiGatewayProxyRequestEventFunction```

    - Purpose: This is a specialized handler provided by Micronaut for handling Payload Version 1.0 of AWS API Gateway requests. AWS API Gateway can
      use
      different versions of request/response payloads, and this class is designed specifically for handling events that conform to the Payload Version
      1.0
      format.
    - Use Case: ApiGatewayProxyRequestEventFunction is used when your API Gateway is configured to use the Payload 1.0 request/response format. It’s a
      more specific use case than MicronautLambdaHandler and is typically used when the Lambda function receives an event in this format.
    - Example: This handler is useful if your Lambda function needs to parse or handle API Gateway requests specifically using the Payload Version 1.0
      format (as opposed to Version 2.0).

      ```java
       public class MyApiHandler extends ApiGatewayProxyRequestEventFunction {
        // Handles AWS API Gateway Payload v1.0 events
       }
      ```
      > Use Case:

        - When you are working with an AWS API Gateway that is configured to use Payload Version 1.0, and you need your Lambda function to
          specifically
          process requests formatted in that version.

### FunctionRequestHandler Example

```java
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import io.micronaut.function.aws.MicronautRequestHandler;


public class FunctionRequestHandler extends MicronautRequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    @Override
    public APIGatewayProxyResponseEvent execute(APIGatewayProxyRequestEvent input) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();

        //** logic **//
    }
}
```

## Runtime

### 1) Custom ```example.micronaut.FunctionLambdaRuntime```

### 2)  ```io.micronaut.function.aws.runtime.MicronautLambdaRuntime```

    - Purpose: This is the core Micronaut class for running AWS Lambda functions. It is a base class that integrates the Micronaut framework’s
      features into the AWS Lambda execution environment. This runtime provides automatic support for dependency injection, configuration, and other
      Micronaut capabilities when running Lambda functions.
    - Use Case: It is the default runtime you would use to handle Lambda function invocations. It is generic and can be adapted to different event
      types (API Gateway, SNS, SQS, etc.). You would extend this class if you want to build a function handler that works with various AWS services or
      APIs, leveraging the full power of the Micronaut framework.
    - Example: This is typically used when you want to deploy a Micronaut-based Lambda function that will handle AWS events (like API Gateway HTTP
      requests) or process data from other AWS services.
      ```java
       public class MyLambdaRuntime extends MicronautLambdaRuntime<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse> {
        public static void main(String[] args) {
          try {
               new MyLambdaRuntime().start();
             } catch (Exception e) {
                     e.printStackTrace();
                 }
             }
         }
      ```
      > Use Case:

        - When you want to deploy a Micronaut-based Lambda function that handles generic AWS events (e.g., API Gateway, SNS, SQS). The class allows
          you to create Lambda functions with Micronaut’s dependency injection, configuration, and HTTP routing capabilities.

### 3)  ```io.micronaut.function.aws.runtime.APIGatewayV2HTTPEventMicronautLambdaRuntime```

    - Purpose: This is a specialized runtime class designed specifically to handle AWS API Gateway Version 2.0 HTTP events. This runtime is built on
      top of MicronautLambdaRuntime, but it focuses on processing API Gateway requests that conform to the Payload Version 2.0 specification.
    - Use Case: You would use this class if your Lambda function is deployed behind AWS API Gateway, and you want to handle HTTP requests and
      responses using the Payload Version 2.0 format (which supports richer HTTP features such as cookies, multi-value headers, and more).
    - Example: This is particularly useful when you are deploying an HTTP-based API to AWS Lambda, and the API Gateway is configured to use the
      Version 2.0 payload format.
      ```java
        public class MyAPIGatewayLambdaRuntime extends APIGatewayV2HTTPEventMicronautLambdaRuntime {
            public static void main(String[] args) {
                try {
                    new MyAPIGatewayLambdaRuntime().start();
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
      ```
      > Use Case:

        - When your Lambda function is designed to handle HTTP requests routed via AWS API Gateway using Payload Version 2.0. This runtime helps in
          handling API requests and responses in a web-like manner, leveraging the features of the API Gateway 2.0 specification.

### FunctionLambdaRuntime Example

```java
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.function.aws.runtime.AbstractMicronautLambdaRuntime;

import java.net.MalformedURLException;

public class FunctionLambdaRuntime extends AbstractMicronautLambdaRuntime<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent, APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    public static void main(String[] args) {
        try {
            new FunctionLambdaRuntime().run(args);

        }
        catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    @Nullable
    protected RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> createRequestHandler(String... args) {
        return new FunctionRequestHandler();
    }
}
```

## StreamHandler

### AbstractRequestStreamHandlerMicronautLambdaRuntime

```java
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.function.aws.runtime.AbstractRequestStreamHandlerMicronautLambdaRuntime;

import java.net.MalformedURLException;

class FunctionLambdaRuntime extends AbstractRequestStreamHandlerMicronautLambdaRuntime<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public static void main(String[] args) {
        try {
            new FunctionLambdaRuntime().run(args);
        }
        catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected @Nullable RequestStreamHandler createRequestStreamHandler(String... args) {
        return new FunctionRequestHandler();
    }
}
```

### MicronautRequestStreamHandler

```java
import io.micronaut.context.env.Environment;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.function.aws.MicronautRequestStreamHandler;

@Introspected
public class FunctionRequestHandler extends MicronautRequestStreamHandler {

    @Override
    protected String resolveFunctionName(Environment env) {
        return "requestfunction";
    }
}
```

### RequestFunction Function

```java
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import io.micronaut.function.FunctionBean;

import java.util.function.Function;

@FunctionBean("requestfunction")
public class RequestFunction implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent requestEvent) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        //** logic **//
    }
}
```