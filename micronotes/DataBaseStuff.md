---  
title:        DataBaseStuff    
permalink:    micronotes/DataBaseStuff    
category:     micronotes    
parent:       micronotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - micronotes    
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
    
# AWS setup    
    
    
    
```bash    
export AWS_ACCESS_KEY_ID=AKIASC5Z6WSK4JAMKQ6S;    
export AWS_SECRET_ACCESS_KEY=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;    
;    
```    
    
- hosts need to be set to work- use after setting up db instance    
    
```bash    
export MYSQL_HOST=$(aws rds describe-db-instances --query 'DBInstances[?DBInstanceIdentifier==`crud-data-aws-db-create-micro-person`].Endpoint.Address' --output text)     
```    
    
#### custom env variables add to .yml if choos    
    
```bash    
export JDBC_URL=jdbc:mysql://${MYSQL_HOST}:3306/micro_person    
export JDBC_USER=admin    
export JDBC_PASSWORD=secret99    
```    
    
#### micronaut specific env variables    
    
- specific to micronaut    
- connection pools https://micronaut-projects.github.io/micronaut-sql/latest/guide/#jdbc-connection-pools    
-    
    
```bash    
export DATASOURCES_DEFAULT_URL=jdbc:mysql://${MYSQL_HOST}:3306/micro_person    
export DATASOURCES_DEFAULT_USERNAME=admin    
export DATASOURCES_DEFAULT_PASSWORD=secret99    
```    
> Micronaut Framework populates the properties datasources.default.url, datasources.default.username and datasources.default.password with those environment variables' values. Learn more about JDBC Connection Pools.    
>    
>You can run the application and test the API as it was described in the previous sections. However, when you run the application, Micronaut Test Resources does not start a MySQL container because you have provided values for datasources.default.*    
> properties.    
    
## Start script to use amazon db    
```bash    
export AWS_ACCESS_KEY_ID=AKIASC5Z6WSK4JAMKQ6S;    
export AWS_SECRET_ACCESS_KEY=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;    
export MYSQL_HOST=$(aws rds describe-db-instances --query 'DBInstances[?DBInstanceIdentifier==`crud-data-aws-db-create-micro-person`].Endpoint.Address' --output text);    
export JDBC_URL=jdbc:mysql://${MYSQL_HOST}:3306/micronaut;    
export JDBC_USER=admin;    
export JDBC_PASSWORD=secret99;    
export DATASOURCES_DEFAULT_URL=jdbc:mysql://${MYSQL_HOST}:3306/micro_person;    
export DATASOURCES_DEFAULT_USERNAME=admin;    
export DATASOURCES_DEFAULT_PASSWORD=secret99;    
```    
    
    
    
## AWS tidbits    
    
> get db instances    
    
```bash    
aws rds describe-db-instances \                                                      
  --filters "Name=engine,Values=mysql" \                      
  --query "*[].[DBInstanceIdentifier,Endpoint.Address,Endpoint.Port,MasterUsername]"    
```    
    
> configure    
    
```bash    
aws configure    
```    
    
#### create IAM user    
    
```bash    
aws iam create-group --group-name Administrators    
aws iam create-user --user-name Administrator    
aws iam add-user-to-group --user-name Administrator --group-name Administrators    
aws iam attach-group-policy --group-name Administrators --policy-arn $(aws iam list-policies --query 'Policies[?PolicyName==`AdministratorAccess`].{ARN:Arn}' --output text)    
aws iam create-access-key --user-name Administrator    
```    
    
#### Create VPC, security group, subnets and subnet group (optional) with jq (https://stedolan.github.io/jq/)    
    
```bash    
# VPC, internet gateway and route table    
export VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 | jq -r '.Vpc.VpcId')    
export IG_ID=$(aws ec2 create-internet-gateway | jq -r '.InternetGateway.InternetGatewayId')    
aws ec2 attach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID    
aws ec2 modify-vpc-attribute --enable-dns-hostnames --vpc-id $VPC_ID    
export RT_ID=$(aws ec2 describe-route-tables --filters "Name=vpc-id,Values=$VPC_ID" --query "RouteTables[].RouteTableId" --output text)    
aws ec2 create-route --route-table-id $RT_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IG_ID    
    
# Security group    
aws ec2 create-security-group --group-name crud-data-aws-db-create-micro-person-sg --description "Security Group for the Micronaut MySQL guide" --vpc-id $VPC_ID    
export SG_ID=$(aws ec2 describe-security-groups --query 'SecurityGroups[?GroupName==`crud-data-aws-db-create-micro-person-sg`].GroupId' --output text)    
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3306 --cidr $(curl ifconfig.me)/32    
    
# Subnets and subnet group    
export AZ_0=$(aws ec2 describe-availability-zones --filters "Name=state,Values=available" --query "AvailabilityZones[0].ZoneName" --output text)    
export AZ_1=$(aws ec2 describe-availability-zones --filters "Name=state,Values=available" --query "AvailabilityZones[1].ZoneName" --output text)    
export SN0_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.0.0/20 --availability-zone $AZ_0 | jq -r '.Subnet.SubnetId')    
export SN1_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.16.0/20 --availability-zone $AZ_1 | jq -r '.Subnet.SubnetId')    
aws ec2 modify-subnet-attribute --subnet-id $SN0_ID --map-public-ip-on-launch    
aws ec2 modify-subnet-attribute --subnet-id $SN1_ID --map-public-ip-on-launch    
aws rds create-db-subnet-group --db-subnet-group-name crud-data-aws-db-create-micro-person-sng --db-subnet-group-description "DB subnet group for the Micronaut MySQL guide" --subnet-ids "$SN0_ID" "$SN1_ID"    
```    
    
#### create mysql db instance    
    
```bash    
aws rds create-db-instance \    
    --db-instance-identifier crud-data-aws-db-create-micro-person \    
    --db-instance-class db.t2.micro \    
    --engine mysql \    
    --master-username admin \    
    --master-user-password secret99 \    
    --allocated-storage 20 \    
    --publicly-accessible \    
#    --db-subnet-group-name crud-data-aws-db-create-micro-person-sng \    
#    --vpc-security-group-ids $SG_ID \    
```    
    
#### wait for instance    
    
```bash    
aws rds wait db-instance-available --db-instance-identifier crud-data-aws-db-create-micro-person    
```    
    
#### stop aws instance    
    
```bash    
aws rds delete-db-instance --db-instance-identifier crud-data-aws-db-create-micro-person --skip-final-snapshot    
aws rds wait db-instance-deleted --db-instance-identifier crud-data-aws-db-create-micro-person    
```    
    
###### remove security ec2 instances    
    
```bash    
aws ec2 delete-subnet --subnet-id $SN0_ID    
aws ec2 delete-subnet --subnet-id $SN1_ID    
aws rds delete-db-subnet-group --db-subnet-group-name crud-data-aws-db-create-micro-person-sng    
aws ec2 delete-security-group --group-id $SG_ID    
aws ec2 detach-internet-gateway --internet-gateway-id $IG_ID --vpc-id $VPC_ID    
aws ec2 delete-internet-gateway --internet-gateway-id $IG_ID    
aws ec2 delete-vpc --vpc-id $VPC_ID    
```    
    
## MYSQL    
    
#### create db and user    
    
> Create the database. You can use any valid database name (e.g., micronaut):    
>    
> CREATE DATABASE micronaut;    
> Create a database user. You can use any valid MySQL username (e.g., guide_user) and any valid password:    
>    
> CREATE USER 'guide_user' IDENTIFIED BY 'M1cr0n4ut!';    
> Grant access to the database for the new user:    
>    
> GRANT ALL ON micronaut.* TO 'guide_user';    
    
#### connecting to aws rds    
```bash    
mysql -h $MYSQL_HOST -P 3306 -u admin -p    
```    
    
## Testing    
    
#### add an object    
    
```bash    
curl -X "POST" "http://localhost:8082/person/" \    
     -H 'Content-Type: application/json; charset=utf-8' \    
     -d $'{ "firstName": "itchy", "lastName": "peterson" }'    
```    
    
#### list    
    
````bash    
curl http://localhost:8082/person/    
````    
    
````bash    
curl http://localhost:8082/person/record    
````    
  
---  
    
    
# In Memory    
    
```yml    
micronaut:    
  application:    
    name: backend    
datasources:    
  default:    
    url:             jdbc:h2:mem:devDb;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE    
    username:        sa    
    password:        ''    
    driverClassName: org.h2.Driver    
    schema-generate: CREATE_DROP    
    dialect:         H2    
netty:    
  default:    
    allocator:    
      max-order: 3    
```    
    
# [MYSQL](https://micronaut-projects.github.io/micronaut-sql/latest/guide/index.html)    
    
## example yml for connecting locally to mysql db    
    
```yml    
micronaut:    
  server:    
    port: 8082    
  application:    
    name: crudData    
datasources:    
  default:    
    url:             jdbc:mysql://localhost:3306/micro_person    
    username:        root    
    password:        pw123    
    driverClassName: com.mysql.cj.jdbc.Driver    
    db-type:         mysql    
    schema-generate: CREATE_DROP    
    dialect:         MYSQL    
netty:    
  default:    
    allocator:    
      max-order: 3    
#vertx:    
#  mysql:    
#    client:    
#      port: 3306    
#      host: localhost    
#      database: micro_person    
#      user: root    
#      password: root    
#      maxSize: 5    
```    
    
# [Hibernate](https://micronaut-projects.github.io/micronaut-sql/latest/guide/index.html#hibernate)    
    
## [Reactive Hibernate](https://micronaut-projects.github.io/micronaut-data/latest/guide/#hibernateReactive)    
    
```yml    
micronaut:    
  server:    
    port: 8082    
  router:    
    versioning:    
      enabled: true    
  application:    
    name: hibernate    
#datasources:    
#  default:    
#    url: jdbc:mysql://localhost:3306/ssi    
#    username: root    
#    password: root    
#    dialect: MYSQL    
#    driverClassName: com.mysql.cj.jdbc.Driver    
#    db-type: mysql    
#    schema-generate: none    
jpa:    
  default:    
    reactive:                       true    
    compile-time-hibernate-proxies: true    
    entity-scan:    
      packages:    
        - 'com.ssi.integration'    
        - 'com.ssi.result'    
        - 'com.ssi.request'    
        - 'com.ssi.Enums'    
    properties:    
      hibernate:    
        show-sql: true    
        hbm2ddl:    
          auto: update    
        connection:    
          db-type:  mysql    
          url:      jdbc:mysql://localhost:3306/ssi    
          username: root    
          password: root    
netty:    
  default:    
    allocator:    
      max-order: 3    
```    
    
## Hibernate schema generation    
    
### The hibernate.hbm2ddl.auto configuration property is used to customize the Hibernate database schema generation process, and it can take the following values:    
    
- none – This option disables the hbm2ddl.auto tool, so Hibernate is not going to take any action for managing the underlying database    
  schema.    
- create-only – This option instructs Hibernate to generate the database schema from the entity model.    
- drop – This option instructs Hibernate to drop the database schema using the entity model as a reference for the DDL DROP statements.    
- create – This option instructs Hibernate to drop the database schema and recreate it afterward using the entity model as a reference.    
- create-drop – This option instructs Hibernate to drop the database schema and recreate it afterward using the entity model as a    
  reference.    
- validate – This option instructs Hibernate to validate the underlying database schema against the entity mappings.    
- update – This option instructs Hibernate to update the database schema by comparing the existing schema with the entity mappings and    
  generate the appropriate schema migration scripts.    
    
# DB Migration    
    
## [Liquibase](https://micronaut-projects.github.io/micronaut-liquibase/2.0.0.M1/guide/index.html#endpoint)    
    
### yml    
    
```yml    
liquibase:    
  enabled: true    
  datasources:    
    default:    
      change-log: 'classpath:db/liquibase-changelog.xml'    
endpoints:    
  liquibase:    
    enabled:   true    
    sensitive: false    
```    
    
### changelog    
    
```xml    
<?xml version="1.0" encoding="UTF-8"?>    
<databaseChangeLog    
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"    
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"    
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd">    
    
    <include file="changelog/01-create-person.xml"    
             relativeToChangelogFile="true"/>    
    
</databaseChangeLog>    
```    
    
#### db change file    
    
```xml    
<?xml version="1.0" encoding="UTF-8"?>    
<databaseChangeLog    
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"    
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"    
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd">    
    
    <changeSet id="01" author="sdelamo">    
    
        <createTable tableName="person"    
                     remarks="A table to contain persons">    
    
            <column name="id" type="BIGINT" autoIncrement='true'>    
                <constraints nullable="false"    
                             unique="true"    
                             primaryKey="true"    
                             primaryKeyName="personPK"/>    
            </column>    
    
            <column name="version" type="BIGINT">    
                <constraints nullable="false"/>    
            </column>    
    
            <column name="first_name" type="VARCHAR(55)">    
                <constraints nullable="false"/>    
            </column>    
    
            <column name="last_name" type="VARCHAR(55)">    
                <constraints nullable="false"/>    
            </column>    
    
        </createTable>    
    
    </changeSet>    
    
</databaseChangeLog>    
```