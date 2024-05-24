import { Router } from "express";
import { createEnv } from "../controllers/env";
import { getConatainer } from "../controllers/env";
import authMiddleware from "../middleware/authMiddleware";
import updateActive from "../middleware/updateactive";
const envRouter = Router();

envRouter.get('/create/:name', authMiddleware, createEnv);
envRouter.get('/getcontainer',authMiddleware,updateActive,getConatainer);
export default envRouter;