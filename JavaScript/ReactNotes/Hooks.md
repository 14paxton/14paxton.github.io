---
title:     Hooks
permalink: JavaScript/ReactNotes/Hooks
category:  JavaScript/ReactNotes
parent:    ReactNotes
grand_parent: JavaScript
layout:    default
has_children: false
share:     true
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

# Context

- ## Self-Contained Context and Provider

  {%raw%}

  <details markdown="block"> 
  <summary>
  Context File Example
  </summary>

  ```jsx
  import React, {useCallback, useContext, useEffect, useMemo} from "react";
  import worker_script from "containers/pptx/util/ppt.worker.js";
  
  // const myWorker = new Worker(worker_script)
  const TalentGridPPTXContext = React.createContext({
      setLoadingExportData: () => {}, setDataCached: () => {}, myWorker: null,
  });
  
  export function useTalentGridPPTXContext() {
      const uc = useContext(TalentGridPPTXContext);
      return uc
             ? uc
             : {
              setLoadingExportData: () => {}, setDataCached: () => {}, myWorker: null,
          };
  }
  
  export function TalentGridPPTXProvider({value, children}) {
      const {setLoadingExportData, isCached, setIsCached} = value;
      const myWorker = useMemo(function () {
          return new Worker(worker_script);
      }, []);
  
      const setDataCached = useCallback((cached) => {
          if (cached) {
              setLoadingExportData(false);
              window.removeEventListener("message", handleMessage);
          }
          setIsCached(cached);
      }, [handleMessage, setIsCached, setLoadingExportData],);
  
      const handleMessage = useCallback((event) => {
          if (event.data.hasOwnProperty("show_more")) {
              if (!isCached) setLoadingExportData(true);
  
              if (myWorker) myWorker.postMessage("table-resize");
          }
  
      });
  
      useEffect(() => {
          window.addEventListener("message", handleMessage);
  
          return () => {
              window.removeEventListener("message", handleMessage);
  
              //make sure webworker is released when component unmounts
              console.log("terminate worker");
              if (myWorker) myWorker.terminate();
          };
  
      }, [handleMessage, myWorker]);
  
      return (<TalentGridPPTXContext.Provider
          value={{
              setDataCached: setDataCached, setLoadingExportData: setLoadingExportData, myWorker: myWorker,
          }}
      >
  
          {children}
  
      </TalentGridPPTXContext.Provider>);
  }
  
  ```

  </details>

  {% endraw %}

  {%raw%}

  <details markdown="block">                
  <summary>Using The Context In A Component</summary>

  ```jsx
  import {fetchResultsByInterviewModel} from "../../../../../common/util/externalAPIs";
  import React, {useContext, useEffect, useReducer, useState} from "react";
  import TeamViewContext from "../../../../../common/context/TeamViewContext";
  import {groupByArray, imListReducer, initReducer,} from "./compareIndividualsModal.utils";
  
  const CompareIndividualsModalContext = React.createContext();
  
  const emptyContext = {
      resultToIntModelMap: false, promiseList: false, imList: false, teamResultIds: false, imAssTypeObjectList: false, teamMemberResults: false,
  };
  
  export function useCompareIndividualsModal() {
      const uc = useContext(CompareIndividualsModalContext);
      return uc
             ? uc
             : emptyContext;
  }
  
  export function CompareIndividualsModalProvider({children}) {
      const {graphDataMap} = useContext(TeamViewContext);
      const [imList, setIMList] = useState();
      const [teamResultIds, setTeamResultIds] = useState();
      const [teamMemberResults, setTeamMemberResulsts] = useState();
      const [imAssTypeObjectList, setImAssTypeObjectList] = useState();
      const [promiseList, setPromiseList] = useState();
      const [resultToIntModelMap, dispatchIMResultMap] = useReducer(imListReducer, {}, () => initReducer(graphDataMap), [graphDataMap],);
  
      useEffect(() => {
          const groupedObject = groupByArray(Object.values(resultToIntModelMap), "sourceInterviewModelId", "assessmentType",);
          const teamMembers = graphDataMap
              ?.map((member) => member?.graphData?.defaultGroupMember)
              .flat();
  
          const groupList = groupedObject.list;
          delete groupedObject["list"];
  
          setTeamMemberResulsts(teamMembers);
          setImAssTypeObjectList(Object.values(resultToIntModelMap));
          setTeamResultIds(Object.keys(resultToIntModelMap).map((it) => parseFloat(it)),);
          setIMList(Object.keys(groupedObject));
          setPromiseList(groupList.map((im) => {
              return async (searchCriteria) => await fetchResultsByInterviewModel({...searchCriteria, ...im});
          }),);
      }, [resultToIntModelMap, graphDataMap]);
  
      return (<CompareIndividualsModalContext.Provider
          value={{
              resultToIntModelMap: resultToIntModelMap,
              promiseList:         promiseList,
              imList:              imList,
              teamResultIds:       teamResultIds,
              imAssTypeObjectList: imAssTypeObjectList,
              teamMemberResults:   teamMemberResults,
          }}
      >
          {children}
      </CompareIndividualsModalContext.Provider>);
  }
  ```

  </details>

  {% endraw %}

  - ### Using Provider

     ```javascript
      const {promiseList, teamMemberResults, teamResultIds} = useCompareIndividualsModal();
     ```

# uselmperativeHandle

- > `When to use`:
  > - When you need to customize the ref instance value.
  > - For exposing imperative methods to parent components.

    ```jsx
      import {forwardRef, useRef} from 'react';
      
      const FancyInput = forwardRef((props, ref) => {
        const inputRef = useRef();
      
        useImperativeHandle(ref, () => ({
          focus: () => {
            inputRef.current.focus();
          },
        }));
      
        return <input ref={inputRef} {...props} />;
      });
      
      function Parent() {
        const ref = useRef();
      
        return (<div>
                  <FancyInput ref={ref}/>
                  <button onClick={() => ref.current.focus()}>Focus Input</button>
                </div>);
      }
  ```

# useLayoutEffect

- > `When to use`:
  > - When you need to read layout from the DOM and synchronously re-render.
  > - For measuring DOM nodes.

  ```jsx
      import {useLayoutEffect, useRef} from 'react';
    
      function LayoutEffectExample() {
          const divRef = useRef();
      
          useLayoutEffect(() => {
              console.log(divRef.current.getBoundingClientRect());
              return <div ref={divRef}> Hello, world!</div>;
          });
    }
  ```

# useDebugValue

- > ```When to use```:
  > - When you need to add a label for custom hooks in React DevTools.
  > - For debugging custom hooks

  ```jsx
    import {useDebugValue, useEffect, useState} from 'react';
    
    function useFriendStatus(friendID) {
      const [isOnline, setIsOnline] = useState(null);
    
      useDebugValue(isOnline
                    ? 'Online'
                    : 'Offline');
    
      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
    
        // Simulated API or logic for checking friend status
        const fakeApiCall = () => {
          handleStatusChange({isOnline: true});
        };
    
        // Simulate an API call with a timeout
        const timer = setTimeout(fakeApiCall, 1000);
    
        // Cleanup function
        return () => clearTimeout(timer);
      }, [friendID]);
    
      return isOnline;
    }
    
    export default useFriendStatus;
  ```

# useDeferredValue

- > `When to use`:
  > - When you need to defer a value to improve performance.
  > - For avoiding blocking the main thread.

    ```jsx
      import {useDeferredValue, useState} from 'react';

      function DeferredValueExample() {
      const [value, setValue] = useState('');
      const deferredValue = useDeferredValue(value);
      
          return (
              <div>
                  <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Type something..."
                  />
                  <p>Deferred Value: {deferredValue}</p>
              </div>
          );
      }
      
      export default DeferredValueExample;
    ```

# use Transition

- > `When to use`:
  > - When you need to manage state transitions without blocking the UI.
  > - For handling transitions smoothly.

    ```jsx
      import {useState, useTransition} from 'react';
      
      function TransitionExample() {
        const [isPending, startTransition] = useTransition();
        const [value, setValue] = useState('');
        const [slowValue, setSlowValue] = useState('');
      
        const handleChange = (e) => {
          const inputValue = e.target.value;
          setValue(inputValue);
      
          // Start a transition for the slower update
          startTransition(() => {
            setSlowValue(inputValue);
          });
        };
      
        return (<div>
          <input
                  value={value}
                  onChange={handleChange}
                  placeholder="Type something..."
          />
          <p>Normal Value: {value}</p>
          <p
                  style={{
                    color: isPending
                           ? 'gray'
                           : 'black'
                  }}
          >
            Slow Value: {slowValue}
          </p>
          {isPending && <p>Updating...</p>}
        </div>);
      }
      
      export default TransitionExample;
    ```

# useId

- > `When to use`:
  > - When you need to generate unique IDs for elements.
  > - For ensuring accessibility.

    ```jsx
      import {useId} from 'react';
      
      function IdExample() {
          const id = useId();
      
          return (
              <div>
                  <label htmlFor={id}>Name:</label>
                  <input id={id} type="text" />
              </div>
          );
      }
      
      export default IdExample;
    
    ```

# useInsertionEffect

- > `When to use`:
  > - When you need to insert styles before DOM mutations.
  > - For managing styles dynamically.

  ```jsx
    import { useInsertionEffect } from 'react';
    
    function InsertionEffectExample() {
        useInsertionEffect(() => {
            const style = document.createElement('style');
            style.textContent = `body { background-color: lightblue; }`;
            document.head.appendChild(style);
    
            // Cleanup to remove the style when the component unmounts
            return () => {
                document.head.removeChild(style);
            };
        }, []); // Dependency array ensures this effect runs only once
    
        return <div>Check out the light blue background!</div>;
    }
    
    export default InsertionEffectExample;
    
  ```