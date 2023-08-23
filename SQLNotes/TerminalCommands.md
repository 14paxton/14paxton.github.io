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

- Get timezone

```sql
SELECT @@global.time_zone, @@session.time_zone;
```

- Get timestamp

```sql
 SELECT CURRENT_TIMESTAMP();
```

- Set timestamp utc

```sql
 SET
@@session.time_zone='+00:00';
```

You can set in my.cnf

[mysqld]

## other variables

default_time_zone='+00:00'

- GET PATHS

```mysql
SHOW VARIABLES WHERE Variable_Name LIKE "%dir"
```

## MySQL import

```shell
LOAD DATA LOCAL INFILE 'C:/Groovy/englishData.csv' INTO TABLE original_data 

FIELDS TERMINATED BY ','  

ENCLOSED BY '"'  

LINES TERMINATED BY '\r\n' 
```

## Show db users

```mysql
SELECT user,authentication_string,plugin,host FROM mysql.user;
```