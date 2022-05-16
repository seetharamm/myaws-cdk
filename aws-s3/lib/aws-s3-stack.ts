import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as bucket from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const s3 = new bucket.Bucket(this,'simplebucket',{
      bucketName: 'simple123buck123',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects:true

    })

  new cdk.CfnOutput(this,'simplebucketArn',{
    value: s3.bucketArn
  })

    
  }
}
