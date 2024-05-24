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
const fs_1 = __importDefault(require("fs"));
const s3client_1 = __importDefault(require("./s3client"));
const client_s3_1 = require("@aws-sdk/client-s3");
const createFile = (name, rootpath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Body } = yield s3client_1.default.send(new client_s3_1.GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: name
        }));
        if (!Body) {
            return { error: "AWS error" };
        }
        const firstIndex = name.indexOf('/');
        const newname = name.slice(firstIndex + 1, name.length);
        const pathname = rootpath + newname;
        const content = yield Body.transformToString();
        fs_1.default.writeFileSync(pathname, content);
        return { data: "success" };
    }
    catch (error) {
        return { error: error };
    }
});
exports.default = createFile;
