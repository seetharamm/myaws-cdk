package com.myorg;

import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.apigateway.*;
// import software.amazon.awscdk.services.sqs.Queue;

public class AwsLambdaApigatewayStack extends Stack {
    public AwsLambdaApigatewayStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsLambdaApigatewayStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        

        Function lambda = Function.Builder.create(this,"HelloLambda")
       // .code(Code.fromInline("exports.handler = function (event, context, callback){ const response = { statusCode : 200,body : JSON.stringify('Hello from lambda')}; callback(null, response);};"))
        .handler("com.amazonaws.lambda.demo.LambdaFunctionHandler")
        .code(Code.fromAsset("./assets/demo-1.0.0.jar"))
        .runtime(Runtime.JAVA_8)
        .timeout(Duration.minutes(5)).build();

        RestApi api = new RestApi(this, "myrestApi",
                      RestApiProps.builder().restApiName("restApiName").build());

           IResource v1   = api.getRoot().addResource("v1");
           LambdaIntegration li = new LambdaIntegration(lambda);
           v1.addMethod("GET",li);
                      




       
    }
}
