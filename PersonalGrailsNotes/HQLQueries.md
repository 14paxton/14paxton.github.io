---
title:        HQLQueries
permalink:    PersonalGrailsNotes/HQLQueries
category:     PersonalGrailsNotes
parent:       PersonalGrailsNotes
layout:       default
has_children: false
share:        true
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

# HQL: Hibernate Query Language

## Select distinct

```hql
SELECT DISTINCT mag FROM Magazine mag
JOIN mag.articles art
JOIN art.author auth
WHERE auth.lastName = 'Grisham'
```

### may equivalently be expressed as follows, using the IN operator:

```hql
SELECT DISTINCT mag FROM Magazine mag,
IN(mag.articles) art
WHERE art.author.lastName = 'Grisham'
```

# Find All

## With Pagination

> set up paginate

```groovy
 def getPaginatedUserGroups(def requestedTypes = [UserGroupType.RESULTGROUP], userId, clientSetupId, paginationParams) {
    if (!userId || !clientSetupId || !paginationParams) return null

    def totalUserGroups = Group.countByUserIdAndClientSetupIdAndTypeInList(userId, clientSetupId, requestedTypes, [cache: true])
    def orderByMap = [groupName: 'ug.name', assessmentName: 'im.name', lastUpdated: 'ug.lastUpdated']
    def orderBy = orderByMap.get(paginationParams?.orderBy) ?: 'ug.name'
    def orderByDirection = ['asc', 'desc'].contains(paginationParams?.orderDirection) ? paginationParams?.orderDirection : 'asc'
    def max = paginationParams?.pageSize ?: 5
    def offset = ((paginationParams?.page ?: 1) - 1) * max

    log.debug "Paged UserGroup List for User ${userId} offset: $offset, max: $max, total: $totalUserGroups"

    def groupsList = Group.getGroupsByUser(requestedTypes, userId, clientSetupId, offset, max, orderBy, orderByDirection)

    [groupsList: groupsList, offset: offset, max: max, total: totalUserGroups]
}
```

> query

```groovy
 static List getGroupsByUser(Long userId, Long clientSetupId, def offset = 0, def max = 0, String orderBy = 'ug.name', String orderByDirection = 'asc') {
    def query = """
            select new Map(ug.id as id, ug.name as name, ug.interviewModelId as interviewModelId,
            im.name as assessmentName,  im.sourceId as sourceId, im.source as source, im.subType as subType,
             ug.visibility as visibility , ug.lastUpdated as lastUpdated , COUNT(ugao.id) as assessmentCount,
             ug.type as type,
             CAST(case when (select count(*) from UserGroupShare as ugs where ug.id = ugs.userGroupId and ugs.revoked = false) < 1 THEN 0 ELSE 1 END as java.lang.Boolean) as shared)
            from Group ug
                     LEFT JOIN UserGroupAssessmentOrder ugao ON ug.id = ugao.userGroupId
                     LEFT JOIN InterviewModel im ON im.id = ug.interviewModelId
            where ug.userId = :userId
              and ug.type in (:type)
              and ug.clientSetupId = :clientSetupId
            GROUP BY ug.id
            order by @orderBy@ @orderByDirection@"""

    def modifiedQuery = query.replaceAll('@orderBy@', orderBy).replaceAll('@orderByDirection@', orderByDirection)

    findAll(modifiedQuery, [userId: userId, type: UserGroupType.RESULTGROUP, clientSetupId:
            clientSetupId], [offset: offset, max: max, cache: true])
}
```

## Execute Query

```groovy
    def query = """
    select new Map(ug.id as id, ug.name as name, ug.interviewModelId as interviewModelId,
    ug.visibility as visibility, ug.lastUpdated as lastUpdated, COUNT(ugao.id) as assessmentCount )
    from UserGroup ug
    LEFT JOIN UserGroupAssessmentOrder ugao ON ug.id= ugao.userGroupId
    where ug.userId = :userId and ug.type = :type
    GROUP BY ug.id
    ORDER BY ug.name"""

def groups = UserGroup.executeQuery(query, [userId: principalUser?.id, type: UserGroupType.RESULTGROUP])
```

## With Using Session

```groovy
               User.withSession { uSession ->
    def q = uSession.createQuery($/SELECT DISTINCT new com.talentbank.core.UserMap(user.id,
               user.username, user.clientSetupId,
                              user.email, user.firstName, user.lastName, user.userMetadata, user.lastLogin,
              user.pictureUrl,manager.id, manager.email ,
                              manager.firstName ,manager.lastName ,manager.userMetadata, manager.lastLogin
                             ,manager.pictureUrl
                              ,manager.externalEmployeeCode)
                          FROM $User user
                          LEFT JOIN FETCH $UserRelationship ur on ur.user.id = user.id or ur.manager.id =
                            user.idleft
                          JOIN ur.manager manager
                          WHERE user.firstName like CONCAT('%', $searchString, '%')
                          or user.lastName like CONCAT('%', $searchString, '%')
                          or user.email like CONCAT('%', $searchString, '%')
                          or  manager.firstName like CONCAT('%', $searchString, '%')
                          or manager.lastName like CONCAT('%', $searchString, '%')
                         /$)

    q.maxResults = 8
    q.firstResult = 2
    q.list()
}
```

### Full Example - [Full dynamic HQL, with QueryImpl object ](https://gist.github.com/14paxton/0ed8e82644cd661dc8c9fc0d4b8c2009)

# Groovy SQL

> create groovy sql

```groovy
DataSource dataSource = Holders.grailsApplication.mainContext.getBean('dataSource')
Sql groovySql = new Sql(dataSource)
```

```groovy
List fetchUsersByNameOrManagerName(String searchString, params) {
    if (!params) return null
    def (firstNameSearch, lastNameSearch, rest) = searchString?.tokenize()

    String query = """SELECT DISTINCT user.id, user.username, user.client_setup_id, user.email, user.first_name, user.last_name,
      user.user_metadata,
      user.last_login, user.picture_url,
                                  manager.first_name AS mgr_first_name, manager.last_name AS mgr_last_name
                         FROM user
                               LEFT JOIN user_relationship as userRelationship on userRelationship.user_id = user.id
                               LEFT JOIN user manager on userRelationship.manager_id = manager.id
                             WHERE ((user.first_name LIKE '%${searchString}%' || user.last_name LIKE '%${searchString}%' || user.email LIKE
                         '%${searchString}%') ||
                                     (user.first_name LIKE '%${firstNameSearch}%' && user.last_name LIKE '%${lastNameSearch}%'))
                        UNION
                        SELECT DISTINCT user.id, user.username, user.client_setup_id, user.email, user.first_name, user.last_name,
                        user.user_metadata,
                        user.last_login, user.picture_url,
                              manager.first_name AS mgr_first_name, manager.last_name AS mgr_last_name
                        FROM user
                              LEFT JOIN user_relationship as userRelationship on userRelationship.user_id = user.id
                              LEFT JOIN user manager on userRelationship.manager_id = manager.id
                              WHERE ((manager.first_name LIKE '%${searchString}%' || manager.last_name LIKE '%${searchString}%') ||
                             (manager.first_name LIKE '%${firstNameSearch}%' && manager.last_name LIKE '%${lastNameSearch}%'))
                           """

    groovySql.rows(query, 0, 15)
}
```