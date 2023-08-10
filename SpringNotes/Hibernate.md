---  
title:        Hibernate    
permalink:    SpringNotes/Hibernate    
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
    
# Grails Notes    
    
## Access to session and hibernate-    
    
### getting session-    
    
`def sessionFactory`    
    
`def session = sessionFactory?.getCurrentSession()`    
    
`RequestContextHolder.currentRequestAttributes().getSession()`    
    
## -get hibernate datastore in session-    
    
### -Get hibernatedatasource-    
    
[hibernate datastore ex.](https://guides.grails.org/grails-dynamic-multiple-datasources/guide/index.html  )    
    
~~~java    
@Autowired    
HibernateDatastore hibernateDatastore    
    
@Autowired    
       DatabaseProvisioningService databaseProvisioningService    
    
@Listener(User)     
       void onUserPostInsertEvent(PostInsertEvent event){    
               String username=event.getEntityAccess().getPropertyValue("username")    
               DatabaseConfiguration databaseConfiguration=databaseProvisioningService.findDatabaseConfigurationByUsername(username)    
               hibernateDatastore.getConnectionSources().addConnectionSource(databaseConfiguration.dataSourceName,databaseConfiguration.configuration)    
               }    
~~~    
    
### -get table columns-    
    
```groovy    
hibernateDatastore.getSessionFactory().getClassMetadata(GroupCompare).getProperties().sort()    
```    
    
```groovy    
ctx.sessionFactory.getClassMetadata(Team).attributes.collect { it.name }    
```    
    
### -get data bindings/properties/class/domain table/declared fields-    
    
`def mapping = org.grails.orm.hibernate.cfg.GrailsDomainBinder.getMapping(UserGroup)`    
    
`sessionFactory.getClassMetadata(Foo).tableName`    
    
`org.grails.orm.hibernate.cfg.GrailsDomainBinder.getMapping(groupCompare.class).class.declaedFields`    
    
### -get a service-    
    
1.    
    
```java    
@Autowired     
HibernateDatastore hibernateDatastore    
        UserDataService userDataService    
    
        UserService(HibernateDatastore hibernateDatastore){    
        this.userDataService=hibernateDatastore.getService(UserDataService)    
        }    
```    
    
2. ```(YourService)Holders.grailsApplication.mainContext["yourService"]```    
3. ```applicationContext."${yourServiceName}".serviceMethod()```    
4. ```ctx.getBean('userGroupService')```    
5. ```Holders.applicationContext.getBean("myService")```    
6.    
    
```java    
 ApplicationContext ctx=(ApplicationContext)ServletContextHolder    
        .getServletContext()    
        .getAttribute(GrailsApplicationAttributes    
        .APPLICATION_CONTEXT)    
    
        statisticsService=(StatisticsService)ctx.getBean("statisticsService ")    
```