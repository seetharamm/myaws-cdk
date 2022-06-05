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
            .code(Code.fromInline("def main(event, context):\n" + "    print(\"I'm running!\")\n"))
            .handler("index.main")
            .timeout(Duration.seconds(300))
            .runtime(Runtime.PYTHON_3_9)
            .uuid(UUID.randomUUID().toString())
            .build();
    }
}
