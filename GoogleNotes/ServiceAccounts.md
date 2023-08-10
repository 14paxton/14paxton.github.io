---  
title: ServiceAccounts    
permalink: GoogleNotes/ServiceAccounts    
category:  GoogleNotes    
parent:   GoogleNotes    
layout: default    
has_children: false    
share: true    
shortRepo:    
  - googlenotes    
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
    
# [Service Accounts](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/set-iam-policy)    
    
## [Activate Service Account](https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account)    
    
## [Create And Manage](https://cloud.google.com/iam/docs/creating-managing-service-accounts)    
    
### Permissions    
    
> You need the Cloud IAM permission serviceusage.services.enable to enable services. Depending on what features your require, such as listing services, you need serviceusage.services.list.    
    
- Typically you add the role ``` roles/serviceusage.serviceUsageAdmin ``` which includes the following permissions:    
    
```    
serviceusage.services.get    
serviceusage.services.list    
serviceusage.services.enable    
serviceusage.services.disable    
```    
    
***    
    
## [Identity and Access Management IAM](https://cloud.google.com/iam/docs/roles-overview)    
    
***