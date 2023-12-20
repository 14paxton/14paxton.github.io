---
title:        Events
permalink:    JavaScript/Events
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

---

<br/>

# Create Event Listeners

```javascript
element.addEventListener('click', function () {…});
element.onclick = function () {…};
element.addEventListener('load', function () {…});
element.onload = function () {…};
```

- > In HTML
  ```html
  <div id="col-left" ondragstart="function(e){this.style.opacity=0.6; e.dataTransfer.dropEffect='move';}">
  ```

# Find and List Active Events and Event Listeners

## List Events defined with the event attribute

```javascript
function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);

    const types = [];

    for (let ev in window) {
        if (/^on/.test(ev)) types[types.length] = ev;
    }

    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
        const currentElement = allElements[i];
        for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === 'function') {
                elements.push({
                    "node": currentElement, "type": types[j], "func": currentElement[types[j]].toString(),
                });
            }
        }
    }

    return elements.sort(function (a, b) {
        return a.type.localeCompare(b.type);
    });
}

console.table(listAllEventListeners())
```

## listAllEventListeners

```javascript
function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);

    const types = [];

    for (let ev in window) {
        if (/^on/.test(ev)) types[types.length] = ev;
    }

    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
        const currentElement = allElements[i];

        // Events defined in attributes
        for (let j = 0; j < types.length; j++) {

            if (typeof currentElement[types[j]] === 'function') {
                elements.push({
                    "node": currentElement, "type": types[j], "func": currentElement[types[j]].toString(),
                });
            }
        }

        // Events defined with addEventListener
        if (typeof currentElement._getEventListeners === 'function') {
            evts = currentElement._getEventListeners();
            if (Object.keys(evts).length > 0) {
                for (let evt of Object.keys(evts)) {
                    for (k = 0; k < evts[evt].length; k++) {
                        elements.push({
                            "node": currentElement, "type": evt, "func": evts[evt][k].listener.toString()
                        });
                    }
                }
            }
        }
    }

    return elements.sort();
}

console.table(listAllEventListeners);
```

## List All Event Handlers

```javascript
Object.keys(window).forEach((key) => {
    if (/./.test(key)) {
        window.addEventListener(key.slice(2), (event) => {
            console.log(key, event);
        });
    }
});
```

> or

```javascript
console.log(getEventListeners(document.body));
console.table([document, window].concat([...document.querySelectorAll('*')]).map(el => {
    let evs = getEventListeners(el);
    // evs = (evs.click ? { click: evs.click } : []);
    return {
        el: el, types: Object.keys(evs).join(', '), listeners: evs
    };
}).filter(item => item.types));
```

## Override addEventListener prototype

> The override consists in adding an object eventListenerList that will store added event listeners. The method that will retrieve the event listeners will return this object.

```javascript
Window.prototype._addEventListener = Window.prototype.addEventListener;

Window.prototype.addEventListener = function (a, b, c) {
    if (c == undefined) c = false;
    this._addEventListener(a, b, c);
    if (!this.eventListenerList) this.eventListenerList = {};
    if (!this.eventListenerList[a]) this.eventListenerList[a] = [];
    this.eventListenerList[a].push({listener: b, options: c});
};
```

> To avoid duplicate code, the prototype modification can be applied once in the interface EventTarget.

> ```EventTarget``` is a ```DOM``` interface implemented by objects that can receive events and may have listeners for them.

> ```Element```, ```Document```, and ```Window``` are the most common event targets, but other objects can be event targets, too.
> For example ```XMLHttpRequest```, ```AudioNode```, ```AudioContext```,
> and others.

```javascript
EventTarget.prototype._addEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function (a, b, c) {
    if (c == undefined) c = false;
    this._addEventListener(a, b, c);
    if (!this.eventListenerList) this.eventListenerList = {};
    if (!this.eventListenerList[a]) this.eventListenerList[a] = [];
    this.eventListenerList[a].push({listener: b, options: c});
};
```

## Override Get event Listeners / _getEventListeners

```javascript
EventTarget.prototype._getEventListeners = function (a) {
    if (!this.eventListenerList) this.eventListenerList = {};
    if (a == undefined) { return this.eventListenerList; }
    return this.eventListenerList[a];
};
It
is
ready :

    function _showEvents(events) {
        for (let evt of Object.keys(events)) {
            console.log(evt + " ----------------> " + events[evt].length);
            for (let i = 0; i < events[evt].length; i++) {
                console.log(events[evt][i].listener.toString());
            }
        }
    }
;

console.log('Window Events====================');
wevents = window._getEventListeners();
_showEvents(wevents);

console.log('Div js-toc-wrap Events===========');
dv = document.getElementsByClassName('js-toc-wrap')[0];
dvevents = dv._getEventListeners();
_showEvents(dvevents);
```

## Remove Event Listener

```javascript
document.removeEventListener('scroll', Afwk.lazyLoad);
window.removeEventListener('resize', Afwk.lazyLoad);
window.removeEventListener('orientationchange', Afwk.lazyLoad);
window.removeEventListener('beforeprint', Afwk.forceLazyload);
```

## Override removeEventListener

```javascript
EventTarget.prototype._removeEventListener = EventTarget.prototype.removeEventListener;
EventTarget.prototype.removeEventListener = function (a, b, c) {
    if (c == undefined) c = false;
    this._removeEventListener(a, b, c);
    if (!this.eventListenerList) this.eventListenerList = {};
    if (!this.eventListenerList[a]) this.eventListenerList[a] = [];

    for (let i = 0; i < this.eventListenerList[a].length; i++) {
        if (this.eventListenerList[a][i].listener == b, this.eventListenerList[a][i].options == c) {
            this.eventListenerList[a].splice(i, 1);
            break;
        }
    }
    if (this.eventListenerList[a].length == 0) delete this.eventListenerList[a];
};
```

# Document Ready

```javascript
function ready(fn) {
    if (document.readyState !== "loading") {
        fn();
    }
    else {
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
    }
    else {
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
const event = new CustomEvent("my-event", {detail: {some: "data"}});
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
    }
    else {
        const event = typeof eventType === "string"
                      ? new Event(eventType, {bubbles: true})
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
    }
    else {
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
    }
    else if (ev.key == "Space") {
        // I think IE needs this
        document.getElementById("barcode-input").value += " ";
    }
    else if (ev.key.length == 1) {
        // A character not a key like F12 or Backspace
        document.getElementById("barcode-input").value += ev.key;
    }
});
```