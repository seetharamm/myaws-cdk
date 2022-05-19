import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snssubscription from 'aws-cdk-lib/aws-sns-subscriptions'
import { Key } from 'aws-cdk-lib/aws-kms';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSnsEncryptionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   
    const key = new Key(this, 'customKey');
    const mytopic = new sns.Topic(this, 'mytopic',{
      masterKey: key
    });

    mytopic.addSubscription(new snssubscription.EmailSubscription('seetharamaiah.kondapaneni@bms.com'));


    new cdk.CfnOutput(this, 'mykey',{
      value: key.keyArn
    })

   
  }
}
