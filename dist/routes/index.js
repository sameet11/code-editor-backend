"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const env_1 = __importDefault(require("./env"));
const folder_1 = __importDefault(require("./folder"));
const port_1 = __importDefault(require("./port"));
const router = (0, express_1.Router)();
router.use('/user/auth', auth_1.default);
router.use('/user/env', env_1.default);
router.use('/user/folder', folder_1.default);
router.use('/user/url', port_1.default);
exports.default = router;
