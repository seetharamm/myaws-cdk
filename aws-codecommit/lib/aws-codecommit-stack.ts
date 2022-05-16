import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { join } from 'path';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCodecommitStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const repo = new codecommit.Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
      description: 'Some description.', // optional property
      code: codecommit.Code.fromZipFile(join(__dirname, '../asset-test.zip')),
    });
     new cdk.CfnOutput(this, 'repArn',{
       value: repo.repositoryArn
     })
  }
}
