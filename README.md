<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/postlight/serverless-babel-starter.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/postlight/serverless-babel-starter/tree/master.svg?style=svg)](https://circleci.com/gh/postlight/serverless-babel-starter/tree/master) -->

# be-template

This template service gives you the latest in modern JavaScript (ES6 via Webpack + Babel, testing with Jest, linting with ESLint, and formatting with Prettier), the ease and power of Serverless, and bootstrapped DynamoDB and S3 infrastructure.

Once installed, you can create and deploy functions with the latest ES6 features in minutes, with linting and formatting baked in.

## Install

```bash
# Install dependencies
yarn install
```

### Running locally

```bash
# Start local API gateway
yarn start
```

### Test your functions with Jest

Jest is installed as the testrunner. To create a test, co-locate your test with the file it's testing
as `<filename>.test.js` and then run/watch tests with:

```bash
yarn test
```

## Deploy

Assuming you've already set up your default AWS credentials:

```bash
yarn deploy
```

`yarn deploy` will deploy to the `development` environment. You can deploy to `stage` or `production`
with:

```bash
yarn deploy:stage

# -- or --

yarn deploy:production
```

After you've deployed, the output of the deploy script will give you the API endpoint
for your deployed function(s), so you should be able to test the deployed API via that URL.
