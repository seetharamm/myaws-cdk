import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snssubactions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSnsFilterSubscriptionPolicyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

const fn = new lambda.Function(this, 'myfuntion',{
  code: lambda.Code.fromInline('exports.handler = async function(event, context,callbak){ return "sucessfull"}'),
  handler: 'index.handler',
  runtime: lambda.Runtime.NODEJS_14_X
})

    const myTopic = new sns.Topic(this, 'mytopic');
    myTopic.addSubscription(new snssubactions.LambdaSubscription(fn, {
      filterPolicy: {
        color: sns.SubscriptionFilter.stringFilter({
          allowlist: ['red', 'orange'],
          matchPrefixes: ['bl'],
        }),
        size: sns.SubscriptionFilter.stringFilter({
          denylist: ['small', 'medium'],
        }),
        price: sns.SubscriptionFilter.numericFilter({
          between: { start: 100, stop: 200 },
          greaterThan: 300,
        }),
        
      },
    }));
    //mytopic.addSubscription(snssubactions())

   
  }
}
