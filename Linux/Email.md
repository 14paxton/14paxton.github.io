---
title:        Email
permalink:    /Linux/Email
category:     Linux
parent:       Linux
layout:       default
has_children: false
share:        true
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

# [Setup a Local Only SMTP Email Server (Linux, Unix, Mac)](https://gist.github.com/raelgc/6031274)

# curl

```shell
curl --url 'smtp://smtp.gmail.com:587' \
     --ssl-reqd \
     --mail-from 'your-email@gmail.com' \
     --mail-rcpt 'recipient-email@example.com' \
     --upload-file mail.txt \
     --user 'your-email@gmail.com:your-email-password' \
     --insecure \
     --verbose
```

> Detailed Explanation of Options

- ```--url 'smtp://smtp.gmail.com:587':```
    - Specify the SMTP server and port to connect to. Gmail uses smtp.gmail.com on port 587.
- ```--ssl-reqd:```
    - Enforces SSL/TLS encryption.
- ```--mail-from 'your-email@gmail.com':```
    - The sender's email address.
- ```--mail-rcpt 'recipient-email@example.com':```
    - The recipient's email address. You can specify multiple recipients by using multiple --mail-rcpt options.
- ```--upload-file mail.txt:```
    - Specify the file that contains the email's content. This file should include the email headers and body.
- ```--user 'your-email@gmail.com:your-email-password':```
    - The SMTP server authentication details in the format username:password.
- ```--insecure:```
    - Allows connections to SSL sites without certificates. Remove this if you want to enforce certificate validation.
- ```--verbose:```
    - Provides detailed information about the curl operation.

## with attachment

```shell
curl --url 'smtp://smtp.gmail.com:587' \
     --ssl-reqd \
     --mail-from 'your-email@gmail.com' \
     --mail-rcpt 'recipient-email@example.com' \
     --user 'your-email@gmail.com:your-email-password' \
     --upload-file mime-email.txt \
     --insecure \
     --verbose
```

- mem-email.txt
   ```text
    From: your-email@gmail.com
    To: recipient-email@example.com
    Subject: Test Email with Attachment
    MIME-Version: 1.0
    Content-Type: multipart/mixed; boundary="simple boundary"
    
    --simple boundary
    Content-Type: text/plain; charset=us-ascii
    
    This is the body of the email.
    
    --simple boundary
    Content-Type: text/plain; charset=us-ascii
    Content-Disposition: attachment; filename="attachment.txt"
    
    This is the content of the attachment.
    
    --simple boundary--
   ```

# mailx

## Install on Debian/Ubuntu

* ```apt-get install postfix```

**Alternatively, without the bloat of postfix**

* ```apt-get install heirloom-mailx```

## Install on Redhat/Centos

```yum install mailx```

## Command

   ```shell
    cat mysqldbbackup.sql | mailx backup@email.com
   ```

  ```shell
   mailx -a backup.sql -a grants.sql backup@email.com
  ```

> Newer versions of mailx support -a flag for attachments!

> Script Example

   ```shell
   #!/bin/bash
   
   # Email details
   TO="recipient@example.com"
   SUBJECT="Test Email with Attachment"
   FROM="sender@example.com"
   BODY="This is the plain text body of the email"
   HTML_BODY="<html><body><h1>This is the HTML body</h1></body></html>"
   ATTACHMENT="file.txt"
   
   # Send the email
   echo "$BODY" | mailx -a "Content-Type: text/html" -s "$SUBJECT" -a "From: $FROM" $TO -A $ATTACHMENT
   ```

# Mutt

## Install on Debian/Ubuntu

* ```apt-get install mutt```

## Install on Redhat/Centos

* ```yum install mutt```

## Command

```shell
    echo "This is the message body" | mutt -a "/path/to/file.to.attach" -s "subject of message" -- recipient@example.com

```

# uuencode and mail

This sends the uuencoded part inline and not as an attachment. Many mail-clients recognize this though and display the uuencoded part as an
attachment. Don't use uuencode when other alternatives use
MIME.

## Command

```shell
    gzip -c ldiff.sql | uuencode mysqldbbackup.sql.gz  | mail -s "Ldiff from openldap" backup@example.com

```

# Mpack

## Install Debian/Ubuntu

* ```apt-get install mpack```

## Command

```shell
    mpack -s subject /dev/stdin loser@example.com < file

```

# Sendemail.pl

* http://caspian.dotconf.net/menu/Software/SendEmail/

## Command

```shell
    sendemail -f mandatory@email.com-t to@some.one -m "Here are your files!" -a file1.jpg file2.zip

```

# Swaks

## Install Debian/Ubuntu

> Swaks is an smtp of CURL, install it first:

```shell
curl http://www.jetmore.org/john/code/swaks/files/swaks-20130209.0/swaks -o swaks
```

> Set the permissions for the script so you can run it

```shell
chmod +x swaks
```

> It's based on perl, so install perl

```shell
sudo apt-get -y install perl
```

* apt-get install swaks

## Command

```shell
    swaks -tls \
    --to ${MAIL_TO} \
    --from ${MAIL_FROM} \
    --server ${MAIL_SERVER} \
    --auth LOGIN \
    --auth-user ${MAIL_USER} \
    --auth-password ${MAIL_PASSWORD} \
    --header "Subject: $MAIL_SUBJECT" \
    --header "Content-Type: text/html; charset=UTF-8" \
    --body "$MESSAGE" \
    --attach mysqldbbackup.sql
```

## Bash Script

- Uses HTML file
- Uses an inline Image for an HTML file and attachment

<details markdown="block">    

<summary>Bash Script With Attachments</summary>

```shell
#!/bin/bash

swaks -f sender@gmail.com --auth \
  --server smtp.sendgrid.net:587 \
  --au apikey \
  --ap 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 \
  --to receiver@gmail.com \
  --header "Content-Type: text/html; charset=UTF-8" \
  --attach-type text/html \
  --attach-body @../EmailTemplate/EmailTemplate.html \
  --h-From: '"bob" <bob@gmail.com>' \
  --h-Subject: "Subject" \
  --add-header "Content-ID: inlineImage.png" \
  --attach-name "inlineImage.png" \
  --attach-type image/png \
  --attach @../EmailTemplate/inlineImage.png
```

</details>

# Telnet

> First, you need to find out the SMTP server address for the domain. Let's find out the SMTP server address for gmail.com

> Goto MS Dos prompt and type ```nslookup``` command.

```
> set q=mx
> gmail.com

Non-authoritative answer:
gmail.com       MX preference = 30, mail exchanger =     
gmail.com       MX preference = 20, mail exchanger = alt2.gmail-smtp-in.l.google.com
gmail.com       MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com
gmail.com       MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com
gmail.com       MX preference = 40, mail exchanger = alt4.gmail-smtp-in.l.google.com
```

> Now connect to gmail SMTP server with Telnet by typing the following command on the command prompt.

```shell
telnet alt3.gmail-smtp-in.l.google.com 25
```

```
220 mx.google.com ESMTP t15si14936218ibf.58
helo kathir
250 mx.google.com at your service
mail from: <kathirusa@yahoo.com>
250 2.1.0 OK t15si14936218ibf.58
rcpt to: <kathircpp@gmail.com>
250 2.1.5 OK t15si14936218ibf.58
data
354  Go ahead t15si14936218ibf.58
from: kathir
to: kathir
subject: hi from kathir

This is for testing

.
250 2.0.0 OK 1287958967 t15si14936218ibf.58
```

# Sending Email with a MIME Boundary

> MIME (Multipurpose Internet Mail Extensions) boundaries

- > `BOUNDARY`: This is a unique string that acts as a boundary between different parts of the email content.Each section is separated by
  `--BOUNDARY`,
  and
  the end of the email is indicated with `--BOUNDARY--`.

- > `Multipart/alternative`: This allows sending both plain text and `HTML` versions of the email so that the email client can choose which one to
  display.

- > `Content-Type`: This specifies the type of content in each part. `text/plain` for plain text and `text/html` for `HTML`.

- > `Content-Type`: `multipart/mixed`: This specifies that the email contains multiple parts (like text and attachments).

- > `base64`: Converts the file into a `base64` string for safe transmission via email.

- > `Content-Disposition`: attachment: Marks the part of the email as an attachment.

## Sendmail

<details markdown="block">    

<summary>Example 1</summary>

```shell
#!/bin/bash

to="any@email.com"
from="your@email.com"
boundary=$(uuidgen -t)
body_boundary=$(uuidgen -t)
now=$(date +"%a, %d %b %Y %T %z")

sendmail -t << EOF2
From: ${from}
To: ${to}
Date: ${now}
Subject: This is a test multipart message
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="${boundary}"

--${boundary}
Content-Type: multipart/alternative; boundary="${body_boundary}"

--${body_boundary}
Content-type: text/plain; charset=ISO-8859-1

This is a text message.     --> Here am going to incorporate text version
--${body_boundary}
Content-type: text/html; charset=utf-8
Content-Disposition: inline

<!DOCTYPE html>
<body>
<pre>
Hello,

This is a html version.     --> here am going to incorporate html version

Regards...
</pre>
<body>
--${body_boundary}--
--${boundary}--
EOF2

sc=$?
echo "sedmail rc=${rc}"

```

</details>

<details markdown="block">    

<summary>Example With Attachment</summary>

```shell
#!/bin/bash

# Define email details
TO="recipient@example.com"
SUBJECT="Test Email with Attachment"
FROM="sender@example.com"
ATTACHMENT="file.txt"
FILENAME=$(basename "$ATTACHMENT")

# Define the boundary
BOUNDARY="ZZ_/afg6432dfgkl.94531q"

# Create the email content
{
  echo "From: $FROM"
  echo "To: $TO"
  echo "Subject: $SUBJECT"
  echo "MIME-Version: 1.0"
  echo "Content-Type: multipart/mixed; boundary=\"$BOUNDARY\""
  echo ""
  
  # Plain text version of the email
  echo "--$BOUNDARY"
  echo "Content-Type: text/plain; charset=\"UTF-8\""
  echo "Content-Transfer-Encoding: 7bit"
  echo ""
  echo "This is the plain text version of the email."
  echo ""

  # Attachment part
  echo "--$BOUNDARY"
  echo "Content-Type: application/octet-stream; name=\"$FILENAME\""
  echo "Content-Transfer-Encoding: base64"
  echo "Content-Disposition: attachment; filename=\"$FILENAME\""
  echo ""
  base64 "$ATTACHMENT"
  echo ""

  # End of the multipart message
  echo "--$BOUNDARY--"
} | sendmail -t
```
</details>

# Netcat

# Install Debian/Ubuntu

```shell
    apt-get install netcat
```

<details  markdown="block">
<summary> Script for Netcat </summary>

```shell

    #!/bin/sh

    # Default reception
    TOEMAIL="myEmail@domain.ltd";
    # Default Subject
    SUBJECT="You got mail - $DATE";
    # Default Contents
    MSGBODY="Hello, this is the default message body";
    # Default Attachment
    #ATTACHMENT="/tmp/testoutput"
    # Default smtp server
    mailserver="smtp.server.ltd"
    mailserverPort="25"

    showUsage() {
            echo "$0 -a /file/to/attach [-m /message/file] [-M \"Message string\"] -s \"subject\" -r receiver@domain.com"
            echo
            echo "The attachment (-a) is required, if no attachment is used then rather use sendmail directly."
    }

    fappend() {
        echo "$2">>$1;
    }
    DATE=`date`

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # This might need correction to work on more places, this is tested at a ubuntu 13.10 machine.  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    domain=`grep search /etc/resolv.conf | awk '{print $2;}'`
    computer=`hostname`
    user=`whoami`
    FREMAIL="$user@$computer.$domain"

    while getopts "M:m:a:s:r:" opt; do
      case $opt in
            s)
              SUBJECT="$OPTARG - $DATE"
              ;;
            r)
              TOEMAIL="$OPTARG"
              ;;
            m)
              MSGBODY=`cat $OPTARG`
              ;;
            M)
              MSGBODY="$OPTARG"
              ;;
            a)
              ATTACHMENT="$OPTARG"
              ;;
            :)
              showUsage
              ;;
            \?)
              showUsage
              ;;
      esac
    done

    if [ "$ATTACHMENT" = "" ]; then
            showUsage
            exit 1
    fi

    MIMETYPE=`file --mime-type -b $ATTACHMENT`
    TMP="/tmp/tmpmail_"`date +%N`;
    BOUNDARY=`date +%s|md5sum|awk '{print $1;}'`
    FILENAME=`basename $ATTACHMENT`

    DATA=`cat $ATTACHMENT|base64`

    rm $TMP 2> /dev/null

    fappend $TMP "EHLO $computer.$domain"
    fappend $TMP "MAIL FROM:<$FREMAIL>"
    fappend $TMP "RCPT TO:<$TOEMAIL>"
    fappend $TMP "DATA"
    fappend $TMP "From: $FREMAIL"
    fappend $TMP "To: $TOEMAIL"
    fappend $TMP "Reply-To: $FREMAIL"
    fappend $TMP "Subject: $SUBJECT"
    fappend $TMP "Content-Type: multipart/mixed; boundary=\"$BOUNDARY\""
    fappend $TMP ""
    fappend $TMP "This is a MIME formatted message.  If you see this text it means that your"
    fappend $TMP "email software does not support MIME formatted messages."
    fappend $TMP ""
    fappend $TMP "--$BOUNDARY"
    fappend $TMP "Content-Type: text/plain; charset=UTF-8; format=flowed"
    fappend $TMP "Content-Disposition: inline"
    fappend $TMP ""
    fappend $TMP "$MSGBODY"
    fappend $TMP ""
    fappend $TMP ""
    fappend $TMP "--$BOUNDARY"
    fappend $TMP "Content-Type: $MIMETYPE; name=\"$FILENAME\""
    fappend $TMP "Content-Transfer-Encoding: base64"
    fappend $TMP "Content-Disposition: attachment; filename=\"$FILENAME\";"
    fappend $TMP ""
    fappend $TMP "$DATA"
    fappend $TMP ""
    fappend $TMP ""
    fappend $TMP "--$BOUNDARY--"
    fappend $TMP ""
    fappend $TMP "."
    fappend $TMP "quit"

    netcat $mailserver $mailserverPort < $TMP >> $TMP
    rc="$?"
    if [ "$rc" -ne "0" ]; then
        echo "Returncode: $rc"
        echo "Please inspect $TMP"
    else
        rm $TMP;
    fi
```
</details>