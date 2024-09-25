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

> ### System.Net.Mail.SmtpClient

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

> ### [MailMessage Class ](https://learn.microsoft.com/en-us/dotnet/api/system.net.mail.mailmessage?redirectedfrom=MSDN&view=net-9.0)

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

> ### MailKit.Net.Smtp.SmtpClient
>> [MailKit Github](https://github.com/jstedfast/MailKit)

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

> At this point, the email address that the message comes from really doesn’t matter – it won’t show up as GMail will override it when it gets passed
> on to the mobile phone carrier.  
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

# Resources

## Free SMTP Servers

<table border="1" data-aura-rendered-by="148:474;a" style="width: 600px;">
    <thead>
    <tr valign="top">
        <th colspan="1" rowspan="1" style="text-align: center;">Provider</th>
        <th colspan="1" rowspan="1" style="text-align: center;">SMTP Server</th>
        <th colspan="1" rowspan="1" style="text-align: center;">SMTP<br> Port</th>
        <th colspan="1" rowspan="1" style="text-align: center;">SMTP Host Name</th>
        <th colspan="1" rowspan="1" style="text-align: center;">Use<br> TLS</th>
        <th colspan="1" rowspan="1" style="text-align: center;">Use<br> Start<br> TLS</th>
    </tr>
    </thead>
    <tbody>
    <tr valign="top">
        <td colspan="1" rowspan="1" style="text-align: center;">Plasec Brinkster</td>
        <td colspan="1" rowspan="1" style="text-align: center;"><a href="http://mymail.brinkster.com" rel="noopener" target="_blank">mymail.brinkster.com</a></td>
        <td colspan="1" rowspan="1" style="text-align: center;">2525</td>
        <td colspan="1" rowspan="1" style="text-align: center;">leave blank/empty</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
    </tr>
    <tr valign="top">
        <td colspan="1" rowspan="1" style="text-align: center;">Yahoo Mail</td>
        <td colspan="1" rowspan="1" style="text-align: center;"><a href="http://smtp.mail.yahoo.com" rel="noopener" target="_blank">smtp.mail.yahoo.com</a></td>
        <td colspan="1" rowspan="1" style="text-align: center;">587</td>
        <td colspan="1" rowspan="1" style="text-align: center;">leave blank/empty</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
    </tr>
    <tr valign="top">
        <td colspan="1" rowspan="1" style="text-align: center;">Hotmail</td>
        <td colspan="1" rowspan="1" style="text-align: center;"><a href="http://smtp.live.com" rel="noopener" target="_blank">smtp.live.com</a></td>
        <td colspan="1" rowspan="1" style="text-align: center;">587</td>
        <td colspan="1" rowspan="1" style="text-align: center;">leave blank/empty</td>
        <td colspan="1" rowspan="1" style="text-align: center;">yes</td>
        <td colspan="1" rowspan="1" style="text-align: center;">yes</td>
    </tr>
    <tr valign="top">
        <td colspan="1" rowspan="1" style="text-align: center;">Google Gmail</td>
        <td colspan="1" rowspan="1" style="text-align: center;"><a href="http://smtp.gmail.com" rel="noopener" target="_blank">smtp.gmail.com</a>&nbsp;<br> [or&nbsp;<a
                href="http://smtp-relay.gmail.com"
                rel="noopener"
                target="_blank"
        >smtp-relay.gmail.com</a><br> if enabled&nbsp;within&nbsp;client's Gmail account]
        </td>
        <td colspan="1" rowspan="1" style="text-align: center;">587</td>
        <td colspan="1" rowspan="1" style="text-align: center;">leave blank/empty</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
        <td colspan="1" rowspan="1" style="text-align: center;">yes</td>
    </tr>
    <tr valign="top">
        <td colspan="1" rowspan="1" style="text-align: center;">Microsoft Office 365</td>
        <td colspan="1" rowspan="1" style="text-align: center;"><a href="http://smtp.office365.com" rel="noopener" target="_blank">smtp.office365.com</a></td>
        <td colspan="1" rowspan="1" style="text-align: center;">587</td>
        <td colspan="1" rowspan="1" style="text-align: center;">leave blank/empty</td>
        <td colspan="1" rowspan="1" style="text-align: center;">no</td>
        <td colspan="1" rowspan="1" style="text-align: center;">yes</td>
    </tr>
    </tbody>
</table>

## Paid SMTP Servers

<table class="has-black-color has-text-color">
    <thead>
    <tr>
        <th class="has-text-align-left" data-align="left">Free SMTP Servers</th>
        <th class="has-text-align-center" data-align="center"> Starting price</th>
        <th class="has-text-align-center" data-align="center">Free email Daily limit</th>
        <th class="has-text-align-center" data-align="center">Free Email<br>/Month</th>
        <th class="has-text-align-center" data-align="center">Used for</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#1_Brevo" data-type="internal" href="#1_Brevo">Brevo</a></strong></td>
        <td class="has-text-align-center" data-align="center">$25/month for <br>20K emails</td>
        <td class="has-text-align-center" data-align="center">300</td>
        <td class="has-text-align-center" data-align="center">9000</td>
        <td class="has-text-align-center" data-align="center">SMTP, email marketing, SMS, and marketing automation</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#3_Elastic_Emails" data-type="internal" href="#3_Elastic_Emails">Elastic Emails</a></strong></td>
        <td class="has-text-align-center" data-align="center">No daily limit</td>
        <td class="has-text-align-center" data-align="center">100</td>
        <td class="has-text-align-center" data-align="center">3000</td>
        <td class="has-text-align-center" data-align="center">Email campaigns</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#4_SendPulse" data-type="internal" href="#4_SendPulse">Sendpulse</a></strong></td>
        <td class="has-text-align-center" data-align="center">$6.40 for<br>Unlimited emails</td>
        <td class="has-text-align-center" data-align="center">400</td>
        <td class="has-text-align-center" data-align="center">15000</td>
        <td class="has-text-align-center" data-align="center">Email marketing, WhatsApp campaigns, and SMS</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#5_Amazon_SES" data-type="internal" href="#5_Amazon_SES">Amazon SES</a></strong></td>
        <td class="has-text-align-center" data-align="center">$0.10 per<br>1000 emails</td>
        <td class="has-text-align-center" data-align="center">NA</td>
        <td class="has-text-align-center" data-align="center">62000</td>
        <td class="has-text-align-center" data-align="center">Email marketing, notifications, and transactional emails</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#6_Mailgun" data-type="internal" href="#6_Mailgun">Mailgun</a></strong></td>
        <td class="has-text-align-center" data-align="center">$35/month for<br>50K emails</td>
        <td class="has-text-align-center" data-align="center">200</td>
        <td class="has-text-align-center" data-align="center">50000 for the First 30 days</td>
        <td class="has-text-align-center" data-align="center">Transactional emails</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#7_Google_SMTP_Server" data-type="internal" href="#7_Google_SMTP_Server">Google SMTP</a></strong></td>
        <td class="has-text-align-center" data-align="center">$6/month for<br>2000 emails/day</td>
        <td class="has-text-align-center" data-align="center">500mails/day <br>for 14 days</td>
        <td class="has-text-align-center" data-align="center">Valid for 14 days</td>
        <td class="has-text-align-center" data-align="center">For low email volumes</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#8_SendGrid" data-type="internal" href="#8_SendGrid">Sendgrid</a></strong></td>
        <td class="has-text-align-center" data-align="center">$19.95/month for<br>50K emails</td>
        <td class="has-text-align-center" data-align="center">100</td>
        <td class="has-text-align-center" data-align="center">3000</td>
        <td class="has-text-align-center" data-align="center">Promotional emails, Newsletters, Password reset emails</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#9_Moosend" data-type="internal" href="#9_Moosend">Moosend</a></strong></td>
        <td class="has-text-align-center" data-align="center">$9/month for <br>Unlimited emails</td>
        <td class="has-text-align-center" data-align="center">Unlimited</td>
        <td class="has-text-align-center" data-align="center">Unlimited for the First 30 days</td>
        <td class="has-text-align-center" data-align="center">Email marketing</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><strong><a data-id="#10_SMTP2GO" data-type="internal" href="#10_SMTP2GO">SMTP2GO</a></strong></td>
        <td class="has-text-align-center" data-align="center">$10/month for<br>10K emails</td>
        <td class="has-text-align-center" data-align="center">200</td>
        <td class="has-text-align-center" data-align="center">1000</td>
        <td class="has-text-align-center" data-align="center">Transactional <br>and Marketing emails</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><a data-id="#11_MailerSend" data-type="internal" href="#11_MailerSend">MailerSend</a></td>
        <td class="has-text-align-center" data-align="center">$24/month for 50K emails</td>
        <td class="has-text-align-center" data-align="center">NA</td>
        <td class="has-text-align-center" data-align="center">3000</td>
        <td class="has-text-align-center" data-align="center">Transactional emails, Email marekting ,SMTP</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><a data-id="#12_Mailtrap" data-type="internal" href="#12_Mailtrap">Mailtrap</a></td>
        <td class="has-text-align-center" data-align="center">$10/month for 10k emails</td>
        <td class="has-text-align-center" data-align="center">NA</td>
        <td class="has-text-align-center" data-align="center">1000</td>
        <td class="has-text-align-center" data-align="center">SMTP, Email marketing, QA automation</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left"><a data-id="#13_Postmark" data-type="internal" href="#13_Postmark">Postmark</a></td>
        <td class="has-text-align-center" data-align="center">$15/month for 10,000 emails</td>
        <td class="has-text-align-center" data-align="center">NA</td>
        <td class="has-text-align-center" data-align="center">100 emails per month</td>
        <td class="has-text-align-center" data-align="center">Free SMTP relay and transactional emails</td>
    </tr>
    <tr>
        <td class="has-text-align-left" data-align="left">Sarbacane</td>
        <td class="has-text-align-center" data-align="center">129€/month* for unlimited emails</td>
        <td class="has-text-align-center" data-align="center">No daily limitF</td>
        <td class="has-text-align-center" data-align="center">NA</td>
        <td class="has-text-align-center" data-align="center">SMS marketing, SMTP, email marketing, Transactional emails</td>
    </tr>
    </tbody>
</table>