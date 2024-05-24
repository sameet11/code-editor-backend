"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const port_1 = __importDefault(require("../controllers/port"));
const portRouter = (0, express_1.Router)();
portRouter.get('/sendurl', authMiddleware_1.default, port_1.default);
exports.default = portRouter;
