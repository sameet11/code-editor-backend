"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.activeSchema = zod_1.z.map(zod_1.z.string(), zod_1.z.object({
    containerId: zod_1.z.string(),
    timeStamp: zod_1.z.date(),
}));
