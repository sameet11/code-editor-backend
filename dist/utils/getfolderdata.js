"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Getfolderdata = (pathname) => {
    const folderPath = `${process.env.FOLDER_PATH}${pathname}`;
    const files = fs_1.default.readdirSync(folderPath);
    const folderContents = [];
    files.forEach(fileName => {
        const itemPath = path_1.default.join(folderPath, fileName);
        const stats = fs_1.default.statSync(itemPath);
        const type = stats.isDirectory() ? 'folder' : 'file';
        if (type === 'file') {
            const data = fs_1.default.readFileSync(itemPath, 'utf8');
            folderContents.push({
                name: fileName,
                content: data
            });
        }
        else {
            folderContents.push({
                name: fileName
            });
        }
    });
    if (folderContents.length === files.length) {
        return { data: folderContents };
    }
    else {
        return { error: "Something went wrong" };
    }
};
exports.default = Getfolderdata;
