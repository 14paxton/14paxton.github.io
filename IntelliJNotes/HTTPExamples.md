---  
title:        HTTPExamples  
permalink:    IntelliJNotes/HTTPExamples  
category:     IntelliJNotes  
parent:       IntelliJNotes  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
  
  - intellijnotes  
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
  
# [IntelliJ HTTP Client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html)  
  
# create GROUP_COMPARE  
  
```shell    
POST http://ip:port/am/userGroups/v1/group/compareContent-Type: application/json    
    
{    
"id"  :null ,    
"name": "GETGUD",    
"type": "GROUP_COMPARE",    
"groupIds": [520, 518],    
"assessmentOrderIds": null    
}    
    
```    
  
# update GROUP_COMPARE  
  
```shell    
POST http://ip:port/am/userGroups/v1/group/compareContent-Type: application/json    
    
{    
"id" : 599,    
"name": "GETBETTER",    
"type": "GROUP_COMPARE",    
"groupIds": [520, 372, 518],    
"assessmentOrderIds": []    
}    
    
```    
  
# SHARE  
  
```shell    
POST http://192.168.12.26:8080/am/userGroups/v1/599/shareContent-Type: application/json    
    
{    
"userIds" : [124554, 124555, 124556]    
}    
    
```    
  
# DELETE  
  
```shell    
DELETE http://192.168.12.26:8080/am/userGroups/v1/599    
```    
  
# create RESULT_SHARE  
  
```shell    
POST http://192.168.12.26:8080/am/userGroups/v1/group/compareContent-Type: application/json    
    
{    
"name": "IRONTOM",    
"type": "RESULT_COMPARE",    
"groupIds": [519],    
"assessmentOrderIds": [35075, 45481]    
}    
    
```    
  
# update RESULT_SHARE  
  
```shell    
POST http://192.168.12.26:8080/am/userGroups/v1/groupContent-Type: application/json    
    
{    
"id" : 564,    
"name": "KIDMIDNIGHT",    
"type": "RESULT_COMPARE",    
"groupIds": null,    
"assessmentOrderIds": [71539,    
71516,    
71496,    
71476,    
71456]    
}    
```