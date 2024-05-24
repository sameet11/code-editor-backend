import { S3Client } from "@aws-sdk/client-s3";

const s3client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_access_key || "",
        secretAccessKey: process.env.AWS_access_secret || ""
    }, region: process.env.AWS_REGION ||""
});
export default s3client;