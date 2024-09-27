---
title:        React-Router
permalink:    ReactNotes/React-Router
category:     JavaScript/ReactNotes
parent:       ReactNotes
grand_parent: JavaScript
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

# Testing Library Render Without Router Helper Function

- > [javascript](https://testing-library.com/docs/example-react-router)

    ```jsx
    // https://testing-library.com/docs/example-react-router
    
    import React                 from "react";
    import {Router}              from "react-router-dom";
    import {render}              from "@testing-library/react";
    import {createMemoryHistory} from "history";
    
    // test utils file
    function renderWithRouter(ui, {
        route = "/", history = createMemoryHistory({initialEntries: [route]})
    } = {}) {
        return {
            ...render(<Router history={history}>{ui}</Router>), history
        };
    }
    ```

- > typescript

    ```tsx
    // setupTests.tsx
    
    import {render}                             from '@testing-library/react';
    import {createMemoryHistory, MemoryHistory} from 'history';
    import React                                from 'react';
    import {Router}                             from 'react-router-dom';
    
    interface RenderWithRouterProps {
        route?: string;
        history?: MemoryHistory;
    }
    
    export const renderWithRouter = (
        ui: React.ReactNode,
        {route = '/', history = createMemoryHistory({initialEntries: [route]})}: RenderWithRouterProps = {}
    ) => {
        return {
            ...render(<Router history={history}>{ui}</Router>),
            history
        };
    };
    ```

# An example React component which uses React Router's match object to grab a url parameter

```jsx
import React from "react";
import {withRouter} from "react-router";
import ScreenHeader from "../../components/UI/ScreenHeader";
import Error from "../../components/UI/Error";
import Loading from "../../components/UI/Loading";
import {useQuery} from "@apollo/react-hooks";
import {GET_PROJECT} from "../../components/Project/project.query";

const ScreensProject = ({match}) => {
    const {id} = match.params;
    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {projectId: id}
    });

    if (loading) return <Loading/>;
    if (error) return <Error error={error}/>;

    return (<div>
        {data.project && (<>
            <ScreenHeader
                title={data.project.title}
                description="The following is a list of all active Ingest Sheets for a project"
            />
            ...
        </>)}
    </div>);
};

export default withRouter(ScreensProject);
```