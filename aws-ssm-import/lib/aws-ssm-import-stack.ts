import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cdk from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSsmImportStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const strParam = new ssm.StringParameter(this, 'stringparameter',{
      parameterName: '/dev/appName/myParameterName',
      stringValue: 'myParameterValue'
    })

    const getParamValue = ssm.StringParameter.fromStringParameterAttributes(this,'getParam',{
      parameterName: 'myParameterName'

    })
    const getSecureParamValue = ssm.StringParameter.fromSecureStringParameterAttributes(this,'getSecureParam',{
      parameterName: 'myParameterName'

    })

    new CfnOutput(this,'paraValue',{
      value: getParamValue.stringValue
    })
    new CfnOutput(this,'paraSecureValue',{
      value: getSecureParamValue.stringValue
    })
  }
}
