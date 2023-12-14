---
title: Events
permalink: JavaScript/TypeScript/Events
category: JavaScript/TypeScript
parent: TypeScript
grand_parent: JavaScript
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

# [Keyboard Event / keydown / keyup / keypress](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#events)

## Read Barcode Scanner Input Event

```typescript
const CheckInPCF = {};

function Scan(evt: Event): void {
  const e: KeyboardEvent = evt as KeyboardEvent;
  const timeDiff = e.timeStamp - CheckInPCF.LastTimeStamp;
  CheckInPCF.LastTimeStamp = e.timeStamp; //"global"

  //console.log(e.key + ': ' + timeDiff);

  if (timeDiff < 100) {
    if (e.key == "Enter") {
      //Assemble complete scan text
      CheckInPCF.ScanText =
        CheckInPCF.FirstCharacterCandidate + CheckInPCF.ScanText; //.replace('\u000D','');

      //console.log('finished: ' + CheckInPCF.ScanText);
      CheckInPCF._this._notifyOutputChanged(); //Power Apps related
    } else {
      CheckInPCF.ScanText += e.key;
    }
  } else {
    CheckInPCF.ScanText = "";
    CheckInPCF.FirstCharacterCandidate = e.key;
  }
}
```
