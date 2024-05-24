"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const folder_1 = __importDefault(require("../controllers/folder"));
const folder_2 = require("../controllers/folder");
const folder_3 = require("../controllers/folder");
const folder_4 = require("../controllers/folder");
const updateactive_1 = __importDefault(require("../middleware/updateactive"));
const folderRouter = (0, express_1.Router)();
folderRouter.get('/', authMiddleware_1.default, updateactive_1.default, folder_1.default);
folderRouter.post('/create', authMiddleware_1.default, updateactive_1.default, folder_2.Makefolder);
folderRouter.post('/createfile', authMiddleware_1.default, updateactive_1.default, folder_3.MakeFile);
folderRouter.post('/updatefile', authMiddleware_1.default, updateactive_1.default, folder_4.UpdateFile);
exports.default = folderRouter;
