import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigtw from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib'
import { FunctionUrl } from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam'
 import * as sns from 'aws-cdk-lib/aws-sns';

export class AwsApigwRestapiAwsserviceIntegrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     const snsqueue = new sns.Topic(this,'mytopic',{
       topicName: 'snsTopic'
     })
    const myrole = new iam.Role(this, "Role", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });
    
    myrole.attachInlinePolicy(
      new iam.Policy(this, "executePolicy", {
        statements: [
          new iam.PolicyStatement({
            actions: ["sns:Publish"],
            effect: iam.Effect.ALLOW,
            resources: [snsqueue.topicName],
          }),
        ],
      })
    );

    const api = new apigtw.RestApi(this, 'myrestapi',{

    });

    const lambdaIntegrtion = new apigtw.AwsIntegration({
      service: 'sns',
      integrationHttpMethod: 'GET',
      path: `${cdk.Aws.ACCOUNT_ID}/${snsqueue.topicName}`,

    })

   const v1 = api.root.addResource('v1');
   const meth = v1.addMethod('GET',lambdaIntegrtion);

 new cdk.CfnOutput(this,'gatewayurl',{
   value: api.url
 })
    
  }
}