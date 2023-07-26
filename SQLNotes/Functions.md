---  
title:        Functions  
permalink:    SQLNotes/Functions  
category:     SQLNotes  
parent:       SQLNotes  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
  - default  
  - sqlnotes    
autoclean: true  
---  
  
# MySQL  
  
## extract JSON  
  
```sql  
select JSON_EXTRACT(app_metadata, '$.tb5', '$.tb6.roleGroups') as "all",  
       JSON_EXTRACT(app_metadata, '$.tb5."roleGroups"')        as "tb5"  
from user;  
```  
