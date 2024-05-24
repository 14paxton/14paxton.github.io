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

- ```--url 'smtp://smtp.gmail.com:587': Specifies the SMTP server and port to connect to. Gmail uses smtp.gmail.com on port 587.```
- ```--ssl-reqd: Enforces SSL/TLS encryption.```
- ```--mail-from 'your-email@gmail.com': The sender's email address.```
- ```--mail-rcpt 'recipient-email@example.com': The recipient's email address. You can specify multiple recipients by using multiple --mail-rcpt options.```
- ```--upload-file mail.txt: Specifies the file that contains the email's content. This file should include the email headers and body.```
- ```--user 'your-email@gmail.com:your-email-password': The SMTP server authentication details in the format username:password.```
- ```--insecure: Allows connections to SSL sites without certificates. Remove this if you want to enforce certificate validation.```
- ```--verbose: Provides detailed information about the curl operation.```

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

## Install Debian/Ubuntu

* ```apt-get install postfix```

**Alternatively, without the bloat of postfix**

* ```apt-get install heirloom-mailx```

## Install Redhat/Centos

```yum install mailx```

## Command

```shell
    cat mysqldbbackup.sql | mailx backup@email.com
```

Newer versions of mailx support -a flag for attachments!

```shell
mailx -a backup.sql -a grants.sql backup@email.com
```

# Mutt

## Install Debian/Ubuntu

* ```apt-get install mutt```

## Install Redhat/Centos

* ```yum install mutt```

## Command

```shell
    echo "This is the message body" | mutt -a "/path/to/file.to.attach" -s "subject of message" -- recipient@example.com

```

# uuencode and mail

This sends the uuencoded part inline and not as an attachment. Many mail-clients recognize this though and display the uuencoded part as an attachment. Don't use uuencode when other alternatives use
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

# BASH and netcat

# Install Debian/Ubuntu

    apt-get install netcat

# Script

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