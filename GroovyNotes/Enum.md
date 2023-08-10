---  
title:        Enum    
permalink:    GroovyNotes/Enum    
category:     GroovyNotes    
parent:       GroovyNotes    
layout:       default    
has_children: false    
share:        true    
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
    
# Check Enum Availability    
    
## MY ENUM CHECK    
    
 ```groovy    
def assessmentType = AssessmentType.getEnumConstants().find { it.key.toLowerCase() == securityParamMap.get('assessmentType').toLowerCase() }    
```    
    
# Enum Example    
    
## Enum with EnumSet    
    
```groovy    
enum UserGroupType {    
    MYSAVEDGROUP('My Saved Group', 50, 1),    
    RESULTGROUP('Result Group', 50, Double.POSITIVE_INFINITY),    
    RESULT_COMPARE("Comparing Individual with Group", 50, Double.POSITIVE_INFINITY),    
    GROUP_COMPARE("Comparing Two or more Groups", 50, Double.POSITIVE_INFINITY),    
    GROUPDEFAULT("default", 50, Double.POSITIVE_INFINITY)    
    
    final String value    
    final int limit    
    final int max    
    
    UserGroupType(String value) {    
        this.value = value    
        this.limit = 0    
        this.max = 0    
    }    
    
    UserGroupType(String value, limit, max) {    
        this.value = value    
        this.limit = limit    
        this.max = max    
    }    
    
    static def canDelete = EnumSet.of(RESULTGROUP, RESULT_COMPARE, GROUP_COMPARE, GROUPDEFAULT)    
    
    boolean isDeletableType() {    
        return canDelete.contains(this)    
    }    
    
    
    String toString() {    
        value    
    }    
    
    String getKey() {    
        name()    
    }    
    
}    
```    
    
## Enum with static method    
    
```groovy    
enum ColorEnum {    
    WHITE('white', 'White is mix of all colors'),    
    BLACK('black', 'Black is no colors'),    
    RED('red', 'Red is the color of blood')    
    
    final String id    
    final String desc    
    static final Map map    
    
    static {    
        map = [:] as TreeMap    
        values().each { color ->    
            println "id: " + color.id + ", desc:" + color.desc    
            map.put(color.id, color)    
        }    
    
    }    
    
    private ColorEnum(String id, String desc) {    
        this.id = id    
        this.desc = desc    
    }    
    
    static getColorEnum(id) {    
        map[id]    
    }    
}    
    
    
MainTest.groovy    
    
println ColorEnum.values().size()    
println ColorEnum.getColorEnum('white')    
println ColorEnum.WHITE.desc    
    
// values return array of all enums defined in ColorEnum    
println ColorEnum.values().getClass()    
    
```