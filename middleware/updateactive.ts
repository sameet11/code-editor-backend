import { Request, Response, NextFunction } from "express";
import { activeContainer } from "../global variables/activecontainer";

export const updateActive = (req: Request, res: Response, next: NextFunction) => {
    const rootpath = req.query.rootpath as string | undefined
    if (!rootpath) {
        return res.status(400).json({ error: "Input error" }); 
    }

    const pathOnServer = `${process.env.FOLDER_PATH}${rootpath}`;

    if (!activeContainer.has(pathOnServer)) {
        return res.status(404).json({ error: "Invalid path" });
    }

    const currentcontainer=activeContainer.get(pathOnServer);

    if(!currentcontainer){
        return res.json({error:"something went wrong"}).status(404);
    }

    const newparameters={
        ...currentcontainer,
        timeStamp:new Date(),
    }

    activeContainer.set(pathOnServer,newparameters);
    next();
};

export default updateActive;
