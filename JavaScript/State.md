---
title:        State
permalink:    JavaScript/State
category:     JavaScript
parent:       JavaScript
layout:       default
has_children: false
share:        true
shortRepo:
  - JavaScript
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

# WebSockets

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6;">            
  WebSockets use a protocol that starts with ws:/ / (unencrypted) or wss:// (encrypted) instead of http:// or https://          
</div> 

## Creating a WebSocket Connection

> To establish a WebSocket connection in JavaScript, create a new WebSocket object, passing the WebSocket server URL as a parameter.

```javascript
const socket = new WebSocket('ws://example.com/socket');
```

## WebSocket Events

> WebSocket objects emit various events to handle different stages of the connection.

- `open` : Triggered when the connection is successfully established

```javascript
socket.addEventListener('open', (event) => {
// Connection is open. 
});

socket.addEventListener('message', (event) => {
    const message = event.data;
// Handle incoming message. 
});
```

- `error`: Triggered when an error occurs

```javascript
socket.addEventListener('error', (event) => { console.error('WebSocket error:', event); });
```

- `close`: Fired when the connection is closed

```javascript
socket.addEventListener('close', (event) => {
    if (event.wasClean) {
        console.log('Connection closed cleanly, code=${event.code), reason=$(event.reason}');
    }
    else {
        console.error('Connection abruptly closed');
    }
});
```

## Sending Data

> To send data to the server, use the send method of the WebSocket object. Data can be a string, Array Buffer, or Blob.

```javascript
socket.send('Hello, server!');
```

## Closing the Connection

> To close the WebSocket connection, call the close method on the WebSocket object.

```javascript
socket.close();
```