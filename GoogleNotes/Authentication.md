# [Authentication](https://cloud.google.com/docs/authentication)

> [Use Cases](https://cloud.google.com/docs/authentication/use-cases)

# TidBits

When you use client libraries, you use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials) to authenticate. For information about
setting up ADC, see [Provide credentials for Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc). For information about using ADC with client
libraries, see [Authenticate using client libraries](https://cloud.google.com/docs/authentication/client-libraries).

ADC searches for credentials in the following locations:

[GOOGLE_APPLICATION_CREDENTIALS environment variable](https://cloud.google.com/docs/authentication/application-default-credentials#GAC)

[User credentials set up with the Google Cloud CLI](https://cloud.google.com/docs/authentication/application-default-credentials#personal)

[The attached service account, as provided by the metadata server](https://cloud.google.com/docs/authentication/application-default-credentials#attached-sa)

[Guide On Authenticating](https://cloud.google.com/docs/authentication)

# Types of authentication

Authentication is required to access most resources and applications. This documentation supports technical practitioners creating application code with one of the following goals:

[Authenticate to Google services and resources](https://cloud.google.com/docs/authentication/use-cases#google-apis)

[Authenticate to applications and functions hosted on Google Cloud services like Cloud Run and Cloud Functions](https://cloud.google.com/docs/authentication/use-cases#run-functions)

[Authenticate end users to the application](https://cloud.google.com/docs/authentication/use-cases#app-users)
It is possible to route and store logs elsewhere

[Triggers a function based on Cloud Logging entries.](https://cloud.google.com/functions/docs/samples/functions-log-stackdriver?hl=en#functions_log_stackdriver-java)

***


> To authenticate for REST command line calls, you use the gcloud CLI. The [gcloud auth login]
> (https://cloud.google.com/sdk/gcloud/reference/auth/login) command logs you in to gcloud with your user account, which should be done before > calling the API.
> The [gcloud auth print-access-token](https://cloud.google.com/sdk/gcloud/reference/auth/print-access-token) command is used > throughout the REST command line samples in this documentation to
> authenticate REST calls.

> list service accounts

```
gcloud iam service-accounts keys list \
    --iam-account=dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com
```

> get service account key

```bash
gcloud beta iam service-accounts keys get-public-key 37bfcecd9e659f3b8534748ccc8d1536a84a77e1 \
    --iam-account=dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com --output-file=FILENAME
```

### Client library user account authentication

To authenticate for client library calls, you use the gcloud CLI. The [gcloud auth application-default login](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login) command logs
you in to gcloud for application default credentials with your user account, which should be done before calling the API.
The [gcloud auth application-default set-quota-project](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/set-quota-project) command must be used to set your project for billing
and quotas related to API calls. Normally, this is the same project used by your agent, and you supply the project ID for the project you created in steps above.

The ```GOOGLE_APPLICATION_CREDENTIALS``` environment variable must not be set in order for your application default credentials to be used by client libraries.

- To create application default credentials for your local environment:

```
gcloud auth application-default login
gcloud auth application-default set-quota-project PROJECT_ID
```

## [Service Account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#iam-service-account-keys-create-gcloud)

To open a terminal, click Terminal > New Terminal.

Create a service account to authenticate your API requests:

Execute the [gcloud iam service-accounts keys create](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/create) command to create service account keys.

Replace the following values:

KEY_FILE: The path to a new output file for the private key—for example, ~/sa-private-key.json.
SA_NAME: The name of the service account to create a key for.
PROJECT_ID: Your Google Cloud project ID.

```
gcloud iam service-accounts keys create ~/gcp/dialogflowkeyfile \
    --iam-account=dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com
```

Output:

```
created key [e44da1202f82f8f4bdd9d92bc412d1d8a837fa83] of type [json] as
[/usr/home/username/~/gcp/dialogflowkeyfile] for
[dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com]
```

> The service account key file is now downloaded to your machine. After you download the key file, you cannot download it again.

> The downloaded key has the following format, where PRIVATE_KEY is the private portion of the public/private key pair:

```json

{
  "type": "service_account",
  "project_id": "dialogflow-378918",
  "private_key_id": "f56f2e232e4ccea7d9e485b3b9023223f7ad9de0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrbTXHVdz1Mxaa\nKDVnj8N6CCI0AycHGj3vC/kAWe5qm3ytIH2GFBKfFKLNS1Eunvfy/pdb8pqazzmp\nNfTfswpd0EhM2lVSvejAtl9JEzko9Qm1zNTZ+DuddyNpp0/Dq+SkMbpej6AylacA\nn0hbxlJkGAd5CdRwElsh1gz75W0hZS8xkpC7gC/Q7IfQ9b/JIU5kElFL+hvMd6Bl\nPwuCoXcK8sLue1Vje+8C68JroGKy5QtS1aDNgmnbismTRK8xe4nVbyqnNJkAzKTV\njvmdfKT88aeawWkokxdxYnP6OWgoBOv3EXUvEXxYpFIPyQuBC/kuAyq1lPVY3MDz\n+MfAIjDFAgMBAAECggEAAKdU8w1LUSqyJXpUqOj8MwwkObCLnBs2SXcqHDnmOZqB\nD4d9L3uUxwpIjDARcUmCjaGj/lPe0Xz2WIthkYk8Ov6tUMlCHOrDysPgJHf3S7fn\n6iDEl3Jlo1m8Kn++Q1bZOnIoUTUY/WMNzdnNoSlJpgaAGMtGPt6001yJPwbb7DjH\nujMUz+ZxHY/hyIuw8Au9zCAzpE7+Z9O9N0S7RbwLBUxdWLZNny7CjiPbcggf0FSY\nsmsHsy92R3wAM+HBoZEK3JXffkV3sDd/chrR05/4Ohk6G3A91i0MMxaN0wjkwJqK\nKnrUuG+ku7r77SmrLKU+0HnhB7ljhWnAkDibwrzgjQKBgQDSH8BStpeLefyryUBl\nvFL/gcNlj/F+HQ33f7oRgKfwK7bRrPbQtmpnxPafk13/Fta32k1HqdGgNbp+eDk1\nosrCWOqHppPEA7K/2Z21QGgT3/M3nAs5sqy9uydU8eoiBRCnN3jeiU0094EBDK3r\nU8Xo5Rsuv6FXulpcvvgghgepuwKBgQDQ2pU35DUeXA/VN7aQY02ATsmjYtL0Q7Ja\nHpnvoI5S2B+fG2cJPmCuC8rC4ywfh5oUR/raOkpSS/GfzOL+3G2jGd+BRnH52dnt\nW/gqwIwf5eQo96N2oYA0AmgsUP5VG5j8j61xCcpdpfO/DCv35rmyjEPk6yoAgukW\nt52HABSnfwKBgGTv77lMETxlGyWChbbZYp1uvmh5Xy6P0nfEGaPyw7mxph7PEblt\nB2xVx4schZjWZcrnyRvVzedCKBY8tm63huMZR4BmWrFcfW9/oCzDhbuWZwWdph7P\nX/+8ecZqd2hkOn25PgzYtAfvpT7V0m4rTfT0qbwpPd4gnOvUqOkmuWOlAoGBALCx\nTG61pe7iag60DMMJECdOAK82y0wV/czaeNdPGTmjWNVN5JTgbgCxP0Az2z9thIBG\nCUcY64nGcEwGlcCSkjrbh8ih5YlAsmtqVIEu1x2ha67xGx0hMwpNQv7DIviz2XFK\nyKyKYOdrn9Rwor4fN9mDa2k/PxChsDsk6qOtAMxXAoGBAIV3N2nCe6oe/dWnvcbE\nH7wP9kkvapJb0sxtXPJkxM45GNZfHbitKA/taHIyfRMF0xBDMEbSG27XsKnabBTd\nk5RrR2Bm2fJJChNP/QZnazWrThhBxo5goI9+CI4XvBmMgXkzJ06zAtZp1X0nrs/j\ncGtTVbjCv+BE9UdD7nxh1ElR\n-----END PRIVATE KEY-----\n",
  "client_email": "dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com",
  "client_id": "105910646192605060829",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflowserviceaccount%40dialogflow-378918.iam.gserviceaccount.com"
}


```

Make sure to store the key file securely, because it can be used to authenticate as your service account. You can move and rename this file however you would like.

#### You can use service account key files to [authenticate an application as a service account](https://cloud.google.com/docs/authentication/production).

#### or

```
gcloud iam service-accounts create \
dialogflowserviceaccount \
--project dialogflow-378918
```

> Replace the following values:

```SERVICE_ACCOUNT_ID: the service account ID```
```PROJECT_ID: the project ID```

> To find these IDs, in Google Cloud, click the Navigation menu at the top-left of the screen, hold your pointer over IAM & Admin and click Service Accounts.

The Email column shows the unique SERVICE_ACCOUNT_ID and PROJECT_ID for each of your service accounts in the following format:

```SERVICE_ACCOUNT_ID@PROJECT_ID.iam.gserviceaccount.com```

For example: A service account email address of ```my-service-account@my-project.iam.gserviceaccount.com``` has the following values:

```SERVICE_ACCOUNT_ID: my-service-account```
```PROJECT_ID: my-project```

Grant your service account the appropriate role. The following sample command grants the Cloud Translation API User role. To determine the role to grant, see the documentation for the Cloud API you're
using.

```
gcloud projects \
add-iam-policy-binding \
dialogflow-378918 \
--member='serviceAccount:dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com' \
--role='roles/cloudtranslate.user'
```

Create a service account key:

```
gcloud iam service-accounts keys \
create key.json --iam-account \
dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com
```

Set the key as your default credentials:

```
export \
 GOOGLE_APPLICATION_CREDENTIALS=key.json

```

Optional: To permit users to [impersonate the service account](https://cloud.google.com/iam/docs/impersonating-service-accounts), run the ```gcloud iam service-accounts add-iam-policy-binding```
command to grant a user the Service Account User role (roles/iam.serviceAccountUser) on the service account:

```
gcloud iam service-accounts add-iam-policy-binding \
    dialogflowserviceaccount@dialogflow-378918.iam.gserviceaccount.com \
    --member="user:14paxton@gmail.com" \
    --role="roles/iam.serviceAccountUser"
Replace the following values:
```

> USER_EMAIL: the email address for the user

> [Auth with Service Account File](https://cloud.google.com/sdk/docs/authorizing#authorize_with_a_service_account)

```bash
gcloud auth login --cred-file=/Users/bp/gcp/dialogflowkeyfile;              
```

# [Authenticating](https://cloud.google.com/code/docs/vscode/client-libraries#setting_up_authentication)

`google-cloud-java` uses
[https://github.com/googleapis/google-auth-library-java](https://github.com/googleapis/google-auth-library-java)
to authenticate requests. `google-auth-library-java` supports a wide range of authentication types;
see the project's [README](https://github.com/google/google-auth-library-java/blob/main/README.md)
and [javadoc](https://cloud.google.com/java/docs/reference/google-auth-library/latest/overview) for more
details.

### Google Cloud Platform environment

When using Google Cloud libraries from a Google Cloud Platform environment such as Compute Engine,
Kubernetes Engine, or App Engine, no additional authentication steps are necessary.

For example:

```java
Storage storage=StorageOptions.getDefaultInstance().getService();
```

or:

```java
CloudTasksClient cloudTasksClient=CloudTasksClient.create();
```

### Other environments

#### Using a service account (recommended)

1. [Generate a JSON service account key](https://cloud.google.com/storage/docs/authentication?hl=en#service_accounts).

2. After downloading that key, you must do one of the following:
    * Define the environment variable GOOGLE_APPLICATION_CREDENTIALS to be the location of the key.
      For example:
    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS=/path/to/my/key.json
    ```
    * Supply the JSON credentials file when building the service options. For example, this Storage
      object has the necessary permissions to interact with your Google Cloud Storage data:
    ```java
    Storage storage = StorageOptions.newBuilder()
        .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream("/path/to/my/key.json")))
        .build()
        .getService();
    ```

#### Local development/testing

If running locally for development/testing, you can use the [Google Cloud SDK](https://cloud.google.com/sdk/).
Create Application Default Credentials with `gcloud auth application-default login`, and then
`google-cloud` will automatically detect such credentials.

#### Existing OAuth2 access token

If you already have an OAuth2 access token, you can use it to authenticate (notice that in this case, the
access token will not be automatically refreshed):

```java
Credentials credentials=GoogleCredentials.create(new AccessToken(accessToken,expirationTime));
        Storage storage=StorageOptions.newBuilder()
        .setCredentials(credentials)
        .build()
        .getService();
```

or:

```java
Credentials credentials=GoogleCredentials.create(new AccessToken(accessToken,expirationTime));
        CloudTasksSettings cloudTasksSettings=CloudTasksSettings.newBuilder()
        .setCredentialProvider(FixedCredentialsProvider.create(credentials))
        .build();
        CloudTasksClient cloudTasksClient=CloudTasksClient.create(cloudTasksSettings);
```

### Application Default Credentials

If no credentials are provided, `google-cloud` will attempt to detect them from the environment
using `GoogleCredentials.getApplicationDefault()` which will search for Application Default
Credentials in the following locations (in order):

1. The credentials file pointed to by the `GOOGLE_APPLICATION_CREDENTIALS` environment variable
2. Credentials provided by the Google Cloud SDK `gcloud auth application-default login` command
3. Google App Engine built-in credentials
4. Google Cloud Shell built-in credentials
5. Google Compute Engine built-in credentials

### Use [gsutil](https://cloud.google.com/storage/docs/gsutil/commands/config) to create credential file

### get/create user access key and secret

1) navigate to [storage settings](https://console.cloud.google.com/storage/settings;tab=interoperability?project=vcu-virtual-assistant-bot)
2) under "INTEROPERABILITY" tab
3) User account HMAC -> Access keys for your user account

### [Credentials, access, security, and identity](https://support.google.com/googleapi/answer/6158857?hl=en)

## [ADC - Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials#GAC)

 ***

## [Google Identity](https://developers.google.com/identity)

## [Authorize With Service Account](https://developers.google.com/identity/protocols/oauth2/service-account)

***

## .NET

### [Authorize With Service Account .NET](https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth#service-account)

### [.Net OAuth Client Libraries](https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth)

***

## [Setting up OAuth2](https://support.google.com/cloud/answer/6158849)

***

## Examples

- https://github.com/LindaLawton/Daimto.GoogleApis.Templates/blob/master/src/DaimtoTools.GAV4AspNetMvc.ServiceAccount/SeviceAccount.cs
- https://github.com/LindaLawton/Google-Dotnet-Samples/blob/master/Samples/Google%20OAuth2%20API/v2/Oauth2Authentication.cs
- https://github.com/googlearchive/google-api-dotnet-client-samples/blob/master/Tasks.SimpleOAuth2/Program.cs
