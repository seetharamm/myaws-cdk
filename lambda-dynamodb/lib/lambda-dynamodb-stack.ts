import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaDynamodbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
   
const table = new dynamodb.Table(this, 'ddtablle',{
  partitionKey: {name:'Request_Id',type:AttributeType.STRING},
  tableName: 'Requests',

})
    const fun = new lambda.Function(this,'LambdaDynamodbStack',{
      code: lambda.Code.fromAsset(path.join(__dirname,'/../lambda')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X
    })
    
   table.grantFullAccess(fun);
    
  }
}
