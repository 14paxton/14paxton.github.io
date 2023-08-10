---  
title:        CustomVM    
permalink:    IntelliJNotes/CustomVM    
category:     IntelliJNotes    
parent:       IntelliJNotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - intellijnotes    
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
    
Run the command    
```java -X```    
and you will get a list of all -X options:    
    
C:\Users\Admin>java -X    
    
```yml    
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
    
ORIGINAL    
    
```yml    
-Xms128m    
-Xmx750m    
-XX:ReservedCodeCacheSize=240m    
-XX:+UseConcMarkSweepGC    
-XX:SoftRefLRUPolicyMSPerMB=50    
-ea    
-XX:CICompilerCount=2    
-Dsun.io.useCanonPrefixCache=false    
-Djava.net.preferIPv4Stack=true    
-Djdk.http.auth.tunneling.disabledSchemes=""    
-XX:+HeapDumpOnOutOfMemoryError    
-XX:-OmitStackTraceInFastThrow    
-Djdk.attach.allowAttachSelf=true    
-Dkotlinx.coroutines.debug=off    
-Djdk.module.illegalAccess.silent=true    
```    
    
UPDATED- https://medium.com/stochastic-stories/tuning-my-intellij-ide-8255781f6a0d    
    
```yml    
-Xms15g    
-XX:ReservedCodeCacheSize=2g    
-XX:+UseCompressedOops    
-XX:+UseG1GC    
-XX:MaxGCPauseMillis=100    
-XX:+PerfDisableSharedMem    
-XX:SoftRefLRUPolicyMSPerMB=50    
-ea    
-XX:CICompilerCount=2    
-Dsun.io.useCanonPrefixCache=false    
-Djava.net.preferIPv4Stack=true    
-Djdk.http.auth.tunneling.disabledSchemes=""    
-XX:+HeapDumpOnOutOfMemoryError    
-XX:-OmitStackTraceInFastThrow    
-Djdk.attach.allowAttachSelf=true    
-Dkotlinx.coroutines.debug=off    
-Djdk.module.illegalAccess.silent=true    
    
```    
    
other custom settings http://tomaszdziurko.com/2015/11/1-and-the-only-one-to-customize-intellij-idea-memory-settings/    
    
boost performance putting caches in memory https://medium.com/@sergio.igwt/boosting-performance-of-intellij-idea-and-the-rest-of-jetbrains-ides-cd34952bb978    
    
mklink /D "R:\Temp\intellij\caches" "C:\Users\bpaxton\.IntelliJIdea2019.3\system\caches"    
mklink /D "R:\Temp\intellij\index" "C:\Users\bpaxton\.IntelliJIdea2019.3\system\index"    
    
current    
    
```yml    
-server    
-Xms8g    
-Xmx8g    
-XX:ReservedCodeCacheSize=2g    
-XX:NewRatio=3    
-XX:CICompilerCount=6    
-Xss16m    
-XX:+UseConcMarkSweepGC    
-XX:+CMSParallelRemarkEnabled    
-XX:ConcGCThreads=4    
-XX:+AlwaysPreTouch    
-XX:+TieredCompilation    
-XX:+UseCompressedOops    
-XX:SoftRefLRUPolicyMSPerMB=50    
-Djava.net.preferIPv4Stack=true    
-ea    
-Djava.net.preferIPv4Stack=true    
-Djdk.http.auth.tunneling.disabledSchemes=""    
-XX:+HeapDumpOnOutOfMemoryError    
-XX:-OmitStackTraceInFastThrow    
-Djdk.attach.allowAttachSelf=true    
-Dkotlinx.coroutines.debug=off    
-Djdk.module.illegalAccess.silent=true    
-Dide.no.platform.update=true    
-Dsun.io.useCanonCaches=false    
-XX:ReservedCodeCacheSize=512m    
-Didea.plugins.path=C:\\Users\\bpaxton\\AppData\\Local\\JetBrains\\Toolbox\\apps\\IDEA-U\\ch-0\\203.6682.168.plugins    
```    
    
https://github.com/serpro69/config/blob/master/idea64.vmoptions#L36    
    
working    
    
```yml    
  # custom IntelliJ IDEA VM options (expand/override 'bin/idea.vmoptions')    
  -ea    
  -server    
  -Xms6g    
  -Xmx6g    
  -Xss16m    
  -XX:MaxMetaspaceSize=2G    
  -XX:MetaspaceSize=512m    
  -XX:ConcGCThreads=6    
  -XX:ParallelGCThreads=6    
  -XX:NewRatio=3    
  -XX:ReservedCodeCacheSize=2g    
  -XX:+AlwaysPreTouch    
  -XX:+UseConcMarkSweepGC    
  -XX:+TieredCompilation    
  -Djava.net.preferIPv4Stack=true    
    
  -XX:+UseCodeCacheFlushing    
  -XX:+DisableExplicitGC    
  -XX:+ExplicitGCInvokesConcurrent    
  -XX:+AggressiveOpts    
  -XX:+CMSClassUnloadingEnabled    
  -XX:CMSInitiatingOccupancyFraction=60    
  -XX:+CMSParallelRemarkEnabled    
  -XX:+UseAdaptiveGCBoundary    
    
  -XX:+OptimizeStringConcat    
  -XX:+UseStringCache    
  -XX:+UseFastAccessorMethods    
    
  -XX:+UseCompressedOops    
  -XX:-OmitStackTraceInFastThrow    
```    
    
## Custom JVM ARGS    
    
Custom JVM args    
set jvm args in build.gradle bootRun{}    
jvmArgs = ["-server",    
"-XX:ReservedCodeCacheSize=2g",    
"-XX:NewRatio=3",    
"-XX:ActiveProcessorCount=12",    
"-Xss16m",    
"-XX:+UseConcMarkSweepGC",    
"-XX:+CMSParallelRemarkEnabled",    
"-XX:ConcGCThreads=4",    
"-XX:+AlwaysPreTouch",    
"-XX:+TieredCompilation",    
"-XX:+UseCompressedOops", "-Xdebug", "-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005", "-Xmx8g"]    
    
### set remote connection    
    
![Picture1](https://user-images.githubusercontent.com/26972590/159703039-67fe1a5f-8a7e-4555-b422-385b58d1ac51.png)