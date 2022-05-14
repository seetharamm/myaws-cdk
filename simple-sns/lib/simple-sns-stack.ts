import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
 import * as sns from 'aws-cdk-lib/aws-sns';
 import * as cdk from 'aws-cdk-lib';

export class SimpleSnsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
     const queue = new sns.Topic(this, 'SimpleSnsQueue', {
       fifo: true,
       displayName: 'Simple Topic',
       topicName:'SimpleTopic',
       contentBasedDeduplication: true
     });
  }
}
