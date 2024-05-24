import s3client from "../utils/s3client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import createFolder from "./createfolder";
import createFile from "./createfile";
const createProject = async (name: string, rootpath: string) => {
    const { Contents } = await s3client.send(
        new ListObjectsV2Command({
            Bucket: process.env.BUCKET_NAME,
            Prefix: name,
        })
    );

    if (!Contents) {
        throw new Error("Couldn't retrieve folder from AWS");
    }
    const pathname = rootpath + '/';
    for (let i = 0; i < Contents.length; i++) {
        const file = Contents[i];
        if (!file.Key) {
            throw new Error("Something went wrong");
        }
        const folders = file.Key.split('/').slice(0, -1);
        folders.shift();
        if (folders.length >= 1) {
            const name = folders.join('/');
            const result = createFolder(name, pathname);
            if (result.error) {
                return { error: "folder not created" };
            }
        }
        const result = await createFile(file.Key, pathname);
        if (result.error) {
            return { error: "file not created" };
        }
    }

    return { data: "created Project" };
}

export default createProject;