---  
title: MySQL    
permalink: Linux/MySQL    
category:  Linux    
parent:   Linux    
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
    
***    
    
<br/>    
    
# Loose Notes    
    
MYSQL mysql -u USERNAME -p    
    
show databases;    
    
SETTING TIMEZONES    
    
o Get timezone = SELECT @@global.time_zone, @@session.time_zone;    
    
o Get timestamp = SELECT CURRENT_TIMESTAMP(); o Set timestamp utc = SET @@session.time_zone='+00:00'; § You can set in my.cnf    
    
o [mysqld]    
    
                             **other variables**    
    
             default_time_zone='+00:00'    
    
-GET PATHS    
    
MySQL import    
    
LOAD DATA LOCAL INFILE 'C:/Groovy/englishData.csv' INTO TABLE original_data    
    
FIELDS TERMINATED BY ','    
    
ENCLOSED BY '"'    
    
LINES TERMINATED BY '\r\n'    
    
IGNORE 1 LINES    
    
## trouble installing    
    
sudo apt-get remove --purge mysql-\*    
sudo apt-get autoremove    
sudo apt-get autoclean    
sudo apt-get dist-upgrade    
    
sudo apt-get install mysql-server mysql-client (or maria if still having trouble). sudo apt-get install mariadb-server    
    
- If you have issues uninstalling/installing because MySQL process is live, you can try this first, then above:    
  sudo kill $(pgrep mysql)    
    
    
- other trouble shooting    
-      A very simple solution which I (the linux noob) had to dig up... is to create the file.    
    
  nano /etc/mysql/my.cnf.fallback    
  and fill it with the default content from the mysql-common 5.7.11-0ubuntu6 package.    
    
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
    
  !includedir /etc/mysql/conf.d/    
    
           - https://www.apt-browse.org/browse/ubuntu/xenial/main/all/mysql-common/5.7.11-0ubuntu6/file/etc/mysql/my.cnf.fallback    
           - https://askubuntu.com/questions/643251/having-trouble-installing-and-removing-mysql-in-ubuntu