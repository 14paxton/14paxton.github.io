---
title:        PastProjects
permalink:    GitHubPages/PastProjects
category:     JobPrep
parent:       MyPersonalDocsAndStuff
layout:       default
has_children: false
share:        true
shortRepo:

- jobprep
- default

---

<details markdown="block">                    
<summary>                    
Table of Contents                    
</summary>                    
{: .text-delta }                    
1. TOC                    
{:toc}                    
</details>                    

***                    

# Projects

## Front End

### [React Hook Form - ReactHookFormFields/SelectBox.js](https://github.com/14paxton/ReactHookFormDynamicComponents)

- **What I did**:
    - Learned and created a proof of concept using a dynamic library to create forms with React Hook Forms, replacing Formik.
    - Found unconventional ways to make forms and components work as per end-user requests (e.g., submitting a form via a button in a modal produced
      by a parent component, using controlled Material UI fields in forms designed for uncontrolled fields).

### [Material Table - assessmentresultstable.js](https://github.com/14paxton/TableWithAsyncCall)

- **What I did**:
    - Created a custom search function component using React Hook Forms.
    - Developed an async search and load function that prevented the entire table from re-rendering.

- **Challenges**:
    - Displaying Material UI chips with assessment names under the table upon selection.
    - Implemented a custom "select all" function that only selects items on the current page, preserving selections across pages but resetting on
      further pagination.

### [Dynamic Ellipsis Component - ellipsismodifier.js](https://github.com/14paxton/DynamicEllipsis)

- **What it does**:
    - Adds an ellipsis based on text length or dynamically adds one when text overflows a div. Adjusts ellipsis on page resize.

### [Date Range Picker - presetdaterangepicker.js](https://github.com/14paxton/DateRangePicker)

- **What I did**:
    - Customized an existing React date range picker to work with the advanced search form I created.

- **Challenges**:
    - Found it difficult to match the designer’s expectations, as their example used an old jQuery date picker.

### [Dynamic Tooltip](https://gist.github.com/14paxton/9c745874ec384add89c1908c73832594)

- **What it does**:
    - Displays a tooltip only when text is truncated due to the screen size.

### [HOC for PowerPoint Creation](https://github.com/14paxton/TableToPowerPoint)

- **What I did**:
    - Created a higher-order component to generate a PowerPoint presentation from a table using JavaScript and React.

### [Barcode Scanner for Web App Input](https://gist.github.com/14paxton/09adce350289bdcc1df92ed425c1d548)

- **What I did**:
    - Created a custom React TypeScript hook to listen for barcode input from a hand scanner.
- **Challenges**:
    - Differentiating between keyboard input and barcode scanner input.

## Backend

### [Pulling Images and PDFs from S3 Bucket for Email Attachment](https://gist.github.com/14paxton/1fa8f703b708b9488408c9217a83b3a9)

- **What I did**:
    - Retrieved images from an S3 bucket and attached them to an email sent using Postmark.
- **Challenges**:
    - Needed to access files while the authorization token was still valid, then send them to a JMS queue for email attachment processing.

### [Testing GORM and Hibernate Queries](https://www.cotdc.com/GrailsNotes/Testing#mocking-hibernate-used-to-test-methods-using-where-queriers--detached-criteria--criteria-builder)

- **What I did**:
    - Researched Hibernate and GORM documentation and came up with a method to mock Hibernate datastore and PlatformTransactionManager.

### [Configuring a Plugin to Create Multiple Domain Objects](https://www.cotdc.com/GrailsNotes/Testing#using-test-data-from-buildtest-plugin)

- **What I did**:
    - Configure a plugin to create multiple fully qualified domain objects simultaneously.

### Integration with Office 365 for Assessment Scheduling

- **What I did**:
    - Integrated scheduled assessments with both interviewers' and interviewees' Outlook calendars.

### [Async Service for Batch Role Changes](https://gist.github.com/14paxton/ef4f6e91fa7fa44015c41f26a1caf3ae)

- **What I did**:
    - Created an async service to process batch role changes for users.

- **Role Comparison Example**:
    - [Comparing role groups](https://gist.github.com/14paxton/b7ff93091f4db71beffb0a37140fa0f2)

### [Optimized Search Functionality](https://gist.github.com/14paxton/b5a8d600dc4066010b4067bd8968f613)

- **What I did**:
    - Limited database calls to optimize search functionality across multiple columns.

### [Elastic Search - Fuzzy Search Capability](https://gist.github.com/14paxton/3a352d2824bde0e97960409056f682cc)

- **What I did**:
    - Implemented fuzzy search capabilities using ElasticSearch.

### [Optimized SQL Queries Using HQL](https://gist.github.com/14paxton/e72c14086f5d9a6a0c58dc8463b93561)

- **What I did**:
    - Using HQL and Gorm I created abstract classes to search multiple columns for data, and bind the return to an object

### [Used Spring Tansactiona Status to create my own Rollback](https://gist.github.com/14paxton/a212d86552b05b95ef91ee444197fd4e)

- **What I did**:
  - Created a batch delete, for deleting a group associated with users
- **Challenges**:
  - Spring rollback was causing issues due to the nature of deleting, needed to manually trigger

### Using Micronaut to Create Microservices

- [With MySQL](https://github.com/14paxton/micronaut_mysql_hibernate)
- [With Microstream](https://github.com/14paxton/micronaut_microstream)

---

## Things I Enjoy

### Finding Quirky, Unorthodox Ways to Use a Language

- **Setting custom validity for a form field**:
    ```javascript
    e.target.setCustomValidity('invalid');
    ```

- **Programmatically setting HTML in a string for React**:
    ```javascript
    dangerouslySetInnerHTML
    ```

    ```jsx
    {__html: '<p>' + result?.themeSummary + '. <i>*Theme Of Significance.</i></p>'}
    <Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>} childrenDisplayStyle="inline">
    ```

- **Custom Enum Checks**:
    - Instead of using try/catch for key validation, created a utility:
    ```groovy
    AssessmentPurpose
        .getEnumConstants()
        .find { it.key.equalsIgnoreCase("extrn") }?.value
    ```

- **Get Enum by Value**:
    ```groovy
    FitStatement.getEnumConstants()
        .find { (it.value == member.result) }?.match ?: member.result
    ```

- **Pad a string to a certain length with spaces in Java**:
    ```java
      String padded=String.format("%-20s",str);
    ```

---
***

## Dev Questions

1. What do you use to handle security?
2. Anything for database migrations?
3. What is your preferred environment?
4. What upcoming features or new technology are you excited about implementing?
5. Describe a recent serious outage and how it was resolved.
6. How does your expense policy & process work?
7. How much attrition has the team, and the wider department, had in the last 12-18 months?
8. What budget will I have for continuing professional development? Any restrictions?
9. What is the best and worst thing about working here?
10. Describe a recent interpersonal conflict within the team, and how it was handled.
11. How much time does the team get for a) technical debt reduction and b) research projects per quarter?
12. Describe a recent prioritization conflict (e.g., between the team & PM or different stakeholders). How was it resolved?