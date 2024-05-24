"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.AWS_access_key || "",
        secretAccessKey: process.env.AWS_access_secret || ""
    }, region: process.env.AWS_REGION || ""
});
exports.default = s3client;
