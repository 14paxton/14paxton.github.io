---
title:        Testing
permalink:    Thymeleaf/Testing
category:     Thymeleaf
parent:       Thymeleaf
layout:       default
has_children: false
share:        true
shortRepo:
  - thymeleaf
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

# Junit

<details markdown="block"> 
<summary>
   Testing Templates In A Spring App
</summary>

{%raw%}

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.AnnotationConfigWebContextLoader;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;


@Slf4j
@ActiveProfiles("test")
@WebMvcTest(controllers = FragmentController.class)
@ComponentScan(basePackageClasses = {FragmentController.class})
@ContextConfiguration(classes = {DefaultTestConfig.class}, loader = AnnotationConfigWebContextLoader.class)
class FragmentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TemplateEngine templateEngine;

    //FOR CONTROLLER RETURNING STRING
    @Test
    @WithMockUser(roles = "ADMIN")
    void testControllerIsReturningThePassedFileAndFragment() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/controller/action"))
                                     .andExpect(status().isOk())
                                     .andExpect(view().name("fragment :: id"))
                                     .andReturn();

        log.debug("Response: {}", mvcResult.getResponse()
                                           .getContentAsString());
    }

    //FOR CONTROLLER RETURNING FragmentsRendering
    @Test
    void testInjectRenderFragment() throws Exception {
        String fileName = "exampleFile";
        String fragmentId = "exampleFragment";

        mockMvc.perform(get("/inject/{fileName}/{fragmentId}", fileName, fragmentId))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.htmlFile", is("htmlFile")))
               .andExpect(jsonPath("$.fragmentId", is("fragmentId")));
    }

    // FOR ONLY TESTING TEMPLATE //
    @Test
    public void testRealTimeAlertNotificationThymeleafTemplate() {
        Context context = new Context();
        context.setVariable("var", 0);

        String processedTemplate = templateEngine.process("file/path", context);

        log.debug("Processed template: {}", processedTemplate);

        assertTrue(processedTemplate.contains("id=\"elId\""));
    }

    @Test
    public void testThatStyleChangesBasedOnNewAlerts() {
        Context context = new Context();

        context.setVariable("var", 1);
        String processedTemplate = templateEngine.process("file/path", context);
        Document document = Jsoup.parse(processedTemplate);
        assertEquals("pgn_green", document.getElementById("elId")
                                          .className());

        context.setVariable("var", 0);
        processedTemplate = templateEngine.process("file/path", context);
        document          = Jsoup.parse(processedTemplate);
        assertEquals("pgn_na", document.getElementById("elId")
                                       .className());

    }
}
```

{%endraw%}

</details>