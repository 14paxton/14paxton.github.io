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
    // console.log(pair[0] + ': ' + pair[1]);      
}    
    
$("form").serializeArray()    
    
```      
    
# manually set validity on form field    
    
https://developer.mozilla.org/en-US/docs/Web/API/ValidityState    
    
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