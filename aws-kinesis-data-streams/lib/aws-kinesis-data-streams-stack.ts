import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kdstreams from 'aws-cdk-lib/aws-kinesis';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsKinesisDataStreamsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const kds = new kdstreams.Stream(this,'kdsstream',{
      retentionPeriod: cdk.Duration.hours(24),
      shardCount: 1,
      streamMode: kdstreams.StreamMode.PROVISIONED
    })

    new cdk.CfnOutput(this, 'kdsArn',{
      value: kds.streamArn
    })
  }
}
