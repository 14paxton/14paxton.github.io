---
title:        Templates
permalink:    SpringNotes/Templates
category:     SpringNotes
parent:       SpringNotes
layout:       default
has_children: false
share:        true
shortRepo:
  - springnotes
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

# Controller MVC

```java
import mil.usmc.mls2.tcpt.common.http.HtmxConstants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.FragmentsRendering;

import java.text.MessageFormat;

@Controller
@RequestMapping("/fragment")
public class FragmentController {
    @GetMapping(path = "/inject/{fileName}/{fragmentId}")
    public String injectFragment(@PathVariable String fileName, @PathVariable String fragmentId) {
        return MessageFormat.format("fragments/{0} :: {1}", fileName, fragmentId);
    }

    @GetMapping(path = "/inject/{fileName}/{fragmentId}")
    public FragmentsRendering injectRenderFragment(@PathVariable String fileName, @PathVariable String fragmentId) {
        return FragmentsRendering.with("htmlFile")
                                 .fragment("fragmentId")
                                 .build();
    }

    @GetMapping(path = "/inject/{fileName}/{fragmentId}")
    public ModelAndView injectModelView(@PathVariable String fileName, @PathVariable String fragmentId) {
        return new ModelAndView("fragments/htmlFile");
    }
}
```
