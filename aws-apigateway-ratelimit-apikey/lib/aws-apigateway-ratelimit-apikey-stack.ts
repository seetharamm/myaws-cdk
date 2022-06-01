import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsApigatewayRatelimitApikeyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this,'apikeyfun',{
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback) { const res = { statusCode: 200, body: JSON.stringify("Hello from lambda")}; callback(null, res);}; '),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler'
    })
    const apiIntegration = new apigateway.LambdaIntegration(fun)

    const api = new apigateway.RestApi(this, 'this',{
      restApiName: 'apikeyRestApi',
      deploy: true,
      deployOptions: { stageName: 'test' },
    });
    const v1resource = api.root.addResource('v1');
    const vv = v1resource.addMethod('GET',apiIntegration, { apiKeyRequired: true });

    const apikey = new apigateway.RateLimitedApiKey(this,"RateLimitedApiKey",{
      apiKeyName: 'mySecretkey',
      value: 'arandomstringwithmorethantwentycharacters',
      enabled: true,
      apiStages: [{
          stage: api.deploymentStage,
          throttle: [], }],
      customerId: 'New customer',
      resources: [api],
      quota: {
        limit: 3,
        period: apigateway.Period.MONTH
      }
    }) 

    /* const plan = api.addUsagePlan('UsagePlanRateLimitedApi', {
      name: 'Easy',
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    });*/
    
    //const key = api.addApiKey('ApiKey');
   // plan.addApiKey(apikey);
    //api.addApiStage({stage: api.deploymentStage});
    
  }
}
