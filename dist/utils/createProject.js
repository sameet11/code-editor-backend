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
const s3client_1 = __importDefault(require("../utils/s3client"));
const client_s3_1 = require("@aws-sdk/client-s3");
const createfolder_1 = __importDefault(require("./createfolder"));
const createfile_1 = __importDefault(require("./createfile"));
const createProject = (name, rootpath) => __awaiter(void 0, void 0, void 0, function* () {
    const { Contents } = yield s3client_1.default.send(new client_s3_1.ListObjectsV2Command({
        Bucket: process.env.BUCKET_NAME,
        Prefix: name,
    }));
    if (!Contents) {
        throw new Error("Couldn't retrieve folder from AWS");
    }
    const pathname = rootpath + '/';
    for (let i = 0; i < Contents.length; i++) {
        const file = Contents[i];
        if (!file.Key) {
            throw new Error("Something went wrong");
        }
        const folders = file.Key.split('/').slice(0, -1);
        folders.shift();
        if (folders.length >= 1) {
            const name = folders.join('/');
            const result = (0, createfolder_1.default)(name, pathname);
            if (result.error) {
                return { error: "folder not created" };
            }
        }
        const result = yield (0, createfile_1.default)(file.Key, pathname);
        if (result.error) {
            return { error: "file not created" };
        }
    }
    return { data: "created Project" };
});
exports.default = createProject;
