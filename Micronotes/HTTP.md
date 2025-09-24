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

# Http Client

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

# Playwright

```kotlin
fun getSurveyResults() {
    Playwright.create()
      .use { playwright ->
        val browser = playwright.chromium()
          .launch(
            BrowserType.LaunchOptions()
              .setHeadless(true)
          )
        browser.newPage()
          .use { page ->
            // landing page
            page.navigate("https://www.survey.com/page")
            page.waitForLoadState(LoadState.NETWORKIDLE)
            page.fill("input[id='spl_q_feedback_jss_access_code_22_digit']", "0731802000109152511006")
            page.click("#buttonNext")
            page.waitForLoadState(LoadState.NETWORKIDLE)

            // regular survey page 1
            page.click("#onf_q_bp_store_ltr_scale_0")
            page.fill("#spl_q_bp_store_ltr_cmt", "worst experience ever")
            page.click("#buttonNext")
            page.waitForLoadState(LoadState.NETWORKIDLE)

            // regular survey page 2
            page.click("#onf_q_bp_store_associate_driver2_scale_0")
            page.click("input[name='onf_q_bp_store_contact_method_alt'][value='3']")
            page.click("#buttonNext")
            page.waitForLoadState(LoadState.NETWORKIDLE)

            content = page.content()
            println(page.content())
          }
      }
  }
```

## Screenshot

```kotlin
  // Wait for the DOM to update (useful for dynamic content)
  page.waitForLoadState(LoadState.DOMCONTENTLOADED)
  // or wait for network activity to settle
  page.waitForLoadState(LoadState.NETWORKIDLE)
  page.screenshot(
      Page.ScreenshotOptions()
          .setPath(Paths.get("page2_changes.png")),
  )
  
  page.click("#buttonNext")
  page.waitForLoadState(LoadState.NETWORKIDLE)
```