import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaeventsources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaEventsourceSqsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this,'LambdaEventsourceSqsStack',{
      code: lambda.Code.fromInline('exports.hanlder = function(event, context, callback){ return callback(null, "response from lambda");}'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
   const sqsqueue = new sqs.Queue(this, 'sqsqueue', {
     visibilityTimeout: cdk.Duration.seconds(30),
     receiveMessageWaitTime: cdk.Duration.seconds(20)
   })
   fun.addEventSource(new lambdaeventsources.SqsEventSource(sqsqueue,{
     batchSize:2,
     maxBatchingWindow: cdk.Duration.minutes(2),
     reportBatchItemFailures: false
   }))
   new cdk.CfnOutput(this, 'funArn'{
     value: fun.functionArn
   })


    
  }
}
