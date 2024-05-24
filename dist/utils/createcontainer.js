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
const util_1 = require("util");
const child_process_1 = require("child_process");
const find_free_ports_1 = __importDefault(require("find-free-ports"));
const promisifiedExec = (0, util_1.promisify)(child_process_1.exec);
const createContainer = (folderpath, env) => __awaiter(void 0, void 0, void 0, function* () {
    let host;
    try {
        const [hostPort] = yield (0, find_free_ports_1.default)(1);
        host = hostPort.toString();
    }
    catch (e) {
        return { error: e };
    }
    const path = folderpath.split('/')[1];
    const image = env === "node" ? "node:1" : "react:1";
    const containerport = env === "node" ? "3000" : "5173";
    const dockerRunCommand = `docker run -d -p${host}:${containerport} -v ${folderpath}:/app -v /app/node_modules ${image}`;
    try {
        const { stdout, stderr } = yield promisifiedExec(dockerRunCommand);
        if (stderr) {
            throw new Error(stderr);
        }
        const containerId = stdout.trim();
        return {
            data: {
                hostPort: host,
                containerId: containerId
            }
        };
    }
    catch (error) {
        return { error: error };
    }
});
exports.default = createContainer;
