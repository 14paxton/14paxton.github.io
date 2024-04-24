---
title:        Email
permalink:    DotNetNotes/CSharp/Email
category:     DotNetNotes
parent:       CSharp
layout:       default
grand_parent: DotNetNotes
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

# Email Packages

## Body

### MimeKit

```csharp
    using MimeKit;
    
    MimeMessage message = new MimeMessage();
    message.From.Add(new MailboxAddress("brandon paxton", "14paxton@gmail.com"));
    message.To.Add(new MailboxAddress("cunt bigalow", "14paxton@gmail.com"));
    message.Subject = "How you doin'?";
    
    message.Body = new TextPart("plain")
    {
    Text = @"Hey Chandler,
    
    I just wanted to let you know that Monica and I were going to go play some paintball, you in?
    
    -- Joey"
    };
```

### BodyBuilder

> adding attachments too

```csharp
    var builder = new BodyBuilder
    {
        // Set the plain-text version of the message text
        TextBody = @"Hey Alice,
    
    What are you up to this weekend? Monica is throwing one of her parties on
    Saturday. I was hoping you could make it.
    
    Will you be my +1?
    
    -- Joey
    "
    };
    
    string currentDir = Directory.GetCurrentDirectory();
    // string path = Path.Combine(new FileInfo(Assembly.GetExecutingAssembly().Location).DirectoryName,"vcu-chat-bot");
    
    Console.WriteLine(currentDir);
    builder.Attachments.Add ($@"{currentDir}/../Files.zip");
    
    // Now we just need to set the message body and we're done
    message.Body = builder.ToMessageBody ();
```

## SMTP sending

### System.Net.Mail.SmtpClient

> #### ex 1

   ```csharp
     string body = "<head>" +
                   "Here comes some logo" +
                   "</head>" +
                   "<body>" +
                   "<h1>Account confirmation reqest.</h1>" + Environment.NewLine +
                   "<a>Dear User, </a>" + Environment.NewLine +
                   "<a>In order to be able to use musicshop app properly, we require You to confirm Your email address.</a>" + Environment.NewLine +
                   "<a>This is the last step towards using our app.</a>" + Environment.NewLine +
                   "<a>Pleas follow this hyperlink to confirm your address.</a>" + Environment.NewLine +
                   "<a>[Callback url]</a>" +
                   "</body>";
     try
     {
         using (var smtpClient = new System.Net.Mail.SmtpClient("smtp-relay.brevo.com", 587))
         {
             smtpClient.UseDefaultCredentials = false;
             smtpClient.Credentials = new System.Net.NetworkCredential()
             {
                 UserName = "email",
                 Password = "password",
             };
             smtpClient.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
             smtpClient.EnableSsl = true;
    
             smtpClient.Send("14paxton@gmail.com", "14paxton@gmail.com", "Account verification", body);
         }
     }
     catch (Exception e)
     {
         Console.Error.WriteLine("{0}: {1}", e.ToString(), e.Message);
     }
   ```

> #### ex 2

> [MailMessage Class ](https://learn.microsoft.com/en-us/dotnet/api/system.net.mail.mailmessage?redirectedfrom=MSDN&view=net-9.0)

   ```csharp
    using (var client = new System.Net.Mail.SmtpClient())
    {
    
        client.Host = "smtp.office365.com";
        client.Port = 587;
    
        // client.Host = "smtp.elasticemail.com";
        // client.Port = 2525;#1#
    
        // client.Host = "smtp.gmail.com";
        // client.Port = 587;
    
        client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
        client.UseDefaultCredentials = false;
        client.EnableSsl = true;
    
        client.Credentials = new System.Net.NetworkCredential("email", "password");
    
    
        var bpaxton = new System.Net.Mail.MailAddress("14paxton@gmail.com", "Bpaxton");
        var megs = new System.Net.Mail.MailAddress("megs@gmail.com", "Megan");
        using (var message = new System.Net.Mail.MailMessage(
                   from: megs,
                   to: bpaxton
               ))
        {
    
            message.Subject = "Hello from code!";
            message.Body = "Loremn ipsum dolor sit amet ...";
    
            client.Send(message);
        }
    }
   ```

### Mailkit

> [MailKit Github](https://github.com/jstedfast/MailKit)

   ```csharp
    using MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient();
    
    client.Connect("smtp.add.org", 587, false);
    // client.Connect("smtp.office365.com", 587, false);
    // client.Connect("smtp.gmail.com", 587, false);
    // client.Connect("smtp-relay.brevo.com", 587, false);
    
    // Note: only needed if the SMTP server requires authentication
    
    client.Authenticate("admin", "pw");
    
    client.Send(message);
    client.Disconnect(true);
   ```

> #### MailKitSimplified

   ```csharp
        using (var smtpSender = MailKitSimplified.Sender.Services.SmtpSender.Create("smtp.gmail.com").SetCredential("email", "password"))
        {
        smtpSender.WriteEmail
        .From("my.name@example.com")
        .To("14paxton@gmail.com")
        .Subject("Hello World")
        .BodyHtml("<p>Hi</p>")
        .Send();
        
        smtpSender.Dispose();
        }
        
        Console.WriteLine("resp");
   ```

# use GMail as SMTP Server

> GMail accounts can actually be used as an SMTP server, in a manner of speaking.
> That’s exactly what we need – a way of sending an email to the mobile phone carrier, so they can in turn send a text
> message to the mobile phone.
> We send the email to GMail, GMail passes it on to the mobile phone carrier, which turns it into a text message and sends it to our cell phone.
> Yes, it does involve a few
> steps, but you can’t argue against the price (free!).

> The SMTP server functionality isn’t exactly available for anyone to get access to – you have to have a GMail account (which is free).
> Because of this, we will need to do a few special things.
> More on
> that later though.
> Let’s see how it’s done.

> Here’s a code snippet on how to do it. First of all, in our Windows App, we need to include the following “using” statements:

```csharp
using System.Net;
using System.Net.Mail;
```

> Somewhere in the body of the program, we need to create a new MailMessage, give it some details, like so:

```csharp
MailMessage message = new MailMessage();
message.To.Add("1234567890@txt.bell.ca");
message.From = new MailAddress("yourgmailaccount@gmail.com", "App"); //See the note afterwards...
message.Body = "This is your cell phone. How was your day?";
```

> At this point, the email address that the message comes from really doesn’t matter – it won’t show up as GMail will override it when it gets passed on to the mobile phone carrier.  
> The important one to get right is the email address that it is going to be sent to.  
> This depends on your phone number and your mobile carrier.  
> In this case, the phone number is (123)456-7890 and the carrier is Bell.  
> Check out the previously mentioned wikipedia link to see what your carrier-specific email address is.  
> If you don’t get this right, the message will most certainly not get through.

> Next, we need to create an SMTP client, and set it up:

```csharp
SmtpClient smtp = new SmtpClient("smtp.gmail.com");
smtp.EnableSsl = true;
smtp.Port = 587;
smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
smtp.Credentials = new NetworkCredential("yourgmailaddress@gmail.com", "yourgmailpassword");
```

> Here we create a new SMTP Client that will connect to the GMail SMTP server.
> Because we are connecting to a GMail secured server we need to enable SSL, as well as use a particular port – port 587.
>> (There is apparently another port that can be used, but I haven’t heard of anyone getting it to work – port 465).
> Next, you need to put your own GMail email address where “yourgmailaddress.gmail.com”
> is, as well as replace “yourgmailpassword” with your actual GMail password.

> After this, there isn’t much you need to do – send the email, like so:

```csharp
try
{
    smtp.Send(message);
}
catch (Exception ex)
{
    MessageBox.Show(ex.Message);
}
```