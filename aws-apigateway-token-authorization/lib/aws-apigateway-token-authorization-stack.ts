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
      code: lambda.AssetCode.fromAsset(path.join(__dirname, 'authorizer.handler')),
    }); 
    const fu = new lambda.Function(this, 'myfun', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler =  function(event, context, callback) { var res ={"statusCode": 200,"headers": { "Content-Type": "*/*"} }; res.body = "Hello, " + "lambda" + "!";callback(null, res);};')
    });
    
    
    
   const auth = new apigateway.TokenAuthorizer(this, 'MyAuthorizer', {
      handler: authorizerFn,
    }); 

    const restapis = new apigateway.RestApi(this, 'myrestapi',{
      restApiName: 'myrestapi',

    }
    );
    const lambdaIntegration = new apigateway.LambdaIntegration(fu)
    const root = restapis.root.addResource('v1');
    root.addMethod('GET', lambdaIntegration,{
      authorizer: auth
    });


   
    
    
  }
}
