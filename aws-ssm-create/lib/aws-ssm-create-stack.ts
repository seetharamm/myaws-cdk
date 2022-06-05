import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm'
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSsmCreateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
  const strParam = new ssm.StringParameter(this, 'stringparameter',{
    parameterName: 'myParameterName',
    stringValue: 'myParameterValue'
  })
 const listStrParam = new ssm.StringListParameter(this,'listParam',{
   parameterName: 'myParamListName',
   stringListValue: ['myParamValue1','myParamValue2']
 })

  new cdk.CfnOutput(this,'paramValue',{
    value: strParam.stringValue
  })
  new cdk.CfnOutput(this,'paramListValue',{
    value: cdk.Fn.join('+',listStrParam.stringListValue)
  })
    
  }
}
