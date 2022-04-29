import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FunctionUrlStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'MyFunctionUrl', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
      
    });
    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
    
    new cdk.CfnOutput(this, 'TheUrl', {
      value: fnUrl.url,
    });
  }
}
