import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TempStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'myapi',{
      description: 'myapi'
    });
    const user = iam.User.fromUserName(this, 'MyImportedUserByName', 'user1');

    const book = api.root.addResource('book');
    const getBooks = book.addMethod('GET', new apigateway.HttpIntegration('http://amazon.com'), {
  authorizationType: apigateway.AuthorizationType.IAM
});

user.attachInlinePolicy(new iam.Policy(this, 'AllowBooks', {
  statements: [
    new iam.PolicyStatement({
      actions: [ 'execute-api:Invoke' ],
      effect: iam.Effect.ALLOW,
      resources: [ getBooks.methodArn ]
    })
  ]
}))

 
   
  }
}
