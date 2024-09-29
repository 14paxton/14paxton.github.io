---
title: Configuration
permalink: Micronotes/Configuration
category: Micronotes
parent: Micronotes
layout: default
has_children: false
share: true
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

# YML

```yaml

micronaut:
  server:
    port: 8082
  router:
    versioning:
      enabled: true
  application:
    name: selfserviceintegration
datasources:
  default:
    url:             jdbc:mysql://localhost:3306/ssi
    username:        root
    password:        T@l3nt
    dialect:         MYSQL
    driverClassName: com.mysql.cj.jdbc.Driver
    db-type:         mysql
    schema-generate: none
netty:
  default:
    allocator:
      max-order: 3
jpa:
  default:
    reactive:                       true
    compile-time-hibernate-proxies: true
    entity-scan: 
      classpath: true
      packages:
        - 'com.ssi.integration'
        - 'com.ssi.result'
        - 'com.ssi.request'
        - 'com.ssi.Enums'
    properties:
      hibernate:
        dialect:  org.hibernate.dialect.MySQLDialect
        bytecode:
          provider: none
        show-sql: true
        hbm2ddl:
          auto: update
#        connection:
#          db-type: mysql
#          url: jdbc:mysql://localhost:3306/ssi
#          username: root
#          password: T@l3nt
jackson:
  bean-introspection-module: true
  serializationInclusion:    NON_NULL

liquibase:
  enabled: true
  datasources:
    default:
      change-log: 'classpath:db/liquibase-changelog.xml'
endpoints:
  liquibase:
    enabled: true
    sensitive: false
```