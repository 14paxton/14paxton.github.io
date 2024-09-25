---
title: ReactHookForm
permalink: ReactNotes/ReactHookForm
category: JavaScript/ReactNotes
parent: ReactNotes
grand_parent: JavaScript
layout: default
has_children: false
share: true
shortRepo:

- reactnotes
- default

---

{% raw %}
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

# [React Hook Forms Components](https://github.com/14paxton/ReactHookFormDynamicComponents)

---

# Standard Form Setup

```jsx
import React     from "react";
import {useForm} from "react-hook-form";

export default function App() {
  const {register, handleSubmit, watch, errors} = useForm();
  const onSubmit = data => console.log(data);
  return (<form onSubmit={handleSubmit(onSubmit)}>
    <input name="firstName" defaultValue="Zoe" ref={register}/>
    <input type="submit"/>
  </form>);

}
```

# Higher Order Component Helper

```jsx
/**
 * Higher order helper function which wraps a component w/ React Hook Form
 * @param {React Component} WrappedComponent to pass into
 * @param {*} restProps any other remaining props
 * @returns {React Component}
 */
export function withReactHookForm(WrappedComponent, restProps) {
  const HOC = () => {
    const methods = useForm();

    return (<FormProvider {...methods}>
      <WrappedComponent {...restProps} />
    </FormProvider>);
  };

  return HOC;
}
```

# Form Context / useFormContext

```jsx
// Updated Form
import React                   from "react";
import {FormProvider, useForm} from "react-hook-form";

export default function App() {
  const methods = useForm();
  const onSubmit = data => console.log(data);
  return (<FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <CoreMetadata {...PASS_WHATEVER_PROPS_HERE} />
      <ControlledTerms/>
      <DescriptiveMetadata/>
    </form>
  </FormProvider>);

}
```

> This approach flows with React Context/Provider patterns, and any child component in the ancestry tree can grab React Hook Form Context if it needs
> it.
> Mid-level components which don’t care about
> register or error are set free and liberated from baggage props.

```jsx
import React            from "react";
import {useFormContext} from "react-hook-form";

const UIFormInput = ({name, required, ...passedInProps}) => {
// All these values are from the component's parent <form />
  const {control, errors, register} = useFormContext();
  return (<>
  <input
          name={name}
          ref={register({required})}
          className={`input ${errors[name]
                              ? "is-danger"
                              : ""}`
          {...passedInProps}
            />
          {errors[name] && (
            <p data-testid="input-errors" className="help is-danger">
          {label || name} field is required
  </p>)
}
</>
)
  ;
}
```

# Fields Array/ useFieldArray

```jsx
import React                           from "react";
import PropTypes                       from "prop-types";
import {FontAwesomeIcon}               from "@fortawesome/react-fontawesome";
import {useFieldArray, useFormContext} from "react-hook-form";
import UIFormSelect                    from "./Select";
import {isUrlValid}                    from "../../../services/helpers";
import {Button}                        from "@nulib/admin-react-components";

const UIFormRelatedURL = ({
  codeLists = [], label, name, required, ...passedInProps
}) => {
  const {control, errors, register} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control, name, // Metadata item form name
    keyName: "useFieldArrayId",
    });

  return (<div data-testid="related-url-wrapper">
    <ul className="mb-3">
      {fields.map((item, index) => {
        // Metadata item name combined with it's index in the array of multiple entries
        const itemName = `${name}[${index}]`;

        return (<li
                key={item.useFieldArrayId}
                data-testid={`related-url-list-item`}
        >
          <fieldset>
            <legend
                    className="has-text-grey has-text-weight-light"
                    data-testid="legend"
            >{`${label} #${index + 1}`}</legend>

            {/* Existing values are NOT editable, so we save form data needed in the POST update, in hidden fields here */}
            {!item.new && (<div data-testid="related-url-existing-value">
              <p>
                {item.url}
                {item.label && `, ${item.label.label}`}
              </p>
              <input
                      type="hidden"
                      name={`${itemName}.url`}
                      ref={register()}
              />
              <input
                      type="hidden"
                      name={`${itemName}.label`}
                      ref={register()}
              />
            </div>)}

            {/* New form entries */}
            {item.new && (<div data-testid="related-url-form-item">
              <div className="field">
                <label className="label">URL</label>
                <input
                        type="text"
                        name={`${itemName}.url`}
                        className={`input ${errors[name] && errors[name][index].url
                                            ? "is-danger"
                                            : ""}`}
                        ref={register({
                          required: "Related URL is required", validate: (value) => isUrlValid(value) || "Please enter a valid URL",
                        })}
                        defaultValue=""
                        data-testid={`related-url-url-input`}
                />
                {errors[name] && errors[name][index].url && (<p
                        data-testid={`relatedURL-input-errors-${index}`}
                        className="help is-danger"
                >
                  {errors[name][index].url.message}
                </p>)}
              </div>
              <div className="field">
                <UIFormSelect
                        isReactHookForm
                        name={`${itemName}.label`}
                        label="Label"
                        showHelper={true}
                        data-testid={`related-url-select`}
                        options={codeLists}
                        hasErrors={!!(errors[name] && errors[name][index].label)}
                        required
                />
              </div>
            </div>)}

            <Button
                    type="button"
                    className="button is-light is-small mt-3"
                    onClick={() => remove(index)}
                    data-testid={`button-related-url-remove`}
            >
                  <span className="icon">
                    <FontAwesomeIcon icon="trash"/>
                  </span>
              <span>Remove</span>
            </Button>
          </fieldset>
        </li>);
      })}
    </ul>

    <Button
            type="button"
            className="button is-text is-small"
            onClick={() => {
              append({new: true, url: "", label: ""});
            }}
            data-testid="button-add-field-array-row"
    >
        <span className="icon">
          <FontAwesomeIcon icon="plus"/>
        </span>
      <span>Add {fields.length > 0 && "another"}</span>
    </Button>
  </div>);
};

UIFormRelatedURL.propTypes = {
  codeLists: PropTypes.array, label: PropTypes.string.isRequired, name: PropTypes.string.isRequired, roleDropdownOptions: PropTypes.array,
};

export default UIFormRelatedURL;
```

# fire submit from parent

```javascript
const submitMyForm = (data) => {
  formRef.current.dispatchEvent(new Event("submit", {
    cancelable: true, bubbles: true,
  }),);
};
```

# using a controller component with select and autocomplete

```jsx
<Controller
        name={"users"}
        control={control}
        rules={{
          required: "One user is required",
          validate: (value) => value.length < 11
                               ? true
                               : "Max of 10 results may be shared at a time. ",
        }}
        render={({onChange, value, ref, ...props}) => (<Autocomplete
                multiple
                id="tags-standard"
                options={userIds}
                onChange={(e, data) => onChange(data)}
                getOptionLabel={(option) => `${userOptions[option].firstName} ${userOptions[option].lastName}`}
                filterSelectedOptions
                renderTags={(value, getTagProps) => value.map((option, index) => (<Chip
            color="primary"
            label={`${userOptions[option].firstName} ${userOptions[option].lastName}`}
            {...getTagProps({index})}
                />))}
                renderInput={(params) => (<TextField
                        {...params}
                        variant="outlined"
                        label="Search Users"
                        placeholder="Enter first name and/or last name"
                        InputLabelProps={{
                          shrink: true, "data-qa": "score-sheet-result-statement-label", style: {
                            fontSize: "20px", color: "black", display: "block", fontFamily: "Open Sans, sans-serif", fontWeight: 700,
                          },
                        }}
                        error={!!errors?.users}
                        helperText={errors?.users?.message}
                />)}
                {...props}
        />)}
/>
```

```jsx
<Controller
        name={"testSelect"}
        control={control}
        defaultValue={currency}
        render={({onChange, ...props}) => (<TextField
                id="standard-select-currency"
                select
                label="Select"
                onChange={(e, data) => onChange(data.props.value)}
                helperText="Please select your currency"
                {...props}
    >
          {currencies.map((option) => (<MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>))}
        </TextField>)}
/>
```

{% endraw %}

# Testing

## Test and Render React Hook Form

```javascript
import React                     from "react";
import {screen}                  from "@testing-library/react";
import {renderWithReactHookForm} from "./services/testing-helpers";
import UIFormRelatedURL          from "./RelatedURL";

const props = {
  name: "relatedUrl", label: "Related URL",
};

describe("standard component behavior", () => {
  beforeEach(() => {
    renderWithReactHookForm(<UIFormRelatedURL {...props} />, {
      // Add some default values to our form state, using Reach Hook Form's "defaultValues" param
      defaultValues: {
        relatedUrl: [{
          url: "http://www.northwestern.edu", label: {
            id: "HATHI_TRUST_DIGITAL_LIBRARY", label: "Hathi Trust Digital Library", scheme: "RELATED_URL",
          },
        },],
      },
    });
  });

  it("renders component and an add button", () => {
    expect(screen.getByTestId("related-url-wrapper"));
    expect(screen.getByTestId("button-add-field-array-row"));
  });

  it("renders existing related url values", () => {
    expect(screen.getAllByTestId("related-url-existing-value")).toHaveLength(1);
    expect(screen.getByText("http://www.northwestern.edu, Hathi Trust Digital Library"));
  });

  it("renders form elements when adding a new related url value", () => {
    const addButton = screen.getByTestId("button-add-field-array-row");
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("related-url-form-item")).toHaveLength(2);
  ...
  });
});
```

## helper function

- > we wrap the component we’re testing with React Hook Form’s <FormProvider /> and can initialize the form with some default values.

### renderWithReactHookForm / render with a React hook form

```javascript
/**
 * Testing Library utility function to wrap tested component in React Hook Form
 * @param {ReactElement} ui A React component
 * @param objectParameters
 * @param {Object} objectParameters.defaultValues Initial form values to pass into
 * React Hook Form, which you can then assert against
 */
export function renderWithReactHookForm(ui, {defaultValues = {}} = {}) {
  let reactHookFormMethods = {};

  const Wrapper = ({children}) => {
    const methods = useForm({defaultValues});
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, {wrapper: Wrapper})
  };
}
```

### Render with React Hook Form Extended

---

```jsx
import React                   from "react";
import {render}                from "@testing-library/react";
import {FormProvider, useForm} from "react-hook-form";

/**
 * Testing Library utility function to wrap tested component in React Hook Form
 * @param {ReactElement} ui A React component
 * @param objectParameters
 * @param {Object} objectParameters.defaultValues Initial form values to pass into
 * React Hook Form, which you can then assert against
 * @param {Array} objectParameters.toPassBack React Hook Form method names which we'd
 * like to pass back and use in tests.  A primary use case is sending back 'setError',
 * so we can manually setErrors on React Hook Form components and test error handling
 */
export function renderWithReactHookForm(ui, {defaultValues = {}, toPassBack = []} = {}) {
  let reactHookFormMethods = {};

  const Wrapper = ({children}) => {
    const methods = useForm({defaultValues});
    for (let reactHookFormItem of toPassBack) {
      reactHookFormMethods[reactHookFormItem] = methods[reactHookFormItem];
    }
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, {wrapper: Wrapper}), reactHookFormMethods,
  };
}
```

- > #### example renderWithReactHookFormExtended.test.js / test that a React Hook Form element displays error messages, without submitting the form

    ```javascript
    import React                     from "react";
    import {waitFor}                 from "@testing-library/react";
    import UIFormRelatedURL          from "./RelatedURL";
    import {relatedUrlSchemeMock}    from "../../Work/controlledVocabulary.gql.mock";
    import {renderWithReactHookForm} from "../../../services/testing-helpers";
    import userEvent                 from "@testing-library/user-event";
    
    const props = {
        codeLists: relatedUrlSchemeMock, name: "relatedUrl", label: "Related URL",
    };
    
    describe("Test component,  error handling", () => {
        // Here's an example of how to test that a React Hook Form element
        // displays error messages, without submitting the form.
        it("renders appropriate error messages with invalid url or select values", async () => {
            const {
                      findByText, getByTestId, reactHookFormMethods,
                  } = renderWithReactHookForm(<UIFormRelatedURL {...props} />, {
                toPassBack: ["setError"],
            });
    
            userEvent.click(getByTestId("button-add-field-array-row"));
    
            await waitFor(() => {
                // Here we manually manipulate the form, setting an error the same way React Hook Form does
                reactHookFormMethods.setError("relatedUrl[0].url", {
                    type: "validate", message: "Please enter a valid url",
                });
            });
            expect(await findByText("Please enter a valid url"));
        });
    });
    
    ```
    - > And what the input being tested may look like.
        ```jsx 
        <input
            type="text"
            name={`${itemName}.url`}
            className={`input ${errors[name] && errors[name][index].url
                                ? "is-danger"
                                : ""}`}
            ref={register({
                required: "Related URL is required", validate: (value) => isUrlValid(value) || "Please enter a valid URL",
            })}
            defaultValue=""
            data-testid={`related-url-url-input`}
        />
        ```

- > #### used in app

    ```javascript
    describe("BasicSearch", () => {
        beforeEach(() => {
            renderWithReactHookForm(<BasicSearch/>, {
                defaultValues: {
                    firstName: "Vic", lastName: "Vinegar",
                },
            });
        });
    
        it("BasicSearch should render withouth crashing", async () => {
            expect(screen.getByTestId("group-first-name-search-input"));
        });
    
        it("first and last name inputs should have value", async () => {
            expect(screen.getByTestId("group-first-name-search-input").value).toEqual("Vic",);
            expect(screen.getByTestId("group-last-name-search-input").value).toEqual("Vinegar",);
        });
    });
    ```

## Test Metadata

```javascript
import React              from "react";
import {screen}           from "@testing-library/react";
import {
  renderWithRouterApollo, withReactHookForm,
}                         from "../../../services/testing-helpers";
import ControlledMetadata from "./ControlledMetadata";

describe("Some component", () => {
  beforeEach(() => {
    // Wrap with React Hook Form's Provider
    const Wrapped = withReactHookForm(ControlledMetadata);

    // Wrap with any other Providers you may be using, like ApolloProvider, React Router, etc.
    return renderWithRouterApollo(<Wrapped/>, {
      mocks: [],
    });
  });

  // Your tested component will be wrapped with React Hook Form's provider (and others) 
  it("renders controlled metadata component", async () => {
    expect(await screen.findByTestId("controlled-metadata"));
  });

...
});
```