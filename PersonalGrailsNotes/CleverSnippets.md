---
title: CleverSnippets
permalink: PersonalGrailsNotes/CleverSnippets
category: PersonalGrailsNotes
parent: PersonalGrailsNotes
layout: default
has_children: false
share: true
shortRepo:
  - personalgrailsnotes
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

# Gists

## Batch Save and Delete

### [Batch Save](https://gist.github.com/14paxton/b7f8be4d37b29eb2d25e1a2e993f5bf4)

### [Batch Delete](https://gist.github.com/14paxton/74672cad5253c56c36efc6473078de34)

---

## [Command Object](https://gist.github.com/14paxton/282d48ed20642c697315e15dffb7df2d)

## [Dynamic String building HQL](https://gist.github.com/14paxton/0ed8e82644cd661dc8c9fc0d4b8c2009)

## [HQL Query with json extractor using the Function ability of JPQL to use a mysql function](https://gist.github.com/14paxton/b5a8d600dc4066010b4067bd8968f613)

## [Select multiple columns in where clause for @Query](https://gist.github.com/14paxton/e72c14086f5d9a6a0c58dc8463b93561)

## [String search with regex](https://gist.github.com/14paxton/a5382dd3898484bf560dc29e8463409c)

## [Transaction Rollback](https://gist.github.com/14paxton/a212d86552b05b95ef91ee444197fd4e)

## [User Grails Param map and a closure to build HQL](https://gist.github.com/14paxton/42e595a1bf50e44031b6be6c034003d9)

## [Elastic Search Fuzzy Matching](https://gist.github.com/14paxton/3a352d2824bde0e97960409056f682cc)
