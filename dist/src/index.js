"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../routes/index"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const handlecontainer_1 = require("../ws/handlecontainer");
const cron_job_1 = require("../utils/cron-job");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', index_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ error: err }).status(500);
});
io.on('connection', (socket) => {
    (0, handlecontainer_1.handleContainer)(socket);
});
(0, cron_job_1.updateActiveContainer)();
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
