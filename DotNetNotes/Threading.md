---
title:        Threading
permalink:    /DotNetNotes/CSharp/Threading
category:     DotNetNotes
parent:       CSharp
layout:       default
grand_parent: DotNetNotes
has_children: false
share:        true
shortRepo:
  - users
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

# Create Thread

```cs
Thread newThread = new Thread(MyThreadMethod);
        newThread.Start();
```

# Thread Pooling

```cs
ThreadPool.QueueUserWorkItem(MyThreadMethod);
```

# Synchronization

```cs
private static object LockObject ncw object();
lock (lockobject)
{ // Ihread-safe code
}
```

# Async and Await

```csharp
public async Task<int> MyAsyncMethod()
{
// Asynchronous code
return await SomeAsyncOperation();
}
```

# Parallel

```csharp
Parallel. For(0, 10, 1 MyParallel Method(i));
```

# Thread Safety Limited Resource Pool

```csharp
// Creain Semaphore whith allow 5 sreads to enter sy
private static Semaphore semaphore = new Semaphore(5, 5);
ThreadPool.QueueUserWorkItem(_ =>
{
semaphore.WaitOne();
//Critical section: Only five thruads can chocote this block simultaneously 
semaphore.Release();
}
```