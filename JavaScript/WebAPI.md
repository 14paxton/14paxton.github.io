---
title:        WebAPI
permalink:    JavaScript/WebAPI
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

# Speech

```javascript
const textToSpeak = "Hello There";
const utterance = new SpeechSynthesisUtterance(textToSpeak);
window.speechSynthesis.speak(utterance);
```

# Storage

## localStorage

```javascript
// Store data
localStorage.setItem('key', 'value');
// Retrieve data
const storedValue = localStorage.getItem('key');
// Remove data
localStorage.removeItem('key');
```

## sessionStorage

```javascript
// Store data
sessionStorage.setItem('key', 'value');
// Retrieve data
const storedValue = sessionStorage.getItem('key');
// Remove data
sessionStorage.removeItem('key');
```

# Fetch

```javascript
fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('error:', error));
```

# Geolocation

```javascript
navigator.geolocation.getCurrentPosition(position => {
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
}, error => {
    console.error("Error getting location:", error - message);
})
```

# Canvas

```javascript
const canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 100;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 180, 80);
```

# Audio

```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioContext.create0scillator();
oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
oscillator.connect(audioContext.destination);
oscillator.start();
oscillator.stop(audioContext.currentTime + 1);
```

# Sockets

```javascript
const socket = new WebSocket('wss://example.com/socket');
socket.addEventListener('open', () => socket.send('Hello, server!'));
socket.addEventListener('message', event => console.log('Received: ', event.data));
socket.addEventListener('close', () => console.log('Connection closed. '));
```

# IndexedDB

> Structured client side data storage

```javascript
// Open (or create) the database
const dbName = "InstagramPostsDB";
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);
//handles errors that may occur during the database opening process.
request.onerror(() => 1);
//specifies the actions to be taken when the database structure is being upgraded.
request.onupgradeneeded(() = {});
//defines the actions to be taken upon successful opening of the database.
request.onsuccess(() = {});
```

# File

> Manipulate files, access metadata.

```html
<input type="file" id="imageInput" accept="image/*" >
    <button onclick="uploadPost ()" >Upload Post</button>
    <script>
        function uploadPost() {const file = document.getElementById( 'imageInput').files[0];
        console.log( 'Selected file:', file);}
    </script>
```

# Notification

> Display system notifications.

```javascript
Notification.requestPermission()
            .then(permission => {
                new Notification('Hello, World!');
            });
```

# Workers

```javascript
const worker = new Worker('worker.js');
worker = postMessage('Hello from main script!');
```

# Intersection Observer

> Efficiently observes element visibility
> changes

```javascript
const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && console.log('Element is in the viewport!'));

observer.observe(document.getElementById('yourElementId'));
```

# Mutation Observer

> Observe DOM changes
> asynchronously.

```javascript
const observer = new MutationObserver
mutations => mutations.forEach(mutation => console.log('DOM change detected:', mutation)
const targetNode = document.getElementById('yourElementId');
const config = {attributes: true, childList: true, subtree: true};
observer.observe(targetNode, config); // Start observing DOM changes.
```

# Pointer Lock

> Captures mouse movements precisely
> in-browser.

```javascript
const element = document.getElementById('yourElementId');
element.requestPointerLock();
```

# Battery Status

> Monitors device battery information
> asynchronously.

```javascript
navigator.getBattery().then(battery => {
    console.log('Battery Level:', battery.level * 100 + '%');
    console.log('Charging:', battery, charging
                                      ? 'Yes'
                                      : 'No');
});
```

# Gamepad

> Interacts with game controller devices.

```javascript
window.addEventListener("gamepadconnected", (event) => console.log("'Gamepad connected:", event.gamepad.id));
window.addEventListener("gamepaddisconnected", (event) => console.log("'Gamepad disconnected:", event.gamepad.id)
```

# DeviceOrientation

```javascript
window.addEventListener("deviceorientation", (event) => {
    console.log("Device Orientation:", event.alpha, event.beta, event.gamma);
});
window.addEventListener("devicemotion", (event) => {
    console.log("Device Motion:", event.acceleration., event.acceleration.y, event.acceleration.z);
});
```

# Push

> enables push notifications in browsers

```javascript
// Check for Push API support
if ('PushManager' in window) {
// Request notification permission
    Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
// Subscription logic goes here
                    }
                });
}
```

# Payment Request

> Facilitates streamlined online payment
> processing in browsers.

```javascript
const supportedInstruments = [{supportedMethods: 'basic-card'}];
const paymentDetails = {
    total: {label: 'Total', amount: {currency: 'USD', value: '10.00'}}
};
const paymentPromise = new PaymentRequest(supportedInstruments, paymentDetails);

paymentPromise
    .show()
    .then(paymentResponse => paymentResponse.complete('success')
```
