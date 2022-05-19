import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsS3LifecycleRulesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
  const bucket = new s3.Bucket(this,'simplebucket',{

  })
  bucket.addLifecycleRule({
    expiration: cdk.Duration.days(2)
  })
    
  }
}
