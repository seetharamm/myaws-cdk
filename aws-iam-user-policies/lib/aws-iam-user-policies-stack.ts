import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Policy, PolicyStatement, User } from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsIamUserPoliciesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  const myuser = new User(this, 'myuser');

    const mypolicy = new Policy(this, 'policy1',{
      policyName:'myfirstpolicy'
    })
    mypolicy.addStatements(new PolicyStatement({resources:['*'],actions:['sqs:SendMessage']}));
    mypolicy.attachToUser(myuser);

   
  }
}
