import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as destination from 'aws-cdk-lib/aws-lambda-destinations';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsLambdaDestinationLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const destinationFun = new lambda.Function(this, 'destinationFun', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback ){const response = {statuscode: 200, body:JSON.stringify("hello from destinationFun") }; callback(null, response);  }   ')
    })
    

    const fun = new lambda.Function(this, 'lambdaDestlambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      onSuccess: new destination.LambdaDestination(destinationFun),
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback ){const response = {statuscode: 200, body:JSON.stringify("hello from primary lambda") }; callback(null, response);  }   ')
    })
   
    
    new cdk.CfnOutput(this,'functionArn',{
      value: fun.functionArn
    })
  }
}
++++