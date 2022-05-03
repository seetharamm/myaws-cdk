import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaEventsourceS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'LambdaEventsourceS3Stack',{
      code: lambda.Code.fromInline('exports.handler = function(event, context, callback){ return (null, "response from lambda");}'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
    const s3bucket = new s3.Bucket(this, 's3esbucket',{
      bucketName: 's3esbucket'
    }) 
    fun.addEventSource(new S3EventSource(s3bucket,{
      events: [s3.EventType.OBJECT_CREATED, s3.EventType.OBJECT_REMOVED]
    }))
    new cdk.CfnOutput(this,'funUrn',{
      value: fun.functionArn
    })
  }
}
