import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as SecretManager from 'aws-cdk-lib/aws-secretsmanager'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSecretManagerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const secret = new SecretManager.Secret(this, 'Secret',{
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    
    });
  }
}
