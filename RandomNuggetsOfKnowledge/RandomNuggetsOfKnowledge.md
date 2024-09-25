---
title: RandomNuggetsOfKnowledge
layout: default
permalink: RandomNuggetsOfKnowledge
category: RandomNuggetsOfKnowledge
has_children: true
share: true
shortRepo:

- randomnuggetsofknowledge
- default

---

<br/>

---

# SMS

- > [Verizon SMS API](https://thingspace.verizon.com/documentation/apis/sms.html)

## sms with email

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Most major carriers offer an email to text service. The program can use email to send an SMS message. For example:
</div>

### C#

```csharp
var message = new MailMessage();
message.From = new MailAddress("sender@foo.bar.com");

message.To.Add(new MailAddress("5551234567@txt.att.net"));//See carrier destinations below
//message.To.Add(new MailAddress("5551234568@txt.att.net"));

//message.CC.Add(new MailAddress("carboncopy@foo.bar.com"));
message.Subject = "This is my subject";
message.Body = "This is the content";

var client = new SmtpClient();
client.Send(message);
```

## [Carrier destinations](https://en.wikipedia.org/wiki/SMS_gateway)

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
<p> Compose a new email and use the recipient's 10-digit wireless phone number, followed by:</p>
<p>[cell phone number]@[carrier's gateway domain]</p>
<p>For example, 5551234567@txt.att.net</p>
</div>

> > For example, 5551234567@txt.att.net.

- `ATT`: [phonenumber]@`txt.att.net.`
- `Verizon`: Similarly, [phonenumber]@`vtext.com`
- `Sprint`: [phonenumber]@`messaging.sprintpcs.com`
- `TMobile`: [phonenumber]@`tmomail.net`
- `Virgin Mobile`: [phonenumber]@`vmobl.com`
- `Nextel`: [phonenumber]@`messaging.nextel.com`
- `Boost`: [phonenumber]@`myboostmobile.com`
- `Alltel`: [phonenumber]@`message.alltel.com`
- `EE`: [phonenumber]@`mms.ee.co.uk` (might support send without reply-to)

| Mobile carrier                                                               | SMS gateway domain        | MMS gateway domain      |
|------------------------------------------------------------------------------|---------------------------|-------------------------|
| [Alltel](https://en.wikipedia.org/wiki/Alltel)                               | sms.alltelwireless.com    | mms.alltelwireless.com  |
| [AT&T](https://en.wikipedia.org/wiki/AT%26T_Mobility)                        | txt.att.net               | mms.att.net             |
| [Boost Mobile](<https://en.wikipedia.org/wiki/Boost_Mobile_(United_States)>) | sms.myboostmobile.com     | myboostmobile.com       |
| [Consumer Cellular](https://en.wikipedia.org/wiki/Consumer_Cellular)         | mailmymobile.net          | mailmymobile.net        |
| [Cricket Wireless](https://en.wikipedia.org/wiki/Cricket_Wireless)           | mms.cricketwireless.com   | mms.cricketwireless.com |
| [Google Fi Wireless](https://en.wikipedia.org/wiki/Google_Fi_Wireless)       | msg.fi.google.com         | msg.fi.google.com       |
| [MetroPCS](https://en.wikipedia.org/wiki/MetroPCS)                           | mymetropcs.com            | mymetropcs.com          |
| [Republic Wireless](https://en.wikipedia.org/wiki/Republic_Wireless)         | text.republicwireless.com | na                      |
| [Sprint](https://en.wikipedia.org/wiki/Sprint_Corporation)                   | messaging.sprintpcs.com   | pm.sprint.com           |
| [VerizonWireless](<https://en.wikipedia.org/wiki/Verizon_(mobile_network)>)  | vtext.com                 | vzwpix.com              |