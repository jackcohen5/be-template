# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup AWS

1. Create a new AWS organization with 3 accounts; one for development, staging, and production.

2. Clone the [infrastructure template](https://github.com/jackcohen5/infrastructure-template) and deploy it using credentials for each account. Make a note of the Github role ARNs created for each environment.

## Setup Github Actions

1. Create the `AWS_ROLE_TO_ASSUME_DEVELOPMENT`, `AWS_ROLE_TO_ASSUME_STAGING`, and `AWS_ROLE_TO_ASSUME_PRODUCTION` Github repository secrets matching the ARNs created in the previous step.

## Setup Firebase

1. Create a service account with a JSON private key in your Firebase project.

2. Give your service account the "Firebase Admin SDK Administrator Service Agent" role.

3. Add the service account private key as a SecureString to the SSM Parameter Store in AWS under the `/be-template/firebase/service-account-key` path

4. Update the jwtAuthorizer in the [serverless.yml](../serverless.yml) with the issuerUrl and audience of your Firebase project.

## Setup Firestore

1. Enable Firestore in your Firebase project.

2. Add the below security rule to your Firestore configuration.

```
match /users/{userId} {
    allow read, update, delete: if request.auth != null && request.auth.uid == userId;
}
```

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
