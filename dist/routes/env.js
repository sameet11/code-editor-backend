"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const env_1 = require("../controllers/env");
const env_2 = require("../controllers/env");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const updateactive_1 = __importDefault(require("../middleware/updateactive"));
const envRouter = (0, express_1.Router)();
envRouter.get('/create/:name', authMiddleware_1.default, env_1.createEnv);
envRouter.get('/getcontainer', authMiddleware_1.default, updateactive_1.default, env_2.getConatainer);
exports.default = envRouter;
