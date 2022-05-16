import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda';
//import * as lambda from '@aws-cdk/aws-lambda';
import { HttpLambdaIntegration,HttpUrlIntegration  } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
  HttpStage,

} from '@aws-cdk/aws-apigatewayv2-alpha';

export class ApigatewayHttpUrlIntegrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   
    const fun = new lambda.Function(this, 'ApigatewayHttpUrlIntegrationStack', {
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback){ return "Success"}'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
    const httpApi = new HttpApi(this, 'http-api-example', {
      description: 'HTTP Url API example',
    });
    httpApi.addRoutes({
      path: '/url',
      methods: [HttpMethod.GET],
      integration: new HttpUrlIntegration(
        'httpUrlIntegration',
        "https://url-integration-http.com",
      ),
    });
    
    new cdk.CfnOutput(this,'lambdaUrn',{
      value: fun.functionArn
    });
    new cdk.CfnOutput(this,'apiUrl',{
      value: httpApi.url!
    });
    

    
  }
}
