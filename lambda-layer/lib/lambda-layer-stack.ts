import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaLayerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layerfun = new lambda.LayerVersion(this, 'LambdaLayerStack',{
      code: lambda.Code.fromAsset(path.join(__dirname,'/../lambdalayer')),
      compatibleRuntimes:
        [
          lambda.Runtime.NODEJS_14_X
        ]

      
    });
    const fun = new lambda.Function(this,'lambdaStack',{
     code: lambda.Code.fromAsset(path.join(__dirname,'/../mylambdacode')),
     handler: 'index.main',
     runtime: lambda.Runtime.NODEJS_14_X
    })

    
  }
}
