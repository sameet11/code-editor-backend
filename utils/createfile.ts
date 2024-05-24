import fs from "fs";
import s3client from "./s3client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
const createFile = async (name: string, rootpath: string) => {
    try {
        const { Body } = await s3client.send(
            new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: name
            })
        );

        if (!Body) {
            return { error: "AWS error" };
        }

        const firstIndex = name.indexOf('/');
        const newname = name.slice(firstIndex + 1, name.length);
        const pathname = rootpath + newname;
        const content = await Body.transformToString();
        fs.writeFileSync(pathname, content);

        return { data: "success" };
    } catch (error) {
        return { error: error };
    }

}
export default createFile;