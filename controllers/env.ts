import { Request,Response } from "express";
import prisma from "../prisma/prismaClient";
import createProject from "../utils/createProject";
import createFolder from "../utils/createfolder";
import createContainer from "../utils/createcontainer";
import Getfolderdata from "../utils/getfolderdata";
import { activeContainer } from "../global variables/activecontainer";
import getContainerPorts from "../utils/getconatinerport";

export const createEnv = async (req: any, res: Response) => {
    const env = req.params.name

    const createEnv = await prisma.environment.create({
        data: {
            userId: req.userId
        }
    })

    const objectkey = createEnv.id + req.userId+env;
    const updateenv = await prisma.environment.update({
        where: {
            id: createEnv.id,
        }, data: {
            objectkey,
        }
    })
    const rootpath = `D:/${updateenv.objectkey}`

    const result = createFolder("", rootpath);

    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }

    const data = await createProject(env, rootpath);

    if (data.error || !data.data) {
        return res.json({ error: data.error }).status(404);
    }
    const container = await createContainer(result.data, env);
    if (container.error || !container.data) {
        return res.json({ error: "error" }).status(404);
    }

    activeContainer.set(rootpath+'/',{
        containerId:container.data.containerId,
        timeStamp:new Date(),
    })
    if(!updateenv.objectkey){
        return;
    }
    const folderdata = Getfolderdata(updateenv.objectkey);
    if (!folderdata.data || folderdata.error) {
        return req.json({ error: folderdata.error }).status(404);
    }
    const folderwithcontent = folderdata.data.filter(file => file.content);
    const folderwithoutcontent = folderdata.data.filter(file => !file.content);
    const folder = [...folderwithoutcontent, ...folderwithcontent];
    return res.json({
        data: {
            port: container.data.hostPort,
            containerid: container.data.containerId,
            path: updateenv.objectkey+ '/',
            folder: folder
        }
    }).status(200);
}
export const getConatainer=async(req:Request,res:Response)=>{
    const foldername=req.query.rootpath;
    if(typeof foldername!=="string"){
        return res.json({error:"invalid input"}).status(404);
    }
    const containerAndTimestamp=activeContainer.get(`D:/${foldername}`);
    if(containerAndTimestamp===undefined){
        return res.json({error:"no conatainer found"}).status(404);
    }
    const result=await getContainerPorts(containerAndTimestamp.containerId);
    if(result.error||!result.data){
        return res.json({error:"port not found"}).status(404);
    }

    return res.json({
        containerId:containerAndTimestamp.containerId,
        port:result.data
    })
}