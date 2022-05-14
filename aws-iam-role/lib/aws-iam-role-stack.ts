import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServicePrincipal,PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsIamRoleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const role = new Role(this, 'myrole',{
      assumedBy: new ServicePrincipal('sns.amazonws.com')
    })

    role.addToPolicy(new PolicyStatement({
      resources: ['*'],
      actions: ['lambda:InvokeFunction']
    }))
  }
}
