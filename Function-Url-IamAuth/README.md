# Welcome to your CDK TypeScript project

A function URL is a dedicated HTTP(S) endpoint for your Lambda function. When you create a function URL, Lambda automatically generates a unique URL endpoint for you. Function URLs can be created for the latest version Lambda Functions, or Function Aliases (but not for Versions).

Function URLs are dual stack-enabled, supporting IPv4 and IPv6, and cross-origin resource sharing (CORS) configuration. After you configure a function URL for your function, you can invoke your function through its HTTP(S) endpoint via a web browser, curl, Postman, or any HTTP client. To invoke a function using IAM authentication your HTTP client must support SigV4 signing.

The cdk.json file tells the CDK Toolkit how to execute your app.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
