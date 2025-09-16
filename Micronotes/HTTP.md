---
title: HTTP
permalink: Micronotes/HTTP
category: Micronotes
parent: Micronotes
layout: default
has_children: false          
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

# Calling

## Kotlin

```kotlin
@Client("https://www.url.com")
interface ClientInterface {
  @Get("/aUri")
  fun fetchSurveyPage(): JsonNode

}

@Singleton
class HTTPCaller(private val clientInterface: ClientInterface) {
  @Inject
  @field:Client("https://www.url.com/")
  lateinit var client: HttpClient

  fun scrapeSurveyInfo() {
    val action: JsonNode? = clientInterface.fetchSurveyPage()
            .get("action")

    val uri = action?.value?.toString() ?: throw IllegalStateException("Action not found in survey response")

    scrapeWithBlockingClient(uri)
  }

  private fun scrapeWithBlockingClient(uri: String) {
    val formData = mapOf(
            "is_embedded" to "false",
            "lang" to "en",
            "stay_main-pager" to "0",
                        )

    val body = "is_embedded=false&lang=en&stay_main-pager=0"

    val blockingClient = client.toBlocking()
    val httpRequest = HttpRequest.POST<Any>("?uri123", formData)
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .header(HttpHeaders.ACCEPT, "${MediaType.APPLICATION_JSON}, ${MediaType.TEXT_HTML}")

    val m = blockingClient.retrieve(httpRequest)
    val returnData = surveyClient.submitSurvey(formData)
    println(returnData)
  }

  fun scrapeWithJsoup(): Map<String, Any> {
    val html = clientInterface.fetchSurveyPage()
    val doc = Jsoup.parse(html)

    // Example: extract title, meta description, and first heading
    val title = doc.title()
    val description = doc.select("meta[name=description]")
            .attr("content")
    val heading = doc.select("h1")
            .firstOrNull()
            ?.text() ?: "No heading found"

    return mapOf(
            "title" to title,
            "description" to description,
            "heading" to heading
                )
  }
}
```
