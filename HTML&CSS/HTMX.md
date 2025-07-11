---
title: HTMX
permalink: HTML&CSS/HTMX
category: HTML&CSS
parent: HTML&CSS
layout: default
has_children: false
share: true
shortRepo:

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

---

<br/>

# Injecting

## using an http call

```html

<div hx-get="/inject/fragment"
     hx-on--after-request="htmx.process(this)"
     hx-swap="innerHTML"
     hx-target="this"
     hx-trigger="load"
     id="rtaContainer"
>
```

# Fragment

```html
<!DOCTYPE html>
<html lang="en"
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:hx-on="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org">
<!--/*@thymesVar id="rtaCount" type="java.lang.Integer"*/-->
<!--/*@thymesVar id="newRtaCount" type="java.lang.Integer"*/-->
<th:block th:fragment="rtaFragment" th:with="disableAlertButton=(${rtaCount==null || rtaCount == 0} ? true : false)">
  <button
      hx-on:click="triggerRealTimeAlertModal(this)"
      hx-on:mouseleave="this.style.backgroundColor = ''"
      hx-on:mouseover="this.style.backgroundColor = '#fdfdbf'; this.style.stroke = '#ffa500'; this.style.strokeWidth = '5%';"
      id="rtaNotificationButton"
      style=" position: absolute;
                 z-index: 2;
                 top: 40px;
                 right: 100px;
                 margin: 0;
                 padding: 1px 4px;
                 border: 1px solid #999999;
                 text-align: center;
                 cursor: pointer;
                 font-size: .8rem;
                 color: black;
                 text-transform: none;"
      th:attr="hx-disable=${disableAlertButton} ? 'true' : null"
      th:classappend="${(newRtaCount > 0)  ? 'pgn_green' : 'pgn_na'}"
      th:disabled="${disableAlertButton}"
      title="View RTAs"
      type="button"
  >
    Alerts
  </button>
  <div
      hx-on:click="htmx.find('#alert-dialog-block').show();"
      id="buttonOverlay"
      style=" position: absolute;
                 z-index: 3;
                 top: 40px;
                 right: 100px;
                 margin: 0;
                 padding: 1px 4px;
                 width: 41px;
                 height: 20px;
                 cursor: pointer;"
      th:if="${disableAlertButton}"
  >
  </div>
  <div th:if="${disableAlertButton}" th:insert="~{/fragments/notificationModal :: notificationModal}"></div>
  <script th:inline="javascript" type="text/javascript">
    async function triggerRealTimeAlertModal(element) {
      if (!document.getElementById("realTimeAlertsPopupListForm")) {
        Promise.resolve(showRealTimeAlertsPopup('Real Time Alerts')).then(() => {
          htmx.removeClass(element, 'pgn_green');
          htmx.addClass(element, 'pgn_na');
        });
      }
    }

    async function showRealTimeAlertsPopup(pageTitle) {
      return new Promise(async (resolve) => {
        triggerPopup();
        resolve(true);
      });
    }
  </script>
</th:block>
</html>
```

## Modal

```html
<!DOCTYPE html>
<html lang="en"
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:hx-on="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org">
<th:block th:fragment="notificationModal">
  <dialog class="alert-na in" id="alert-dialog-block">
    <button hx-on:click="htmx.find('#alert-dialog-block').close();" id="alert-dialog-close-btn" type="button">×</button>
    <div class="pgn_na_box">
      <ul class="pg-notification-list">
        <li>-- no alerts --</li>
      </ul>
    </div>
  </dialog>
</th:block>
</html>
```