---
title: Functions
permalink: SQLNotes/Functions
category: SQLNotes
parent: SQLNotes
layout: default
has_children: false
share: true
shortRepo:

- sqlnotes
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

# extract JSON

```sql
select JSON_EXTRACT(app_metadata, '$.tb5', '$.tb6.roleGroups') as "all",
       JSON_EXTRACT(app_metadata, '$.tb5."roleGroups"')        as "tb5"
from user;
```

# Resources

- [string-functions](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html)