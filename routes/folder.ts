import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware"
import Getfolder from "../controllers/folder";
import { Makefolder } from "../controllers/folder";
import { MakeFile } from "../controllers/folder";
import { UpdateFile } from "../controllers/folder";
import updateActive from "../middleware/updateactive";
const folderRouter = Router();

folderRouter.get('/', authMiddleware, updateActive, Getfolder)
folderRouter.post('/create', authMiddleware,updateActive, Makefolder)
folderRouter.post('/createfile', authMiddleware,updateActive, MakeFile);
folderRouter.post('/updatefile', authMiddleware, updateActive, UpdateFile);
export default folderRouter;