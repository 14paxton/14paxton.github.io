---  
title:        HQL  
permalink:    SQLNotes/HQL  
category:     SQLNotes  
parent:       SQLNotes  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
  - sqlnotes  
  - default  
---  
  
<br/>  
  
***  
  
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
  
# Intersect  
  
```hql    
SELECT *    
FROM LAB_TEST_SERVICES_POJO lts    
WHERE EXISTS    
    (SELECT lsm.inttestid    
     FROM LAB_SPECIMEN_MAPPING lsm    
     WHERE lsm.status = 1    
       AND lts.inttestid = lsm.inttestid)    
  AND EXISTS    
    (SELECT ltl.inttestid    
     FROM LAB_TEST_LOCATION ltl    
     WHERE ltl.status = 1    
       AND lts.inttestid = ltl.inttestid)    
```    
  
## join same object to query against 2 lists  
  
```hql    
select o    
from Object as o    
         join o.otherObjects as otherObject    
where otherObject in :allowedotherobjects    
  and otherObject not in :excludedotherobjects    
```    
  
## determine length diff of a group concat  
  
```hql    
(CHAR_LENGTH (GROUP_CONCAT(CONCAT(user.id, manager.id))) - CHAR_LENGTH (REPLACE(GROUP_CONCAT(CONCAT(user.id, manager.id)), ',', '' )))    
```    
  
# EXAMPLE large query with teary / multi join/ and JSON extractor  
  
```hql    
SELECT USER.FIRSTNAME,    
       USER.LASTNAME,    
       USER.USERMETADATA,    
       USER.LASTLOGIN,    
       USER.PICTUREURL,    
       MANAGER.ID,    
       MANAGER.EMAIL,    
       MANAGER.FIRSTNAME,    
       MANAGER.LASTNAME,    
       MANAGER.USERMETADATA,    
       MANAGER.LASTLOGIN,    
       MANAGER.PICTUREURL,    
       MANAGER.EXTERNALEMPLOYEECODE,    
       AO.ID,    
       AO.COMPANYINTERVIEWNAME,    
       AO.COMPLETEDDATE,    
       AO.CATALOGDETAIL.ID,    
       SM.ALIAS)    
FROM ${User user}    
    LEFT OUTER JOIN ${UserRelationship ur}    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN ${ur.manager} manager    
    INNER JOIN ${AssessmentOrder ao}    
WITH ao.id = CAST ((CONCAT(FUNCTION ('JSON_EXTRACT', USER.userMetadata, ' $.defaultAssessmentOrderId '))) AS java.lang.Long)    
    LEFT OUTER JOIN ${InterviewModel im}    
WITH im.sourceId = ao.catalogDetail.interviewModelId    
    AND im.source = (CASE WHEN ao.catalogDetail.type = ' AO6 ' THEN ' TBSIX ' WHEN ao.catalogDetail.type = ' A05 ' THEN ' TBFIVE '    
    WHEN ao.catalogDetail.type = ' P2P ' THEN ' TBFIVE ' END)    
    LEFT OUTER JOIN ${ScoringModel sm}    
ON sm.id = (CASE WHEN im.source = ' TBFIVE ' THEN (SELECT s FROM ScoringModel s WHERE    
    s.interviewModelId = im.id) ELSE (SELECT s FROM ScoringModel s WHERE s.sourceId = ao.catalogDetail.interviewModelId) END)    
WHERE USER.clientSetupId = ${clientSetupId}    
  AND USER.id IN (${searchStrings?.lastName ? findAllIdsByFirstNameAndLastName(searchStrings.firstName.toString()    
    , searchStrings.lastName.toString())*.getId().join(', ')    
    
    
```    
  
> calling method  
  
```groovy    
findAllByFirstNameOrLastNameOrEmail(searchStrings.firstName.toString())*.getId().join('    
```    
  
```hql    
SELECT DISTINCT    
       NEW COM.TALENTBANK.CORE.USERMAP(USER.ID, USER.USERNAME, USER.CLIENTSETUPID, USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN, USER.PICTUREURL,    
        MANAGER.ID, MANAGER.EMAIL, MANAGER.FIRSTNAME, MANAGER.LASTNAME, MANAGER.USERMETADATA, MANAGER.LASTLOGIN, MANAGER.PICTUREURL, COALESCE(MANAGER.EXTERNALEMPLOYEECODE, 0),    
        COALESCE(AO.ID, 1), COALESCE(AO.COMPANYINTERVIEWNAME, 'p'), COALESCE(AO.COMPLETEDDATE, '00/00/00'), COALESCE(AO.CATALOGDETAIL.ID, 1), COALESCE(SM.ALIAS,  'p'))    
FROM ${USER USER}    
         LEFT OUTER JOIN ${USERRELATIONSHIP UR}    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN ur.manager manager    
    LEFT OUTER JOIN ${AssessmentOrder ao}    
WITH ao.id = CAST ((CONCAT( '', FUNCTION ('JSON_EXTRACT', USER.userMetadata, '$.defaultAssessmentOrderId'), '')) AS java.lang.Long)    
    LEFT OUTER JOIN ${InterviewModel im}    
WITH im.sourceId = ao.catalogDetail.interviewModelId    
    AND im.source = (CASE WHEN ao.catalogDetail.type = 'AO6' THEN 'TBSIX' WHEN ao.catalogDetail.type = 'A05' THEN 'TBFIVE' WHEN ao.catalogDetail.type = 'P2P' THEN 'TBFIVE' END)    
    LEFT OUTER JOIN ${ScoringModel sm}    
ON sm.id = (CASE WHEN im.source = 'TBFIVE' THEN (SELECT s FROM ScoringModel s WHERE s.interviewModelId = im.id) ELSE (SELECT s FROM ScoringModel s WHERE s.sourceId = ao.catalogDetail.interviewModelId) END)    
WHERE USER.clientSetupId = $clientSetupId    
```    
  
# EXAMPLE calling method in HQL statement  
  
```hql    
SELECT DISTINCT new COM.TALENTBANK.CORE.DTO.USERTEAM.TEAMSEARCHDTOMAP(USER.ID, USER.USERNAME, USER.CLIENTSETUPID, USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN, USER.PICTUREURL,    
MANAGER.ID, MANAGER.EMAIL, MANAGER.FIRSTNAME, MANAGER.LASTNAME, MANAGER.USERMETADATA, MANAGER.LASTLOGIN, MANAGER.PICTUREURL,    
MANAGER.EXTERNALEMPLOYEECODE)    
FROM USER USER    
LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
ON manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
  AND USER.id IN (${ findAllByFirstNameOrLastNameOrEmail(searchStrings.firstName)*.getId().join(' , ')}))    
```    
  
# EXAMPLE case in where statement  
  
```hql    
SELECT DISTINCT new Map( USER.ID AS USER, MANAGER.ID AS manager )    
FROM USER USER    
  LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
ON manager.id = ur.manager.id    
WHERE USER.clientSetupId IN (55    
    , 2000)    
  AND (USER.firstName LIKE '%'||'${testSearch}'||'%'    
   OR USER.lastName LIKE '%'||'${testSearch}'||'%'    
   OR    
    manager.firstName LIKE CASE WHEN ${searchManagerName} = TRUE THEN ('%'||'${testSearch}'||'%') ELSE '' END    
   OR    
    manager.lastName LIKE CASE WHEN ${searchManagerName} = TRUE THEN ('%'||'${testSearch}'||'%') ELSE '' END )    
```    
  
# return all if null or empty  
  
```hql    
SELECT DISTINCT new Map( USER.ID AS USER, MANAGER.ID AS manager )    
FROM USER USER    
  LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
ON manager.id = ur.manager.id    
WHERE USER.clientSetupId IN (${clientSetUpIdList.join(' , ') ?: ClientSetup.all.id.join(' , ') })    
  AND (USER.firstName LIKE ${testSearch.user}    
   OR USER.lastName LIKE ${testSearch.user}    
   OR    
    manager.firstName LIKE ${testSearch.manager}    
   OR    
    manager.lastName LIKE ${testSearch.manager} )    
```    
  
# subquery  
  
```hql    
SELECT u    
FROM USER u    
WHERE exists (SELECT 1    
              FROM USER user    
    LEFT OUTER JOIN UserRelationship UR WITH UR.USER.ID = USER.ID OR UR.MANAGER.ID = USER.ID    
    left OUTER JOIN User manager WITH MANAGER.ID = UR.MANAGER.ID    
    WHERE user = u    
        AND USER.CLIENTSETUPID = 2000)    
```    
  
# create tuple  
  
```hql    
SELECT CONCAT('[', USER.ID, ':', IFNULL(MANAGER.ID, 'null'), ']')    
FROM USER USER    
LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
WITH manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
```    
  
# creative count  
  
## add/concat chars get length  
  
```hql    
SELECT LENGTH(CONCAT(FUNCTION('GROUP_CONCAT', ',')))    
From User user    
                         LEFT OUTER JOIN UserRelationship ur    
with ur.user.id = user.id or ur.manager.id = user.id    
    left OUTER JOIN User manager    
with manager.id = ur.manager.id    
where user.clientSetupId = 2000    
group by user.id, manager.id    
```    
  
## get groupings where there may be nulls  
  
```hql    
SELECT NEW Map( MAX(USER.ID) AS userId , (SELECT CONCAT('{', GROUP_CONCAT(CONCAT(COALESCE(UR1.ID, 'noRelationship'), ':[{' ,    
                         USER.ID, ':' , COALESCE(MANAGER1.ID, 'null'), '}]' )) , '}')    
                         FROM USER USER    
                         JOIN UserRelationship ur1 WITH ur1.user.id = USER.id OR ur1.manager.id = USER.id    
                         JOIN USER manager1 WITH manager1.id = ur1.manager.id) AS TUPLES )    
FROM USER USER    
    LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
WITH manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
GROUP BY USER.id, manager.id    
```    
  
## get list of digits  
  
```hql    
SELECT Max(USER.ID),    
       (SELECT DISTINCT CONCAT(GROUP_CONCAT(1))    
        FROM USER u    
                 LEFT OUTER JOIN USERRELATIONSHIP ur    
WITH ur.user.id = u.id OR ur.manager.id = u.id    
    LEFT OUTER JOIN USER M    
WITH M.id = ur.manager.id    
WHERE u.clientSetupId = 2000    
  AND manager.id = m.id    
    )    
FROM USER USER    
    LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
WITH manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
GROUP BY USER, manager    
```    
  
## get correct char but need to count column  
  
### Not working need to show one number, find way to count column  
  
```hql    
SELECT (SELECT COUNT(u.id)    
        FROM USER u    
                 LEFT OUTER JOIN USERRELATIONSHIP ur    
WITH ur.user.id = u.id OR ur.manager.id = u.id    
    LEFT OUTER JOIN USER M    
WITH M.id = ur.manager.id    
WHERE u.id IN (    
    SELECT DISTINCT CONCAT(''    
    , GROUP_CONCAT(USER.id    
    , manager.id)    
    , '')    
    FROM u subu    
    LEFT OUTER JOIN UserRelationship subur WITH subur.user.id = subu.id    
   OR subur.manager.id = subu.id    
    LEFT OUTER JOIN USER subm WITH subm.id = subur.manager.id    
    WHERE USER.clientSetupId = 2000    
    GROUP BY CONCAT( USER.id    
    , IFNULL(manager.id    
    , 666))    
    )    
    )    
FROM USER USER    
    LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
WITH manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
GROUP BY 'all'    
```    
  
```hql    
SELECT COUNT(*),    
       (SELECT LENGTH(CONCAT(GROUP_CONCAT('')))    
        FROM USER u    
                 LEFT OUTER JOIN USERRELATIONSHIP rel    
WITH rel.user.id = u.id OR rel.manager.id = u.id    
    LEFT OUTER JOIN USER M    
WITH M.id = rel.manager.id    
WHERE u.clientSetupId = 2000    
  AND u.id = USER.id    
  AND (m.id = manager.id    
   OR (u.id IS NOT NULL    
  AND m.id IS NULL))    
    )    
FROM USER USER    
    LEFT OUTER JOIN UserRelationship ur    
WITH ur.user.id = USER.id OR ur.manager.id = USER.id    
    LEFT OUTER JOIN USER manager    
WITH manager.id = ur.manager.id    
WHERE USER.clientSetupId = 2000    
GROUP BY USER, manager    
```    
  
# SELECT DISTINCT mag FROM Magazine mag  
  
```hql    
JOIN mag.articles art    
    
JOIN art.author auth    
    
WHERE auth.lastName = 'Grisham'    
```    
  
## may equivalently be expressed as follows, using the IN operator:  
  
```hql    
SELECT DISTINCT mag FROM Magazine mag,    
IN(mag.articles) art    
WHERE art.author.lastName = 'Grisham'    
```    
  
#Using HQL(hibernate query language) in findall  
  
##USING HQL for execute query  
  
```groovy    
 query = """    
        SELECT NEW Map(ug.id AS id, ug.NAME AS NAME, ug.interviewModelId AS interviewModelId,    
        ug.visibility AS visibility, ug.lastUpdated AS lastUpdated, COUNT(ugao.id) AS assessmentCount )    
        FROM USERGROUP ug    
                 LEFT JOIN USERGROUPASSESSMENTORDER ugao ON ug.id = ugao.userGroupId    
        WHERE ug.userId = :userId    
          AND ug.type = :type    
        GROUP BY ug.id    
        ORDER BY ug.NAME    
       """  
def groups = UserGroup.executeQuery(query, [userId: principalUser?.id, type: UserGroupType.RESULTGROUP])    
```    
  
# -HQL created using session-  
  
## -Full Example - [Full dynamic HQL, with QueryImpl object ](https://gist.github.com/14paxton/0ed8e82644cd661dc8c9fc0d4b8c2009)  
  
```groovy    
               User.withSession { uSession ->  
    def q = uSession.createQuery($/SELECT DISTINCT    
                                                   new COM.TALENTBANK.CORE.USERMAP(USER.ID,     
                                                           USER.USERNAME, USER.CLIENTSETUPID,     
                                                                          USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN,     
                                                          USER.PICTUREURL,MANAGER.ID, MANAGER.EMAIL ,     
                                                                          MANAGER.FIRSTNAME ,MANAGER.LASTNAME ,MANAGER.USERMETADATA, MANAGER.LASTLOGIN     
                                                                         ,MANAGER.PICTUREURL     
                                                                          ,MANAGER.EXTERNALEMPLOYEECODE)    
                                                FROM $ USER USER    
                                                    LEFT JOIN    
                                                FETCH $UserRelationship ur ON ur.user.id = USER.id OR ur.manager.id =    
                                                    USER.idleft    
                                                    JOIN ur.manager manager    
                                                    WHERE USER.firstName LIKE CONCAT('%', $searchString, '%')    
                                                    OR USER.lastName LIKE CONCAT('%', $searchString, '%')    
                                                    OR USER.email LIKE CONCAT('%', $searchString, '%')    
                                                    OR manager.firstName LIKE CONCAT('%', $searchString, '%')    
                                                    OR manager.lastName LIKE CONCAT('%', $searchString, '%')       
                                                /$)  
  
    q.maxResults = 8  
    q.firstResult = 2  
    q.list()  
}    
```    
  
# using Groovy SQL  
  
```groovy    
       List fetchUsersByNameOrManagerName(String searchString, params) {  
    if (!params) return null  
    def (firstNameSearch, lastNameSearch, rest) = searchString?.tokenize()  
    //        DataSource dataSource = Holders.grailsApplication.mainContext.getBean('dataSource')    
    //        Sql groovySql = new Sql(dataSource)    
  
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
  
# pagination server side with PagedListHolder Object  
  
```hql    
        def queryResults = userDataService.searchForUsersWhereNameOrEmailLike(searchString)    
        def pages = new PagedListHolder(queryResults)    
        pages.setPage(params.off) //set current page number    
        pages.setPageSize(params.max) // set the size of page    
        ```    
```  