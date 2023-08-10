---  
title: DialogFlow    
permalink: GoogleNotes/DialogFlow    
category:  GoogleNotes    
parent:   GoogleNotes    
layout: default    
has_children: false    
share: true    
shortRepo:    
  - googlenotes    
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
    
# GoogleDialogFlow    
    
repo for GoogleDialogFlow    
    
1.    
    
> Identify the roles, both the customers and your virtual agent, as well as all the potential use cases your virtual agent will need to address. Right personas, both    
> for customers and virtual agents, so that conversations will take a natural shape. Model user agent interactions to help identify user requirements, handle all    
> possible expected and don't forget unexpected user scenarios, that could occur for your business.    
    
2.    
    
> In order to understand why the customers reaching out to you, you'll need to be able to break down the individual parts of the conversation. The conversation will    
> include representative words and phrases, and you can use these to dissect and interpret the customer's needs and how you respond. There are three important parts    
> to a conversation. Intense, identifying what the customer needs or wants you to do for them. Entities, identifying a thing the customer is referring to, and      
> parameters setting the variable of the thing the customer is referring to so that you can reference it later in the conversation.    
    
# Key Terms    
    
![](assets/images/Capture.PNG)    
    
# QUICK TID BITS    
    
## params    
    
```    
 $intent.params.user-input,    
 $session.params.user-input,    
 $page.params.valid-input,    
```    
    
```    
  $page.params.status = "FINAL"    
 $page.params.parameter-id.status = "UPDATED"    
```    
    
## [functions](https://cloud.google.com/dialogflow/cx/docs/reference/system-functions#func-append)    
    
```    
 $sys.func.CONCATENATE($session.params.user-authentication-map-key, $session.params.user-input)    
 $sys.func.JOIN(", ", $session.params.user-authentication-map)    
 $sys.func.TO_TEXT($session.params.user-authentication-map)    
 $sys.func.SUBSTITUTE("$sys.func.TO_TEXT($session.params.user-authentication-map)" , " { ", "PP")    
 "$sys.func.ADD($session.params.verify-member-attempt, 1)"    
```    
    
```    
($sys.func.GET_FIELD($session.params, phone-number) != null    
    OR $sys.func.GET_FIELD($session.params, last-4-ssn) != null)    
    AND $session.params.member-verified != true    
    AND $sys.func.GET_FIELD($session.params, security-code) = null    
```    
    
`$sys.func.ADD( $sys.func.TO_NUMBER( $session.params.total-questions-resolved) , $sys.func.TO_NUMBER(  $session.params.resolved))"`    
    
## when using func in parameter value be cognizant of quotation marks, they need to be there    
    
```    
$sys.func.IF("$session.params.account-found = null OR $session.params.account-found = false" , null , true)    
$sys.func.IF("($session.params.current-flow = null AND $session.params.current-route = null)" , null, {name : $session.params.current-flow , route : $session.params.current-route} )    
$sys.func.IF("$session.params.current-flow = null" , null , "{name : $session.params.current-flow , route : $session.params.current-route}")    
{name : $sys.func.TO_TEXT($session.params.current-flow) , route : $sys.func.TO_TEXT($session.params.current-route)}    
    
```    
    
## [get the json key file from DialogFlow](https://support.woztell.com/portal/en/kb/articles/how-to-get-the-json-key-file-from-dialogflow)    
    
1. Once in the Google Cloud Platform, go to IAM & admin > Service account > Create service account    
2. Fill out the details of the service account and click on the button "create"    
3. Select "DialogFlow API Admin" in the field "Role"    
4. Now, once the creation of the service account is finalized, select it and click on "Create Key"    
5. Select JSON as "key type"    
6. Download the new private key in JSON    
  
---  
    
# [API Docs C# Client](https://cloud.google.com/dotnet/docs/reference/Google.Cloud.Dialogflow.Cx.V3/latest)    
    
# Intents    
    
> A couple of things to look for:    
    
- Note that as you enter your training phrase, Dialogflow CX will automatically annotate your entities. If it doesn't do so, you may need to    
  update your entity (by adding a synonym) or by manually annotating the training phrase yourself.    
  Shorter training phrases: Dialogflow's NLU system can also work with shorter training phrases and we have provided a couple of examples    
  here.    
- Over-training: Too many training phrases for an intent may cause over-training and a less desirable result. It is best practice to use    
  iterative and incremental testing and add in training phrases in the case that there isn't an intent matched.    
  
---  
    
# Parameters    
    
## [Presets](https://cloud.google.com/dialogflow/cx/docs/concept/fulfillment#param-preset)    
    
You can use a fulfillment to provide presets that set or override current parameter values. These presets will be applied before resolving static response messages or calling a webhook.    
    
You can also use [system functions](https://cloud.google.com/dialogflow/cx/docs/reference/system-functions) to preset the parameter to a dynamically generated value.    
    
| Parameter       | Value                                                                                                        |    
|-----------------|--------------------------------------------------------------------------------------------------------------|    
| now             | `$sys.func.NOW()`                                                                                            |    
| counter         | `$sys.func.ADD($session.params.counter, 1)`                                                                  |    
| new-cost        | `$sys.func.IDENTITY($session.params.other-cost)`                                                             |    
| member-verified | $sys.func.IF("$session.params.member-found-count < 2 AND $session.params.member-found = true", true, false)" |    
    
---  
    
# GitHub    
    
- access token = `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`    
    
## Create Repo    
    
- GitHub repository URL:    
  (for example: <https://api.github.com/repos/<repository_owner>/<repository_name>>)    
    
> GitHub personal token. If you use a fine-grained personal access token, you need the > following permissions access:    
    
- `Repository Permissions > Contents: Read and write`    
    
- `Repository Permissions > Metadata: Read-only (should be auto-selected after selecting Contents permission)`    
  
---  
    
# [Detect Intent](https://cloud.google.com/dotnet/docs/reference/Google.Cloud.Dialogflow.Cx.V3/latest/Google.Cloud.Dialogflow.Cx.V3.SessionsClient#Google_Cloud_Dialogflow_Cx_V3_SessionsClient_DetectIntent_Google_Cloud_Dialogflow_Cx_V3_DetectIntentRequest_Google_Api_Gax_Grpc_CallSettings_)    
    
> You can use [APIs or Client Libraries](https://cloud.google.com/dialogflow/cx/docs/reference) to set the queryParams.parameters and queryParams.currentPage in the detectIntent method.    
    
## Detect Intent Request    
    
```json    
{    
  "queryInput": {    
    "text": {    
      "text": "test"    
    },    
    "languageCode": "en"    
  }    
}    
```    
    
### trigger intent    
    
```json    
{    
  "queryInput": {    
    "languageCode": "en",    
    "intent": {    
      "intent": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea"    
    }    
  },    
  "queryParams": {    
    "timeZone": "America/Los_Angeles"    
  }    
}    
```    
    
### trigger event    
    
```json    
{    
  "queryInput": {    
    "event": {    
      "event": "custom-event"    
      // custom event to be triggered    
    },    
    "languageCode": "en"    
  },    
  "queryParams": {    
    "timeZone": "America/Los_Angeles"    
  }    
}    
```    
    
### Set params and current page    
    
> Here’s a sample reference using [REST API](https://cloud.google.com/dialogflow/cx/docs/reference/rest) to set    
> the [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/QueryParameters) of    
> the [detectIntent](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/projects.locations.agents.environments.sessions/detectIntent#request-body) method request body:    
    
```json    
{    
  "queryParams": {    
    "parameters": {    
      "param1": {    
        "value": "sample1"    
      },    
      "currentPage": "projects/<Project ID>/locations/<Location ID>/agents/<Agent ID>/flows/<Flow ID>/pages/<Page ID>"    
    }    
  }    
}    
```    
    
## [Detect Intent Response](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/DetectIntentResponse)    
    
```json    
{    
  "responseId": "bda416d2-134c-4bbb-a0a1-37820eb0257e",    
  "queryResult": {    
    "text": "test",    
    "languageCode": "en",    
    "parameters": {    
      "session-id": "a57d22-fbe-afb-ee4-69a8f62b3",    
      "session-url": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/environments/ec5f3114-e5d6-497f-bf92-53723c698230/sessions/a57d22-fbe-afb-ee4-69a8f62b3"    
    },    
    "responseMessages": [    
      {    
        "text": {    
          "text": [    
            "When you test me that helps my developers improve my performance."    
          ],    
          "allowPlaybackInterruption": true    
        }    
      },    
      {}    
    ],    
    "currentPage": {    
      "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/flows/00000000-0000-0000-0000-000000000000/pages/START_PAGE",    
      "displayName": "Start Page"    
    },    
    "intent": {    
      "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/3a13ea29-83bd-4131-9144-2f511b42fcc2",    
      "displayName": "small_talk.user.testing_agent"    
    },    
    "intentDetectionConfidence": 1,    
    "diagnosticInfo": {    
      "Transition Targets Chain": [    
        {    
          "TargetFlow": "7bf60f85-19fe-48bd-ac27-2b5db2cde4de"    
        },    
        {    
          "TargetPage": "END_FLOW"    
        }    
      ],    
      "Session Id": "a57d22-fbe-afb-ee4-69a8f62b3",    
      "Triggered Transition Names": [    
        "807b27e2-59da-4a37-8b1c-c7d109cb816f",    
        "807b27e2-59da-4a37-8b1c-c7d109cb816f"    
      ],    
      "Execution Sequence": [],    
      "Alternative Matched Intents": [    
        {    
          "Active": true,    
          "Id": "3a13ea29-83bd-4131-9144-2f511b42fcc2",    
          "Type": "NLU",    
          "Score": 1,    
          "DisplayName": "small_talk.user.testing_agent"    
        }    
      ]    
    },    
    "match": {    
      "intent": {    
        "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/3a13ea29-83bd-4131-9144-2f511b42fcc2",    
        "displayName": "small_talk.user.testing_agent"    
      },    
      "resolvedInput": "test",    
      "matchType": "INTENT",    
      "confidence": 1    
    }    
  },    
  "responseType": "FINAL"    
}    
```    
    
---  
    
# [Match Intent](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3beta1/projects.locations.agents.sessions/matchIntent?apix_params=%7B%22session%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fsessions%2Fcd205a-958-7fc-5d5-0824cd93b%22%2C%22resource%22%3A%7B%22queryInput%22%3A%7B%22languageCode%22%3A%22en%22%2C%22intent%22%3A%7B%22intent%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fintents%2F335ebd4c-bb93-4ed1-bd4c-610789dbb7ea%22%7D%7D%2C%22queryParams%22%3A%7B%22timeZone%22%3A%22America%2FLos_Angeles%22%7D%7D%7D&apix=true)    
    
## Request Body    
    
```json    
{    
  "queryInput": {    
    "languageCode": "en",    
    "intent": {    
      "intent": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea"    
    }    
  },    
  "queryParams": {    
    "timeZone": "America/Los_Angeles"    
  }    
}    
```    
    
## Response Body    
    
```json    
{    
  "triggerIntent": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea",    
  "matches": [    
    {    
      "intent": {    
        "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea",    
        "displayName": "additional-feedback"    
      },    
      "matchType": "DIRECT_INTENT",    
      "confidence": 1    
    }    
  ],    
  "currentPage": {    
    "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/flows/798f5699-958d-4fb2-abd5-2f16837b059f/pages/20f79bd5-019d-4f07-a64e-e6740122b731",    
    "displayName": "additional-feedback"    
  }    
}    
```    
    
---  
    
# [Fulfill Intent](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3beta1/projects.locations.agents.sessions/fulfillIntent?apix_params=%7B%22session%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fsessions%2Fcd205a-958-7fc-5d5-0824cd93b%22%2C%22resource%22%3A%7B%22matchIntentRequest%22%3A%7B%22session%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fsessions%2Fcd205a-958-7fc-5d5-0824cd93b%22%2C%22queryInput%22%3A%7B%22languageCode%22%3A%22en%22%2C%22intent%22%3A%7B%22intent%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fintents%2F335ebd4c-bb93-4ed1-bd4c-610789dbb7ea%22%7D%7D%2C%22persistParameterChanges%22%3Atrue%7D%2C%22match%22%3A%7B%22intent%22%3A%7B%22name%22%3A%22projects%2Fvcu-virtual-assistant-bot%2Flocations%2Fglobal%2Fagents%2F8ec51540-2933-43d6-aad5-355545059bfe%2Fintents%2F335ebd4c-bb93-4ed1-bd4c-610789dbb7ea%22%2C%22displayName%22%3A%22additional-feedback%22%7D%2C%22matchType%22%3A%22DIRECT_INTENT%22%2C%22confidence%22%3A1%7D%7D%7D&apix=true)    
    
## Request Body    
    
```json    
{    
  "matchIntentRequest": {    
    "session": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/sessions/cd205a-958-7fc-5d5-0824cd93b",    
    "queryInput": {    
      "languageCode": "en",    
      "intent": {    
        "intent": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea"    
      }    
    },    
    "persistParameterChanges": true    
  },    
  "match": {    
    "intent": {    
      "name": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/335ebd4c-bb93-4ed1-bd4c-610789dbb7ea",    
      "displayName": "additional-feedback"    
    },    
    "matchType": "DIRECT_INTENT",    
    "confidence": 1    
  }    
}    
```    
    
## Response Body    
    
```json    
{    
  "responseId": string,    
  "queryResult": {    
    object    
    (QueryResult)    
  },    
  "outputAudio": string,    
  "outputAudioConfig": {    
    object    
    (OutputAudioConfig)    
  }    
}    
```    
    
---  
    
# [Webhooks](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/WebhookRequest)    
    
## [Request](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3beta1#webhookrequest)    
    
```json    
{    
  "detectIntentResponseId": "e8379fe3-5090-44be-8df4-a064b5ebb3dc",    
  "intentInfo": {    
    "lastMatchedIntent": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/intents/00000000-0000-0000-0000-000000000000",    
    "displayName": "Default Welcome Intent",    
    "confidence": 1.0    
  },    
  "pageInfo": {    
    "currentPage": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/flows/00000000-0000-0000-0000-000000000000/pages/START_PAGE",    
    "displayName": "Start Page"    
  },    
  "sessionInfo": {    
    "session": "projects/vcu-virtual-assistant-bot/locations/global/agents/8ec51540-2933-43d6-aad5-355545059bfe/sessions/40e94b-779-70d-a9f-3e08ab3fe",    
    "parameters": {    
      "name": "ziggy fresh"    
    }    
  },    
  "fulfillmentInfo": {    
    "tag": "comm100-customfields"    
  },    
  "messages": [    
    {    
      "text": {    
        "text": [    
          "Greetings! How can I assist?"    
        ],    
        "redactedText": [    
          "Greetings! How can I assist?"    
        ]    
      },    
      "responseType": "HANDLER_PROMPT",    
      "source": "VIRTUAL_AGENT"    
    }    
  ],    
  "text": "hello",    
  "languageCode": "en"    
}    
```    
    
## dialog flow simple request body    
    
```json    
{    
  "sessionInfo": {    
    "parameters": {    
      "item": "tshirt"    
    }    
  },    
  "fulfillmentInfo": {    
    "tag": "confirm"    
  }    
}    
```    
    
## post request    
    
`curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "x-goog-user-project: dialogflow-378918" -H "Content-Type: application/json; charset=utf-8" -d '{"queryInput": {"event": {"event": "custom-event"},"languageCode": "en"}, "queryParams": {"timeZone": "America/Los_Angeles"}}' "https://us-central1-dialogflow.googleapis.com/v3/projects/dialogflow-378918/locations/us-central1/agents/340fe3aa-6e96-4ac3-b61b-00c79bd55733/sessions/1ca764-0e7-a39-581-11093b511 :detectIntent"`    
    
---  
    
## [Response Body](https://cloud.google.com/dialogflow/cx/docs/concept/webhook#webhook-response)    
    
- [webhookresponse RPC](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#webhookresponse)    
- [fullfillment response REST](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/Fulfillment#responsemessage)    
    
- [Response Body REST](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3/WebhookResponse)    
    
```json    
{    
  "fulfillmentResponse": {    
    "mergeBehavior": null,    
    "messages": [    
      {    
        "text": {    
          "text": [    
            "This is a sample response."    
          ]    
        }    
      }    
    ],    
    "ETag": null    
  },    
  "pageInfo": null,    
  "payload": null,    
  "sessionInfo": {    
    "parameters": {    
      "security-code": "jj444"    
    },    
    "session": null,    
    "ETag": null    
  },    
  "targetFlow": null,    
  "targetPage": null,    
  "ETag": null    
}    
```    
    
### custom Webhook with rich text and chips    
    
```json    
{    
  "fulfillment_response": {    
    "messages": [    
      {    
        "text": {    
          "text": [    
            "Please select anyone"    
          ]    
        },    
        "payload": {    
          "richContent": [    
            [    
              {    
                "type": "chips",    
                "options": [    
                  {    
                    "text": "Chip 1",    
                    "image": {    
                      "src": {    
                        "rawUrl": "https://example.com/images/logo.png"    
                      }    
                    },    
                    "link": "https://example.com"    
                  },    
                  {    
                    "text": "Chip 2",    
                    "image": {    
                      "src": {    
                        "rawUrl": "https://example.com/images/logo.png"    
                      }    
                    },    
                    "link": "https://example.com"    
                  }    
                ]    
              }    
            ]    
          ]    
        }    
      }    
    ]    
  }    
}    
```    
    
### - rich text custom buttons    
    
```json    
{    
  "richContent": [    
    [    
      {    
        "type": "button",    
        "icon": {    
          "type": "chevron_right",    
          "color": "#FF9800"    
        },    
        "text": "Button text",    
        "link": "https://yoursite.org",    
        "event": {    
          "name": "",    
          "languageCode": "en",    
          "parameters": {}    
        }    
      }    
    ]    
  ]    
}    
```    
    
#### In the webhookResponse    
    
> you can set the fulfillment_response and target_page fields to send a fulfillment response as well as transition to another page respectively. Here’s an example below:    
    
##### Here are possible ways to continue/resume a conversation by passing previously collected customer data from a previous conversation into a new conversation    
    
You can create a custom implementation using a [webhook](https://cloud.google.com/dialogflow/cx/docs/concept/webhook) wherein a function will store    
the [parameter](https://cloud.google.com/dialogflow/cx/docs/basics#parm) and [forms](https://cloud.google.com/dialogflow/cx/docs/basics#form) you collected and use that to continue the chat from where    
the user left off during a conversation flow or a [session](https://cloud.google.com/dialogflow/cx/docs/concept/session). In    
the [webhookResponse](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#webhookresponse) you can set the fulfillment_response, target_page fields and session_info    
field to update and send back the stored parameters you collected from the previous conversation.    
    
> Here’s an example of how to pass the session parameter, target page and fulfillment response from your webhook response:    
    
```json    
{    
  "sessionInfo": {    
    "parameters": {    
      "param1": {    
        "value": "sample1"    
      }    
    }    
  },    
  "targetPage": "projects / <Project ID>/locations/<Location ID>/agents/<Agent ID>/flows/<Flow ID>/pages/<Page ID>",    
  "fulfillment_response": {    
    "messages": [    
      {    
        "text": [    
          "This is where you left"    
        ]    
      }    
    ]    
  }    
}    
```    
    
---  
    
### Custom Web Hooks    
    
#### Resources    
    
##### bot for front end calls i used    
    
> projects/dialogflow-378918/locations/global/agents/069075ae-67c3-4223-88cc-137335336001    
    
##### bot for backend/function/cli calls i used    
    
> projects/dialogflow-378918/locations/global/agents/6b645750-50d1-42bc-be58-cc8489cc2f24    
    
##### format for detectintent with session id    
    
`projects/<Project ID>/locations/<Location ID>/agents/<AgentID>/sessions/<Session ID>`    
    
- ex.    
  `projects/dialogflow-378918/locations/global/agents/ab41f453-1740-49c5-b352-9f8017868355/sessions/dfMessenger-71737901`    
    
# [WELCOME intent/ Default start call intent](https://cloud.google.com/dialogflow/cx/docs/concept/intent#welcome)    
    
- format    
  `projects/<PROJECT_ID>/locations/<LOCATION_ID>/agents/<AGENT_ID>/intents/00000000-0000-0000-0000-000000000000`    
    
- ex.    
  `projects/dialogflow-378918/locations/global/agents/069075ae-67c3-4223-88cc-137335336001/intents/00000000-0000-0000-0000-000000000000`    
  
---  
    
#### CLI    
    
##### [test in API Console](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3beta1/projects.locations.agents.sessions/detectIntent?hl=en&apix=true&apix_params=%7B%22session%22%3A%22projects%2Fdialogflow-378918%2Flocations%2Fglobal%2Fagents%2F6b645750-50d1-42bc-be58-cc8489cc2f24%2Fsessions%2Fthis_is_a_session_id_123456%22%2C%22resource%22%3A%7B%22queryInput%22%3A%7B%22intent%22%3A%7B%22intent%22%3A%22projects%2Fdialogflow-378918%2Flocations%2Fglobal%2Fagents%2F069075ae-67c3-4223-88cc-137335336001%2Fintents%2F00000000-0000-0000-0000-000000000000%22%7D%2C%22languageCode%22%3A%22en%22%7D%2C%22queryParams%22%3A%7B%22timeZone%22%3A%22America%2FLos_Angeles%22%7D%7D%7D)    
    
- fyi    
  > use [OAuthPlayground](https://developers.google.com/oauthplayground/)    
  > to get ACCESS TOKEN to test    
  >    
  > > need access token to test, but can set up function to have 0Auth already but using a service account or your own    
    
##### curl call , with body to trigger event    
    
```shell    
curl -m 70 -X POST <https://global-dialogflow.googleapis.com/v3/projects/dialogflow-378918/locations/global/agents/069075ae-67c3-4223-88cc-137335336001/sessions/this_is_a_session_id_123456:detectIntent> --header 'Authorization: Bearer ya29.a0Ael9sCM7Gfk0D95ta0FAr2CR_fMUk1mjyY9RHHOp-KR7xAMR5AjP1p9XNvFrkKhyPjrzfa_Il0YdOcNPCDhtCzLODrgzIEqXR_YyW_FkQWYm8VYTHA2jHD49UMuqyh1WBqdZUe3ukkbwKTpQiIHb2AVc8h4TaCgYKASASARMSFQF4udJh_4KVLgiUV5Gcufk4KcK_WQ0163' --header 'Accept: application/json' --header 'Content-Type: application/json'  --data '{"query_input":{"event":{"event":"initiate-bot-event"},"language_code":"en"},"queryParams":{"time_zone":"America/Los_Angeles"}}' --compressed    
```    
    
##### curl, call to trigger "WELCOME" event , or default start card    
    
```shell    
curl -m 70 -X POST <https://global-dialogflow.googleapis.com/v3/projects/dialogflow-378918/locations/global/agents/069075ae-67c3-4223-88cc-137335336001/sessions/this_is_a_session_id_123456:detectIntent> --header 'Authorization: Bearer ya29.a0Ael9sCM7Gfk0D95ta0FAr2CR_fMUk1mjyY9RHHOp-KR7xAMR5AjP1p9XNvFrkKhyPjrzfa_Il0YdOcNPCDhtCzLODrgzIEqXR_YyW_FkQWYm8VYTHA2jHD49UMuqyh1WBqdZUe3ukkbwKTpQiIHb2AVc8h4TaCgYKASASARMSFQF4udJh_4KVLgiUV5Gcufk4KcK_WQ0163' --header 'Accept: application/json' --header 'Content-Type: application/json' --data '{"queryInput":{"intent":{"intent":"projects/dialogflow-378918/locations/global/agents/069075ae-67c3-4223-88cc-137335336001/intents/00000000-0000-0000-0000-000000000000"},"languageCode":"en"},"queryParams":{"timeZone":"America/Los_Angeles"}}' --compressed    
```    
    
---  
    
# Events    
    
## [EventHandler](https://cloud.google.com/dialogflow/cx/docs/reference/rest/v3beta1/EventHandler?hl=en)    
    
## [EventInput](https://cloud.google.com/dialogflow/es/docs/reference/rest/v2beta1/EventInput)    
    
---  
    
# Agent Handoff    
    
Select Live agent handoff from the Add dialogue option dropdown.    
    
Add dialogue option dropdown menu    
    
This will result in an area to provide a custom JSON message.    
    
Live agent handoff text field    
    
Every target live agent system is different. Refer to the system's documentation as to what message format will be necessary to add to provide the proper communication parameters.    
    
As an example, if you're using [Business Messages](https://developers.google.com/business-communications/business-messages), the format that you'd enter here would look something like this:    
    
{    
"userStatus": {    
"requestedLiveAgent": true    
}    
}    
Copied!    
Please check the Business Messages documentation for the precise JSON message.    
    
For more information on Business Messages live agent handoff formats,    
see [Handoff from bot to live agent](https://developers.google.com/business-communications/business-messages/guides/how-to/message/conversations/bot-live-agent-handoff?hl=en).    
    
---  
    
# Agent Responses    
    
## [Custom Payload](https://developers.google.com/assistant/df-asdk/rich-responses)    
    
## [DialogFlow CX Doc](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#suggestion_chip_response_type)    
    
---  
    
# Testing    
    
## Select All Test checkboxes for Environment settings    
    
```javascript    
for (let e of document.querySelectorAll("mat-option")) {    
    e.click();    
}    
```    
    
# PostMan    
    
## Setup oauth2 DialogFlow example    
    
> Download and launch [Postman](https://www.postman.com/).    
    
**Generate an OAuth 2.0 token**    
    
1. From the GCP console (APIs & Services -> Library), ensure that the **Dialogflow API** is enabled    
2. Create an OAuth 2.0 client ID    
    * From the GCP console (API & Services -> OAuth consent screen)    
        * Add “_getpostman.com_” to the Authorized domains. Click Save.    
    * From the GCP console (API & Services -> Credentials)    
        * Select _+Create Credentials_ -> OAuth client ID and choose Application type ‘_Web application_’.    
            * Name: '**getpostman**'    
            * Authorized redirect URIs: **<code>https://www.getpostman.com/oauth2/callback</code></strong>    
    * Copy the generated <em>Client ID</em> and <em>Client secret</em> fields for later use    
3. From Postman, create a new Request and select the “<em>Authorization</em>” tab and choose Type "<em>OAuth 2.0</em>". Click '<em>Get New Access Token</em>'.    
    * Fill the GET NEW ACCESS TOKEN form as follows:    
    * Token Name: '<strong>Google OAuth getpostman</strong>'    
    * Grant Type: '<strong>Authorization Code</strong>'    
    * Callback URL: <strong><code>https://www.getpostman.com/oauth2/callback</code></strong>    
    * Auth URL: <strong><code>https://accounts.google.com/o/oauth2/auth</code></strong>    
    * Access Token URL: <strong><code>https://accounts.google.com/o/oauth2/token</code></strong>    
    * Client ID: generated in the Step 2 (e.g., '<em>111111111111-aaaaaaaaaaa1234546789blablabl12.apps.googleusercontent.com</em>')    
    * Client Secret: generated in the Step 2 (e.g., '<em>ABRACADABRAus1AAAAvq9R-A</em>')    
    * Scope: <strong>https://www.googleapis.com/auth/dialogflow</strong>    
    * State: Leave empty    
    * Client Authentication: "<em>Send as Basic Auth header</em>"    
    * Click '<em>Request Token</em>' and '<em>Use Token</em>'    
    
<strong>Send GET request to Dialogflow API</strong>    
    
1. See the Dialogflow API Rest [reference](https://cloud.google.com/dialogflow/priv/docs/reference/rest/v2-overview) for the full list of APIs you can query.    
2. From Postman, enter the API you want to query in the GET field. In this example, we want to get a list of all the Intents for this Dialogflow Agent.  _Be sure to replace this Project ID    
   ‘ai-assisted-student’ with your Project ID._    
    
![alt_text](images/postman-get-request.png "image_tooltip")    
    
3. Click the “Send” button. You should see the query results in the Response Body:    
    
![alt_text](images/postman-get-response.png "image_tooltip")    
    
**Send POST request to Dialogflow API**    
    
1. Now let’s try a POST request. For this example, we want to use the detectIntent API by providing a query text in our request of what our intention is and the agent will “detect” our intention by    
   matching one of our agent Intents.    
2. From the drop down, change the request type to “POST” and enter the appropriate HTTP request.   **Do not click the “Send” button just yet.**  _Be sure to replace this Project ID    
   ‘ai-assisted-student’ with your Project ID._    
    
![alt_text](images/postman-post-request.png "image_tooltip")    
    
3. Now we want to include a JSON payload with our query text as input_._  Under the POST field, select “Body->raw->Text” and from the drop down, choose “JSON”.    
4. Enter the appropriate JSON payload details from the Dialogflow API documentation (see this [example](https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput)).    
    
![alt_text](images/postman-post-body.png "image_tooltip")    
    
5. Now click the “Send” button. In the response body, you should see that your query input (in this example, “is the cafe open”), is matched with the appropriate Intent and the fulfillment text    
   response provides our agent answer to the question.    
    
![alt_text](images/postman-post-response.png "image_tooltip")    
    
---  
    
# Quick Notes/References    
    
- [Prebuilt Agents](https://dialogflow.cloud.google.com/cx/projects/dialogflow-378918/locations/us-central1/agents/96cc3d6a-66e6-4fb2-a065-4b1132fd905a/prebuilt)    
- [Console/Shell in Browser](https://shell.cloud.google.com/?hl=en_US&fromcloudshell=true&show=terminal)    
- [Customizable chat Dialog and Facebook integration](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#suggestion_chip_response_type?utm_source=codelabs&utm_medium=et&utm_campaign=CDR_lee_aiml_leedialogflowlabs_cx_&utm_content=-)    
- [internationalization (I18N)](https://cloud.google.com/dialogflow/cx/docs/concept/agent-multilingual)    
    - [Language References](https://cloud.google.com/dialogflow/cx/docs/reference/language)