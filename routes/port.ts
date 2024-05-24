import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware"
import Port from "../controllers/port";
const portRouter = Router();

portRouter.get('/sendurl', authMiddleware, Port);
export default portRouter;