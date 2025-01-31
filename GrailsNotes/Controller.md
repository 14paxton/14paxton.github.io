---
title:        Controller
permalink: GrailsNotes/Controller
category: GrailsNotes
parent: GrailsNotes
layout:       default
has_children: false
share:        true
shortRepo:

  - GrailsNotes
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

# The Grails Parameter Map

> [Using Param map Object](https://gist.github.com/14paxton/42e595a1bf50e44031b6be6c034003d9)

```groovy
def paramMap = ["firstName": "brandon", "lastName": "paxton", "email": "bpaxton@talentplus.com", "assessmentType": "AO6"]
def x = new grails.web.servlet.mvc.GrailsParameterMap(paramMap, request)
```

# Command Object with Validation-\*

## command object allows you to validate with services

<a href="https://gist.github.com/14paxton/282d48ed20642c697315e15dffb7df2d"> GRAILSCommandObject </a>

### Custom Validator for Nested Command objects in a list

> creating error code

> Error Object = package org.springframework.validation (Public Interface Errors)

> Example com.talentbank.tbex.SelfServiceIntegration.WSConfigCommand.rest

(Validator)[https://docs.grails.org/latest/ref/Constraints/validator.html]

```groovy
rest nullable: true, validator: { RESTCommand restCmd, WSConfigCommand obj ->
    return (obj?.wSConfigTypes?.size() > 0) ? null : "error: must have config rest, ftp, or soap"
}
```

> error object params Example - Errors.java

```groovy
// void reject(String errorCode, Object[] errorArgs, String defaultMessage);

"com.talentbank.tbex.SelfServiceIntegration.WSConfigCommand.rest" , Object {
    "rest" :
    "${WSConfigCommand.class}"
} , "Property[{ 0 }] of class [ { 1 } ] with value [ { 2 } ] does not pass custom validation"
```

```groovy
user.errors.reject('user.password.doesnotmatch', ['password', 'class User'] as Object[], '[Property [{0}] of class [{1}] does not match confirmation]')
```

> usage com.talentbank.tbex.SelfServiceIntegration.CommandObjects.IntegrationCommand

```groovy
private void validateSubCommandObject(Validateable childCmdObj) {
    if (!childCmdObj.validate()) {
        childCmdObj.errors.allErrors.each { ObjectError errObj ->
            String msg = errObj.defaultMessage
            errObj.arguments.eachWithIndex { Object err, int index ->
                msg = msg.replace("{${index}}", "${err}")
            }
            errors.reject(errObj.codes[0], errObj.arguments, msg)
        }
    }
}

void beforeValidate() {
    ["wSConfig", "clientResultConfig"].each { String prop ->
        if (this[prop]) {
            validateSubCommandObject(this[prop] as Validateable)
        } else {
            errors.reject($/com.talentbank.tbex.SelfServiceIntegration.validator.null.${prop}/$,
                    ["$prop", "class IntegrationCommand"] as Object[],
                    $/Property ${prop} of class IntegrationCommand is null/$)
        }
    }

    if (this.clientEntityMap) {
        this.clientEntityMap.each { ClientEntityMapType key, List<ClientEntityDetailsCommand> value ->
            value.each { validateSubCommandObject(it as Validateable) }
        }
    }

}
```

> this forces validate on nested command object, then adds errors to parent errors, only the parent need to be confirmed

```groovy
List<WSConfigCommand> wSConfig

void validateWSConfig() {
    if (this.wSConfig.size() > 0) {
        this.wSConfig.each { WSConfigCommand cmd ->
            if (!cmd.validate()) {
                cmd.errors.allErrors.each {
                    errors.reject(it.codes[0], it.arguments, it.defaultMessage)
                }
            }
        }
    }
}
```

### Import and excluding other domain constrains

```groovy
        importFrom SOAPClientOrderConfig, exclude: ["binarySecTokenEncodingType", "binarySecTokenValueType", "countryCodeFormat"]
```

### JSON return bodies Spring/Jackson examples

#### [jackson-json-view-annotation](https://www.baeldung.com/jackson-json-view-annotation)

#### [spring-mvc-ann-jackson](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-jackson)