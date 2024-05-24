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
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
function getContainerPorts(containerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { stdout, stderr } = yield execAsync(`docker inspect ${containerId}`);
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return { error: stderr };
            }
            const containerInfo = JSON.parse(stdout);
            const portMappings = containerInfo[0].NetworkSettings.Ports;
            const ports = [];
            for (const [containerPort, bindings] of Object.entries(portMappings)) {
                if (bindings) {
                    const bindingArray = bindings;
                    bindingArray.forEach(binding => {
                        ports.push(binding.HostPort);
                    });
                }
            }
            if (ports.length === 0) {
                return { error: "no ports found" };
            }
            return { data: ports };
        }
        catch (error) {
            return { error: "container port error" };
        }
    });
}
exports.default = getContainerPorts;
