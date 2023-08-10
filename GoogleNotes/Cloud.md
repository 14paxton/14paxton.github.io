---  
title: Cloud    
permalink: GoogleNotes/Cloud    
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
    
# [CLI](https://cloud.google.com/sdk/gcloud)    
    
# [CheatSheet](https://cloud.google.com/sdk/docs/cheatsheet)    
    
# [Properties](https://cloud.google.com/sdk/docs/properties)    
    
# [Script Commands](https://cloud.google.com/sdk/docs/scripting-gcloud)    
    
## [Automated Scripting](https://cloud.google.com/blog/products/management-tools/scripting-with-gcloud-a-beginners-guide-to-automating-gcp-tasks)    
    
## QUICK SCRIPTS    
    
>    
> If you want to logout from all the accounts run the following command    
    
```bash    
gcloud auth revoke --all    
```    
    
> If you want to logout from a specific account then run the following command    
    
```bash    
gcloud auth revoke <your_account>    
```    
    
> If you want to login with a different account, you can run the following command    
    
```bash    
gcloud auth login    
```    
    
***    
    
```gcloud init```    
    
If you called gcloud auth login, this stores credentials in your user directory on your computer. You may want to delete these credentials by calling:    
    
```gcloud auth revoke```    
    
If you called gcloud auth application-default login, this stores credentials in your user directory on your computer. You may want to delete these credentials by calling:    
    
```gcloud auth application-default revoke```    
    
## - [List Available Cloud Components](https://cloud.google.com/sdk/gcloud/reference/components/list)    
    
## [Logging](./Logging.md#)    
    
***    
    
### - Permissions    
    
```    
gcloud logging commands are controlled by Identity and Access Management (IAM) permissions.    
    
To use any of the gcloud logging commands, you must have the serviceusage.services.use permission. You must also have the IAM role that corresponds to the log's location, and to your use case:    
```    
    
[Access Control](https://cloud.google.com/logging/docs/access-control)    
| Use case | IAM role |    
| --------------------------- | --------------------------------- |    
| List logs | Logging/Logs Viewer |    
| Tail logs | Logging/Logs Viewer |    
| Delete logs | Logging/Logging Admin |    
| Write logs | Logging/Logs Writer |    
| Read logs | Logging/Logs Viewer |    
| Read Data Access audit logs | Logging/Private Logs Viewer |    
| List sinks | Logging/Logs Viewer |    
| Create sinks | Logging/Logs Configuration Writer |    
| Update sinks | Logging/Logs Configuration Writer |    
| Delete sinks | Logging/Logs Configuration Writer |    
| List metrics | Logging/Logs Viewer |    
| Create basic metrics | Logging/Logs Configuration Writer |    
| Create advanced metrics | Logging/Logs Configuration Writer |    
| Update metrics | Logging/Logs Configuration Writer |    
| Delete metrics | Logging/Logs Configuration Writer |    
    
----------------------------------------------------------  
    
## Audits    
    
As part of monitoring the health of your contact center, you’ll want to perform routine    
audits in some key areas: anything that affects efficiency, helps manage costs and the    
workforce, or helps keep customers happy.    
Contact center metrics are provided by your telephony partner and can give you    
important insights. Which ones are important to your business varies by the purpose    
of the contact center, such as sales versus tech support. Some typical statistics    
include the following:    
● Average Wait Time is the amount of time, on average, that customers have to    
wait in queue before getting to an agent. The better this number, likely the    
happier your customers are.    
● Abandon Rate is often used with respect to voice interactions but can be used    
for other channels since the concept is that a customer is waiting in queue to    
speak with an agent. It reflects the percentage of callers that hung up while    
queued but before getting to an agent.    
There are three types of Cloud Logging Audit Logs for Google Cloud projects:    
○ Admin Activity: for API calls or other administrative actions that modify    
the configuration or metadata of resources.    
○ Data Access: for API calls that read the configuration or metadata of    
resources and for user-driven API calls that create, modify, or read    
user-provided resource data.    
○ System Events: for administrative actions that modify the configuration    
○ of resources.    
■ System Event audit logs are generated by Google systems, not    
by direct user action.    
Cloud Audit Logs reside in highly protected storage, resulting in a secure, immutable,    
and highly durable audit trail. They are encrypted at rest using either AES256 or    
AES128, which is also used to help protect the rest of Google’s infrastructure.    
For more information on Google Cloud Audit logs, see the Encryption At Rest and    
Encryption in Transit whitepapers.    
The following is a list of common contact center metrics:    
● Average Wait Time: The amount of time, on average, that customers have to    
wait in queue before getting to an agent. A better number usually results in    
happier customers and lower costs to your business.    
● Average Speed of Answer (ASA): Across all agents and interactions, what was    
the average amount of time it took for a customer to get to an agent? Included    
in this number is any time they spent in an IVR, in queue, and waiting for an    
agent to pick up a ringing phone. To calculate ASA, a call center divides the    
total amount of waiting time by the number of calls they received in a set    
period. For instance, if there was a total of 20 minutes of waiting time for 10    
calls, the ASA would be five minutes (20/10 = 2). A better number usually    
results in happier customers and lower costs to your business.    
● Average After Call Work Time (ACW): The part of your agent’s time after    
they’ve finished an interaction with a customer but before they are ready in the    
system to be assigned the next customer interaction. This could be time the    
agent spends writing up their notes about the previous interaction, but it’s still    
time they are working and costing your business.    
● Average Handle Time: This reflects the average amount of time it takes agents    
to answer the customer’s contact and end the interaction. This is one of your    
biggest costs, so you want it to be low, but don’t forget that there’s a balance    
between this metric and customer retention and satisfaction.    
● Cost per contact: This includes all of your costs for running the contact center,    
including salary, hardware, electricity, and office expenses. It reflects an    
average of all of that across all customer interactions. This metric broken down    
by channel can be helpful in determining if one channel is more cost-effective    
than others.    
● Service Level: This metric is often associated with a Service Level Agreement    
you have with your clients, such as 80% of interactions answered within 20    
seconds. It reflects the percentage of interactions that meet the SLA.    
● Abandon Rate: Often used with respect to voice interactions, but can be used    
for other channels. The concept is that a customer is waiting in queue to speak    
with an agent. It reflects the percentage of callers who hung up while queued    
but before getting to an agent.    
● First Contact Resolution (FCR): Did the customer have to contact you again    
later to get their needs met? Calculated differently depending on the business,    
but in general it reflects the percentage of total cases where the customer’s    
● need was met during a single contact.    
● Agent Occupancy: The amount of time an agent is considered to be working    
(i.e., not on break, not sitting waiting for the next interaction, etc).