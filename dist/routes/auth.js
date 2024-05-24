"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = require("../controllers/signup");
const signin_1 = __importDefault(require("../controllers/signin"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const Authrouter = (0, express_1.Router)();
Authrouter.post('/signup', signup_1.Signup);
Authrouter.post('/signin', signin_1.default);
Authrouter.get('/check', authMiddleware_1.default, signup_1.CheckUsers);
exports.default = Authrouter;
