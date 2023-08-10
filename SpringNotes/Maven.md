---  
title:        Maven  
permalink:    SpringNotes/Maven  
category:     SpringNotes  
parent:       SpringNotes  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
  
  - springnotes  
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
  
# CLI  
  
```shell    
mvn spring-boot:run -Dspring-boot.run.profiles=local    
```    
  
- you can provide commandline argument like this:  
  
```shell    
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"    
    
```    
  
- You can provide JVM argument like this:  
  
```shell    
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev"    
```    
  
- java -jar  
  
```shell    
java -Dspring.profiles.active=dev -jar app.jar (VM param)    
```    
  
or  
  
```shell    
java -jar app.jar --spring.profiles.active=dev (program param)    
```    
  
# xml  
  
```xml    
  
<build>  
    <plugins>  
        <plugin>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-maven-plugin</artifactId>  
            <configuration>  
                <profiles>  
                    <profile>dev</profile>  
                </profiles>  
            </configuration>  
        </plugin>  
    </plugins>  
</build>    
```    
  
# Skip Tests  
  
## skip compilation  
  
 ```shell    
mvn -Dmaven.test.skip package    
```    
  
## skip running  
  
```shell    
mvn -DskipTests package    
```    
  
## xml  
  
```xml    
  
<properties>  
    <maven.test.skip>true</maven.test.skip>  
</properties>    
```    
  
```xml    
  
<properties>  
    <tests.skip>true</tests.skip>  
</properties>  
<plugin>  
<groupId>org.apache.maven.plugins</groupId>  
<artifactId>maven-surefire-plugin</artifactId>  
<version>2.22.2</version>  
<configuration>  
    <skipTests>${tests.skip}</skipTests>  
</configuration>  
</plugin>    
```