---
title: HTTPExamples
permalink: IntelliJNotes/HTTPExamples
category: IntelliJNotes
parent: IntelliJNotes
layout: default
has_children: false
share: true
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

---

<br/>

# [HTTP Client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html)

## Example Scripts

### POST with body

```HTTP
POST http://ip:port/am/userGroups/v1/group/compare
Content-Type: application/json

{
"id"  :null ,
"name": "GETGUD",
"type": "GROUP_COMPARE",
"groupIds": [520, 518],
"assessmentOrderIds": null
}

```

### Log in and save tokens

```HTTP
### log in with auth0
// @no-redirect
// @no-log
POST https://core.talentbankonline.com/v2/loginWithAuth0
Content-Type: application/x-www-form-urlencoded

{
    "username": "username",
    "password": "password"
}
> {%
    client.global.set("access_token", response.body["access_token"]);
    client.log(response.body["access_token"]);
    client.log(client.global.get("access_token"));

%}
```

#### Use Tokens

```HTTP
// @no-log
POST http://localhost:28080/TBEX/ssi/v1/create
Content-Type: application/json
Authorization: Bearer {{access_token}}

{
  "companyCode": "BPAXTON",
  "tbeCompanyCode": null,
  "externalClientId": null,
  "tbexPassword": "T@@@@@@L",
  "organization": 1
 }
```