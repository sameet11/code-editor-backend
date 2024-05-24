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
exports.updateActiveContainer = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const activecontainer_1 = require("../global variables/activecontainer");
const clearcontainer_1 = __importDefault(require("./clearcontainer"));
const clearonserver_1 = __importDefault(require("./clearonserver"));
const updateActiveContainer = () => {
    node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        const currenttime = new Date();
        for (const [key, value] of activecontainer_1.activeContainer.entries()) {
            if (checkDifferenceInMinutes(currenttime, value.timeStamp)) {
                try {
                    yield (0, clearcontainer_1.default)(value.containerId);
                    yield (0, clearonserver_1.default)(key);
                    activecontainer_1.activeContainer.delete(key);
                }
                catch (error) {
                    console.error(`Error processing container ${value.containerId}:`, error);
                }
            }
        }
    }));
};
exports.updateActiveContainer = updateActiveContainer;
const checkDifferenceInMinutes = (currentime, timestamp) => {
    const timeDifference = currentime.getTime() - timestamp.getTime();
    const differenceInMinutes = Math.floor(timeDifference / (1000 * 60));
    return differenceInMinutes >= 1;
};
