---
title:        Javascript
permalink:    TestingFrameworks/JavascriptTesting
category:     TestingFrameworks
parent:       TestingFrameworks
layout:       default
has_children: false
share:        true
shortRepo:

  - testingframeworks
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

# Jest

## config in package.json

> this is transformIgnorePatterns for jest, defaultPhrases used for dateRangePicker needed to be ignored for jest and adding a workaround for using a
> webworker

```json
{
  "jest": {
    "transformIgnorePatterns": [
      "<rootDir>/node_modules/defaultPhrases.js"
    ],
    "transform": {
      "^.+\\.worker.[t|j]sx?$": "workerloader-jest-transformer"
    }
  }
}
```

## Modify existing object in test

```javascript
const modifiedProps = JSON.parse(JSON.stringify(defaultProps));
```

## fire button example

```javascript
import React from "react";

import {render, fireEvent} from "react-testing-library";

import Counter from "../lessons/02-testing-hooks";

test("counter increments the count", () => {
    const {container} = render(<Counter/>);

    const button = container.firstChild;

    expect(button.textContent).toBe("0");

    fireEvent.click(button);

    expect(button.textContent).toBe("1");
});
```

## use mount to fully render,

> can only set props on root, use dive to access child components

> To test a component (with Jest) that contains<Route>and withRouter you need to import Router in you test

```javascript
import {BrowserRouter as Router} from "react-router-dom";

it("containts stuff", () => {
    const wrapper = mount(<Router>
        {" "}
        <Footer/>
        {" "}
    </Router>,);
    console.log(wrapper.find("FooterContainer").html());

    expect(wrapper
        .find('a[href="https://talentmine.talentplus.com/s/contactsupport"]')
        .text(),).toBe("Contact    Support    ");
});
```

---

## Use the object property selector to find nodes

> by passing in an object that matches the property of a node as a selectoin

```javascript
expect(wrapper.find({alt: "logo"}).text()).toBe("Welcome to React");
```

- > [Shallow Wrapper](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html)

```javascript
it("test with enzyme", () => {
    const container = shallow(<GoalCreationForm
        {...defaultProps}
        currentStep={GOAL_CREATION_WIZARD.LANDING}
    />,);

    container.setProps({
        owner: {
            id: 123, accountInfo: {clientSetupId: 1}, userInfo: {
                firstName: "John", lastName: "Wayne", preferredName: "TheDuke",
            },
        },
    });

    console.log(container
        .find({
            "data-qa": "goals-creation-title-name",
        })
        .at(0)
        .html(),);
    console.log(container
        .find({
            "data-qa": "goals-creation-title-name",
        })
        .html(),);
    console.log(container
        .find({
            "data-qa": "goals-creation-title-name",
        })
        .text(),);
    console.log(container.debug());
    console.log(container.find("[variant='h5']").html());
    expect(container
        .find({
            "data-qa": "goals-creation-title-name",
        })
        .exists(),).toBe(true);
    expect(container
        .find({
            "data-qa": "goals-creation-title-name",
        })
        .text(),).toBe("Creating Goal for    TheDuke    Wayne    ");
});
```

---

# REACT TESTING LIB

## MUTATION OBSERVER

```js
global.MutationObserver = class {
    constructor(callback) {}

    disconnect() {}

    observe(element, initObject) {}
}
```

> or

```javascript
global.MutationObserver = MutationObserver;

HTMLCanvasElement;

HTMLCanvasElement.prototype.getContext = jest.fn();
```

## use test-id in material-ui text-field

```javascript
import "@testing-library/jest-dom";
import React from "react";
import {createMount} from "@material-ui/core/test-utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditProfileForm from "./editForm";
import {
    render as testRender, fireEvent, screen, getByText,
} from "@testing-library/react";

const props = {
    handleChange: jest.fn(), onSubmit: jest.fn(), bio: "test", gravatar: "https://i.pravatar.cc/150?img=3", handleBio: jest.fn(), handleGravatar: jest.fn(),
};
describe("<EditProfileForm/>", () => {
    let wrapper;
    let mount;
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(<EditProfileForm {...props} />);
    });
    // must be called first
    it("calls handleBio on bio TextField change", () => {
        const input = screen.getByTestId("bio");

        fireEvent.change(input, {target: {value: "new value"}});

        expect(props.handleBio).toHaveBeenCalledTimes(1);
    });

    it("should render <EditProfileForm/>", () => {
        expect(wrapper).toHaveLength(1);
    });

    it("should check header title ", () => {
        expect(wrapper.find(Typography).at(0)).toHaveLength(1);
        expect(wrapper.find(Typography).at(0).text()).toContain("Edit Profile");
    });

    it("should test bio prop", () => {
        expect(wrapper.props().bio).toContain("test");
    });

    it("should test gravtar prop", () => {
        const link = "https://i.pravatar.cc/150?img=3";
        expect(wrapper.props().gravatar).toContain(link);
    });

    it("should test handleChange props", () => {
        const title = "Test";
        expect(wrapper.props().handleChange({
            target: {
                value: title,
            },
        }),);
        expect(props.handleChange).toHaveBeenCalled();
    });

    it("should test onSubmit prop", () => {
        // console.log(wrapper.find(TextField).debug());
        const submit = jest.fn();
        wrapper.simulate("submit", {submit});
        expect(props.onSubmit).toBeCalled();
    });

    it("should test button click", () => {
        const button = wrapper.find(Button);
        button.simulate("click");
        expect(props.onSubmit).toBeCalled();
    });
});
```

- > ### And then passing data - testid as an input prop on text field like this

    ```jsx
    <TextField
        id="outlined-name"
        className="bio-test"
        style={{
            width: "100%",
        }}
        name="bio"
        inputProps={{
            "data-testid": "bio",
        }}
        multiline={true}
        rows="3"
        defaultValue={props.bio}
        onChange={props.handleBio}
        margin="normal"
        variant="outlined"
    />
    ```

## Use queryBy to test if something should be null

```jsx
it("ellipsis should not appear for shared result viewer role", async () => {
    render(<LanguageProvider>
        {" "}
        <CurrentUserContext.Provider value={{user: sharedResultViewer}}>
            {" "}
            <Members data={members}/>{" "}
        </CurrentUserContext.Provider>{" "}
    </LanguageProvider>,);

    const ellipsisColumn = await waitFor(() => screen.queryByTestId("ellipses-action-buttons-members-table"),);
    expect(ellipsisColumn).toBeNull();
});
```

## Firing events

```jsx
import userEvent from "@testing-library/user-event";

fireEvent.change(input, {
    target: {
        value: "GroupA",
    },
});

userEvent.type(input, "GroupA");
```

## Getting component

```jsx
const {getByTestId, queryByTestId} = render(<CreateGroupForm groups={groupNames}/>,);
```

- > ### Testing component

    ```jsx
    expect(input).toHaveValue("GROUP");
    ```

## Get by TagName / Element Type / NodeName

```javascript
screen.getByText((_content, element) => element?.tagName.toLowerCase() === 'svg');
```

## Check TagName / Element Type / NodeName

```javascript
it('should render as div when the "as" attribute is passed with a value of "div"', () => {
    render(<Button label={testText} as='div' data-testid='test-button'/>)

    expect(screen.getByTestId('test-button').nodeName.toLowerCase()).toBe('div')
})
```

## React-Hook-Forms

### FormProvider Wrapper

```tsx
import {render, renderHook} from '@testing-library/react';
import {ReactElement, ReactNode} from 'react';
import {FormProvider, useForm} from 'react-hook-form';


interface IWrapperProps {
    children?: ReactNode;
    props?: object;
}

const renderReactHookForm = (ui: ReactElement, {defaultValues = {}} = {}) => {
    const {result} = renderHook(() => {
        return useForm(defaultValues);
    });

    const Wrapper = ({children}: IWrapperProps) => {

        return (<FormProvider {...result.current}>{children}</FormProvider>);
    };

    return {
        ...render(ui, {wrapper: Wrapper})
    };
};

export default renderReactHookForm;
```

## Workarounds

### tooltip calling document.createRange

- > otherwise will get error: `Uncaught [TypeError: document.createRange is not a function]`

```jsx
global.document.createRange = () => ({
    setStart: () => {}, setEnd: () => {}, commonAncestorContainer: {
        nodeName: "BODY", ownerDocument: document,
    },
});
```

# Enzyme

- [selector](https://enzymejs.github.io/enzyme/docs/api/selector.html)

- [selector](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/find.html)

```jsx
expect(wrapper.find(".App-intro").exists()).toBe(true);

expect(wrapper.find("ul").children().length).toBe(3);

expect(wrapper.find("ul").hasClass("tyler")).toBe(true);

expect(wrapper.find("h1").text()).toBe("Welcome to React");

expect(wrapper.find('[href="tyler"]').text()).toBe("WelcometoReact");

expect(wrapper.find('[href="tyler ~.clark"]').text()).toBe("Welcome to React");
expect(wrapper.find('[text="Sometitle"]').text()).toBe("Welcome to React");
```