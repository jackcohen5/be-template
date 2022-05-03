# Using this template

In order to use this template, you will first need to follow the following steps.

## Setup AWS

1. Create a new AWS organization with 3 accounts; one for development/test, staging, and production.

2. Create the Github Actions identity provider and trust policy as per the [official documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

## Setup Github Actions

1. Create the `AWS_ACCOUNT_ID_TEST`, `AWS_ACCOUNT_ID_STAGING`, and `AWS_ACCOUNT_ID_PRODUCTION` Github secrets matching the account IDs created in the above step.

## Setup Firebase

1. Create a service account with a JSON private key in your Firebase project.

2. Give your service account the "Firebase Admin SDK Administrator Service Agent" role.

3. Add the service account private key as a SecureString to the SSM Parameter Store in AWS under the `/be-template/firebase/service-account-key` path

4. Update the jwtAuthorizer in the [serverless.yml](../serverless.yml) with the issuerUrl and audience of your Firebase project.

## Setup branch protection

1. Add a new branch protection rule on your repo's main branch in Github, requiring the CI Github Action checks to pass before any merges can occur.
