---
title: Clever-Tid-bits
permalink: GroovyNotes/Clever-Tid-bits
category:  GroovyNotes
parent:   GroovyNotes
layout: default
has_children: false
share: true
shortRepo:
  - groovynotes
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

## Use Comparator

<a href="https://gist.github.com/14paxton/200b5a1a081f66cf4df5de739ef2cc24" > comparator for 2 merged lists </a>

## Re-group and spread map into new map

<a href="https://gist.github.com/14paxton/8d0b6b33f2023fa2dff3fdd51364f8db"> create new map by conditions </a>

## HTTP Builder get binary stream

<a href="https://gist.github.com/14paxton/58da1e0c108fa527c5ec1a770eefa683"> bin stream </a>

## Use HTTP builder to add attachment to an email from an S3 bucket

<a href="https://gist.github.com/14paxton/1fa8f703b708b9488408c9217a83b3a9"> http builder </a>

## JSON object to map

```groovy
import com.fasterxml.jackson.databind.ObjectMapper

HashMap<String, Object> returnVal = new ObjectMapper().readValue(response.json.toString(), HashMap.class)

def slurper = new groovy.json.JsonSlurper()
Map<String, Object> result = slurper.parseText(ftpJSONBody) as Map<String, Object>

def paramMap = new grails.web.servlet.mvc.GrailsParameterMap(result, request)
def cmdObj = new IntegrationCommand(paramMap) as JSON
HashMap<String, Object> expected = new ObjectMapper().readValue(cmdObj.toString(), HashMap.class)

expected
```
