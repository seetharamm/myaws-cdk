import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as iam from 'aws-cdk-lib/aws-iam';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { ImagePullPrincipalType } from 'aws-cdk-lib/aws-codebuild';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaResourceBasedPolicyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'LambdaResourceBasedPolicyStack', {
      code: lambda.Code.fromInline('exports.handler = function(event, context, callback){ return callback(null, "Response from lambda");}'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X

    })
    new sns.Topic(this, 'MyTopic', {
      topicName: 'topicNameStandard',
    });
    const sp = new iam.ServicePrincipal('sns.amazonaws.com');
    fun.grantInvoke(sp);

  }
}
