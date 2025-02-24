---
title: EntityFramework
permalink: DotNetNotes/EntityFramework
category: DotNetNotes
parent: DotNetNotes
layout: default
has_children: false
share: true
shortRepo:

- dotnetnotes
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

---

<br/>

# [EntityFramework](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli)

## CLI

### add

```bat
dotnet add package Microsoft.EntityFrameworkCore.Sqlite;
dotnet add package Microsoft.EntityFrameworkCore.Design;
dotnet tool install --global dotnet-ef;
```

### create db tables

```bat
using ContosoPizza.Data;
```

### apply create

```bat
dotnet ef database update --context PizzaContext
```

### revisions

```bat
dotnet ef migrations add ModelRevisions --context PizzaContext
```

### update

```bat
dotnet ef database update --context PizzaContext
```

### Build scafolding

```bat
dotnet ef dbcontext scaffold "Data Source=./Promotions/Promotions.db" Microsoft.EntityFrameworkCore.Sqlite --context-dir ./Data --output-dir .\Models
```

```
The preceding command:

Scaffolds a DbContext and model classes using the provided connection string.
Specifies the Microsoft.EntityFrameworkCore.Sqlite database provider should be used.
Specifies directories for the resulting DbContext and model classes.
```