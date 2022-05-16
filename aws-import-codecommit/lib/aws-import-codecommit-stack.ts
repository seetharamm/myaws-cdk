import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as CodeCommit from 'aws-cdk-lib/aws-codecommit'
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsImportCodecommitStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const repositoryArn = 'arn:aws:codecommit:us-east-1:168454997764:MyRepositoryName';
    const repo = CodeCommit.Repository.fromRepositoryArn(this, 'myrepo',repositoryArn);
    
    
  }
}
