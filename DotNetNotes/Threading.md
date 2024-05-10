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