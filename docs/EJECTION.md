# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup Firebase

1. Create a Service Account and JSON Key in your Firebase project with the following permissions:
    - Firebase Authentication Admin
    - Service Account Token Creator
    - Firestore Service Agent (Optional, if using Firestore)

2. Add the service account key as a SecureString to the SSM Parameter Store in AWS under the `/be-template/firebase/service-account-key` path

3. Update the jwtAuthorizer in the [serverless.yml](../serverless.yml) with the issuerUrl and audience of your Firebase project.

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
