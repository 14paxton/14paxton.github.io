---
title: MySQL
permalink: Linux/MySQL
category: Linux
parent: Linux
layout: default
has_children: false
share: true
shortRepo:
  - linux
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

---

<br/>

# Loose Notes

```shell
MYSQL mysql -u USERNAME -p
```

```shell
show databases;
```

## SETTING TIMEZONES

- Get timezone

```shell
SELECT @@global.time_zone, @@session.time_zone;
```

- Get timestamp

```shell
SELECT CURRENT_TIMESTAMP();
```

- Set timestamp utc

```shell
 SET @@session.time_zone='+00:00';
```

> You can set in my.cnf

```shell
 [mysqld]

  **other variables**

  default_time_zone='+00:00'
```

# csv to table

```shell
 GET PATHS

MySQL import

LOAD DATA LOCAL INFILE 'C:/Groovy/englishData.csv' INTO TABLE original_data

FIELDS TERMINATED BY ','

ENCLOSED BY '"'

LINES TERMINATED BY '\r\n'

IGNORE 1 LINES

```

# trouble installing

```shell
sudo apt-get remove --purge mysql-\*
```

```shell
sudo apt-get autoremove
```

```shell
sudo apt-get autoclean
```

```shell
sudo apt-get dist-upgrade
```

```shell
sudo apt-get install mysql-server mysql-client
```

> (or maria if still having trouble).

```shell
sudo apt-get install mariadb-server
```

- If you have issues uninstalling/installing because MySQL process is live, you can try this first, then above:

```shell
  sudo kill $(pgrep mysql)

```

# other trouble shooting

-      A very simple solution which I (the linux noob) had to dig up... is to create the file.

```
  nano /etc/mysql/my.cnf.fallback
```

> and fill it with the default content from the mysql-common 5.7.11-0ubuntu6 package.

```text
  #
  # The MySQL database server configuration file.
  #
  # You can copy this to one of:
  # - "/etc/mysql/my.cnf" to set global options,
  # - "~/.my.cnf" to set user-specific options.
  #
  # One can use all long options that the program supports.
  # Run program with --help to get a list of available options and with
  # --print-defaults to see which it would actually understand and use.
  #
  # For explanations see
  # http://dev.mysql.com/doc/mysql/en/server-system-variables.html

  # This will be passed to all mysql clients
  # It has been reported that passwords should be enclosed with ticks/quotes
  # escpecially if they contain "#" chars...
  # Remember to edit /etc/mysql/debian.cnf when changing the socket location.

  # Here is entries for some specific programs
  # The following values assume you have at least 32M ram

  !includedir /etc/mysql/conf.d/  #
  # The MySQL database server configuration file.
  #
  # You can copy this to one of:
  # - "/etc/mysql/my.cnf" to set global options,
  # - "~/.my.cnf" to set user-specific options.
  #
  # One can use all long options that the program supports.
  # Run program with --help to get a list of available options and with
  # --print-defaults to see which it would actually understand and use.
  #
  # For explanations see
  # http://dev.mysql.com/doc/mysql/en/server-system-variables.html

  # This will be passed to all mysql clients
  # It has been reported that passwords should be enclosed with ticks/quotes
  # escpecially if they contain "#" chars...
  # Remember to edit /etc/mysql/debian.cnf when changing the socket location.

  # Here is entries for some specific programs
  # The following values assume you have at least 32M ram

  !includedir /etc/mysql/conf.d/
```

# Resources

- https://www.apt-browse.org/browse/ubuntu/xenial/main/all/mysql-common/5.7.11-0ubuntu6/file/etc/mysql/my.cnf.fallback
- https://askubuntu.com/questions/643251/having-trouble-installing-and-removing-mysql-in-ubuntu
