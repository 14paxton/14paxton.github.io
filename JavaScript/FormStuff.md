---
title:        FormStuff
permalink:    JavaScript/FormStuff
category:     JavaScript
parent:       JavaScript
layout:       default
has_children: false
share:        true
shortRepo:

- javascript
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

# get form data

```javascript      
const data = Object.fromEntries(new FormData(document.forms.requestForm).entries());
console.log(data)      
```      

```javascript      
document.querySelector('form').addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data)
});      
```      

```javascript      
const formElem = document.getElementById("requestForm");

formElem.onformdata = (e) => {
    console.log('formdata fired');
    console.log(e)
    return false
    // modifies the form data      
};

formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default      
    // e.preventDefault();      

    // construct a FormData object, which fires the formdata event      
    const formData = document.getElementById('requestForm')
    console.log(formData)
    console.log(e.target)

    alert("fuck me")
    // return false      
});      
```      

```javascript      
function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log("submit", formProps)

}

const requestForm = document.getElementById("requestForm");
requestForm.addEventListener("submit", handleSubmit);

```      

```javascript
function myFunction() {
    var elements = document.getElementById("myForm").elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        obj[item.name] = item.value;
    }

    document.getElementById("demo").innerHTML = JSON.stringify(obj);
}      
```      

```javascript      
const formData = new FormData(document.querySelector('form'))
for (var pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
}
```      

## JQuery

```javascript
$("form").serializeArray()
```

# Get POST payload

```javascript
const constantMock = window.fetch;
window.fetch = function () {
    if (arguments[0] === '/api/req' && arguments[1].method === 'post') {
        bodyResults(arguments[1].body)
    }
    return constantMock.apply(this, arguments)
}


function bodyResults(reqBody) {
    console.log(reqBody)
}
```

## Catch responses as well

```javascript
const constMock = window.fetch;
window.fetch = function () {
    if (arguments[0] === '/api/req' && arguments[1].method === 'post') {
        bodyResults(arguments[1].body)
    }

    return new Promise((resolve, reject) => {
        constantMock.apply(this, arguments)
                    .then((response) => {
                        if (response.url.indexOf("/me") > -1 && response.type != "cors") {
                            console.log(response);
                            // do something for specificconditions
                        }
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(response);
                    })
    });
}

function bodyResults(reqBody) {
    console.log(reqBody)
}
```

## XMLHTTPRequest Intercept POST

```javascript
(function () {
    var origOpen = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        console.log('request started!');
        console.log(arguments[0]);
        this.addEventListener('load', function () {
            console.log('request completed!');
            console.log(this.status);
        });
        origOpen.apply(this, arguments);
    };
})();
```

## JQuery

```javascript
$(document).on("ajaxSend", function (e) {
    console.log("before request is sent");
}).on("ajaxComplete", function (e) {
    console.log("after success or error");
}).on("ajaxSuccess ", function (e) {
    console.log("on success");
}).on("ajaxError ", function (e) {
    console.log("on error");
});
```

# Intercept XHR Requests

```javascript
(function (open) {
    XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
        alert('Intercept');
        open.call(this, method, url + ".ua", async, user, pass);
    };
})(XMLHttpRequest.prototype.open);
```

# manually set validity on form field

- > [Validity State](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

## with listener

```javascript      
var field = document.getElementById('field_robot');

field.addEventListener('input', function (event) {
    fieldValidator(event, (field.value == '42'));
});

function fieldValidator(event, condition) {
    var val = event.target.value;
    if (!condition) {
        event.target.setCustomValidity('invalid');
    }
    else {
        event.target.setCustomValidity('');
    }

}    
```      

```html    

<form id="myForm">
    <input type="text" id="field_robot" name="">
    <input type="submit" id="submit" name="submit">
</form>      
```    

## core use case

```javascript      
// ...    

var email = emailInput.value;
emailInput.required = !!email.trim();
var reqAddRemove = emailInput.required
                   ? 'add'
                   : 'remove';

function setEmailInputValid() {
    emailInput.setCustomValidity('');
    errorBlock.html("").removeClass('emailValidationError').addClass('hidden');
    errorIcon.attr("class", "");
    errorIcon.parent().removeClass("has-error");
}

emailInput.previousElementSibling.classList[reqAddRemove]('req');

if (emailInput.required) {
    var inValidEmail = !AssessmentOrderEmailNotification.validateEmail(email);
    var inValidDomain = !AssessmentOrderEmailNotification.validateDomain(email);
    var respondentEmail = AssessmentOrderEmailNotification.respondentEmailCheck(email);

    if (inValidEmail || inValidDomain || respondentEmail) {
        emailInput.setCustomValidity('invalid');
        var errorMessage = inValidEmail
                           ? email + " is not a valid Email"
                           : (inValidDomain
                              ? email + " does not have a valid domain"
                              : "Error:  Email address cannot be the same as the assessment respondent.");
        errorBlock.html(errorMessage).removeClass('hidden').addClass('emailValidationError');
        errorIcon.attr("class", "glyphicon glyphicon-remove form-control-feedback");
        errorIcon.parent().addClass("has-error");
        event.target.previousSibling.classList.add('multi-input-height');
    }
    else {
        setEmailInputValid();
    }
}
else {
    setEmailInputValid();
}    
```