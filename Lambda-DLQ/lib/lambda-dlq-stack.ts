import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaDlqStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'MyLambdaDlqStack', {
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = function(event, context, callback){ return callback(null, "Response from lambda");}'),
      runtime: lambda.Runtime.NODEJS_14_X,
      deadLetterQueueEnabled: true
    })

    
  }
}
