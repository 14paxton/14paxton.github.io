---
title: Gradle
permalink: Micronotes/Gradle
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

# build

- > ## build.gradle example

  <details markdown="block">
  <summary>
  Example From AWS Lambda Project
  </summary>

  {%raw%}
  ```groovy
        //buildscript {
//    dependencies {
//        classpath("com.github.docker-java:docker-java-transport-httpclient5:3.4.0") {
//            because("M1 macs need a later version of JNA")
//        }
//    }
//}

plugins {
  id("com.github.johnrengelman.shadow") version "8.1.1"
  id("io.micronaut.application") version "4.4.2"
  id("com.diffplug.spotless") version "6.23.3"
  id("io.micronaut.aot") version "4.4.2"
}

version = "0.1"
group = "example.micronaut"

repositories {
  mavenCentral()
}

dependencies {
  annotationProcessor("io.micronaut:micronaut-http-validation")
  annotationProcessor("io.micronaut.validation:micronaut-validation-processor")
  annotationProcessor("io.micronaut.serde:micronaut-serde-processor")
  implementation("io.micronaut:micronaut-http-client-jdk")
  implementation("io.micronaut.aws:micronaut-aws-lambda-events-serde")
  implementation("io.micronaut.serde:micronaut-serde-jackson")

  /*** needed ***/
  runtimeOnly("org.yaml:snakeyaml")
  runtimeOnly("ch.qos.logback:logback-classic")

  /*** Not With Controller ***/
  //    implementation("com.amazonaws:aws-lambda-java-events")
  //    implementation("io.micronaut.aws:micronaut-function-aws")
  //    implementation("io.micronaut.aws:micronaut-function-aws-custom-runtime")

  /*** email ***/
  implementation("io.micronaut.email:micronaut-email-sendgrid")

  /*** reactive streams ***/
  //implementation("io.micronaut.reactor:micronaut-reactor")


  /** See if helps **/
  //    annotationProcessor("io.micronaut:micronaut-graal")
  //    compileOnly("io.micronaut:micronaut-http-client")
  //    implementation("io.micronaut.email:micronaut-email")
  //    implementation("com.sendgrid:sendgrid-java:5.0.0-rc.1")


  /*** from aws micronaut docs ***/
  //    implementation("io.micronaut:micronaut-http-client")

  /** From GraalVM Guide **/
  //    implementation("jakarta.validation:jakarta.validation-api")

  /*** remove dependency for macos ***/
  //    runtimeOnly("io.netty:netty-resolver-dns-native-macos:4.2.0.Alpha4")
  //    implementation("com.github.docker-java:docker-java-transport-httpclient5:3.3.1")
}


application {
  mainClass = "example.micronaut.Application"
}

//shadowJar {
//    archiveBaseName.set('shadow') // Set the base name of the jar
//    archiveClassifier.set('')
//    archiveVersion.set('')
//}

java {
  sourceCompatibility = JavaVersion.toVersion("21")
  targetCompatibility = JavaVersion.toVersion("21")
}


graalvmNative {
  toolchainDetection = false
  binaries {
    main {
      useFatJar = true
      richOutput = true
      verbose = true
      mainClass = 'example.micronaut.Application'
      javaLauncher = javaToolchains.launcherFor {
        languageVersion = JavaLanguageVersion.of(21)
        vendor = JvmVendorSpec.matching("oracle")
      }
      resources.autodetect()
      metadataRepository { enabled = true }
      imageName.set('graal-mail')
      buildArgs.add('--verbose')
    }
  }
}

micronaut {
  //*** test local and running normal lambda ***//
  //    runtime("lambda_java")

  //** GraalVM buildNativeLambda **//
  runtime("lambda_provided")
  nativeLambda {
    lambdaRuntimeClassName = " io.micronaut.function.aws.runtime.MicronautLambdaRuntime"
  }
  //***********************************//

  testRuntime("junit5")
  processing {
    incremental(true)
    annotations("example.micronaut.*")
  }
  aot {
    configFile = file("gradle/micronaut-aot.properties")
  }
}

//dockerfileNative {
//    jdkVersion = '21'
//    graalArch.set(org.apache.tools.ant.taskdefs.condition.Os.isArch("aarch64") ? "aarch64" : "amd64")
//    graalImage.set('ghcr.io/graalvm/graalvm-ce:ol8-java17-22.3.3')
//}

//tasks.named("nativeCompile") {
//    classpathJar = layout.projectDirectory.file("build/libs/shadow.jar")
//}

tasks.named("dockerfileNative") {
  baseImage = "amazonlinux:2023"
  jdkVersion = "21"
  args("-XX:MaximumHeapSizePercent=80",
          "-Dio.netty.allocator.numDirectArenas=0",
          "-Dio.netty.noPreferDirect=true")
}
  ```
  {% endraw %}

  </details>