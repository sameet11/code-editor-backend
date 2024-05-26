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
exports.UpdateFile = exports.MakeFile = exports.Makefolder = void 0;
const getfolderdata_1 = __importDefault(require("../utils/getfolderdata"));
const createfolder_1 = __importDefault(require("../utils/createfolder"));
const makefile_1 = __importDefault(require("../utils/makefile"));
const editfile_1 = __importDefault(require("../utils/editfile"));
const Getfolder = (req, res) => {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const folderdata = (0, getfolderdata_1.default)(pathname);
    if (folderdata.error || !folderdata.data) {
        return res.json({ error: folderdata.error }).status(404);
    }
    const folderwithcontent = folderdata.data.filter(file => file.content);
    const folderwithoutcontent = folderdata.data.filter(file => !file.content);
    const folder = [...folderwithoutcontent, ...folderwithcontent];
    return res.json({ data: { folder: folder } }).status(200);
};
const Makefolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const response = (0, createfolder_1.default)("", path);
    if (response.error || !response.data) {
        return res.json({ error: response.error }).status(404);
    }
    return res.json({ data: "folder created" }).status(200);
});
exports.Makefolder = Makefolder;
const MakeFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pathname = req.query.path;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const result = (0, makefile_1.default)(path, "");
    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }
    return res.json({ data: result.data }).status(200);
});
exports.MakeFile = MakeFile;
const UpdateFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pathname = req.query.path;
    const body = req.body;
    if (typeof pathname !== "string") {
        return res.json({ error: "invalid Input" }).status(404);
    }
    const path = `${process.env.FOLDER_PATH}${pathname}`;
    const result = (0, editfile_1.default)(path, body.content);
    if (result.error || !result.data) {
        return res.json({ error: result.error }).status(404);
    }
    return res.json({ data: result.data }).status(200);
});
exports.UpdateFile = UpdateFile;
exports.default = Getfolder;
