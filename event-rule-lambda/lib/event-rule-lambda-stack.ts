import { Stack, StackProps ,Duration} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EventRuleLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fun = new lambda.Function(this, 'EventRuleLambdaStack', {
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromInline('export.handler = function(event, context, callback){ return callback(null,"response from lambda");}')
      //logRetention: Duration.
    })
    const rule = new events.Rule(this, 'cronrule',{
      schedule: events.Schedule.cron({minute: '*'})
    })
    rule.addTarget(new targets.LambdaFunction(fun));
    new cdk.CfnOutput(this, 'theUrl',{
      value: fun.functionArn
    })
    
  }
}
