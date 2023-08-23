---
title:        Terminal-Commands
permalink:    SQLNotes/TerminalCommands
category:     SQLNotes/
parent:       SQLNotes
layout:       default
has_children: false
share:        true
shortRepo:
  - sqlnotes
  - default
---

***

<details  markdown="block">  
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

***

# MYSQL

```shell
mysql -u USERNAME -p

```

```shell
show databases;

```

## SETTING TIMEZONES

### Get timezone

```sql
SELECT @@global.time_zone, @@session.time_zone;
```

### Get timestamp

```sql
 SELECT CURRENT_TIMESTAMP();
```

### Set timestamp utc

```sql
 SET @@session.time_zone = '+00:00';
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    You can set in my.cnf       
</div>

## other variables

default_time_zone='+00:00'

- GET PATHS

```sql
SHOW VARIABLES WHERE Variable_Name LIKE "%dir";
```

## MySQL import

```shell
LOAD DATA LOCAL INFILE 'C:/Groovy/englishData.csv' INTO TABLE original_data 

FIELDS TERMINATED BY ','  

ENCLOSED BY '"'  

LINES TERMINATED BY '\r\n' 
```

## Show db users

```sql
SELECT user, authentication_string, plugin, host
FROM mysql.user;
```