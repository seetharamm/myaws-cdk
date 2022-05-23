"use strict";

import { AnyRecord } from "dns";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = async (event: any) => {
    //export const handler = async (event: any, _context: any = {}): Promise<any> => {
    console.log(event);
    const authString = event.authorizationToken;
    console.log(event.authorizationToken);
    if (authString === 'abc123' || authString === 'abc321') {
        return {
            "principalId": "user",
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Action": "execute-api:Invoke",
                        
                        "Resource": "arn:aws:execute-api:us-east-1:168454997764:7ttq8cl06k/*/*",
                        "Effect": "Allow",
                      // Resource: event.methodArn
                    }
                ]
            }
        };
    }
    else {
        throw new Error('Unauthorized');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFHLFVBQWUsRUFBRSxFQUFnQixFQUFFO0lBQzlFLGtGQUFrRjtJQUM5RSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUM7SUFDNUMsSUFBSSxVQUFVLEtBQUssUUFBUSxJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQ3REO1FBQ0ksT0FBTztZQUNILFdBQVcsRUFBRSxNQUFNO1lBQ25CLGNBQWMsRUFBRTtnQkFDWixPQUFPLEVBQUUsWUFBWTtnQkFDckIsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE1BQU0sRUFBRSxvQkFBb0I7d0JBQzVCLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVM7cUJBQzVCO2lCQUNKO2FBQ0o7U0FDSixDQUFBO0tBQ0o7U0FDRDtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDbkM7QUFFTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55ICwgY29udGV4dDogYW55ID0ge30pOiBQcm9taXNlPGFueT4gPT4ge1xyXG4vL2V4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIF9jb250ZXh0OiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgICBjb25zdCBhdXRoU3RyaW5nID0gZXZlbnQuYXV0aG9yaXphdGlvblRva2VuO1xyXG4gICAgaWYgKGF1dGhTdHJpbmcgPT09ICdhYmMxMjMnIHx8IGF1dGhTdHJpbmcgPT09ICdhYmMzMjEnKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByaW5jaXBhbElkOiAndXNlcicsXHJcbiAgICAgICAgICAgIHBvbGljeURvY3VtZW50OiB7XHJcbiAgICAgICAgICAgICAgICBWZXJzaW9uOiAnMjAxMi0xMC0xNycsXHJcbiAgICAgICAgICAgICAgICBTdGF0ZW1lbnQ6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFjdGlvbjogJ2V4ZWN1dGUuYXBpLkludm9rZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVmZmVjdDogYXV0aFN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzb3VyY2U6IGV2ZW50Lm1ldGhvZEFyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hdXRob3JpemVkJyk7XHJcbiAgICB9XHJcblxyXG59Il19