---
title:        Email
permalink:    Micronotes/Email
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

# Sendgrid

## With Publisher

```java
public String execute() {
    return Mono.from(emailSendingService.sendTestEmail()).doOnNext(rsp -> {
        LOG.info("response status {}\nresponse body {}\nresponse headers {}", rsp.getStatusCode(), rsp.getBody(), rsp.getHeaders());
    }).map(rsp -> rsp.getHeaders());
}
```

## Micronaut Email

```java
    public Mono<Map<String, String>> index() throws Exception {

    return emailSendingService.send(Email.builder()
                                         .to("recipient@email.com")
                                         .from("sender@email.com")
                                         .subject("Sending email with Twilio Sendgrid is Fun")
                                         .body("and <em>easy</em> to do anywhere with <strong>Micronaut Email</strong>", HTML)
                                         .build()).getHeaders();
}
```

## Basic Send

<details markdown="block">
<summary>Basic Send From Controller</summary>

```java

@ExecuteOn(TaskExecutors.IO)
@Controller(value = "/")
@SerdeImport(Response.class)
@ReflectiveAccess
@ReflectionConfig.ReflectiveMethodConfig(name = "index")
@Requires(property = "micronaut.email.host")
public class HomeController {
    EmailSender<?, ?> emailSender;

    public HomeController(EmailSender<?, ?> emailSender) {
        this.emailSender = emailSender;
    }

    @Post(uri = "/send", produces = "application/json")
    public Map<String, ?> index() {
        var result = emailSender.send(Email.builder()
                                           .to("recipient@email.com")
                                           .from("sender@email.com")
                                           .subject("Email Subject: " + LocalDateTime.now())
                                           .body("Basic email", BodyType.TEXT));
        return Collections.singletonMap("result", result);

    }
}
```

</details>

## Use SengridSendingService build out with Composer

<details markdown="block">
<summary> Build Request With Composer</summary>

```java

@FunctionBean("requestfunction")
@SerdeImport(StringBody.class)
public class RequestFunction implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private static final Logger LOG = LoggerFactory.getLogger(RequestFunction.class);

    @Inject
    JsonMapper jsonMapper;

    @Inject
    EmailSendingService emailSendingService;

    @Inject
    GenericServices genericServices;

    @Inject
    SendGridConfiguration sendGridConfiguration;

    @Override
    public APIGatewayProxyResponseEvent apply(APIGatewayProxyRequestEvent requestEvent) {
        LOG.info("Request: {}", requestEvent);

        Optional<Map<String, String>> params = Optional.ofNullable(requestEvent.getQueryStringParameters());
        QueryCommand queryCommand = params.map(stringStringMap -> genericServices.mapToCommandObject(stringStringMap, QueryCommand.class))
                                          .orElse(new QueryCommand());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        SendgridEmailComposer composer = new SendgridEmailComposer();

        try {
            Email.Builder emailBuilder = emailSendingService.buildAndSend(queryCommand);

            emailBuilder.from(new Contact("sender@email.com", "no-reply"));
            emailBuilder.body("test my email fuck", BodyType.TEXT);

            Consumer<Request> requestConsumer = (request) -> {
                LOG.info("Processing Request: {}", request);
                // Additional custom logic for processing the request (if needed)
            };

            Email email = emailBuilder.build();
            Request sendGridRequest = composer.compose(email);
            requestConsumer.accept(sendGridRequest);

            SendgridEmailSender sendGridEmailSender = new SendgridEmailSender(sendGridConfiguration, composer);
            Response sendGridResponse = sendGridEmailSender.send(email, requestConsumer);

            String emailValues = new String(jsonMapper.writeValueAsBytes(email));
            Map<String, Object> returnMessage = Map.of("header", sendGridResponse.getHeaders(), "body", sendGridResponse.getBody(), "micronautemail", emailValues);

            Map<String, Map<String, Object>> returnMap = Collections.singletonMap("message", returnMessage);
            String jsonResponse = new String(jsonMapper.writeValueAsBytes(returnMap));
            response.setStatusCode(sendGridResponse.getStatusCode());
            response.setBody(jsonResponse);

        }
        catch (Exception e) {
            LOG.error("Error processing request", e);
            response.setStatusCode(500);
            response.setBody(e.getMessage());
        }

        LOG.info("Response: {}", response);
        return response;
    }
}
```

</details>

## Build with JSON and Send

<details markdown="block">
<summary>Use JSON to build SendGrid Email and Send</summary>

```java

@ExecuteOn(TaskExecutors.IO)
@Controller(value = "/")
@SerdeImport(Response.class)
@ReflectiveAccess
@ReflectionConfig.ReflectiveMethodConfig(name = "index")
@Requires(property = "micronaut.email.host")
public class HomeController {
    private final SendGrid sendGrid;

    @Inject
    public HomeController(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }

    @Post(uri = "/send", produces = "application/json")
    public Map<String, ?> index() {
        Map<String, Object> emailData = new HashMap<>();
        emailData.put("personalizations", Collections.singletonList(
                Collections.singletonMap("to", Collections.singletonList(
                        Collections.singletonMap("email", "recipient@email.com").put("name", "receiver")))));
        emailData.put("from", Collections.singletonMap("email", "sender@email.com").put("name", "sender"));
        emailData.put("subject", "Micronaut Email Basic Test: " + LocalDateTime.now());
        emailData.put("content", Collections.singletonList(
                Collections.singletonMap("type", "text/plain")
                                                          ));
        emailData.put("content", Collections.singletonList(
                Collections.singletonMap("value", "Email Subject")));

        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(new ObjectMapper().writeValueAsString(emailData));

            Response response = sendGrid.api(request);
            return Collections.singletonMap("result", response.getStatusCode());
        }
        catch (IOException ex) {
            return Collections.singletonMap("error", ex.getMessage());
        }
    }
}
```

</details>