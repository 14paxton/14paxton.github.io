---
title:     CommandLineDiddys
layout:    default
parent:    Java
permalink: JavaNotes/CommandLineDiddys
category:  JavaNotes
share:     true
shortRepo:
  - javanotes
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

# [JPS]( https://docs.oracle.com/en/java/javase/17/docs/specs/man/jps.html  )

## list running java processes

```shell  
jps -lV    
```  

## Find java and remove applications you don’t want killed

```bash            
jps | egrep -v (pgrep idea)            
```            

### Find apps running jvm, deliminate by first space, return the field1 (PID), kill all -

```bash            
for pid in $(jps | egrep -v $(pgrep webstorm) | egrep -v $(pgrep idea)| egrep -v $(pgrep jps) | cut -d' ' -f1); do kill -9 $pid; done            
```

# JVM

## Available Options

> run the following command

```shell
java -X
```

> and you will get a list of all -X options:

```shell    
-Xmixed           mixed mode execution (default)
-Xint             interpreted mode execution only
-Xbootclasspath:<directories and zip/jar files separated by ;>
set search path for bootstrap classes and resources
-Xbootclasspath/a:<directories and zip/jar files separated by ;>
append to end of bootstrap class path
-Xbootclasspath/p:<directories and zip/jar files separated by ;>
prepend in front of bootstrap class path
-Xdiag            show additional diagnostic messages
-Xnoclassgc       disable class garbage collection
-Xincgc           enable incremental garbage collection
-Xloggc:<file>    log GC status to a file with time stamps
-Xbatch           disable background compilation
-Xms<size>        set initial Java heap size.........................
-Xmx<size>        set maximum Java heap size.........................
-Xss<size>        set java thread stack size
-Xprof            output cpu profiling data
-Xfuture          enable strictest checks, anticipating future default
-Xrs              reduce use of OS signals by Java/VM (see documentation)
-Xcheck:jni       perform additional checks for JNI functions
-Xshare:off       do not attempt to use shared class data
-Xshare:auto      use shared class data if possible (default)
-Xshare:on        require using shared class data, otherwise fail.
-XshowSettings    show all settings and continue
-XshowSettings:all         show all settings and continue
-XshowSettings:vm          show all vm related settings and continue
-XshowSettings:properties  show all property settings and continue
-XshowSettings:locale      show all locale related settings and continue
```    