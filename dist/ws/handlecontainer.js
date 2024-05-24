"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContainer = void 0;
const pty = __importStar(require("node-pty"));
const os_1 = __importDefault(require("os"));
const handleContainer = (socket) => {
    const containerId = socket.handshake.query.containerId;
    const shell = os_1.default.platform() === 'win32' ? 'powershell.exe' : 'bash';
    const ptyProcess = pty.spawn(shell, ['docker', 'exec', '-it', containerId, '/bin/sh'], {
        name: 'xterm-color',
        cwd: process.env.HOME,
    });
    ptyProcess.onData((data) => {
        socket.emit("commandoutput", data);
    });
    ptyProcess.onExit(() => {
        socket.emit("commandstatus", "closed");
    });
    socket.on("command", (input) => {
        const { command } = JSON.parse(input);
        ptyProcess.write(`${command}`);
    });
};
exports.handleContainer = handleContainer;
