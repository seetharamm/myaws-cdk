import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsApigatewayImportApikeyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this,'apikeyfun',{
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback) { const res = { statusCode: 200, body: JSON.stringify("Hello from lambda")}; callback(null, res);}; '),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler'
    })
    const apiIntegration = new apigateway.LambdaIntegration(fun)

    const api = new apigateway.RestApi(this, 'this',{
      restApiName: 'apikeyRestApi'
    });
    const v1resource = api.root.addResource('v1');
    v1resource.addMethod('GET',apiIntegration, { apiKeyRequired: true });

    const importedKey = apigateway.ApiKey.fromApiKeyId(this, 'imported-key', 'j74igatyh3');

    const plan = api.addUsagePlan('UsagePlan', {
      name: 'Easy',
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    });
    
    //const key = api.addApiKey('ApiKey');
    plan.addApiKey(importedKey);
    plan.addApiStage({stage: api.deploymentStage});
    


    new cdk.CfnOutput(this, 'apiUrl',{
      value: api.url
    })
  }
}
