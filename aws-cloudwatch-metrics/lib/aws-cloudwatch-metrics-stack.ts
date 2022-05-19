import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import {Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch'
import * as sns from 'aws-cdk-lib/aws-sns';
import * as cloudwathations from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as snssubscription from 'aws-cdk-lib/aws-sns-subscriptions'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCloudwatchMetricsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   

    const fn = new lambda.Function(this,'myfunction',{
      code: lambda.Code.fromInline('exports.handler = async function(event, context, callback){ return "successfull"}'),
      handler:'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
    const alrm = fn.metricInvocations().createAlarm(this, 'myalaram',{
      threshold: 2,
      alarmName: 'alarmname',
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD

    })
    const topic = new sns.Topic(this, 'mytopic');
    topic.addSubscription(new snssubscription.EmailSubscription('xxxxxxxxxxxxxxxxxxxx'));
    alrm.addAlarmAction(new cloudwathations.SnsAction(topic));
      
    new cdk.CfnOutput(this,'funcArn',{
      value: fn.functionArn
    });
   
    
    

    
  }
}
