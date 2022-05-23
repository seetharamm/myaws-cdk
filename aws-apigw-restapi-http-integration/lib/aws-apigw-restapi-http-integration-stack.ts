import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigtw from 'aws-cdk-lib/aws-apigateway'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsApigwRestapiHttpIntegrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /* const fun = new lambda.Function(this, 'restapilambda',{
      code: lambda.Code.fromInline('exports.handler = async (event){ const response = { statusCode = 200, body = JSON.stringify("Hello from lambda")}; return response;}'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_16_X
    });*/

    const api = new apigtw.RestApi(this, 'myrestapi');

    const lambdaIntegrtion = new apigtw.HttpIntegration('https://jsonplaceholder.typicode.com/todos/1');

   const v1 = api.root.addResource('v1');
   v1.addMethod('GET',lambdaIntegrtion);
 new cdk.CfnOutput(this,'gatewayurl',{
   value: api.url
 })
    
  }
}
