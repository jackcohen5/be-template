# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup Firebase

1. Create a service account with a JSON private key in your Firebase project.

2. Give your service account the "Firebase Admin SDK Administrator Service Agent" role.

3. Add the service account private key as a SecureString to the SSM Parameter Store in AWS under the `/be-template/firebase/service-account-key` path

4. Update the jwtAuthorizer in the [serverless.yml](../serverless.yml) with the issuerUrl and audience of your Firebase project.

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
