"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Makefile = (path, content) => {
    try {
        fs_1.default.writeFileSync(path, content);
        return { data: "file created" };
    }
    catch (e) {
        return { error: e };
    }
};
exports.default = Makefile;
