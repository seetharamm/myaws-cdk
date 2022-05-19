import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kds from 'aws-cdk-lib/aws-kinesis';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsImportExistingKinesisDataStreamsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   const kdstreams = kds.Stream.fromStreamAttributes(this,'mtstream',{
     streamArn: 'arn:aws:kinesis:us-east-1:168454997764:stream/AwsKinesisDataStreamsStack-kdsstream47B63296-PrCh7P5Mae6x',

   })
  }
}
