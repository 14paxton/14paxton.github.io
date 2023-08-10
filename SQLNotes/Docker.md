---  
title:        Docker                
permalink:    SQLNotes/Docker                
category:     SQLNotes                
parent:       SQLNotes                
layout:       default                
has_children: false                
share:        true                
shortRepo:                
- sqlnotes                
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
    
# Postgres    
    
```shell          
docker pull postgres:9.6.14          
```          
    
> You can change the Postgres password by changing the`_POSTGRESS_PASSWORD_`value from`_hydrogen_`to any preferred secured password    
    
		docker run --name <CONTAINER_NAME || postgres-9.6.14> -e POSTGRES_PASSWORD=hydrogen -p 5432:5432 -d -v $HOME/docker/volumes/postgres:/var/lib/postgresql postgres:9.6.14          
    
## PSQL Terminal    
    
Use the following command to hop into the PSQL terminal session.    
    
		docker exec -ti <CONTAINER_NAME || postgres-9.6.14> psql -h localhost -U postgres          
    
data-source in`respository/conf/identity/identity.xml`with the Postgres JNDI configuration name.    
    
```xml          
<!-- identity.xml -->            
<JDBCPersistenceManager>            
  <DataSource>            
    <!-- Include a data source name (jndiConfigName) from the set of datasources defined in master-datasources.xml -->            
    <!-- <Name>jdbc/WSO2CarbonDB</Name> -->            
                
    <Name>jdbc/WSO2CarbonPostgresDB</Name>            
  </DataSource>            
            
```          
    
          
---    
    
# MySQL    
    
```shell          
docker pull mysql          
```          
    
## Run Container    
    
```shell          
docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" --publish 6603:3306 mysql          
```          
    
### Exposing MySQL Container to Host    
    
> Expose the MySQL container to the outside world by mapping the container’s MySQL port to the host machine port using the publish flag. Now, we can connect to the MySQL container through port 6703.          
> Notice, the IP address comes from docker machine. For my docker machine, it is 192.168.99.100.    
    
```shell          
 docker rm -f jspmysql          
 docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" --publish 6703:3306 mysql          
```          
    
## Creating MySQL Image    
    
```shell          
 docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" --publish 6603:3306 mysql          
```          
    
> What is this command doing?    
    
Create a MySQL container named jspmysql.          
Set environment variable MYSQL_ROOT_PASSWORD to jsppassword.          
Expose 3306 and map to 6603 for outside world to connect to this MySQL database.          
In addition, we manually created database jsptutorial and table Product.    
    
``` mysqladmin -u root -p create jsptutorial```          
``` mysql -u root -p jsptutorial < jsp_backup.sql```    
    
In this posting, we will use Dockerfile to simplify the way how to create MySQL container for our JSP Tutorial application.    
    
### Creating MySQL Image with Dockerfile    
    
### Creating Docker File    
    
Create one file named Dockerfile in any directory on local machine.    
    
``` cd ~/Johnny```          
``` mkdir DockerMySQL```          
``` cd DockerMySQL```          
``` vim Dockerfile```    
    
Edit Dockerfile, fill with following content.    
    
### Create MySQL Image for JSP Tutorial Application    
    
```          
FROM mysql          
MAINTAINER csgeek@mail.com          
          
ENV MYSQL_ROOT_PASSWORD jsppassword          
ADD jsp_backup.sql /docker-entrypoint-initdb.d          
          
EXPOSE 3306          
```          
    
The following points need to be noted about the above file.    
    
- The first line is a comment. You can add comments to the Docker File with the help of the # command    
- The FROM keyword tells which base image you want to use. In our example, we are creating an image from the mysql image.    
- The next command is the person who is going to maintain this image.    
- The ENV command is used to set environment variable. We set MYSQL_ROOT_PASSWORD to jsppassword for MySQL database.    
- The ADD command copy the database backup file to /docker-entrypoint-initdb.d directory in the Docker container. The docker-entrypoint.sh file will run any files in this directory ending with “.sql”          
  against the MySQL database. In our example, we have only one sql script file jsp_backup.sql.    
- The EXPOSE command exposes port 3306 of the image.    
    
### Creating Image with Dockerfile    
    
Open Docker terminal, navigate to the folder where the Dockerfile and MySQL backup file locates. Run the following command.    
    
``` docker build -t jspmysql:0.1 .```  