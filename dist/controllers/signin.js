"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const types_1 = require("../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = types_1.signupSchema.safeParse(body);
        if (!result.success) {
            return res.status(404).json({ error: "Inavlid Input" });
        }
        const user = yield prismaClient_1.default.user.findFirst({
            where: {
                email: body.email
            }
        });
        if (!user) {
            return res.json({ error: "user not found" }).status(404);
        }
        const pass = body.password;
        const check = yield (0, bcryptjs_1.compare)(pass, user.password);
        if (!check) {
            return res.status(404).json({ error: "Invalid user input" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "");
        return res.json({ token: token }).status(200);
    }
    catch (e) {
        return res.status(500).json({ error: "internal server error" });
    }
});
exports.default = Signin;
