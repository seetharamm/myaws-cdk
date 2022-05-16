import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsApigatewayTokenAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const authorizerFn = new lambda.Function(this, 'MyAuthorizerFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.AssetCode.fromAsset(path.join(__dirname, 'integ.token-authorizer.handler')),
    });
    
    const restapi = new apigateway.RestApi(this, 'MyRestApi');
    
    const authorizer = new apigateway.TokenAuthorizer(this, 'MyAuthorizer', {
      handler: authorizerFn,
    });
    
    restapi.root.addMethod('ANY', new apigateway.MockIntegration({
      integrationResponses: [
        { statusCode: '200' },
      ],
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        'application/json': '{ "statusCode": 200 }',
      },
    }), {
      methodResponses: [
        { statusCode: '200' },
      ],
      authorizer,
    });
  }
}
