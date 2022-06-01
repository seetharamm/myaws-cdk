import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as SNS from 'aws-cdk-lib/aws-sns';
import * as destination from 'aws-cdk-lib/aws-lambda-destinations';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as lambbdaSub from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsLambdaDestinationSnsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const snsTopic = new SNS.Topic(this,'lambdaDestinationQueue',{
      topicName: 'lambdaDestinationQueue'
    })

    const fun = new lambda.Function(this, 'lambdaDestlambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      onSuccess: new destination.SnsDestination(snsTopic),
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback ){const response = {statuscode: 200, body:JSON.stringify("hello from lambda) }; callback(null, response);  }   ')
    })
    snsTopic.addSubscription(new lambbdaSub.EmailSubscription('seetharamaiah.kondapaneni@bms.com'));


    
    new cdk.CfnOutput(this,'functionArn',{
      value: fun.functionArn
    })

  }
}
