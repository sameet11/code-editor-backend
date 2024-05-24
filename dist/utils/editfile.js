"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const EditFile = (path, content) => {
    try {
        fs_1.default.writeFileSync(path, content);
        return { data: "file updated" };
    }
    catch (e) {
        return { error: "something went wrong" };
    }
};
exports.default = EditFile;
