import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SimpleApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const apigw = new apigateway.RestApi(this,'SimpleApigatewayStack',{

    } )
   const api = apigw.root.addResource('v1');
   api.addMethod('GET');
   api.addMethod('POST');
   const app = api.addResource('app');
   app.addMethod('GET');

   new cdk.CfnOutput(this, 'apigatewayurl',{
     value: apigw.url
   })
    
  }
}
