package com.myorg;

import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.services.apigateway.*;
import software.amazon.awscdk.services.apigateway.RestApiProps;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.lambda.Function;
// import software.amazon.awscdk.services.sqs.Queue;

public class AwsLambdaCrudStack extends Stack {
    public AwsLambdaCrudStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsLambdaCrudStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        Function fun = Function.Builder.create(this,"myfun")
                        .handler("") 
                        .code(Code.fromAsset(""))  
                        .runtime(Runtime.JAVA_8).build();

        RestApi api = new RestApi(this,"myRestApi",RestApiProps.builder().restApiName("myrestapi").build());
       IResource v1 = api.getRoot().addResource("v1");
       LambdaIntegration integration = new LambdaIntegration(fun);
       v1.addMethod("GET", integration, {
           
       })
                      
                      

       
    }
}
