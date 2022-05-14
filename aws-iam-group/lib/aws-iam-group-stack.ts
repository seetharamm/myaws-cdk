import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Group, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsIamGroupStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const admin = new Group(this,'admingroup',{
      groupName: 'Admin',
    })
    admin.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AdminstratorAccess'));
  }
}
