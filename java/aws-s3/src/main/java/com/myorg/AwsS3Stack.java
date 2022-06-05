package com.myorg;

import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.s3.*;

public class AwsS3Stack extends Stack {
    public AwsS3Stack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public AwsS3Stack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        // The code that defines your stack goes here

        // example resource
        Bucket bucket = Bucket.Builder.create(this, "MyBucket")
        .versioned(true)
        .build();
    }
}
