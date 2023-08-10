---  
title: Logging    
permalink: GoogleNotes/Logging    
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
    
# [Logging](https://cloud.google.com/logging/docs/)    
    
> [Logs Explorer](https://console.cloud.google.com/logs/query;query=resource.labels.project_id%3D%22your-project-name%22;timeRange=2023-01-04T14:14:48.965Z%2F2023-02-02T15:14:48.965Z;summaryFields=:false:32:beginning;cursorTimestamp=2023-02-02T15:14:48.964204Z?project=your-project-name)    
    
> [Logging Class Docs for List](https://cloud.google.com/dotnet/docs/reference/Google.Cloud.Logging.V2/latest/Google.Cloud.Logging.V2.LoggingServiceV2Client#Google_Cloud_Logging_V2_LoggingServiceV2Client_ListLogEntries_Google_Cloud_Logging_V2_ListLogEntriesRequest_Google_Api_Gax_Grpc_CallSettings_)    
    
> [Query Language Doc](https://cloud.google.com/logging/docs/view/logging-query-language)    
    
> [C# GitHub Google.Cloud.Logging.V2](https://github.com/googleapis/google-cloud-dotnet/tree/main/apis/Google.Cloud.Logging.V2)    
    
> [JSON return LogEntry](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry)    
    
***     
    
## Querying    
    
### [By Time](https://cloud.google.com/logging/docs/view/logging-query-language#search_by_time)    
    
In the interface, you can set specific limits on the date and time of log entries to show. For example, if you add the following conditions to your query, the preview displays exactly the log entries    
in the indicated 30-minute period and you won't be able to scroll outside of that date range:    
    
timestamp >= "2016-11-29T23:00:00Z" timestamp <= "2016-11-29T23:30:00Z"    
    
When writing a query with a timestamp, you must use dates and times in the format shown above.    
    
You can also search log entries using timestamp shortcuts. For example, you can enter a date with a comparison operator to get all log entries after a certain day:    
    
timestamp > "2016-11-29"    
Note: Logging interprets query expressions that use the YYYY-MM-DD format as YYYY-MM-DDT00:00:00Z.    
    
***    
    
## [CLI](https://cloud.google.com/sdk/gcloud/reference/logging)    
    
### [READ LOGS](https://cloud.google.com/sdk/gcloud/reference/logging/read)    
    
#### Quick Scripts    
    
```shell    
gcloud logging read "resource.type=global AND jsonPayload.queryResult.responseMessages.conversationSuccess.metadata.resolved:*" --freshness="1d" --resource-names="projects/vcu-virtual-assistant-bot" --limit=1    
```    
    
***    
    
## STORAGE    
    
### [Routing](https://cloud.google.com/logging/docs/routing/overview#destinations)    
    
### [Data Buckets](https://cloud.google.com/logging/docs/buckets#api)    
    
### [Trigger Functions](https://cloud.google.com/functions/docs/samples/functions-log-stackdriver?hl=en#functions_log_stackdriver-java)    
    
***    
    
## [API](./APIs.md#)    
    
### [Entries List](https://cloud.google.com/logging/docs/reference/v2/rest/v2/entries/list?apix_params=%7B%22resource%22%3A%7B%22resourceNames%22%3A%5B%22projects%2Fyour-project-name%22%5D%2C%22filter%22%3A%22resource.type%3Dglobal%22%2C%22orderBy%22%3A%22timestamp%20desc%22%7D%7D)    
    
***    
    
## [Steps I took for Logging](https://cloud.google.com/logging/docs/write-query-log-entries-gcloud)    
    
### **__<span style="color:red">1) installed cli via PowerShell</span>__**    
    
```powershell    
   (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")    
    
            & $env:Temp\GoogleCloudSDKInstaller.exe    
        
```    
    
### **__<span style="color:red"> 2) Set your default project so you don't have to supply the --project flag with each command:</span>__**    
    
```powershell    
gcloud config set project    
your-project-name    
```    
    
### **__<span style="color:red"> 3) FYI</span>__**    
    
```    
Cloud SDK requires Python; supported versions are Python 3 (3.5 to 3.9). By default, the Windows version of Cloud SDK comes bundled with Python 3. To use Cloud SDK, your operating system must be able to run a supported version of Python.    
    
The installer installs all necessary dependencies, including the needed Python version. While Cloud SDK installs and manages Python 3 by default, you can use an existing Python installation if necessary by unchecking the option to Install Bundled Python. See gcloud topic startup to learn how to use an existing Python installation.    
```    
    
- [Available SDKS](https://cloud.google.com/sdk/)    
    
### **__<span style="color:red">4) in cli get logs </span>__**    
    
```bash    
gcloud gcloud logging read --freshness="50d"    
```    
    
> --freshness=FRESHNESS; default="1d"    
>> Return entries that are not older than this value. Works only with DESC ordering and filters without a timestamp. See $ gcloud topic datetimes for information on duration formats.    
    
### **__<span style="color:red">    
    
5) [Can test api calls and parameters with API explorer](https://cloud.google.com/logging/docs/reference/v2/rest/v2/entries/list?apix_params=%7B%22resource%22%3A%7B%22resourceNames%22%3A%5B%22projects%2Fyour-project-name%22%5D%2C%22filter%22%3A%22resource.type%3Dglobal%22%2C%22orderBy%22%3A%22timestamp%20desc%22%7D%7D) </span>    
   __**    
    
- [API Permissions List](https://cloud.google.com/logging/docs/access-control#api-permissions)    
    
> use request body    
    
```json    
   {    
  "resourceNames": [    
    "projects/your-project-name"    
  ],    
  "filter": "resource.type=global",    
  "orderBy": "timestamp desc"    
}    
```    
    
#### [Get Logging through API](https://cloud.google.com/logging/docs/api/enable-api#gcloud-cli)    
    
- See if Logging API enabled    
    
```bash    
gcloud services list --project=your-project-name    
```    
    
### **__<span style="color:red"> 6) [AUTHENTICATED SERVICE ACCOUNT](https://cloud.google.com/sdk/docs/authorizing) </span>__**    
    
```bash    
   gcloud auth login --cred-file=C:\Users\bp01232023\source\repos\Wiki\GoogleDialogFlow.wiki\FilesOfInterest\your-project-name-e9d441de07b0.json    
 ```    
    
or    
    
 ```bash    
 gcloud auth activate-service-account google-cli-service-account@your-project-name.iam.gserviceaccount.com --key-file=C:\Users\bp01232023\source\repos\Wiki\GoogleDialogFlow.wiki\FilesOfInterest\your-project-name-e9d441de07b0.json    
 ```    
    
- Enable API    
    
```bash    
gcloud services enable logging --project=your-project-name    
```    
    
- [List Log Entries API C# snippet](https://cloud.google.com/logging/docs/samples/logging-list-log-entries)    
    
***    
    
[Many Google Cloud Platform events are logged in Cloud Audit Logs. You can filter these logs and forward them to Pub/Sub topics using sinks. These Pub/Sub topics can then send notifications that trigger Cloud Functions. This allows you to create custom events from any Google Cloud Platform service that produces audit logs.](https://cloud.google.com/functions/docs/calling/logging)    
    
    
    
> Route logs to new destinations with a Log Router and Sink    
    
    
    
https://cloud.google.com/logging/docs/routing/overview#destinations    
    
Sinks control how Cloud Logging routes logs. Using sinks, you can route some or all of your logs to [supported destinations](https://cloud.google.com/logging/docs/routing/overview#destinations). Some    
of the reasons that you might want to control how your logs are routed include the following    
    
example    
    
https://cloud.google.com/functions/docs/samples/functions-log-stackdriver?hl=en#functions_log_stackdriver-java    
    
## Supported destinations    
    
- [Guide on how to route logs to supported destinations](https://cloud.google.com/logging/docs/export/configure_export_v2)    
    
You can use the Log Router to route certain logs to supported destinations in any Cloud project. Logging supports the following sink destinations:    
    
Cloud Logging log buckets: Provides storage in Cloud Logging. A [log bucket](https://cloud.google.com/logging/docs/routing/overview#buckets) can store logs ingested by multiple Google Cloud projects.    
You specify the data retention period, the data storage location, and the [log-views](https://cloud.google.com/logging/docs/logs-views) on a log bucket. Log views let you control which logs in a log    
bucket that a user can access. Log buckets are recommended storage when you want to troubleshoot your applications and services, or to analyze your log data. If you need to combine your Cloud Logging    
data with other data sources, then you can store your logs in log buckets that are upgraded to use Log Analytics, and then link that bucket to BigQuery. For information about viewing logs,    
see [Query and view logs overview](https://cloud.google.com/logging/docs/log-analytics)    
and [View logs routed to Cloud Logging buckets](https://cloud.google.com/logging/docs/export/using_exported_logs).    
    
Pub/Sub topics: Provides support for third-party integrations, such as [Splunk](https://cloud.google.com/architecture/exporting-stackdriver-logging-for-splunk), with Logging. Log entries are formatted    
into JSON and then delivered to a Pub/Sub topic. For information about viewing these logs, their organization, and how to configure a third-party integration,    
see [View logs routed to Pub/Sub](https://cloud.google.com/logging/docs/export/pubsub).    
    
BigQuery datasets: Provides storage of log entries in BigQuery datasets. You can use big data analysis capabilities on the stored logs. If you need to combine your Cloud Logging data with other data    
sources, then you can route your logs to BigQuery. An alternative is to store your logs in log buckets that are upgraded to use Log Analytics and then linked to BigQuery. For information about viewing    
logs routed to BigQuery, see [View logs routed to BigQuery](https://cloud.google.com/logging/docs/export/bigquery).    
    
Cloud Storage buckets: Provides inexpensive, long-term storage of log data in Cloud Storage. Log entries are stored as JSON files. For information about viewing these logs, how they are organized, and    
how late-arriving logs are handled, see [View logs routed to Cloud Storage](https://cloud.google.com/logging/docs/export/storage).