---
title: DateAndTime
permalink: GroovyNotes/DateAndTime
category:  GroovyNotes
parent:   GroovyNotes
layout: default
has_children: false
share: true
shortRepo:
  - groovynotes
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

## **[Creating and Formatting Dates]**

### **[USE java LocalDate]**

<https://www.javatpoint.com/java-localdate>

Groovy Time

<http://docs.groovy-lang.org/latest/html/api/groovy/time/TimeCategory.html>

```groovy
use(TimeCategory) {
    endDate = duration ? (endDate + duration.minutes) : (endDate + DEFAULTDURATION.minutes)
}
```

<https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html>

```groovy
def form = DateTimeFormatter.ofPattern("yyyy/MM/dd")
println LocalDate.parse("2020/12/07", form)

form = DateTimeFormatter.ISO_LOCAL_DATE
println LocalDate.now().format(form)

//java date to localdatetime

Date theDate = Date.parse("yyyy/MM/dd hh:mm a", "2020/04/16 07:35am")

LocalDateTime newDate = theDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()

println LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES)
println newDate

println newDate.isBefore(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES))
```

```groovy
Date scheduledDate = Date.parse(userDateFormat + 'hh:mm a', "${schedulingParams?.scheduledDate} ${schedulingParams?.scheduledTime}")

Date utcDate = new Date(scheduledDate.format('yyyy/MM/dd HH:mm:ss', TimeZone.getTimeZone("UTC")))
```

- HH for 24 hour

- a is for am/pm

- add :ss for seconds

- use .format to change date

- USING Calendar

![img.png](assets/images/img.png)

# Java8 Instant

```groovy
Instant nowUtc = Instant.now()
ZoneId asiaSingapore = ZoneId.of("Asia/Singapore")
ZonedDateTime nowAsiaSingapore = ZonedDateTime.ofInstant(nowUtc, asiaSingapore)
```