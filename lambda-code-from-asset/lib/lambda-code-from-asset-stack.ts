import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaCodeFromAssetStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'LambdaCodeFromAssetStack', {
      handler:'index.main',
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset(path.join(__dirname,'/../mylambdacode'))
    } )
  }
}
