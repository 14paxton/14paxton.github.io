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
Object.keys(window).forEach((key) => {
  if (/./.test(key)) {
    window.addEventListener(key.slice(2), (event) => {
      console.log(key, event);
    });
  }
});
```

## In Chrome Dev Console

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

# [Keyboard Event / keydown / keyup / keypress](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#events)

## Detect Barcode Scanner input

> [Javascript for detecting usb connected - hand held - barcode scanner input](https://gist.github.com/neelbhanushali/8b77171ae7b775f2b25325760f2b5191)

### BarcodeScanner Class

```javascript
const events = mitt();

class BarcodeScaner {
  initialize = () => {
    document.addEventListener("keypress", this.keyup);
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.timeoutHandler = setTimeout(() => {
      this.inputString = "";
    }, 10);
  };

  close = () => {
    document.removeEventListener("keypress", this.keyup);
  };

  timeoutHandler = 0;

  inputString = "";

  keyup = (e) => {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.inputString += String.fromCharCode(e.keyCode);
    }

    this.timeoutHandler = setTimeout(() => {
      if (this.inputString.length <= 3) {
        this.inputString = "";
        return;
      }
      events.emit("onbarcodescaned", this.inputString);

      this.inputString = "";
    }, 10);
  };
}
```

> Opt 2

```javascript
export class BarcodeScanner extends EventTarget {
  constructor(options = {}) {
    super();

    options = Object.assign({
      timeOut: 130, characterCount: 13,
    }, options,);

    this.timeOut = options.timeOut;
    this.characterCount = options.characterCount;
    this.timer = Date.now();
    this.capture = "";
    this.target = new EventTarget();
    document.addEventListener("keypress", this.keypress.bind(this));
  }

  keypress(e) {
    // Set current time
    let now = Date.now();

    // If out timer is out, we need to reset because it was not a barcode
    if (now - this.timer > this.timeOut) {
      this.reset();
    }

    // It seems we are still fast enough to be a barcode, so add to capture
    let sinceFirst = now - this.timer;
    if (sinceFirst < this.timeOut) {
      this.capture += e.key;

      // It seems we managed to get enough characters within the time out, send scan!
      if (this.capture.length === this.characterCount) {
        this.dispatchScanEvent();
      }
    }
  }

  dispatchScanEvent() {
    let event = new CustomEvent("scan", {detail: this.capture});
    this.dispatchEvent(event);
    this.reset();
  }

  reset() {
    this.timer = Date.now();
    this.capture = "";
  }
}
```

### BarcodeScanner Event Listener and Function

```javascript
let code = "";
let reading = false;

document.addEventListener("keypress", (e) => {
  //usually scanners throw an 'Enter' key at the end of read
  if (e.keyCode === 13) {
    if (code.length > 10) {
      console.log(code);
      /// code ready to use
      code = "";
    }
  } else {
    code += e.key; //while this is not an 'enter' it stores the every key
  }

  //run a timeout of 200ms at the first read and clear everything
  if (!reading) {
    reading = true;
    setTimeout(() => {
      code = "";
      reading = false;
    }, 200); //200 works fine for me but you can adjust it
  }
});
```

## Detect keyboard input manually

```javascript
document.addEventListener("keydown", (ev) => {
  if (ev.ctrlKey || ev.altKey) return; // Ignore command-like keys
  if (ev.key == "Enter") {
    // ...submit the content here...
  } else if (ev.key == "Space") {
    // I think IE needs this
    document.getElementById("barcode-input").value += " ";
  } else if (ev.key.length == 1) {
    // A character not a key like F12 or Backspace
    document.getElementById("barcode-input").value += ev.key;
  }
});
```