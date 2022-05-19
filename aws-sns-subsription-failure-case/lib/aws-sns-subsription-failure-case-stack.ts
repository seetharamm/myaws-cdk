import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snssub from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSnsSubsriptionFailureCaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   const snstopic = new sns.Topic(this, 'mytopic',{
     contentBasedDeduplication: true,
     displayName: 'mytopic'
   });

   snstopic.addSubscription(new snssub.EmailSubscription('seetharamaiah.kondapaneni@bms.com'));
    
  }
}
