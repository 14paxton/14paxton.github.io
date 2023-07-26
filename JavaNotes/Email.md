---
title:     Email  
layout:    default  
parent:    Java  
permalink: JavaNotes/Email  
category:  JavaNotes  
share:     true  
shortRepo:
  - java
  - default  
---

# JavaMail API

```java
import javax.mail.*;
import javax.mail.internet.*;

public class SendEmail {

    public static void main(String[] args) throws Exception {

        // Create a new MimeMessage object
        MimeMessage message = new MimeMessage(Session.getDefaultInstance(System.getProperties()));

        // Set the sender's email address
        message.setFrom(new InternetAddress("from@example.com"));

        // Set the recipient's email address
        message.setRecipient(Message.RecipientType.TO, new InternetAddress("to@example.com"));

        // Set the subject of the email
        message.setSubject("This is a test email");

        // Set the body of the email
        message.setText("This is the body of the email.");

        // Send the email
        Transport.send(message);

    }

}
```

> where:

`from@example.com` is the sender's email address

`to@example.com` is the recipient's email address

This is a test email is the subject of the email

This is the body of the email. is the body of the email

---

# Spring

## **2. Project Setup and Dependency**[](https://www.baeldung.com/java-email#project-setup-and-dependency)

For this article, we'll be using a simple Maven-based project with a dependency on[Angus Mail](https://eclipse-ee4j.github.io/angus-mail/). This is the Eclipse implementation of
the[Jakarta Mail API](https://github.com/jakartaee/mail-api)specification:

```xml

<dependency>
    <groupId>org.eclipse.angus</groupId>
    <artifactId>angus-mail</artifactId>
    <version>2.0.1</version>
</dependency>
```

The latest version can be found[here](https://mvnrepository.com/artifact/org.eclipse.angus/angus-mail).

## **3. Sending a Plain Text and an HTML Email**[](https://www.baeldung.com/java-email#sending-a-plain-text-and-an-html-email)

First, we need to configure the library with our email service provider's credentials. Then we'll create a_Session_that'll be used in constructing our message for sending.

The configuration is via a Java_Properties_object:

```java
Properties prop=new Properties();
        prop.put("mail.smtp.auth",true);
        prop.put("mail.smtp.starttls.enable","true");
        prop.put("mail.smtp.host","smtp.mailtrap.io");
        prop.put("mail.smtp.port","25");
        prop.put("mail.smtp.ssl.trust","smtp.mailtrap.io");
```

In the properties configuration above, we configured the email host as Mailtrap and used the port provided by the service as well.

Now let's create a session with our username and password:

```java
Session session=Session.getInstance(prop,new Authenticator(){
@Override
protected PasswordAuthentication getPasswordAuthentication(){
        return new PasswordAuthentication(username,password);
        }
        });
```

The username and password are given by the mail service provider alongside the host and port parameters.

Now that we have a mail_Session_object, let's create a_Mime__Message_for sending:

```java
Message message=new MimeMessage(session);
        message.setFrom(new InternetAddress("from@gmail.com"));
        message.setRecipients(
        Message.RecipientType.TO,InternetAddress.parse("to@gmail.com"));
        message.setSubject("Mail Subject");

        String msg="This is my first email using JavaMailer";

        MimeBodyPart mimeBodyPart=new MimeBodyPart();
        mimeBodyPart.setContent(msg,"text/html; charset=utf-8");

        Multipart multipart=new MimeMultipart();
        multipart.addBodyPart(mimeBodyPart);

        message.setContent(multipart);

        Transport.send(message);
```

In the snippet above, we first created a_message_instance with the necessary properties — to, from and subject. This is followed by a_mimeBodyPart_that has an encoding of_text/html_since our message
is styled in HTML.

Next, we created an instance of_MimeMultipart_object that we can use to wrap the_mimeBodyPart_we created.

Finally, we set the_multipart_object as the content of our_message_and used the_send()_of_Transport_object to do the mail sending.

**So, we can say that the_mimeBodyPart_is contained in the_multipart_that is contained in the_message_. This way, a_multipart_can contain more than one_mimeBodyPart_.**

This is going to be the focus of the next section.

## **4. Sending Email With an Attachment**[](https://www.baeldung.com/java-email#sending-email-with-an-attachment)

Next, to send an attachment, we only need to create another_MimeBodyPart_and attach the file(s) to it:

```java
MimeBodyPart attachmentBodyPart=new MimeBodyPart();
        attachmentBodyPart.attachFile(new File("path/to/file"));
```

We can then add the new body part to the_MimeMultipart_object we created earlier:

```java
multipart.addBodyPart(attachmentBodyPart);
```

**That's all we need to do.**

**Once again, we set the_multipart_instance as the content of the_message_object, and finally we'll use the_send()_to do the mail sending.**

## **5. Formatting Email Text**[](https://www.baeldung.com/java-email#formatting-email-text)

To format and style our email text, we can use HTML and CSS tags.

For example, if we want our text to be bold, we will implement the_<b>_tag. For coloring the text, we can use the_style_tag.**We can also combine HTML tags with CSS tags if we want to have additional
properties, such as bold.**

Let's create a_String_containing bold-red text:

```java

String msgStyled="This is my <b style='color:red;'>bold-red email</b> using JavaMailer";

```

This_String_will hold our styled text to be sent in the email body.

---

# Google Cloud Function

```java
import com.google.cloud.functions.Context;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.cloud.functions.Mail;

public class SendEmailFunction implements HttpFunction {

    @Override
    public void call(HttpRequest request, HttpResponse response, Context context) {
        // Get the email address from the request body.
        String emailAddress = request.getBody();

        // Create a new Mail object.
        Mail mail = new Mail();

        // Set the email address to send the email to.
        mail.setFrom("from@example.com");
        mail.setTo(emailAddress);
        mail.setSubject("This is a test email.");
        mail.setBody("This is the body of the email.");

        // Send the email.
        mail.send();

        // Respond with a success message.
        response.setStatusCode(200);
        response.setBody("Email sent successfully.");
    }
}
```

---

# [Using GCP App Enging](https://cloud.google.com/appengine/docs/legacy/standard/java/mail/sending-mail-with-mail-api)

`To send an email using Java and Google Cloud Platform, you can use the following steps:`

```
Create a Google Cloud Platform project and enable the Cloud Messaging API.
Create a service account and download its JSON key file.
Create a Java project and add the following dependencies to your pom.xml file:
```

```xml

<dependency>
    <groupId>com.google.cloud</groupId>
    <artifactId>google-cloud-messaging</artifactId>
    <version>1.2.0</version>
</dependency>
```

```
Create a Java class that implements the GoogleCloudMessaging.MessageSender interface. The following is an example of a class that sends an email message:
```

```java
public class EmailSender implements GoogleCloudMessaging.MessageSender {

    @Override
    public void sendMessage(String toAddress, String subject, String body) {
        // Create a Cloud Messaging message.
        GoogleCloudMessaging.Message message = new GoogleCloudMessaging.Message();
        message.setTo(toAddress);
        message.setSubject(subject);
        message.setBody(body);

        // Send the message.
        GoogleCloudMessaging.send(message);
    }
}
```

```
In your main method, create an instance of the EmailSender class and call the sendMessage() method to send the email message.
EmailSender sender = new EmailSender();
sender.sendMessage("to@example.com", "Subject", "Body");
```

---

# [Through Gmail Server](https://developers.google.com/gmail/api/guides/sending)

## To send an email using Google App Script, you can use the following code:

```java
function sendEmail(to,subject,body){
        var mail=GmailApp.createEmail();
        mail.setSubject(subject);
        mail.setBody(body);
        mail.setTo(to);
        mail.send();
        }
```

```java
package org.Test19;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

class Mailer {
    public static void send(String from, String password, String to, String sub, String msg) {
        //Get properties object
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        //get Session
        Session session = Session.getDefaultInstance(props, new Authenticator() {
            private PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        //compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(sub);
            message.setText(msg);
            //send message
            Transport.send(message);
            System.out.println("message sent successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}
```

---

# With GCP and SendGrid API

```java
package com.manju.gcp.mail;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class SendGridMailService {

    private final String SENDGRID_ENDPOINT = "mail/send";
    private final String HTML_TYPE = "text/html";

    private final String fromEmailAddress;
    private final String fromName;
    private final SendGrid sendGrid;


    public SendGridMailService(String sendGridAPIKey, String fromEmailAddress, String fromName) {
        sendGrid = new SendGrid(sendGridAPIKey);
        this.fromEmailAddress = fromEmailAddress;
        this.fromName = fromName;
    }

    /**
     * Method to send mail with out an attachment.
     *
     * @param toEmailsList -- List of to email addresses.
     * @param ccEmailsList -- List of cc email addresses.
     * @param bccEmailsList -- List of bcc email addresses.
     * @param subject -- Subject of the mail.
     * @param body -- Content of the body mail.
     */
    public void sendMailWithoutAttachment(List<String> toEmailsList, List<String> ccEmailsList, List<String> bccEmailsList, String subject, String body) {
        sendMail(toEmailsList, ccEmailsList, bccEmailsList, HTML_TYPE, subject, body, Optional.empty());
    }

    /**
     * Method to send mail with an attachment.
     *
     * @param toEmailsList -- List of to email addresses.
     * @param ccEmailsList -- List of cc email addresses.
     * @param bccEmailsList -- List of bcc email addresses.
     * @param subject -- Subject of the mail.
     * @param body -- Content of the body mail.
     * @param attachment -- Holds the type to file along with content to be attached in the mail. Use method convertPathToAttachment(filepath, attchmentType) method to get attachment object.
     */
    public void sendMailWithAttachment(List<String> toEmailsList, List<String> ccEmailsList, List<String> bccEmailsList, String subject, String body, Optional<Attachments> attachment) {
        sendMail(toEmailsList, ccEmailsList, bccEmailsList, HTML_TYPE, subject, body, attachment);
    }

    /**
     * Method to send mail with attachment if is present using send grid sdk.
     * Attaches attachment object if it present.
     *
     *
     * @param toEmailsList -- List of to email addresses.
     * @param ccEmailsList -- List of cc email addresses.
     * @param bccEmailsList -- List of bcc email addresses.
     * @param contentType -- Type of the content type to be send in the body of the mail. ex: text/plain, text/html etc.,
     * @param subject -- Subject of the mail.
     * @param body -- Content of the body mail.
     * @param attachment -- Holds the file content to be attached in the mail.
     */
    private void sendMail(List<String> toEmailsList, List<String> ccEmailsList, List<String> bccEmailsList, String contentType,
                          String subject, String body, Optional<Attachments> attachment) {
        try {
            if (Objects.isNull(toEmailsList) || toEmailsList.size() == 0)
                return;
            Email fromEmail = new Email(fromEmailAddress, fromName);
            Content bodyContent = new Content(contentType, body);
            Mail mail = new Mail();
            mail.setFrom(fromEmail);
            mail.setSubject(subject);
            mail.addContent(bodyContent);
            Personalization personalization = new Personalization();
            //add to email addresses
            toEmailsList.forEach(toAddress -> {
                Email toEmail = new Email(toAddress);
                personalization.addTo(toEmail);
            });
            //add cc email addresses
            if (Objects.nonNull(ccEmailsList) && ccEmailsList.size() > 0) {
                ccEmailsList.forEach(ccAddress -> {
                    Email ccEmail = new Email(ccAddress);
                    personalization.addCc(ccEmail);
                });
            }
            //add bcc email addresses
            if (Objects.nonNull(bccEmailsList) && bccEmailsList.size() > 0) {
                bccEmailsList.forEach(bccAddress -> {
                    Email bccEmail = new Email(bccAddress);
                    personalization.addBcc(bccEmail);
                });
            }
            mail.addPersonalization(personalization);

            //Add an attachment if it is present
            attachment.ifPresent(mail::addAttachments);

            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint(SENDGRID_ENDPOINT);
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            System.out.println("Email Sent: response status code:" + response.getStatusCode());
            System.out.println("Email Sent: response status body:" + response.getBody());
        } catch (Exception ex) {
            System.err.println("Error in sending email->" + ex.getLocalizedMessage());
            ex.printStackTrace();
        }
    }

    /**
     * Method to convert file into send grid specific attachment object.
     *
     * @param filePath -- Path of the file to be converted into an attachment object.
     * @param attachmentFileType -- Type of the file to be converted. ex: application/pdf, application/json etc.,
     * @return -- Returns the send grid specific attachment object which holds the file content, file name and its type.
     */
    public Optional<Attachments> convertPathToAttachment(Path filePath, String attachmentFileType) {
        try {
            if (!filePath.toFile().exists()) {
                return Optional.empty();
            }
            Attachments attachment = new Attachments();
            byte[] attachmentContentBytes = Files.readAllBytes(filePath);
            String attachmentContent = Base64.getEncoder().encodeToString(attachmentContentBytes);
            attachment.setContent(attachmentContent);
            attachment.setType(attachmentFileType);
            attachment.setFilename(filePath.getFileName().toString());
            attachment.setDisposition("attachment");
            return Optional.of(attachment);
        } catch (IOException io) {
            System.out.println("Error in reading and converting file ->" + filePath.toString());
            io.printStackTrace();
        }
        return Optional.empty();
    }
}
```