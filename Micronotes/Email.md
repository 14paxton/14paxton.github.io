---
title: Email
permalink: Micronotes/Email
category: Micronotes
parent: Micronotes
layout: default
has_children: false
share: true
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

## Add Attachment

### Inline

> add a cid to src attribute and give it an id, i have had the best luck when using the file name

```<img src="cid:InlineAttachment.png"/>```

> your attachment builder, use the id, and I add disposition, content i do add it as bytes[] , but i have had it working when you just add the file

```java
public Attachment buildAttachment() {
  Attachment.builder()
            .filename("InlineAttachment.png")
            .contentType("image/png")
            .content(fileBytes)
            .id("InlineAttachment.png")
            .disposition("inline");
}
```

> then add your attachent to the attachment property

```java
public Email buildEmail() {
  Email.builder()
       .to("toemail")
       .from("fromemail")
       .body("body")
       .attachment(newInlineAttachment)
       .build();
}
```

### Add Attachment as bytes

```java

@NonNull
public Attachment.Builder buildAttachment(@NonNull String path, @NonNull String name, @NonNull String disposition, @NonNull MimeType type) throws IOException {
  byte[] fileBytes = getClasspathResourceAsBytes(path).orElseThrow(() -> new IllegalArgumentException("File not found! " + path));

  Attachment.Builder attachmentBuilder = Attachment.builder()
                                                   .filename(name)
                                                   .contentType(type.getMimeType()).content(fileBytes);

  if ("inline".equals(disposition)) {
    attachmentBuilder.id(name).disposition(disposition);
  }

  return attachmentBuilder;
}


@NonNull
public Optional<byte[]> getClasspathResourceAsBytes(@NonNull String path) {
  return getClasspathResource(path).flatMap(url -> {
    try (InputStream inputStream = url.openStream()) {
      return Optional.of(inputStream.readAllBytes());
    }
    catch (IOException e) {
      LOG.error("Error reading bytes from resource: {}", path, e);
      return Optional.empty();
    }
  });
}
```

### Add Attachment as Base64

```java
public Attachment buildAttachment(String path, String name, String disposition, MimeType type) throws IOException {
  ClassLoader classLoader = getClass().getClassLoader();
  InputStream imageStream = classLoader.getResourceAsStream(path);

  String imageBase64 = Base64.getEncoder().encodeToString(imageStream.readAllBytes());
  return Attachment.builder()
                   .contentID(name)
                   .filename(name)
                   .contentType(type.getMimeType())
                   .base64Content(imageBase64).build();
}
```

### Add Attachment as ImageStream

```java
public @NonNull Attachment buildAttachment(String path, String name, String disposition, MimeType type) throws IOException {
  ClassLoader classLoader = getClass().getClassLoader();
  try (InputStream imageStream = classLoader.getResourceAsStream(path)) {
    assert imageStream != null;

    return Attachment.builder()
                     .filename(name)
                     .contentType(type.getMimeType())
                     .content(imageStream.readAllBytes())
                     .id(name)
                     .disposition(disposition)
                     .build();
  }
}
```

### Add Attachment as File

```java
public @NonNull Attachment buildAttachment(
        String path, String name, String disposition, MimeType type) throws IOException {
  ClassLoader classLoader = getClass().getClassLoader();

  URL resource = classLoader.getResource(path);
  if (resource == null) {
    throw new IllegalArgumentException("File not found! " + path);
  }

  File resourceFile = new File(resource.getFile());

  return Attachment.builder()
                   .filename(name)
                   .contentType(type.getMimeType())
                   .content(resourceFile)
                   .build();
}
```

# MimeType / ContentType

- > Enum Example

  <details markdown="block">
  <summary>
  MimeType Enum
  </summary>

  {%raw%}

    ```java
    package example.micronaut.Util;
    
    import io.micronaut.serde.annotation.Serdeable;
    
    @Serdeable
    public enum MimeType {
        // Define common MIME types
        TEXT_PLAIN("text/plain", ".txt"),
        TEXT_HTML("text/html", ".html", ".htm"),
        APPLICATION_JSON("application/json", ".json"),
        APPLICATION_XML("application/xml", ".xml"),
        IMAGE_PNG("image/png", ".png"),
        IMAGE_JPEG("image/jpeg", ".jpeg", ".jpg"),
        IMAGE_GIF("image/gif", ".gif"),
        APPLICATION_PDF("application/pdf", ".pdf"),
        APPLICATION_OCTET_STREAM("application/octet-stream", ""); // Fallback for unknown types
    
        private final String mimeType;
        private final String[] extensions;
    
        MimeType(String mimeType, String... extensions) {
            this.mimeType   = mimeType;
            this.extensions = extensions;
        }
    
        // Static method to get the MIME type string from an extension
        public static String getMimeTypeFromExtension(String extension) {
            return fromExtension(extension).getMimeType();
        }
    
        // Get the MIME type as a string
        public String getMimeType() {
            return mimeType;
        }
    
        // Static method to find a MIME type based on file extension
        public static MimeType fromExtension(String extension) {
            if (extension == null || extension.isEmpty()) {
                return APPLICATION_OCTET_STREAM; // Default to binary stream for unknown types
            }
    
            for (MimeType type : MimeType.values()) {
                for (String ext : type.getExtensions()) {
                    if (extension.equalsIgnoreCase(ext)) {
                        return type;
                    }
                }
            }
            return APPLICATION_OCTET_STREAM; // Default if no match is found
        }
    
        // Get the extensions associated with this MIME type
        public String[] getExtensions() {
            return extensions;
        }
    }
    ```

  {% endraw %}

  </details>