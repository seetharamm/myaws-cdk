import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import * as asset from 'aws-cdk-lib/aws-s3-assets';
import * as cdk from 'aws-cdk-lib'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEc2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC');
    const securityGroup = new ec2.SecurityGroup(this,'SecurityGroup',{
      allowAllOutbound: true,
      vpc
    })
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22),'allow ssh access');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80),'allow  access for http');

    const role = new iam.Role(this, 'ec2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX,
      cpuType: ec2.AmazonLinuxCpuType.X86_64
    })
    const ec2Instance = new ec2.Instance(this,'myinstance',{
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ami,
      securityGroup: securityGroup
    })

    const s3asset = new asset.Asset(this, 'Asset', { path: path.join(__dirname, './config.sh') });
    const localPath = ec2Instance.userData.addS3DownloadCommand({
      bucket: s3asset.bucket,
      bucketKey: s3asset.s3ObjectKey,
    });

    ec2Instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: '--verbose -y'
    });
    s3asset.grantRead(ec2Instance.role);

    new cdk.CfnOutput(this, 'IP Address', { value: ec2Instance.instancePublicIp });
    // new cdk.CfnOutput(this, 'Key Name', { value: key.keyPairName })
    new cdk.CfnOutput(this, 'Download Key Command', { value: 'aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem' })
    new cdk.CfnOutput(this, 'ssh command', { value: 'ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@' + ec2Instance.instancePublicIp })



  }
}
