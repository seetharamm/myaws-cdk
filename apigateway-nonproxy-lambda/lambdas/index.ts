export const handler = async (event: any,context: any,callback: any) =>{
    console.log(event);
    callback(null,{ statusCode: 200, body: 'valid request'}) ;
    }