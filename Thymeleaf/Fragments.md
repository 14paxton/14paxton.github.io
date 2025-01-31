---
title: Fragments
permalink: Thymeleaf/Fragments
category: Thymeleaf
parent: Thymeleaf
layout: default
has_children: false
share: true
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

# Add HTML Fragments

> without using a custom dialect, is to use arguments on the fragment I use as my layout template which I call 'main-layout'. This example allows you to leave out elements you
> don't need to override but any you provide will be added to whatever is in the 'main-layout' fragment.

- `main-view.html`

   ```html
     <!DOCTYPE html>
        <html lang="en" xmlns:th="http://www.thymeleaf.org" th:fragment="main-layout">
            <head>
                <title>Template Head Title</title>
                <th:block th:replace="${head} ?: ~{}"/>
            </head>
            <body>
                <header>
                    Common Template Header Here
                    <th:block th:replace="${contentHeader} ?: ~{}"/>
                </header>
                <main>
                    Common Template Content Here
                    <th:block th:replace="${content} ?: ~{}"/>
                </main>
            </body>
            <footer>
                Common Template Footer Here
                <th:block th:replace="${footer} ?: ~{}"/>
            </footer>
        </html>
   ```

    - > use case

      ```html
             <!DOCTYPE HTML>
        <html th:replace="main-view.html :: main-layout (head=~{:: head}, contentHeader=~{:: header}, content=~{:: main}, footer=~{:: footer})">
            <head th:remove="tag">
                <title>Greeting Head</title>
            </head>
            <body>
                <header th:remove="tag">
                    Greeting Content Header
                </header>
                <main th:remove="tag">
                    Greeting Content
                </main>
            </body>
            <footer th:remove="tag">
                Greeting Footer
            </footer>
        </html>
      ```

# Adding js Script

- `index.html`

    ```html
    <!DOCTYPE html>
    <html xmlns:th="http://www.thymeleaf.org">
        <body>
            Hello World
        </body>
    
        <!-- Calling default scripts + custom scripts -->
        <div th:replace="fragments/script :: base_script(~{::script})">
            <script th:src="@{js/customjs1.min.js}"></script>
            <script th:src="@{js/customjs2.min.js}"></script>
            <script th:src="@{js/customjs3.min.js}"></script>
        </div>
    
        <!-- If you want to call only default scripts -->
        <!--<head th:replace="fragments/script :: base_script(null)"></head>-->
    </html>
    ```
- > The default js files are called by default but you can add additional scripts.
  templates/fragments/script.html:

    ```html
    
    <html xmlns:th="http://www.thymeleaf.org">
        <div th:fragment="base_script(scripts)">
            <!-- /* default js files */ -->
            <script th:src="@{js/defaul1.min.js}"></script>
            <script th:src="@{js/defaul2.min.js}"></script>
            <script th:src="@{js/defaul3.min.js}"></script>
            <th:block th:if="${scripts != null}">
                <th:block th:replace="${scripts}"/>
            </th:block>
        </div>
    </html>
    ```

- > Both of default js files and custom js files will be called in index.html.

  ```html
  <!DOCTYPE html>
  <html>
      <body>
          Hello World
      </body>
  
      <!-- Calling default scripts + custom scripts -->
      <div>
          <!-- /* default js + custom js files */ -->
          <script src="/js/defaul1.min.js"></script>
          <script src="/js/defaul2.min.js"></script>
          <script src="/js/defaul3.min.js"></script>
          <script src="/js/customjs1.min.js"></script>
          <script src="/js/customjs2.min.js"></script>
          <script src="/js/customjs3.min.js"></script>
      </div>
  
  </html>
  ```