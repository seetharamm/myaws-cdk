import s3 from '../lambdalayer/s3'
export async function main(event: any, context: any)
{
   const result = await s3.getS3List();
   console.log(result);
}