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
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const child_process_1 = require("child_process");
const execPromisified = (0, util_1.promisify)(child_process_1.exec);
const stopContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    const stopCommand = `docker stop ${containerId}`;
    try {
        const { stdout, stderr } = yield execPromisified(stopCommand);
        if (stderr) {
            console.error(`Error stopping container ${containerId}: ${stderr}`);
            throw new Error(stderr);
        }
    }
    catch (error) {
        console.error(`Failed to stop container with containerId ${containerId}: ${error}`);
        throw error;
    }
});
const deleteContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCommand = `docker rm ${containerId}`;
    try {
        const { stdout, stderr } = yield execPromisified(deleteCommand);
        if (stderr) {
            console.error(`Error deleting container ${containerId}: ${stderr}`);
            throw new Error(stderr);
        }
    }
    catch (error) {
        console.error(`Failed to delete container with containerId ${containerId}: ${error}`);
        throw error;
    }
});
const clearContainer = (containerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stopContainer(containerId);
        yield deleteContainer(containerId);
    }
    catch (error) {
        console.error(`Failed to clear container with containerId ${containerId}: ${error}`);
        throw error;
    }
});
exports.default = clearContainer;
