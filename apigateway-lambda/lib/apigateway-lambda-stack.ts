import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApigatewayLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'ApigatewayLambdaStackFun',{
      code: lambda.Code.fromAsset(path.join(__dirname,'/../lambda')),
      //entry: join(__dirname, 'lambdas', 'get-one.ts'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
    const api = new apigateway.LambdaRestApi(this,'ApigatewayLambdaStack',{
    handler:fun,
    })
    /* const root = api.root.addResource('v1');
    root.addMethod('GET');
    root.addMethod('POST');
    root.addMethod('PUT');
    root.addMethod('DELETE'); */

     new cdk.CfnOutput(this,'gtwayUrl',{
       value:api.url
     })
  }
}
