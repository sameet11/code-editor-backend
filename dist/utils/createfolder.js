"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const createFolder = (name, rootpath) => {
    try {
        const pathname = rootpath + name;
        fs_1.default.mkdirSync(pathname, { recursive: true });
        return { data: pathname };
    }
    catch (error) {
        return { error: error };
    }
};
exports.default = createFolder;
