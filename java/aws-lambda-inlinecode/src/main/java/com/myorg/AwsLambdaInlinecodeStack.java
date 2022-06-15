package com.myorg;

import software.constructs.Construct;
import java.util.UUID;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.lambda.SingletonFunction;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Runtime;
// import software.amazon.awscdk.services.sqs.Queue;

public class AwsLambdaInlinecodeStack extends Stack {
    public AwsLambdaInlinecodeStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsLambdaInlinecodeStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        SingletonFunction lambdaFunction =
        SingletonFunction.Builder.create(this, "cdk-lambda-cron")
            .description("Lambda which prints \"I'm running\"")
            .code(Code.fromInline("exports.handler = function (event, context, callback){ const response = { statusCode : 200,body : JSON.stringify('Hello from lambda')}; callback(null, response);};"))
            .handler("index.main")
            .timeout(Duration.seconds(300))
            .runtime(Runtime.NODEJS_16_X)
            .uuid(UUID.randomUUID().toString())
            .build();
    }
}
