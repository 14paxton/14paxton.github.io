---
title:     HandleEvents
permalink: ReactNotes/HandleEvents
category:  JavaScript/ReactNotes
parent:    ReactNotes
grand_parent: JavaScript
layout:    default
has_children: false
share:     true
shortRepo:
  - reactnotes
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

# Add event listener to check if table loads

1. add in component you are checking

   ```jsx
   useEffect(() => {
     window.parent.postMessage({ action: "tGrid-loaded" });
   }, []);
   ```

2. and in another component

   ```jsx
   useEffect(() => {
     window.addEventListener("message", handleMessage);

     return () => {
       window.removeEventListener("message", handleMessage);
     };
   }, []);
   ```

3. Listening for a resizing event

   ```jsx
   useEffect(() => {
     if (tableRef?.current) {
       if (useObserver) {
         const resizeObserver = new ResizeObserver(async () => {
           Promise.resolve(buildPPTObject());
         });
         if (tableRef?.current) {
           resizeObserver.observe(tableRef?.current);
         }
         return () => {
           resizeObserver.disconnect();
         };
       } else {
         Promise.resolve(buildPPTObject());
       }
     }
   }, [tableRef?.current]);
   ```

# window.onkeypress / Keypress

## Barcode Scanner

### Component Example

#### Use Invisible TextInput for focus

```jsx
import React, {useEffect}                  from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export default function App() {
   const invisibleRef = React.useRef(null);

   useEffect(() => {
      invisibleRef.current.focus();
   }, []);

   const focusInvisibleInput = (e) => {
      e.preventDefault();
      if (invisibleRef.current) {
         invisibleRef.current.focus();
      }
   };

   return (<View style={styles.container} onTouchStart={focusInvisibleInput}>
      <TextInput
              ref={invisibleRef}
              autoFocus={true}
              autoCorrect={false}
              autoComplete={false}
              style={{opacity: 0}}
              onChangeText={(text) => console.log("hidden", text)}
      />

      <TextInput
              style={{height: 40, borderColor: "gray", borderWidth: 1}}
              placeholder="Type something here"
              onChangeText={(text) => console.log("visible", text)}
      />

      <Text>A nice react native app!</Text>

      <TextInput
              style={{height: 40, borderColor: "gray", borderWidth: 1}}
              placeholder="Type some thing else here!"
              onChangeText={(text) => console.log("visible", text)}
      />
   </View>);
}

const styles = StyleSheet.create({
   container: {
      flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center",
   },
});
```

> And after this, you may want to add a generic input handler that times the speed of the input of the text, to figure out if it's a scan, rather than manual text input.
> (If you get 20 characters
> within 50ms, you can be pretty sure it's a scan, right?)

#### Use Form Input and Catch Submission event, and Retrieve value

```jsx
import {useState} from "react";

export default function Modal() {
   const [repairArticles, setRepairArticles] = useState([]);

   function handleBarcodeInput(e) {
      e.preventDefault();
      const input = e.target.querySelector("input");
      const value = input.value;
      setRepairArticles((prev) => {
         return (prev = [...prev, value]);
      });
      input.value = "";
   }

   return (<div>
      <form onSubmit={(e) => handleBarcodeInput(e)}>
         <input id="barcode-input"/>
         <button type="submit" className="hidden"/>
      </form>
      <div className="mt-3">
         {repairArticles.map((el, index) => {
                    return <p key={index}>{el}</p>;
         })}
      </div>
   </div>);
}
```

### React Hook using Js Function

> [Detect when input box filled by keyboard and when by barcode scanner](https://www.paxtonb.com/JavaScript/Events#barcodescanner-class)

```jsx
const ScanComponent = (props) => {
   const [scanned, setScanned] = useState("");
   useEffect(() => {
      const barcode = new BarcodeScaner();
      barcode.initialize();
      return () => {
         barcode.close();
      };
   }, []);

   useEffect(() => {
      const scanHandler = (code) => {
         console.log(code);
         setScanned(code);
      };

      events.on("onbarcodescaned", scanHandler);
      return () => {
         events.off("onbarcodescaned", scanHandler);
      };
   }, [/* here put dependencies for your scanHandler ;) */],);
   return <div>{scanned}</div>;
};
```

### Custom Hook

```tsx
import {useCallback, useEffect, useState} from "react";

const regExpForShiftKey: RegExp = new RegExp(/shift/, "gi");

export default function useBarcodeScanner() {
   const [lastTimeStamp, setLastTimeStamp] = useState<number>(0);
   const [commonAccessCardBarCode, setCommonAccessCardBarCode] =
           useState<string>("");
   const [scannedText, setScannedText] = useState<string>("");
   const [firstCharacterText, setFirstCharacterText] = useState<string>("");

   const getDiff = useCallback(
           (timeStamp: number): number => {
              return timeStamp - (lastTimeStamp ? lastTimeStamp : 0);
           },
           [lastTimeStamp],
   );

   const saveInTextString = useCallback(
           (keyEntered: string): void => {
              if (keyEntered === "Enter") {
                 const fullTextString: string =
                         `${firstCharacterText}${scannedText}`.replace(regExpForShiftKey, "");
                 setCommonAccessCardBarCode(fullTextString);
              }
              else {
                 setScannedText(`${scannedText}${keyEntered}`);
              }
           },
           [firstCharacterText, scannedText],
   );

   const setFirstCharOfText = useCallback((keyEntered: string): void => {
      setScannedText("");
      setFirstCharacterText(keyEntered);
   }, []);

   const handleKeyDownEvent = useCallback(
           (event: globalThis.KeyboardEvent): void => {
              const eventTimeStamp: number = event.timeStamp;
              const keyEntered: string = event.key;
              const diff: number = getDiff(eventTimeStamp);

              setLastTimeStamp(event.timeStamp);

              if (diff < 100) {
                 saveInTextString(keyEntered);
              }
              else {
                 setFirstCharOfText(keyEntered);
              }
           },
           [getDiff, saveInTextString, setFirstCharOfText],
   );

   const handleEvent = useCallback(
           (event: Event): void => {
              const e: KeyboardEvent = event as KeyboardEvent;
              handleKeyDownEvent(e);
           },
           [handleKeyDownEvent],
   );

   useEffect(() => {
      window.addEventListener("keydown", handleEvent);

      return (): void => {
         window.removeEventListener("keydown", handleEvent);
      };
   }, [handleEvent]);

   return [commonAccessCardBarCode, scannedText];
}
```