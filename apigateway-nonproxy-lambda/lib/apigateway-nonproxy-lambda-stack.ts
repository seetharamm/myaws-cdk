import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib'

export class ApigatewayNonproxyLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   
    const fun = new lambda.Function(this, 'ApigatewayNonproxyLambdaStackFun',{
      code: lambda.Code.fromAsset(path.join(__dirname,'/../lambdas')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
    const api = new apigateway.LambdaRestApi(this,'ApigatewayNonproxyLambdaStack',{
    handler:fun,
    proxy: false
    })
     const root = api.root.addResource('v1');
    root.addMethod('GET');
    root.addMethod('POST');
    root.addMethod('PUT');
    root.addMethod('DELETE'); 

     new cdk.CfnOutput(this,'gtnonproxywayUrl',{
       value:api.url
     })
  }
}
