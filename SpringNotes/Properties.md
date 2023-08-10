---  
title:        Properties    
permalink:    SpringNotes/Properties    
category:     SpringNotes    
parent:       SpringNotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - springnotes    
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
    
# Add active profiles    
    
```yaml    
---  
my.property: fromyamlfile    
---  
spring.profiles: prod    
spring.profiles.include:    
  - proddb    
  - prodmq    
```