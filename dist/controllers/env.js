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
exports.getConatainer = exports.createEnv = void 0;
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const createProject_1 = __importDefault(require("../utils/createProject"));
const createfolder_1 = __importDefault(require("../utils/createfolder"));
const createcontainer_1 = __importDefault(require("../utils/createcontainer"));
const getfolderdata_1 = __importDefault(require("../utils/getfolderdata"));
const activecontainer_1 = require("../global variables/activecontainer");
const getconatinerport_1 = __importDefault(require("../utils/getconatinerport"));
const createEnv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const env = req.params.name;
    const createEnv = yield prismaClient_1.default.environment.create({
        data: {
            userId: req.userId
        }
    });
    const objectkey = createEnv.id + req.userId + env;
    const updateenv = yield prismaClient_1.default.environment.update({
        where: {
            id: createEnv.id,
        }, data: {
            objectkey,
        }
    });
    const rootpath = `D:/${updateenv.objectkey}`;
    const result = (0, createfolder_1.default)("", rootpath);
    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }
    const data = yield (0, createProject_1.default)(env, rootpath);
    if (data.error || !data.data) {
        return res.json({ error: data.error }).status(404);
    }
    const container = yield (0, createcontainer_1.default)(result.data, env);
    if (container.error || !container.data) {
        return res.json({ error: "error" }).status(404);
    }
    activecontainer_1.activeContainer.set(rootpath + '/', {
        containerId: container.data.containerId,
        timeStamp: new Date(),
    });
    if (!updateenv.objectkey) {
        return;
    }
    const folderdata = (0, getfolderdata_1.default)(updateenv.objectkey);
    if (!folderdata.data || folderdata.error) {
        return req.json({ error: folderdata.error }).status(404);
    }
    const folderwithcontent = folderdata.data.filter(file => file.content);
    const folderwithoutcontent = folderdata.data.filter(file => !file.content);
    const folder = [...folderwithoutcontent, ...folderwithcontent];
    return res.json({
        data: {
            port: container.data.hostPort,
            containerid: container.data.containerId,
            path: updateenv.objectkey + '/',
            folder: folder
        }
    }).status(200);
});
exports.createEnv = createEnv;
const getConatainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foldername = req.query.rootpath;
    if (typeof foldername !== "string") {
        return res.json({ error: "invalid input" }).status(404);
    }
    const containerAndTimestamp = activecontainer_1.activeContainer.get(`D:/${foldername}`);
    if (containerAndTimestamp === undefined) {
        return res.json({ error: "no conatainer found" }).status(404);
    }
    const result = yield (0, getconatinerport_1.default)(containerAndTimestamp.containerId);
    if (result.error || !result.data) {
        return res.json({ error: "port not found" }).status(404);
    }
    return res.json({
        containerId: containerAndTimestamp.containerId,
        port: result.data
    });
});
exports.getConatainer = getConatainer;
