import { Router } from "express";
import Authrouter from "./auth";
import envRouter from "./env";
import folderrouter from "./folder";
import portRouter from "./port";
const router = Router();

router.use('/user/auth', Authrouter);
router.use('/user/env', envRouter);
router.use('/user/folder', folderrouter);
router.use('/user/url', portRouter);
export default router;