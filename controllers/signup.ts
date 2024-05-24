import { signupSchema } from "../types";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const Signup = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const result = signupSchema.safeParse(body);
        if (!result.success) {
            return res.status(404).json({ error: "Inavlid Input" });
        }
        const existinguser = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })

        if (existinguser) {
            return res.json({ error: "user already exists" }).status(404);
        }

        const hashpass = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashpass,
            }
        })
        if (user) {
            const Token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "")
            return res.status(200).json({ token: Token });
        }
        else {
            return res.json({ error: "Db error" }).status(500);
        }
    } catch (e) {
        res.json({ error: "something went Wrong" }).status(500);
    }
}

export const CheckUsers = async (req: Request, res: Response) => {

    return res.json({ data: "user verified" });

}
