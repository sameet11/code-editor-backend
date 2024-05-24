import prisma from "../prisma/prismaClient";
import { signupSchema } from "../types"
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
const Signin = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const result = signupSchema.safeParse(body);

        if (!result.success) {
            return res.status(404).json({ error: "Inavlid Input" });
        }

        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (!user) {
            return res.json({ error: "user not found" }).status(404);
        }
        const pass = body.password;
        const check = await compare(pass, user.password);
        if (!check) {
            return res.status(404).json({ error: "Invalid user input" })
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "");

        return res.json({ token: token }).status(200);
    }
    catch (e) {
        return res.status(500).json({ error: "internal server error" });
    }
}

export default Signin;