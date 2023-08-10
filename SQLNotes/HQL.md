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
    
# [Database Overview](http://www.h2database.com/html/features.html#database_url)    
    
![H2_DB_Overview.png](..%2Fassets%2Fimages%2FH2_DB_Overview.png)    
    
***        
    
## run in postgres mode    
    
```shell        
jdbc:h2:mem:test;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE        
```      
    
```shell      
jdbc:h2:~/siris;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH      
```      
    
___        
    
# [H2 Database Engine Cheat Sheet](http://www.h2database.com/html/cheatSheet.html)    
    
## Using H2    
    
- [H2](https://h2database.com/)is[open source](https://github.com/h2database/h2database),[free to use and distribute](http://www.h2database.com/html/license.html).    
- [Download](https://h2database.com/html/download.html):[jar](https://repo1.maven.org/maven2/com/h2database/h2/2.2.220/h2-2.2.220.jar),[installer (Windows)](https://github.com/h2database/h2database/releases/download/version-2.2.220/h2-setup-2023-07-04.exe),[zip](https://github.com/h2database/h2database/releases/download/version-2.2.220/h2-2023-07-04.zip).    
- To start the[H2 Console tool](http://www.h2database.com/html/quickstart.html#h2_console), double click the jar file, or run`java -jar h2*.jar`,`h2.bat`, or`h2.sh`.    
- [A new database is automatically created](http://www.h2database.com/html/tutorial.html#creating_new_databases)[by default        
  if an embedded URL is used](http://www.h2database.com/html/features.html#database_only_if_exists).    
- [Closing the last connection closes the database](http://www.h2database.com/html/features.html#closing_a_database).    
    
## Documentation    
    
Reference:[SQL grammar](http://www.h2database.com/html/grammar.html),[functions](http://www.h2database.com/html/functions.html),[data types](http://www.h2database.com/html/datatypes.html),[tools](http://www.h2database.com/html/tutorial.html#command_line_tools),[API](http://www.h2database.com/javadoc/index.html)          
[Features](http://www.h2database.com/html/features.html):[fulltext search](http://www.h2database.com/html/tutorial.html#fulltext),[encryption](http://www.h2database.com/html/features.html#file_encryption),[read-only](http://www.h2database.com/html/features.html#read_only)[(zip/jar)](http://www.h2database.com/html/features.html#database_in_zip),[CSV](http://www.h2database.com/html/tutorial.html#csv),[auto-reconnect](http://www.h2database.com/html/features.html#auto_reconnect),[triggers](http://www.h2database.com/html/features.html#triggers),[user functions](http://www.h2database.com/html/features.html#user_defined_functions)    
    
## [Database URLs](http://www.h2database.com/html/features.html#database_url)    
    
**[Embedded](http://www.h2database.com/html/features.html#connection_modes)**          
`jdbc:h2:~/test`'test' in the user home directory          
`jdbc:h2:/data/test`'test' in the directory /data          
`jdbc:h2:./test`in the current(!) working directory    
    
**[In-Memory](http://www.h2database.com/html/features.html#in_memory_databases)**          
`jdbc:h2:mem:test`multiple connections in one process, database is removed when all connections are closed          
`jdbc:h2:mem:test;DB_CLOSE_DELAY=-1`multiple connections in one process, database in not removed when all connections are        
closed ([may create a memory leak](http://www.h2database.com/html/features.html#in_memory_databases))          
`jdbc:h2:mem:`unnamed private; one connection    
    
**[Server Mode](http://www.h2database.com/html/tutorial.html#using_server)**          
`jdbc:h2:tcp://localhost/~/test`user home dir          
`jdbc:h2:tcp://localhost//data/test`or`jdbc:h2:tcp://localhost/D:/data/test`absolute dir          
[Server start](http://www.h2database.com/html/tutorial.html#using_server):`java -cp *.jar org.h2.tools.Server`    
    
**[Settings](http://www.h2database.com/html/features.html#database_url)**          
`jdbc:h2:..;MODE=MySQL;DATABASE_TO_LOWER=TRUE`[compatibility (or HSQLDB,...)](http://www.h2database.com/html/features.html#compatibility)          
`jdbc:h2:..;TRACE_LEVEL_FILE=3`[log to *.trace.db](http://www.h2database.com/html/features.html#trace_options)    
    
## [Using the JDBC API](http://www.h2database.com/html/tutorial.html#connecting_using_jdbc)    
    
Connection conn = DriverManager.        
getConnection("jdbc:h2:~/test");        
conn.close();    
    
## [Connection Pool](http://www.h2database.com/html/tutorial.html#connection_pool)    
    
import org.h2.jdbcx.JdbcConnectionPool;        
JdbcConnectionPool cp = JdbcConnectionPool.        
create("jdbc:h2:~/test", "sa", "sa");        
Connection conn = cp.getConnection();        
conn.close(); cp.dispose();    
    
## [Maven 2](http://www.h2database.com/html/build.html#maven2)    
    
<dependency>        
    <groupId>com.h2database</groupId>        
    <artifactId>h2</artifactId>        
    <version>2.2.220</version>        
</dependency>        
    
## [Hibernate](http://www.h2database.com/html/tutorial.html#using_hibernate)    
    
hibernate.cfg.xml (or use the HSQLDialect):    
    
<property name="dialect">        
    org.hibernate.dialect.H2Dialect        
</property>        
    
## [TopLink and Glassfish](http://www.h2database.com/html/tutorial.html#using_toplink)    
    
Datasource class:`org.h2.jdbcx.JdbcDataSource`          
`oracle.toplink.essentials.platform.`          
`database.H2Platform`    
        
---  
    
## Run **H2 Database** in three different modes:    
    
1. Server Mode        
   `jdbc:h2:tcp://localhost/~/test`    
    
> When using H2 db in**server mode**(also known as client/server mode) all data is transferred over TCP/IP.      
> Before application can use H2 Database in server mode, you need to start the H2 DB within      
> the same or another machine.    
    
					To run H2 Database in **Server Mode** you need the JAR file containing the DB Classes. You can download it from [http://www.h2database.com/html/download.html](http://www.h2database.com/html/download.html)        
        
		You can then Start the DB in Server mode by executing the **H2 DB Runnable JAR** file:        
    
```shell        
java -jar h2-.jar -webAllowOthers -tcpAllowOthers        
```        
    
> 	start programmatically        
    
```java        
import org.h2.tools.Server;      
      
      
// start the H2 DB TCP Server        
        
Server server=Server.createTcpServer("-tcpPort","9092","-tcpAllowOthers").start();      
      
      
// stop the H2 DB TCP Server        
      
        server.stop();        
```        
    
> In server mode, you need to use one of the following JDBC URLs:    
    
```        
_jdbc:h2:tcp://localhost/~/test_ connect to the ‘test’ database in the user home directory on the server (local computer).        
        
_jdbc:h2:tcp://192.168.1.3:9092 //data/test_ connect to the ‘test’ database in the /data directory on the remote server.        
```        
    
> **Run H2 server in command line:**    
    
In command prompt or terminal window, type the following command to run H2 server:    
    
```        
java -cp h2-version.jar org.h2.tools.Server -tcp        
```        
    
This will start H2 server program, listening for TCP connections. To know more options, type the following command:    
    
```        
java -cp h2-version.jar org.h2.tools.Server -help        
```        
    
2. Embedded mode:        
   `jdbc:h2:~/test`    
    
> H2 db in embedded mode will be faster but the downside of it is that_no other process can access the Database_.      
> In the above connection string, the Data will be saved into the ‘test’ folder, under      
> the user’s home directory.    
    
> 			To connect to an H2 embedded database, you need to use one of the following JDBC URLs:        
    
```        
				_jdbc:h2:~/test_the ‘test’ database in the user home directory        
				        
				_jdbc:h2:./test_ the ‘test’ database in the current directory        
				        
				_jdbc:h2:/data/test_ the ‘test’ database in the /data directory (Unix)        
				        
				_jdbc:h2:D:/data/test_ the ‘test’ database in the D:/data directory (Windows)        
```        
    
3. Mixed mode:        
   `jdbc:h2:/data/test;AUTO_SERVER=TRUE`    
    
> When using automatic mixed mode, you can share the JDBC URL for all applications using the DB. By default the server uses any free TCP port. The port can be set manually using AUTO_SERVER_PORT=9090.    
    
4. Java Connect to H2 Database in In-Memory Mode    
    
> You can use H2 database in in-memory mode, which means the database is created in memory when the first connection is established, and is removed when all connections are closed.      
> The database engine      
> runs in the same process of the application.    
    
> Using H2 in-memory database is preferred for quick testing in which data is not need to be stored permanently on disk.    
    
> To connect to a H2 in-memory database, you need to use JDBC URLs look like follows:    
    
- multiple connections in one process    
    
```        
jdbc:h2:mem:test        
```        
    
- unnamed private; one connection.    
    
```        
jdbc:h2:mem:        
```        
    
### execute sql scripts    
    
```shell        
jdbc:h2:tcp://localhost/mem:elytron_jdbc_test;DB_CLOSE_DELAY=-1;DB_CLOSE_DELAY=-1;INIT=RUNSCRIPT FROM 'classpath:import.sql        
```        
    
> shutdown    
    
```shell        
jdbc:h2:~/test;DB_CLOSE_ON_EXIT=FALSE        
```        
    
### start and stop from maven    
    
```xml        
      
<plugin>      
    <groupId>org.codehaus.mojo</groupId>      
    <artifactId>exec-maven-plugin</artifactId>      
    <version>3.1.0</version>      
    <executions>      
        <execution>      
            <!-- start H2 DB before integration tests -->      
            <id>start</id>      
            <phase>pre-integration-test</phase>      
            <goals>      
                <goal>java</goal>      
            </goals>      
            <configuration>      
                <mainClass>com.mastertheboss.StartServer</mainClass>      
            </configuration>      
        </execution>      
        <execution>      
            <!-- stop H2 DB after integration tests -->      
            <id>stop</id>      
            <phase>post-integration-test</phase>      
            <goals>      
                <goal>java</goal>      
            </goals>      
            <configuration>      
                <mainClass>com.mastertheboss.StopServer</mainClass>      
            </configuration>      
        </execution>      
    </executions>      
</plugin>        
```        
    
        
---  
    
# Queries    
    
## Intersect    
    
```hql              
select *      
from LAB_TEST_SERVICES_POJO lts      
where exists      
    ( select lsm.inttestid from LAB_SPECIMEN_MAPPING lsm where lsm.status = 1 and lts.inttestid = lsm.inttestid )      
  and exists      
    ( select ltl.inttestid from LAB_TEST_LOCATION ltl where ltl.status = 1 and lts.inttestid = ltl.inttestid )              
```              
    
### join same object to query against 2 lists    
    
```hql              
select o              
from Object as o              
         join o.otherObjects as otherObject              
where otherObject in :allowedotherobjects              
  and otherObject not in :excludedotherobjects              
```              
    
### determine length diff of a group concat    
    
```hql              
(CHAR_LENGTH (GROUP_CONCAT(CONCAT(user.id, manager.id))) - CHAR_LENGTH (REPLACE(GROUP_CONCAT(CONCAT(user.id, manager.id)), ',', '' )))              
```              
    
## EXAMPLE large query with teary / multi join/ and JSON extractor    
    
```hql              
select USER.FIRSTNAME,      
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
from ${User user} left outer join ${UserRelationship ur}      
with ur.user.id = user.id or ur.manager.id = user.id left outer join ${ur.manager} manager inner join ${AssessmentOrder ao}      
with ao.id = CAST ((CONCAT(FUNCTION ('JSON_EXTRACT', user.userMetadata, ' $.defaultAssessmentOrderId '))) as java.lang.Long) left outer join ${InterviewModel im}      
with im.sourceId = ao.catalogDetail.interviewModelId and im.source = (case when ao.catalogDetail.type = ' AO6 ' then ' TBSIX ' when ao.catalogDetail.type = ' A05 ' then ' TBFIVE ' when ao.catalogDetail.type = ' P2P ' then ' TBFIVE ' end) left outer join ${ScoringModel sm}      
on sm.id = (case when im.source = ' TBFIVE ' then (select s from ScoringModel s where s.interviewModelId = im.id) else (select s from ScoringModel s where s.sourceId = ao.catalogDetail.interviewModelId) end)      
where user.clientSetupId = ${clientSetupId}      
  and user.id in (${searchStrings?.lastName ? findAllIdsByFirstNameAndLastName(searchStrings.firstName.toString()      
    , searchStrings.lastName.toString())*.getId().join(', ')              
```              
    
> calling method    
    
```groovy              
findAllByFirstNameOrLastNameOrEmail(searchStrings.firstName.toString())*.getId().join('              
```              
    
```hql              
select distinct NEW COM.TALENTBANK.CORE.USERMAP(USER.ID, USER.USERNAME, USER.CLIENTSETUPID, USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN, USER.PICTUREURL,              
        MANAGER.ID, MANAGER.EMAIL, MANAGER.FIRSTNAME, MANAGER.LASTNAME, MANAGER.USERMETADATA, MANAGER.LASTLOGIN, MANAGER.PICTUREURL, coalesce(MANAGER.EXTERNALEMPLOYEECODE, 0),              
        coalesce(AO.ID, 1), coalesce(AO.COMPANYINTERVIEWNAME, 'p'), coalesce(AO.COMPLETEDDATE, '00/00/00'), coalesce(AO.CATALOGDETAIL.ID, 1), coalesce(SM.ALIAS,  'p'))      
from ${USER USER}      
         left outer join ${USERRELATIONSHIP UR} WITH ur.user.id = user.id or ur.manager.id = user.id              
    left outer join ur.manager manager              
    left outer join ${AssessmentOrder ao}      
with ao.id = CAST ((CONCAT( '', FUNCTION ('JSON_EXTRACT', user.userMetadata, '$.defaultAssessmentOrderId'), '')) as java.lang.Long) left outer join ${InterviewModel im}      
with im.sourceId = ao.catalogDetail.interviewModelId and im.source = (case when ao.catalogDetail.type = 'AO6' then 'TBSIX' when ao.catalogDetail.type = 'A05' then 'TBFIVE' when ao.catalogDetail.type = 'P2P' then 'TBFIVE' end) left outer join ${ScoringModel sm}      
on sm.id = (case when im.source = 'TBFIVE' then (select s from ScoringModel s where s.interviewModelId = im.id) else (select s from ScoringModel s where s.sourceId = ao.catalogDetail.interviewModelId) end)      
where user.clientSetupId = $clientSetupId      
```              
    
## EXAMPLE calling method in HQL statement    
    
```hql              
select distinct new COM.TALENTBANK.CORE.DTO.USERTEAM.TEAMSEARCHDTOMAP(USER.ID, USER.USERNAME, USER.CLIENTSETUPID, USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN, USER.PICTUREURL,              
MANAGER.ID, MANAGER.EMAIL, MANAGER.FIRSTNAME, MANAGER.LASTNAME, MANAGER.USERMETADATA, MANAGER.LASTLOGIN, MANAGER.PICTUREURL,              
MANAGER.EXTERNALEMPLOYEECODE)      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
on manager.id = ur.manager.id      
where user.clientSetupId = 2000      
  and user.id in (${ findAllByFirstNameOrLastNameOrEmail(searchStrings.firstName)*.getId().join(' , ')}))              
```              
    
## EXAMPLE case in where statement    
    
```hql              
select distinct new Map( USER.ID as user, MANAGER.ID as manager )      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
on manager.id = ur.manager.id      
where user.clientSetupId in (55      
    , 2000)      
  and (user.firstName like '%'||'${testSearch}'||'%'      
   or user.lastName like '%'||'${testSearch}'||'%'      
   or manager.firstName like case when ${searchManagerName} = true then ('%'||'${testSearch}'||'%') else '' end      
   or manager.lastName like case when ${searchManagerName} = true then ('%'||'${testSearch}'||'%') else '' end )              
```              
    
## return all if null or empty    
    
```hql              
select distinct new Map( USER.ID as user, MANAGER.ID as manager )      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
on manager.id = ur.manager.id      
where user.clientSetupId in (${clientSetUpIdList.join(' , ') ?: ClientSetup.all.id.join(' , ') })      
  and (user.firstName like ${testSearch.user}      
   or user.lastName like ${testSearch.user}      
   or manager.firstName like ${testSearch.manager}      
   or manager.lastName like ${testSearch.manager} )              
```              
    
## subquery    
    
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
    
## create tuple    
    
```hql              
SELECT CONCAT('[', USER.ID, ':', IFNULL(MANAGER.ID, 'null'), ']')              
FROM USER USER              
LEFT OUTER JOIN UserRelationship ur              
WITH ur.user.id = USER.id OR ur.manager.id = USER.id              
    LEFT OUTER JOIN USER manager              
WITH manager.id = ur.manager.id              
WHERE USER.clientSetupId = 2000              
```              
    
## creative count    
    
### add/concat chars get length    
    
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
    
### get groupings where there may be nulls    
    
```hql              
select NEW Map( max(USER.ID) as userId , (select concat('{', group_concat(concat(coalesce(UR1.ID, 'noRelationship'), ':[{' ,              
                         USER.ID, ':' , coalesce(MANAGER1.ID, 'null'), '}]' )) , '}')              
                         from USER USER              
                         join UserRelationship ur1 with ur1.user.id = user.id or ur1.manager.id = user.id              
                         join user manager1 with manager1.id = ur1.manager.id) as TUPLES )      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
with manager.id = ur.manager.id      
where user.clientSetupId = 2000      
group by user.id, manager.id              
```              
    
### get list of digits    
    
```hql              
select max(USER.ID),      
       (select distinct concat(group_concat(1))      
        from USER u      
                 left outer join USERRELATIONSHIP ur with ur.user.id = u.id or ur.manager.id = u.id              
    left outer join user m      
        with m.id = ur.manager.id      
        where u.clientSetupId = 2000 and manager.id = m.id)      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
with manager.id = ur.manager.id      
where user.clientSetupId = 2000      
group by user, manager              
```              
    
### get correct char but need to count column    
    
#### Not working need to show one number, find way to count column    
    
```hql              
select (select count(u.id)      
        from USER u      
                 left outer join USERRELATIONSHIP ur with ur.user.id = u.id or ur.manager.id = u.id              
    left outer join user m      
        with m.id = ur.manager.id      
        where u.id in ( select distinct CONCAT(''      
            , GROUP_CONCAT(user.id      
            , manager.id)      
            , '') from u subu left outer join UserRelationship subur with subur.user.id = subu.id      
           or subur.manager.id = subu.id left outer join user subm with subm.id = subur.manager.id where user.clientSetupId = 2000 group by CONCAT( user.id      
            , IFNULL(manager.id      
            , 666)) ))      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
with manager.id = ur.manager.id      
where user.clientSetupId = 2000      
group by 'all'              
```              
    
```hql              
select count(*),      
       (select length(concat(group_concat('')))      
        from USER u      
                 left outer join USERRELATIONSHIP rel with rel.user.id = u.id or rel.manager.id = u.id              
    left outer join user m      
        with m.id = rel.manager.id      
        where u.clientSetupId = 2000 and u.id = user.id and (m.id = manager.id or (u.id is not null and m.id is null)))      
from USER USER      
         left outer join UserRelationship ur      
with ur.user.id = user.id or ur.manager.id = user.id left outer join user manager      
with manager.id = ur.manager.id      
where user.clientSetupId = 2000      
group by user, manager              
```              
    
## SELECT DISTINCT mag FROM Magazine mag    
    
```hql              
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
    
## Using HQL(hibernate query language) in findall    
    
### USING HQL for execute query    
    
```groovy              
 query = """              
       select NEW Map(ug.id as id, ug.NAME as NAME, ug.interviewModelId as interviewModelId,              
        ug.visibility as visibility, ug.lastUpdated as lastUpdated, count(ugao.id) as assessmentCount )      
from USERGROUP ug      
         left join USERGROUPASSESSMENTORDER ugao on ug.id = ugao.userGroupId      
where ug.userId = :userId      
  and ug.type = :type      
group by ug.id      
order by ug.NAME            
       """      
def groups = UserGroup.executeQuery(query, [userId: principalUser?.id, type: UserGroupType.RESULTGROUP])              
```              
    
## -HQL created using session-    
    
### -Full Example - [Full dynamic HQL, with QueryImpl object ](https://gist.github.com/14paxton/0ed8e82644cd661dc8c9fc0d4b8c2009)    
    
```groovy              
               User.withSession { uSession ->      
    def q = uSession.createQuery($/select distinct new COM.TALENTBANK.CORE.USERMAP(USER.ID,               
                                                           USER.USERNAME, USER.CLIENTSETUPID,               
                                                                          USER.EMAIL, USER.FIRSTNAME, USER.LASTNAME, USER.USERMETADATA, USER.LASTLOGIN,               
                                                          USER.PICTUREURL,MANAGER.ID, MANAGER.EMAIL ,               
                                                                          MANAGER.FIRSTNAME ,MANAGER.LASTNAME ,MANAGER.USERMETADATA, MANAGER.LASTLOGIN               
                                                                         ,MANAGER.PICTUREURL               
                                                                          ,MANAGER.EXTERNALEMPLOYEECODE)      
from $ user user left join fetch $UserRelationship ur      
on ur.user.id = user.id or ur.manager.id = user.idleft join ur.manager manager      
where user.firstName like CONCAT('%'      
    , $searchString      
    , '%')      
   or user.lastName like CONCAT('%'      
    , $searchString      
    , '%')      
   or user.email like CONCAT('%'      
    , $searchString      
    , '%')      
   or manager.firstName like CONCAT('%'      
    , $searchString      
    , '%')      
   or manager.lastName like CONCAT('%'      
    , $searchString      
    , '%')                     
                                                /$)      
      
    q.maxResults = 8      
    q.firstResult = 2      
    q.list()      
}              
```              
    
## using Groovy SQL    
    
```groovy              
       List fetchUsersByNameOrManagerName(String searchString, params) {      
    if (!params) return null      
    def (firstNameSearch, lastNameSearch, rest) = searchString?.tokenize()      
    //        DataSource dataSource = Holders.grailsApplication.mainContext.getBean('dataSource')              
    //        Sql groovySql = new Sql(dataSource)              
      
    String query = """select distinct user.id,      
                user.username,      
                user.client_setup_id,      
                user.email,      
                user.first_name,      
                user.last_name,      
                user.user_metadata,      
                user.last_login,      
                user.picture_url,      
                manager.first_name as mgr_first_name,      
                manager.last_name  as mgr_last_name      
from user      
         left join user_relationship as userRelationship on userRelationship.user_id = user.id      
         left join user manager on userRelationship.manager_id = manager.id      
where ((user.first_name like '%${searchString}%' || user.last_name like '%${searchString}%' || user.email like      
        '%${searchString}%') ||      
       (user.first_name like '%${firstNameSearch}%' && user.last_name like '%${lastNameSearch}%'))      
union      
select distinct user.id,      
                user.username,      
                user.client_setup_id,      
                user.email,      
                user.first_name,      
                user.last_name,      
                user.user_metadata,      
                user.last_login,      
                user.picture_url,      
                manager.first_name as mgr_first_name,      
                manager.last_name  as mgr_last_name      
from user      
         left join user_relationship as userRelationship on userRelationship.user_id = user.id      
         left join user manager on userRelationship.manager_id = manager.id      
where ((manager.first_name like '%${searchString}%' || manager.last_name like '%${searchString}%') ||      
       (manager.first_name like '%${firstNameSearch}%' && manager.last_name like '%${lastNameSearch}%'))               
                            """      
      
    groovySql.rows(query, 0, 15)      
}              
```              
    
## pagination server side with PagedListHolder Object    
    
```hql        
    def queryResults = userDataService.searchForUsersWhereNameOrEmailLike(searchString)              
    def pages = new PagedListHolder(queryResults)              
    pages.setPage(params.off) //set current page number              
    pages.setPageSize(params.max) // set the size of page              
```