import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snssub from 'aws-cdk-lib/aws-sns-subscriptions'
import * as cdk from 'aws-cdk-lib'

export class AwsSnsSubscriptionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
     const topic = new sns.Topic(this, 'AwsSnsSubscriptionQueue', {
      topicName: 'mytopic'

     });
     topic.addSubscription(new snssub.EmailSubscription('xxxxxxxxxxxxxxxxxxxxxxx'));
  }
}
