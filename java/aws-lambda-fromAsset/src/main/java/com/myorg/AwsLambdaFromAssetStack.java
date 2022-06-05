package com.myorg;

import software.constructs.Construct;
import java.util.UUID;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.services.lambda.SingletonFunction;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.lambda.Code;

// import software.amazon.awscdk.services.sqs.Queue;

public class AwsLambdaFromAssetStack extends Stack {
    public AwsLambdaFromAssetStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsLambdaFromAssetStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

       // SingletonFunction.Builder.create(this, "cdk-lambda-cron")
        SingletonFunction.Builder.create(this, "asset-lambda")
        .description("asset-lambda")
        .handler("index.main")
        .code(Code.fromAsset("./asset"))
        .runtime(Runtime.PYTHON_3_8)
        .uuid(UUID.randomUUID().toString())
        .timeout(Duration.seconds(300))
        .build();

        
    }
}
