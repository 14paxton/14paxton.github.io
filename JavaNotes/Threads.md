---
title:        Threads
permalink:    /JavaNotes/Threads
category:     JavaNotes
parent:       Java
layout:       default
has_children: false
share:        true
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

# Platform Thread

```java
Thread platformThread = Thread.ofPlatform().start(() -> {
// Code to run in the platform thread 
});
```

# Virtual Thread

```java
Thread virtualThread = Thread.ofVirtual().start(() -> {
    // Code to run in the virtual thread 
});
```

# Structured Concurrency

```java
Thread virtualThread = Thread.ofVirtual().start(() -> {
    // Code to run in the virtual thread 
});
```

# Thread Builder

```java
Thread thread = Thread.ofPlatform()
        .name("MyCustom Thread")
        .daemon(true)
        .start(() -> {
            // Code to run in the thread
        });
```

# Waiting for threads

```java
// Create virtual threads (or use ThreadcofPlatform() for platform threads)
Thread thread1 = Thread.ofVirtual().start(() -> {
//Task 1 code
});

Thread thread2 = Thread.ofVirtual().start(() -> {
//Task 2 code
});

```

```java

// Wait for both threads to finish using join()
try {
        thread1.join();
        thread2.join();
} catch(Exception e) {
println("Thread Interrupted");
}

```

```java
//Proceed with code that depends on both threads being finished
println("Both threads have finished.");
```

# Advanced features

• Thread.onSpinWait: Hints the JVM to use a spin-wait loop for active waiting.
• Virtual Thread.interrupted: Checks for virtual thread interruption.

## Important Considerations

• Virtual threads are experimental in Java 21.
• Choose thread types based on your application's needs and resource constraints.
• Handle thread synchronization and coordination carefully to prevent race conditions and deadlocks.
• Consider using structured concurrency for clearer and more manageable code.