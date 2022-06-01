import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as cwl from 'aws-cdk-lib/aws-logs';


export class TempStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'accesslogsLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback ){const response = {statuscode: 200, body:JSON.stringify("hello from lambda") }; callback(null, response);  }   ')
    })
    const integration = new apigateway.LambdaIntegration(fun);
    const api = new apigateway.RestApi(this, 'myapi', {
      description: 'myapi',
      
    });
    const dep = new apigateway.Deployment(this, 'throttling',
      {
        api: api,
        description: 'throttlingDeployment'
      });
    const logs = new cwl.LogGroup(this, 'throttleLogGroup', {
      logGroupName: 'apigatewayloggroup2'
    })
    const testStage = new apigateway.Stage(this, 'accessLogsStage', {
      deployment: dep,
      stageName: 'test',
      accessLogDestination: new apigateway.LogGroupLogDestination(logs),
      accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
        caller: false,
        httpMethod: true,
        ip: true,
        protocol: true,
        requestTime: true,
        resourcePath: true,
        responseLength: true,
        status: true,
        user: true
      })
    })
    const v1 = api.root.addResource('v1');
    v1.addMethod('GET', integration);


    new cdk.CfnOutput(this, 'apigatewayUrl', {
      value: api.url
    });


  }
}
