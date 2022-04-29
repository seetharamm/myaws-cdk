import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SimpleLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lamda = new lambda.Function(this, 'my-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.InlineCode('exports.handler = async function(event) { return "success" }'),
      handler: 'index.handler'
    })

   
  }
}
