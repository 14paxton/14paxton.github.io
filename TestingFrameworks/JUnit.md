---
title: JUnit
permalink: TestingFrameworks/JUnit
category: TestingFrameworks
parent: TestingFrameworks
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

# [configure](https://maven.apache.org/surefire/maven-surefire-plugin/examples/junit-platform.html)

 ***

# Maven

## CLI

```shell
//Run all tests
 mvn test

//Run a single test class
 mvn -Dtest=TestClassOne test

//Run multiple test classes
mvn -Dtest=TestClassOne,TestClassTwo test

//Run a single test method
 mvn -Dtest=TestClassOne#methodname test

//Run tests matching name 'testMethod' in all test classes
 mvn -Dtest="*#testMethod" test

//Run tests matching name 'test*' in a test class 
 mvn -Dtest="TestClassOne#test*" test

//Rerun failing tests 2 times
mvn '-Dsurefire.rerunFailingTestsCount=2' -Dtest=ModuleTwoTests test
```

# [StatelessTestsetInfoReporter](https://maven.apache.org/surefire/surefire-extensions-api/apidocs/org/apache/maven/surefire/extensions/StatelessTestsetInfoReporter.html)

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