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
exports.CheckUsers = exports.Signup = void 0;
const types_1 = require("../types");
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = types_1.signupSchema.safeParse(body);
        if (!result.success) {
            return res.status(404).json({ error: "Inavlid Input" });
        }
        const existinguser = yield prismaClient_1.default.user.findFirst({
            where: {
                email: body.email
            }
        });
        if (existinguser) {
            return res.json({ error: "user already exists" }).status(404);
        }
        const hashpass = yield bcryptjs_1.default.hash(body.password, 10);
        const user = yield prismaClient_1.default.user.create({
            data: {
                email: body.email,
                password: hashpass,
            }
        });
        if (user) {
            const Token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "");
            return res.status(200).json({ token: Token });
        }
        else {
            return res.json({ error: "Db error" }).status(500);
        }
    }
    catch (e) {
        res.json({ error: "something went Wrong" }).status(500);
    }
});
exports.Signup = Signup;
const CheckUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ data: "user verified" });
});
exports.CheckUsers = CheckUsers;
