---  
title:        Queries  
permalink:    SQLNotes/Queries  
category:     SQLNotes  
parent:       SQLNotes  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
 - sqlnotes  
 - default  
---  
  
***  
  
<details  markdown="block">    
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
  
***  
  
# MySQL  
  
## disable a foreign key constraint?  
  
> [ Modify Constraint By Adding Delete Cascade ](https://gist.github.com/14paxton/a5c69e1c4fc29bf91c0f7b626b612450)  
  
> **Note**<br>  
> `To disable foreign key constraints when you want to truncate a table`  
  
<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">  
  Use FOREIGN_KEY_CHECKS  
</div>  
  
***Disable***  
  
~~~mysql  
SET FOREIGN_KEY_CHECKS = 0;  
~~~  
  
***Enable***  
  
~~~mysql  
SET FOREIGN_KEY_CHECKS = 1;  
~~~  
  
<br/>  
  
<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">  
Or you can use DISABLE KEYS:  
</div>  
  
~~~mysql  
ALTER TABLE table_name  
    DISABLE KEYS;  
~~~  
  
~~~mysql  
ALTER TABLE table_name  
    ENABLE KEYS;  
~~~  
  
> **Warning**<br>  
> Note that DISABLE KEYS does not work on InnoDB tables as it works properly for MyISAM.  
  
Use  
  
```mysql  
ON  
DELETE SET NULL  
```  
  
> **Warning**<br>  
> If you don’t want to turn key checking on and off, you can permanently modify it to `ON DELETE SET NULL`  
  
Delete the current foreign key first:  
  
```mysql  
ALTER TABLE table_name1  
    DROP FOREIGN KEY fk_name1;   
```  
  
```mysqlALTER  
  
```  
  
Then add the foreign key constraints back  
  
```mysql  
ALTER TABLE table_name1  
    ADD FOREIGN KEY (table2_id)  
        REFERENCES table2 (id)  
        ON DELETE SET NULL;  
```  
  
```mysql  
ALTER TABLE tablename2  
    ADD FOREIGN KEY (table1_id)  
        REFERENCES table1 (id)  
        ON DELETE SET NULL;  
```  
  
# User Queries  
  
## metadata  
  
```sql  
use  
tbcore;  
SELECT user_metadata  
FROM user  
WHERE email IN ('apavlik@talentplus.com');  
SELECT *  
FROM USER  
WHERE id = 60;  
```  
  
> extract and unquote  
  
```sql  
select id, JSON_UNQUOTE(JSON_EXTRACT(JSON_EXTRACT(app_metadata, '$.tb5'), '$.roleGroups[0]', '$.roleGroups[1]'))  
from user;  
```  
  
## Update the Users Client and Roles  
  
### change to uat  
  
## client  
  
```sql  
UPDATE USER  
SET client_setup_id = 1015731,  
    user_metadata   = '{"companyCode":"TPUAT","clientId":1015731,"active":true,"dateFormat":"MM/DD/YYYY","timeZonePreference":"America/Chicago","profileColor":"#3D5BA9","given_name":"Brandon","family_name":"Paxton","name":"Brandon Paxton","  
picture":"https://s.gravatar.com/avatar/c0b18fb00c90568b950b4572bc1ae4b0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbp.png","emailVerified":false,"defaultAssessmentView":"RESULTS","defaultListView":"CARD","assessmentCreateType":"ADVANCED","bio":"none","jobTitle":"starving  
artist","preferredName":"schmuckels","talentBankEnabled":true,"talentBankUser":true,"talentMineEnabled":true,"talentMineUser":true,"defaultAssessmentOrderId":27489}'  
WHERE id = 820;  
```  
  
## app  
  
```sql  
UPDATE USER  
SET client_setup_id = 1015731,  
    app_metadata    = '{"tb6":{"roleGroups":["tb6-clientadmin"]},"tbcore":{"ordersDateRangePreference":"LAST_365_DAYS","defaultAssessmentType":"AO6","roleGroups":["tbcore-rg-admin-super","tbcore-rg-interviewer"],"defaultDashboardType":"ADMIN","  
shareResultConfig":null,"defaultClientSetupId":1015731}}'  
WHERE id = 820;  
  
```  
  
### change to talentplus  
  
## client  
  
````sql  
UPDATE USER  
SET client_setup_id = 2000,  
    user_metadata   = '{"companyCode":"TALENTPLUS","clientId":2000,"active":true,"dateFormat":"MM/DD/YYYY","timeZonePreference":"America/Chicago","profileColor":"#3D5BA9","given_name":"Brandon","family_name":"Paxton","name":"Brandon Paxton","  
picture":"https://s.gravatar.com/avatar/c0b18fb00c90568b950b4572bc1ae4b0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbp.png","emailVerified":true,"defaultAssessmentView":"RESULTS","defaultListView":"CARD","assessmentCreateType":"ADVANCED","bio":"none","jobTitle":"starving  
artist","preferredName":"schmuckels","talentBankEnabled":true,"talentBankUser":true,"talentMineEnabled":true,"talentMineUser":true,"defaultAssessmentOrderId":27489}'  
WHERE id = 820;  
  
````  
  
## app  
  
```sql  
UPDATE USER  
SET client_setup_id = 2000,  
    app_metadata    = '{"tb6":{"roleGroups":["tb6-clientadmin"]},"tbcore":{"ordersDateRangePreference":"LAST_365_DAYS","defaultAssessmentType":"AO6","roleGroups":["tbcore-rg-admin-super","tbcore-rg-interviewer"],"defaultDashboardType":"ADMIN","  
shareResultConfig":null,"defaultClientSetupId":2000}}'  
WHERE id = 820;  
```  
  
### change to TECHTEST  
  
## client  
  
```sql  
UPDATE USER  
SET client_setup_id = 55,  
    user_metadata   = '{"companyCode":"TECHTEST","clientId":55,"active":true,"dateFormat":"MM/DD/YYYY","timeZonePreference":"America/Chicago","profileColor":"#3D5BA9","given_name":"Brandon","family_name":"Paxton","name":"Brandon Paxton","  
picture":"https://s.gravatar.com/avatar/c0b18fb00c90568b950b4572bc1ae4b0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbp.png","emailVerified":false,"defaultAssessmentView":"RESULTS","defaultListView":"CARD","assessmentCreateType":"ADVANCED","bio":"none","jobTitle":"starving  
artist","preferredName":"schmuckels","talentBankEnabled":true,"talentBankUser":true,"talentMineEnabled":true,"talentMineUser":true,"defaultAssessmentOrderId":27489}'  
WHERE id = 820;  
```  
  
## app  
  
```sql  
UPDATE USER  
SET client_setup_id = 55,  
    app_metadata    = '{"tb6":{"roleGroups":["tb6-clientadmin"]},"tbcore":{"ordersDateRangePreference":"LAST_365_DAYS","defaultAssessmentType":"AO6","roleGroups":["tbcore-rg-admin-super","tbcore-rg-interviewer"],"defaultDashboardType":"ADMIN","  
shareResultConfig":null,"defaultClientSetupId":55}}'  
WHERE id = 820;  
```  
  
# RoleGroups  
  
1) is super admin = tbcore-rg-admin-super  
2) talent plus admin = tbcore-rg-admin-tp  
3) talent bank client admin = tbcore-rg-admin-client  
4) Result Viewer = tbcore-rg-manager  
5) Interviewer = tbcore-rg-interviewer  
6) requester = tbcore-rg-requestor  
7) TB6 client admin = tb6-clientadmin  
8) Research = tb6-research  
9) coach = tbcore-rg-coach  
10) order manager = tbcore-rg-order-manager  
11) taalentmin admin = talentmine-rg-admin  
12) shared result viewr = coreclient-rg-shared-result  
  
## update by email  
  
```sql  
UPDATE user_role_group  
SET role_group_id = 14  
WHERE user_id IN (SELECT id  
                  FROM USER  
                  WHERE email = 'd1@mailinator.com');  
```  
  
## delete all by email  
  
```sql  
DELETE  
FROM user_role_group  
WHERE user_id IN (SELECT id  
                  FROM USER  
                  WHERE email = 'd1@mailinator.com');  
```  
  
```sql  
SELECT *  
FROM user_role_group urg  
         JOIN role_group rg ON rg.id = urg.`role_group_id`  
         JOIN role_group_role rgr ON rgr.`role_group_id` = urg.`role_group_id`  
         JOIN role ON role.`id` = rgr.`role_id`  
WHERE user_id IN (SELECT id FROM user WHERE email = 'boi@mailinator.com');  
```  
  
```sql  
SELECT rg.display_name, rg.name, urg.user_id  
FROM user_role_group urg  
         JOIN role_group rg ON rg.id = urg.`role_group_id`  
WHERE user_id IN (SELECT id FROM user WHERE email = 'kfkfkfkfk52154@mailinator.com');  
```  
  
## display role groups and roles assigned  
  
```sql  
SELECT rg.id, display_name, authority  
FROM role_group rg  
         JOIN role_group_role rgr ON role_group_id = rg.id  
         JOIN role ON role_id = role.id  
WHERE rg.`name` = 'tbcore-rg-manager';  
```  
  
# Assessments  
  
## create assesment orders  
  
```sql  
CREATE  
TEMPORARY TABLE temporary_tableBP2 AS  
SELECT *  
FROM user_group_assessment_order  
WHERE id in (select ugao.id  
             from user_group_assessment_order ugao  
                      join user_group ug on ugao.user_group_compare = ug.id  
             where user_id = 820);  
```  
  
```sql  
ALTER TABLE temporary_tableBP2  
    MODIFY id INT;  
```  
  
```sql  
UPDATE temporary_tableBP2  
SET user_id = 5,  
    id      = NULL;  
```  
  
```sql  
INSERT INTO user_group  
SELECT *  
FROM temporary_tableBP2;  
```  
  
```sql  
DROP  
TEMPORARY TABLE temporary_tableBP2;  
```  
  
## FIND ASSESSMENTS WITH SAME CLIENT  
  
```sql  
select id, email  
from user  
where client_setup_id = 55  
order by date_created desc;  
```  
  
## FIND ASSESSMENTS WITH SAME INTERVIEW MODEL  
  
```sql  
SELECT ASSESSMENT_ORDER.ID, im.source_id  
FROM ASSESSMENT_ORDER  
         JOIN CATALOG_DETAIL cd ON ASSESSMENT_ORDER.CATALOG_DETAIL_ID = cd.id  
         JOIN INTERVIEW_MODEL im ON cd.interview_model_id = im.source_id  
WHERE ASSESSMENT_ORDER.ID NOT IN (SELECT ao.id  
                                  FROM USER_GROUP  
                                           JOIN ASSESSMENT_ORDER ao ON USER_GROUP.CLIENT_SETUP_ID = ao.client_setup_id  
                                  WHERE USER_ID = 820  
                                    AND TYPE  
    != 'MYSAVEDGROUP'  
  AND USER_GROUP.ID = 520  
  AND USER_GROUP.INTERVIEW_MODEL_ID = 35);  
```  
  
## UserGroupQueries  
  
```sql  
SELECT ug.id                    AS id,  
       ug.interview_model_id    AS interviewModelId,  
       ugao.id                     ugaoid,  
       ug.last_updated          AS lastUpdated,  
       COUNT(DISTINCT ugao.id)  AS assessmentCount,  
       COUNT(ugao.id)           AS assessmentCount2,  
       CONVERT(CASE  
                   WHEN (SELECT count(*) FROM USER_GROUP_SHARE WHERE ug.id = USER_GROUP_SHARE.USER_GROUP_ID) < 1  
                       THEN 0  
                   ELSE 1  
                   END, BINARY) AS shared  
FROM USER_GROUP ug  
         LEFT JOIN USER_GROUP_ASSESSMENT_ORDER ugao ON ug.id = ugao.user_group_id  
         JOIN INTERVIEW_MODEL im ON im.id = ug.interview_model_id  
WHERE ug.user_id = 52  
GROUP BY ug.id;  
```  
  
```sql  
SELECT ug.id AS ugID, ugs.id AS ugs, USER_GROUP_ASSESSMENT_ORDER.*  
FROM USER_GROUP ug  
         LEFT JOIN USER_GROUP_ASSESSMENT_ORDER ON ug.id = USER_GROUP_ASSESSMENT_ORDER.USER_GROUP_ID  
         LEFT JOIN USER_GROUP_SHARE ugs ON ug.id = ugs.user_group_id  
         LEFT JOIN INTERVIEW_MODEL im ON im.id = ug.interview_model_id  
WHERE ug.user_id = 52  
  AND ug.id = 454  
ORDER BY USER_GROUP_ASSESSMENT_ORDER.ID;  
  
SELECT ug.id                         AS id,  
       ug.NAME                       AS name,  
       ug.interviewModelId           AS interviewModelId,  
       im.NAME                       AS assessmentName,  
       im.sourceId                   AS sourceId,  
       im.source                     AS source,  
       im.subType                    AS subType,  
       ug.visibility                 AS visibility,  
       ug.lastUpdated                AS lastUpdated,  
       COUNT(DISTINCT ugao.id)       AS assessmentCount,  
       ug.type                       AS type,  
       CAST(CASE  
                WHEN (SELECT count(*)  
                      FROM USERGROUPSHARE AS ugs  
                      WHERE ug.id = ugs.userGroupId  
                        AND ugs.revoked = FALSE) < 1  
                    THEN 0  
                ELSE 1  
           END AS JAVA.LANG.BOOLEAN) AS shared  
FROM GROUP ug  
         LEFT JOIN USERGROUPASSESSMENTORDER ugao ON ug.id = ugao.userGroupId  
         LEFT JOIN INTERVIEWMODEL im ON im.id = ug.interviewModelId  
WHERE ug.userId = :userId  
  AND ug.type IN (:type)  
  AND ug.clientSetupId = :clientSetupId  
GROUP BY ug.id  
ORDER BY @ORDERBY @ @ORDERBYDIRECTION@;  
```  
  
## CHECK USERGROUPS FOR NEW ORDERS  
  
```sql  
select *  
from user_group  
where user_id = 820;  
  
select *  
from user_group_assessment_order  
where user_group_id = 314;  
```  
  
## get groups to compare  
  
```sql  
select id, interview_model_id, type, name, client_setup_id, date_created  
from user_group  
where user_id = 5  
  and type != 'GROUP_COMPARE'  
order by interview_model_id;  
```  
  
```sql  
select ug.id, interview_model_id, type, name, client_setup_id, ug.date_created, count(ugao.id)  
from user_group ug  
         join user_group_assessment_order ugao on ug.id = ugao.user_group_compare  
where user_id = 820  
  AND type != 'RESULTGROUP'  
group by ug.id;  
```  
  
## TEST QUERY FOR USERGOUPS WITH ASSESSMENT ORDERS ASSIGNED  
  
```sql  
select user_group_id, interview_model_id, type, name, client_setup_id, user_group.date_created  
from user_group  
         join user_group_assessment_order ugao on user_group.id = ugao.user_group_id  
where user_id = 820  
order by date_created desc;  
```  
  
## SHOW ALL MY USER GROUPS  
  
```sql  
select user_group_id, interview_model_id, type, name, client_setup_id, date_created  
from user_group  
         join group_compare_join_user_group gcjug on user_group.id = gcjug.user_group_id  
where user_id = 820  
order by interview_model_id;  
```  
  
## SHOW ALL USER_GROUP GROUPS TO COMPARE  
  
```sql  
select user_group.id, ao.id, interview_model_id, type, name, ao.client_setup_id  
from user_group  
         join assessment_order ao on user_group.client_setup_id = ao.client_setup_id  
where user_id = 820  
  and type != 'MYSAVEDGROUP'  
order by interview_model_id;  
```  
  
## USE TO TEST IF ASSESMENT ORDER JOINS ARE BEING CREATED AND DELTED  
  
```sql  
select *  
from user_group_assessment_order  
order by id desc;  
```  
  
```sql  
select count(*)  
from user_group_assessment_order  
where user_group_compare = 596;  
select *  
from user_group_assessment_order  
where id = 5810;  
```  
  
## USET TO TEST IF JOINS BETWEEN COMPARE AND USERGROUP ARE BEING CREATED AND DELETED  
  
```sql  
select *  
from group_compare_join_user_group  
order by id desc;  
select count(*)  
from group_compare_join_user_group  
where group_compare_id = 599;  
select *  
from group_compare_join_user_group  
where id = 140;  
```  
  
# Table and DB  
  
## Clone  
  
> create user group  
  
```sql  
CREATE  
TEMPORARY TABLE temporary_tableBP2 AS  
SELECT *  
FROM user_group  
WHERE user_id LIKE 820;  
```  
  
```sql  
 ALTER TABLE temporary_tableBP2  
    MODIFY id INT;  
```  
  
```sql  
 UPDATE temporary_tableBP2  
 SET user_id = 5,  
     id      = NULL;  
```  
  
```sql  
 INSERT INTO user_group  
 SELECT *  
 FROM temporary_tableBP2;  
```  
  
```sql  
 DROP  
TEMPORARY TABLE temporary_tableBP2;  
```