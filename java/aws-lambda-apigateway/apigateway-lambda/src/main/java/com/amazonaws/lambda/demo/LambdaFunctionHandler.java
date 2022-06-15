package com.amazonaws.lambda.demo;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

@SuppressWarnings("unused")
public class LambdaFunctionHandler implements RequestHandler<Object, APIGatewayProxyResponseEvent> {

    @Override
    public APIGatewayProxyResponseEvent handleRequest(Object input, Context context) {
        context.getLogger().log("Input: " + input);
        JSONObject resultObj = new JSONObject();
        List<String> resultData = new ArrayList<String>();
        resultData.add("one");
        resultData.add("two");
        resultObj.put("successful",true);		
		resultObj.put("dataset", resultData.toString());
		APIGatewayProxyResponseEvent resp = new APIGatewayProxyResponseEvent()
		        .withStatusCode(200)
		        .withBody("Hello from lambda")
		        .withIsBase64Encoded(false);
		//String response = resultObj.toString();
        // TODO: implement your handler
		context.getLogger().log("resp: " + resp);
        return resp;
    }

}
