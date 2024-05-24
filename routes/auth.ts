import { Router } from "express";
import { CheckUsers, Signup } from "../controllers/signup";
import Signin from "../controllers/signin";
import authMiddleware from "../middleware/authMiddleware";
const Authrouter = Router();


Authrouter.post('/signup', Signup)
Authrouter.post('/signin', Signin)
Authrouter.get('/check', authMiddleware, CheckUsers);

export default Authrouter;