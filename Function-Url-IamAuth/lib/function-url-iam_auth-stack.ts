import { Stack, StackProps ,CfnOutput} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FunctionUrlIamAuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props); //1684-5499-7764

    const role = new iam.Role(this, 'FunctionUrlIamAuthStackRole', {
      assumedBy: new iam.AccountPrincipal('accontNumber')
    })

    const fn = new lambda.Function(this, 'MyFunctionUrl', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async (event) => {let body = JSON.parse(event.body)const response = {statusCode: 200,body: "Hello  Welcome to FunctionUrlIamAuthStack",};return response;};'),
      
    });
    const fnUrl = new lambda.FunctionUrl(this, 'FunctionUrlIamAuthStack', {
      function: fn,
    });
    new CfnOutput(this, 'TheUrl', {
      // The .url attributes will return the unique Function URL
      value: fnUrl.url,
    });

    
  }
}
