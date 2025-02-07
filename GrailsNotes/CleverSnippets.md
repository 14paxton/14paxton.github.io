---
title: CleverSnippets
permalink: GrailsNotes/CleverSnippets
category: GrailsNotes
parent: GrailsNotes
layout: default
has_children: false
share: true
shortRepo:

  - GrailsNotes
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

# User Domain

## hibernate id is already being used

```groovy
 class UserGroupShare {

    Long userGroupId
    Long userId
    String email
    String encryptedId
    Boolean revoked = Boolean.FALSE
    Date dateCreated
    Date lastUpdated

    static belongsTo = [userGroup: UserGroup]

    static constraints = {
        userGroupId unique: 'userId'
        email nullable: true
        encryptedId nullable: true
    }

    static mapping = {
        //can keep userGroupId column, and create usergroup parent reference without creating new db column
        //need to use foreign Key reference to save
        userGroup insertable: false
        userGroup updateable: false
    }
}
```