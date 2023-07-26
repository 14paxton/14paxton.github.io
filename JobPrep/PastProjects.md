---  
title:        PastProjects  
permalink:    JobPrep/PastProjects  
category:     JobPrep  
parent:       PersonalDocsAndStuff  
layout:       default  
has_children: false  
share:        true  
shortRepo:  
  - jobprep  
  - default  
---  
  
  
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
  
# Projects  
  
## Front End  
  
### 1. - [React Hook Form- ReactHookFormFields/SelectBox.js](https://github.com/14paxton/ReactHookFormDynamicComponents)  
  
a. -things I did-  
  
       i.  Learned and created a proof of concept with dynamic library      
           to create forms using react hook forms to replace Forminak      
      
       ii. Figured out some unconventional ways to make form and      
           components work the way the end user request (wanting submit      
           for the form to be submitted by a button from a modal      
           produced by a parent component, using materials controlled      
           fields in the form designed for uncontrolled fields.      
  
### 2. - [Material Table -assessmentresultstable.js](https://github.com/14paxton/TableWithAsyncCall)  
  
a. Things I did  
  
       i.  Created custom search function component using react hook      
           forms      
      
       ii. Created an async search and load function that prevented      
           whole table from rerendering      
  
b. Difficulties  
  
       i.  On table selection showing material ui chips with assessment      
           names under table      
      
       ii. Custom select all (select all will only select all      
           assessments shown on designated table page, if you select to      
           paginate over or select to show more rows in table, select      
           all resets still keeping previous selections select , but if      
           clicked again will select new records shown)      
  
### 3. - [Dynamic Ellipsis Component -- ellipsismodifier.js](https://github.com/14paxton/DynamicEllipsis)  
  
a.  
Adds an ellipsis by text count or if text count is not set will      
create ellipsis when text overfills div, will dynamically add      
ellipsis if page is resized  
  
### 4. [Date Range Picker -- presetdaterangepicker.js](https://github.com/14paxton/DateRangePicker)  
  
a. Things I did  
  
       i.  Found an existing react range picker, used it as a template      
           to create a customized date range picker that worked with      
           the advanced search form I created      
  
b. Difficulties  
  
       i.  Finding an example of something using react close to what      
           the designer wanted, example they showed was an old jquery      
           data picker      
  
### 5.- [ created dynamic tool tip ](https://gist.github.com/14paxton/9c745874ec384add89c1908c73832594)  
  
- tool tip will only be shown if size of screen is causing text to have an ellipsis  
  
### 6. - [created HOC to create custom powerpoint from table in js and react](https://github.com/14paxton/TableToPowerPoint)  
  
## Backend  
  
### 1. - [Pulling images and pdfs from an s3 bucket to attach to an email --](https://gist.github.com/14paxton/1fa8f703b708b9488408c9217a83b3a9)  
  
- [getting binary stream](https://gist.github.com/14paxton/58da1e0c108fa527c5ec1a770eefa683)  
  - assesssmentresultservice.groovy and  
  - resultsharingdetalsservice.groovy  
  
  a. Things I did  
  
       i.  I needed to get images from s3 bucket and attach them to an      
           email that was sending with post mark      
  
  b. Difficulties  
  
       i.  I needed to get the files while I still had access to the      
           authorization token, but then send to jms que which was used      
           to send emails      
  
           1.  Save authorization and download url to map, attached as      
               string to message being sent to que, when email service      
               read message it downloads and saves file to temp      
               directory, then encodes file as base64 to attach to      
               email      
  
### 2. - [Find way to test gorm where/ detached criteria and hibernate queries](https://github.com/14paxton/PersonalGrailsNotes/blob/main/Testing.md#mocking-hibernate-used-to-test-methods-using-where-queriers--detached-criteria--criteria-builder)  
  
-- catalogdetailservicespec.groovy  
  
a.  
Dug through documentation for hibernate and how it works and      
came up with a way to mock and set hibernateDataStore and      
PlatformTransactionManager  
  
### 3. - [Found and configured plugin  
  
to create multiple fully qualified domain objects at once](https://github.com/14paxton/PersonalGrailsNotes/blob/main/Testing.md#using-test-data-from-buildtest-plugin)  
  
### 4. Integration with office 365 having scheduled assessments update both  
  
interviewer and interviewees outlook calendar  
  
### 5. - [created async service for processessing role changes for batch user updates](https://gist.github.com/14paxton/ef4f6e91fa7fa44015c41f26a1caf3ae)  
  
- [comparing role groups](https://gist.github.com/14paxton/b7ff93091f4db71beffb0a37140fa0f2)  
  
### 6. - [optimized search functionality by limiting db calls](https://gist.github.com/14paxton/b5a8d600dc4066010b4067bd8968f613)  
  
- [searching numerous columns](https://gist.github.com/14paxton/e72c14086f5d9a6a0c58dc8463b93561)  
  
### 7. - [Using elastic search created fuzzy search capability](https://github.com/14paxton/PersonalGrailsNotes/blob/main/ElasticSearch.md)  
  
### 8. - using micronaut created microservices  
  
- [with mySQL db](https://github.com/14paxton/micronaut_mysql_hibernate)  
- [with microstream](https://github.com/14paxton/micronaut_microstream)  
  
### -Things I enjoy-  
  
      
---      
  
# What I enjoy about what I do!  
  
## Finding quirky unorthodox ways to use a language.  
  
a. Setting custom validity for a form field with javascript  
  
       i.  e.target.setCustomValidity(\'invalid\');      
  
b. programmatically setting html in a string for react (although it      
is strongly discouraged)  
  
       i.  dangerouslySetInnerHTML- set html in a string      
  
```jsx      
{__html: '<p>' + result?.themeSummary + '. <i>*Theme Of Significance.</i></p>'}  
<Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>} childrenDisplayStyle="inline">      
```      
  
c. enums , to check a key we were using a try/catch and if it failed      
the key doesn't exist, I don't like making code purposefully fail ,      
made a util to replace  
  
- Custom check enums  
  
```java      
AssessmentPurpose.getEnumConstants().find{it.key.equalsIgnoreCase("extrn")}?.value      
```      
  
- [GET By value]{.underline}**  
  
```java      
FitStatement.getEnumConstants().find{(it.value==member.result)}?.match?:member.result      
```      
  
      
---      
  
# Dev Questions  
  
- What do you use to handle security?  
  
- Anything for database migrations?  
  
- What is your preferred environment?  
  
- What up coming features or new technology are you excited about  
  
- implementing.  
  
- Describe a recent serious outage and how it was resolved.  
  
- How does your expense policy & process work?  
  
- How much attrition has the team, and the wider department, had in the last 12-18 months?  
  
- What budget will I have for my continuing professional development? What restrictions are there on what I can spend it on?  
  
- What is best thing about working here? And what is the worst thing?  
  
- Describe a recent interpersonal conflict within the team, and how it was handled.  
  
- How much time does the team typically get for a) technical debt reduction & b) research projects per quarter?  
  
- Describe a recent prioritisation conflict - perhaps between the team & PM, or between different stakeholders. How was it resolved?    