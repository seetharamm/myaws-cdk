import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSecretManagerUserdefinedStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const role = new iam.Role(this,'myrole',{
      assumedBy: new iam.AccountRootPrincipal()
    });
    role.addToPolicy(new iam.PolicyStatement({}))
    new iam.PolicyDocument
    const secret = new secretsmanager.Secret(this, 'userdefinedSecret', {
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'username' }),
        generateStringKey: 'password',
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

   
  }
}
