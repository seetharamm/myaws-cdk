import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
 import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cdk from 'aws-cdk-lib'


export class AwsImportS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   const queue = new sqs.Queue(this,'s3queue',{
     queueName:'s3queue'
   })
   
    const bucket = s3.Bucket.fromBucketAttributes(this, 'ImportedBucket', { bucketArn: 'arn:aws:s3:::simple123buck123' });
    new cdk.CfnOutput(this,'s3arn',{
    value: bucket.bucketArn
    })
  }
}
