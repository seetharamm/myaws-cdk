import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as CodeCommit from 'aws-cdk-lib/aws-codecommit'
import * as sqs from 'aws-cdk-lib/aws-sns';
import * as targets from 'aws-cdk-lib/aws-events-targets'
export class AwsCodecommitNotificationsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const repo = new CodeCommit.Repository(this,'myrepo',{
      repositoryName:'myrepo'
    })

    // example resource
     const myTopic = new sqs.Topic(this, 'AwsCodecommitNotificationsQueue', {
      
     });
     const rule = repo.onCommentOnPullRequest('CommentOnPullRequest', {
      target: new targets.SnsTopic(myTopic),
    });

  }
}
