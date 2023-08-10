---  
title: JUnit    
permalink: TestingFrameworks/JUnit    
category:  TestingFrameworks    
parent:   TestingFrameworks    
layout: default    
has_children: false    
share: true    
shortRepo:    
  - testingframeworks    
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
# Maven    
    
## [configure](https://maven.apache.org/surefire/maven-surefire-plugin/examples/junit-platform.html)    
    
## [StatelessTestsetInfoReporter](https://maven.apache.org/surefire/surefire-extensions-api/apidocs/org/apache/maven/surefire/extensions/StatelessTestsetInfoReporter.html)    
    
```xml    
<plugin>    
    <groupId>org.apache.maven.plugins</groupId>    
    <artifactId>maven-surefire-plugin</artifactId>    
    <version>3.0.0-M4</version>    
    <configuration>    
        <testFailureIgnore>true</testFailureIgnore>    
        <statelessTestsetReporter    
            implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5Xml30StatelessReporter">    
            <disable>false</disable>    
            <version>3.0</version>    
            <usePhrasedFileName>true</usePhrasedFileName>    
            <usePhrasedTestSuiteClassName>true</usePhrasedTestSuiteClassName>    
            <usePhrasedTestCaseClassName>true</usePhrasedTestCaseClassName>    
            <usePhrasedTestCaseMethodName>true</usePhrasedTestCaseMethodName>    
        </statelessTestsetReporter>    
    </configuration>    
 </plugin>    
```