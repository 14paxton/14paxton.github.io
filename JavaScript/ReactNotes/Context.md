---
title: Context
permalink: JavaScript/ReactNotes/Context
category: JavaScript/ReactNotes
parent: ReactNotes
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

# Self-Contained Context and Provider

```jsx
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import worker_script from "containers/pptx/util/ppt.worker.js";

// const myWorker = new Worker(worker_script)
const TalentGridPPTXContext = React.createContext({
  setLoadingExportData: () => {},
  setDataCached: () => {},
  myWorker: null,
});

export function useTalentGridPPTXContext() {
  const uc = useContext(TalentGridPPTXContext);
  return uc
    ? uc
    : {
        setLoadingExportData: () => {},
        setDataCached: () => {},
        myWorker: null,
      };
}

export function TalentGridPPTXProvider({ value, children }) {
  const { setLoadingExportData, isCached, setIsCached } = value;
  const myWorker = useMemo(function () {
    return new Worker(worker_script);
  }, []);

  const setDataCached = useCallback(
    (cached) => {
      if (cached) {
        setLoadingExportData(false);
        window.removeEventListener("message", handleMessage);
      }
      setIsCached(cached);
    },
    [handleMessage, setIsCached, setLoadingExportData],
  );

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

  return (
    <TalentGridPPTXContext.Provider
      value={{
        setDataCached: setDataCached,
        setLoadingExportData: setLoadingExportData,
        myWorker: myWorker,
      }}
    >
      {children}
    </TalentGridPPTXContext.Provider>
  );
}
```

---

---

```jsx
import { fetchResultsByInterviewModel } from "../../../../../common/util/externalAPIs";
import React, { useContext, useEffect, useReducer, useState } from "react";
import TeamViewContext from "../../../../../common/context/TeamViewContext";
import {
  groupByArray,
  imListReducer,
  initReducer,
} from "./compareIndividualsModal.utils";

const CompareIndividualsModalContext = React.createContext();

const emptyContext = {
  resultToIntModelMap: false,
  promiseList: false,
  imList: false,
  teamResultIds: false,
  imAssTypeObjectList: false,
  teamMemberResults: false,
};

export function useCompareIndividualsModal() {
  const uc = useContext(CompareIndividualsModalContext);
  return uc ? uc : emptyContext;
}

export function CompareIndividualsModalProvider({ children }) {
  const { graphDataMap } = useContext(TeamViewContext);
  const [imList, setIMList] = useState();
  const [teamResultIds, setTeamResultIds] = useState();
  const [teamMemberResults, setTeamMemberResulsts] = useState();
  const [imAssTypeObjectList, setImAssTypeObjectList] = useState();
  const [promiseList, setPromiseList] = useState();
  const [resultToIntModelMap, dispatchIMResultMap] = useReducer(
    imListReducer,
    {},
    () => initReducer(graphDataMap),
    [graphDataMap],
  );

  useEffect(() => {
    const groupedObject = groupByArray(
      Object.values(resultToIntModelMap),
      "sourceInterviewModelId",
      "assessmentType",
    );
    const teamMembers = graphDataMap
      ?.map((member) => member?.graphData?.defaultGroupMember)
      .flat();

    const groupList = groupedObject.list;
    delete groupedObject["list"];

    setTeamMemberResulsts(teamMembers);
    setImAssTypeObjectList(Object.values(resultToIntModelMap));
    setTeamResultIds(
      Object.keys(resultToIntModelMap).map((it) => parseFloat(it)),
    );
    setIMList(Object.keys(groupedObject));
    setPromiseList(
      groupList.map((im) => {
        return async (searchCriteria) =>
          await fetchResultsByInterviewModel({ ...searchCriteria, ...im });
      }),
    );
  }, [resultToIntModelMap, graphDataMap]);

  return (
    <CompareIndividualsModalContext.Provider
      value={{
        resultToIntModelMap: resultToIntModelMap,
        promiseList: promiseList,
        imList: imList,
        teamResultIds: teamResultIds,
        imAssTypeObjectList: imAssTypeObjectList,
        teamMemberResults: teamMemberResults,
      }}
    >
      {children}
    </CompareIndividualsModalContext.Provider>
  );
}
```

## Using Provider

```javascript
const { promiseList, teamMemberResults, teamResultIds } =
  useCompareIndividualsModal();
```
