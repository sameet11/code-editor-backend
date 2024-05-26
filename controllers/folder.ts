import { Request, Response } from "express"
import Getfolderdata from "../utils/getfolderdata";
import createFolder from "../utils/createfolder";
import Makefile from "../utils/makefile";
import EditFile from "../utils/editfile";
const Getfolder = (req: Request, res: Response) => {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const folderdata = Getfolderdata(pathname);

    if (folderdata.error || !folderdata.data) {
        return res.json({ error: folderdata.error }).status(404);
    }

    const folderwithcontent = folderdata.data.filter(file => file.content);
    const folderwithoutcontent = folderdata.data.filter(file => !file.content);
    const folder = [...folderwithoutcontent, ...folderwithcontent];

    return res.json({ data: { folder: folder } }).status(200)
}
export const Makefolder = async (req: Request, res: Response) => {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const response = createFolder("", path);
    if (response.error || !response.data) {
        return res.json({ error: response.error }).status(404);
    }
    return res.json({ data: "folder created" }).status(200);
}
export const MakeFile = async (req: Request, res: Response) => {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const result = Makefile(path, "");
    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }
    return res.json({ data: result.data }).status(200);
}
export const UpdateFile = async (req: Request, res: Response) => {
    const pathname = req.query.path;
    const body = req.body;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const result = EditFile(path, body.content);
    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }
    return res.json({ data: result.data }).status(200);
}
export default Getfolder;