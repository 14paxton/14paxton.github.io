---
title: Events
permalink: JavaScript/Events
category: JavaScript
parent: JavaScript
layout: default
has_children: false
share: true
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

---

<br/>

# [Monitor Events](https://stackoverflow.com/questions/10213703/how-do-i-view-events-fired-on-an-element-in-chrome-devtools)

## Browser Dev Console

> Just inspect your element (right mouse click → Inspect on a visible element or go to Elements tab in Chrome Developer Tools and select wanted element) then go to Console tab and write:

```shell
 monitorEvents($0)
```

> Now when you move mouse over this element, focus or click it, the name of the fired event will be displayed with its data.

> To stop getting this data, just write this to console:

```shell
 unmonitorEvents($0)
```

> `$0` is just the last DOM element selected by Chrome Developer Tools.
>
> > You can pass any other DOM object there (for example result of getElementById or querySelector).

> You can also specify event "type" as second parameter to narrow monitored events to some predefined set

```shell
 monitorEvents(document.body, 'mouse')
```

# List All Event Handlers

```javascript
window.getEventListeners(window);
// or for a specific element
window.getEventListeners(document.body);
```

# Document Ready

```javascript
function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
```

- > ## JQuery

  ```javascript
  $(document).ready(function () {
    Console.log("ready");
  });
  ```

# use `arguments` keyword in function to get arguments passed or available

```javascript
function getArgs() {
  const argList = arguments;
}
```

# Delegate / On[Event]

```javascript
document.addEventListener(eventName, (event) => {
  if (event.target.closest(elementSelector)) {
    handler.call(event.target, event);
  }
});
```

- > ## JQuery

  ```javascript
  $("selector").on("click", myHandlerFunction);
  ```

## Delegate Event Handling

```javascript
function addEventListener(el, eventName, eventHandler, selector) {
  if (selector) {
    const wrappedHandler = (e) => {
      if (!e.target) return;
      const el = e.target.closest(selector);
      if (el) {
        eventHandler.call(el, e);
      }
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  } else {
    const wrappedHandler = (e) => {
      eventHandler.call(el, e);
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  }
}

// Use the return value to remove that event listener, see #off
addEventListener(el, eventName, eventHandler);
// Or when you want to delegate event handling
addEventListener(el, eventName, eventHandler, selector);
```

- > ### JQuery

  ```javascript
  $(el).on(eventName, eventHandler);
  // Or when you want to delegate event handling
  $(el).on(eventName, selector, eventHandler);
  ```

# Trigger Custom Events

```javascript
const event = new CustomEvent("my-event", { detail: { some: "data" } });
el.dispatchEvent(event);
```

- > ## JQuery

  ```javascript
  $(el).trigger("my-event", { some: "data" });
  ```

## Trigger Event Natively

```javascript
function trigger(el, eventType) {
  if (typeof eventType === "string" && typeof el[eventType] === "function") {
    el[eventType]();
  } else {
    const event =
      typeof eventType === "string"
        ? new Event(eventType, { bubbles: true })
        : eventType;
    el.dispatchEvent(event);
  }
}

trigger(el, "focus");
// For a full list of event types: https://developer.mozilla.org/en-US/docs/Web/API/Event
trigger(el, new PointerEvent("pointerover"));
```

- > ### JQuery

  ```javascript
  $(el).trigger("focus");
  ```