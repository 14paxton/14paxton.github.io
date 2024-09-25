---
title: QuickScripts
permalink: JavaScript/TypeScript/QuickScripts
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

# GISTs

## [Keyboard input/ barcode scanner react typescript hook](https://gist.github.com/14paxton/09adce350289bdcc1df92ed425c1d548)

# How to dynamically infer TypeScript single object types from tRPC query outputs

> This is how you can dynamically infer a single object type from a tRPC Query returning an array of elements of that specific type:

```typescript
export const exampleRouter = router({
  exampleQuery: exampleQueryImplementation,
});

// extracting a single object type from an array of that type
export type ArrayElement<ArrayType extends unknown[] | null> =
  ArrayType extends (infer ElementType)[] ? ElementType : never;

// the output types of a specific router, indexable by query identifiers
type RouterOutput = inferRouterOutputs<typeof exampleRouter>;

// return type of a single query
export type QueryOutputArray = RouterOutput["exampleQuery"];

// the type of each element from the returned array
export type QueryOutputObject = ArrayElement<QueryOutputArray>;
```

# Improving mapping performance with web workers

> We can use web workers to execute the computationally intensive mapping operation in a separate thread. This can be done by following these steps:

1. Create a new TS file for the worker

   ```typescript
   // worker.ts

   // define the input and output types
   type WorkerInput<T, U> = { data: T; mapFn: (x: T) => U };
   type WorkerOutput<U> = { data: U[] };

   // function for the actual work on the data
   function doWork<T, U>(input: WorkerInput<T, U>): Promise<WorkerOutput<U>> {
     // Apply the mapping function to the input data.
     const mappedData = input.data.map(input.mapFn);

     // Return the mapped data as a promise.
     return Promise.resolve({ data: mappedData });
   }
   ```

2. Use the worker in the main.ts file

   ```typescript
   // main.ts
   const worker = new Worker("worker.ts");

   // Define the mapping function.
   const mapFn = (x: number) => x * x;

   // Send data and the mapping function to the worker for processing.
   worker.postMessage({ data: [1, 2, 3], mapFn });

   // Listen for the message with the result from the worker
   worker.addEventListener("message", (event) => {
     console.log(`Received message from worker: ${event.data}`);
   });
   ```

# How to type-safely interact with Firestore documents

## The problem

> When using Typescript and Firestore, we usually have to do a lot of manual casting when working with documents. One such example would be getting
> the data of a document:

```typescript
const thread = threadDocument.data(); // this will be of type any
```

> Should we want to interact with the data in a type-safe manner, we'll have to cast it, which can quickly become tedious.

```typescript
const thread = <ThreadData>threadDocument.data();
```

> Additionally, when we write data to Firestore, there are no restrictions on how the data should look.

## The solution

> This is when _Firestore Data Converters_ can come in handy.
> All we have to do is implement two methods - one where we constrain the data that gets written and one where we cast the data coming from
> Firestore:

```typescript
const converter = {
  toFirestore: (dataToBeWritten: ThreadData) => data,
  fromFirestore: (document: QueryDocumentSnapshot) =>
    <ThreadData>document.data(),
};
```

> To take this one step further, we can store the "converted" collection reference so we won't have to apply the converters each time we query the
> collection:

```typescript
const threadCollection = db.collection("threads").withConverter(converter);
```

> Now we can safely interact with the collection without having to cast the data:

```typescript
const threadDocument = await threadCollection.doc(id).get();
const thread = threadDocument.data(); // this will be of type ThreadData
```

# How to obtain reactivity in custom hooks while interacting with the local storage

> This is how we can obtain reactivity in our custom React.js hooks while working with the local storage, using the Pub/Sub (Observer) design
> pattern (with TypeScript support).

> The goal is to implement a "useLocalStorage" custom hook, which will abstract away the complexity of reading from and writing to the local storage.
> As we know, each custom hook instantiates its own
> state.
> That is a problem in our case because when one instance of the hook updates the local storage, the state copies held by all the other hook instances
> will be out of sync and will never be
> updated.

> We can solve this issue using the following idea: we can mimic a centralized shared state between our custom hook instances by delegating the
> responsibility of holding these in sync with the local
> storage to a custom "manager," the Observer object.

> Our custom hook will work based on these ideas:

1. Custom Hook instances will subscribe their inner state updater functions to this manager
2. Custom Hook instances will publish the new state to the manager when updating a key of the local storage
3. The manager will trigger all subscriber functions and thus update the inner states of the custom hook instances.

> The observer object:

```typescript
export type Listener<EventType> = (event: EventType) => void;

export type ObserverReturnType<KeyType, EventType> = {
  subscribe: (entryKey: KeyType, listener: Listener<EventType>) => () => void;
  publish: (entryKey: KeyType, event: EventType) => void;
};

export default function createObserver<
  KeyType extends string | number | symbol,
  EventType,
>(): ObserverReturnType<KeyType, EventType> {
  const listeners: Record<KeyType, Listener<EventType>[]> = {} as Record<
    KeyType,
    Listener<EventType>[]
  >;

  return {
    subscribe: (entryKey: KeyType, listener: Listener<EventType>) => {
      if (!listeners[entryKey]) listeners[entryKey] = [];
      listeners[entryKey].push(listener);
      return () => {
        listeners[entryKey].splice(listeners[entryKey].indexOf(listener), 1);
      };
    },
    publish: (entryKey: KeyType, event: EventType) => {
      if (!listeners[entryKey]) listeners[entryKey] = [];
      listeners[entryKey].forEach((listener: Listener<EventType>) =>
        listener(event),
      );
    },
  };
}

export const LocalStorageObserver = createObserver<
  LOCAL_STORAGE_KEYS,
  string
>();

export const { subscribe, publish } = LocalStorageObserver;
```

> The useLocalStorage custom hook (window checks are optional, depending on which environment this JavaScript will run on):

```typescript
export function useLocalStorage<T>(key: LOCAL_STORAGE_KEYS, initialValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  LocalStorageObserver.subscribe(key, setStoredValue);

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      LocalStorageObserver.publish(key, valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
```

# Axios Request and Response Interceptors

> Axios interceptors come in handy when we need to track, register, or work with:

1. Requests before leaving
2. Responses before arriving
3. Both 1 and 2

> Thanks to interceptors, we can pass our own handlers/callbacks for the following cases:

1. Before launching a request
2. Catching an error at HTTP request launch
3. Arrival of a response
4. Catching an error at response arrival

> This is an example of how we can use them:

```typescript
// handlers for the request launch and for catching request launch error
axios.interceptors.request.use(
        (config) => {
           console.log('We are now preparing to launch the request!')
           return config;
        },
        (error) => Promise.reject(error),
);

// handlers for response interceptor and error response interceptor
axios.interceptors.response.use(
        (response) => {
           console.log('We received the response!');
           return response;
        },
        (error) => {
           if (error.response.status === 403)
              return Promise.reject(error);
        }
},
```

> Each Axios Instance can have its custom configuration and request and response interceptors.
> This can be very useful when the architecture of our application enforces/allows each of our services to
> use their own Axios Instance.
> This way, each service can have an Axios Instance with custom configuration and custom request/response interceptors.

> This is what an Axios Instance factory utility function could look like in TypeScript:

```typescript
export const createAxiosWithInterceptors = (
  requestConfig: AxiosRequestConfig = {},
  requestInterceptorHandlers: Partial<RequestInterceptorHandlers> = DefaultRequestInterceptor,
  responseInterceptorHandlers: Partial<ResponseInterceptorHandlers> = DefaultResponseInterceptor,
) => {
  const axiosInstance = axios.create(requestConfig);

  axiosInstance.interceptors.request.use(
    requestInterceptorHandlers.requestConfigHandler,
    requestInterceptorHandlers.requestErrorHandler,
  );

  axiosInstance.interceptors.response.use(
    responseInterceptorHandlers.responseHandler,
    responseInterceptorHandlers.responseErrorHandler,
  );

  return axiosInstance;
};
```

> where we can define our types and default interceptors as follows:

```typescript
type RequestConfigHandler = (config: AxiosRequestConfig) => AxiosRequestConfig;
type RequestErrorHandler = (error: AxiosError) => Promise<AxiosError>;
type RequestInterceptorHandlers = {
  requestConfigHandler: RequestConfigHandler;
  requestErrorHandler: RequestErrorHandler;
};

type ResponseHandler = (response: AxiosResponse) => AxiosResponse;
type ResponseErrorHandler = (error: AxiosError) => Promise<AxiosError>;

type ResponseInterceptorHandlers = {
  responseHandler: ResponseHandler;
  responseErrorHandler: ResponseErrorHandler;
};

const DefaultResponseInterceptor = {
  responseHandler: (response: AxiosResponse) => response,
  responseErrorHandler: (error: AxiosError) => Promise.reject(error),
};

const DefaultRequestInterceptor = {
  requestConfigHandler: (config: AxiosRequestConfig) => config,
  requestErrorHandler: (error: AxiosError) => Promise.reject(error),
};
```

> In each of our services we can then use our factory method as follows:

```typescript
// axios instance with custom request config received through constructor, custom request interceptor and default response interceptor
protected;
http: AxiosInstance = createAxiosWithInterceptors(this.requestConfig, {
  requestConfigHandler: (config) => {
    console.log();
    return config;
  },
});
```

# How to declare path aliases in Typescript

> Defining path aliases using webpack can save you a lot of headache when it comes to imports, but you must also let Typescript know about them.

> Following my [previous post](https://graffino.com/til/FRXaL59FzW-folder-aliases-using-webpack) on declaring path aliases using webpack, you can
> configure your **`tsconfig.json`** file to in order to
> be able to use those aliases in Typescript like so:

```json
{
   ...
   "paths": {
      "@/*": [
         "./src/*"
      ],
      "images/*": [
         "./assets/images/*"
      ]
   },
   "include": [
      ...
   ]
}
```

> Of course, all paths for defined aliases must be reachable by Typescript.
> You can check [this post](https://graffino.com/til/hEvDjQa4au-how-to-import-images-in-typescript) out if you are not sure
> how to do that.

> Otherwise, we are going to get this error:

```shell
Cannot find module 'images/[your module]' or its corresponding type declarations.
```

# How to import images in Typescript

> Normally, when Typescript cannot find something, we get this error:

```shell
Cannot find module [your module] or its corresponding type declarations ts(2307)
```

> Now let's see how we can fix this, with a simple example.
> Given the following folder structure:

```
│── src
│   ├── resources
│   │   ├── ts
│   │   │   ├── **/*.ts
│   │   ├── images
│   │   │   ├── logo.svg
├── ...
├── tsconfig.json

```

> To be able to achieve something like this:

```typescript
import Logo from "[path]/images/logo.svg";
```

> without any `**` Typescript errors\*\*, we need to follow these steps:

### 1. Make sure that the `images` folder is "reachable" by Typescript.

> Adding this inside **`tsconfig.json`** will do the trick:

```json
{
   "include": [
      ...
      "resources/**/*.ts"
   ]
}

```

> A configuration like this one **will not do**:

```json
{
  "include": ["resources/ts/**/*.ts"]
}
```

> Because **images/** is not included in **ts/** and we don't have any other folders declared, so Typescript can't "reach" it.

### 2. Let Typescript know about the `.svg` type in that folder.

> In the root of the images folder create a file called **`index.d.ts`**:

```
├── resources
│   ├── ts
│   │   ├── **/*.ts
│   ├── images
│   │   ├── logo.svg
│   │   ├── index.d.ts
```

> With the following contents:

```typescript
declare module "*.svg" {
  const value: any;
  export = value;
}
```