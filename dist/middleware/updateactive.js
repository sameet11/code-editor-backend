"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActive = void 0;
const activecontainer_1 = require("../global variables/activecontainer");
const updateActive = (req, res, next) => {
    const rootpath = req.query.rootpath;
    if (!rootpath) {
        return res.status(400).json({ error: "Input error" });
    }
    const pathOnServer = `D:/${rootpath}`;
    if (!activecontainer_1.activeContainer.has(pathOnServer)) {
        return res.status(404).json({ error: "Invalid path" });
    }
    const currentcontainer = activecontainer_1.activeContainer.get(pathOnServer);
    if (!currentcontainer) {
        return res.json({ error: "something went wrong" }).status(404);
    }
    const newparameters = Object.assign(Object.assign({}, currentcontainer), { timeStamp: new Date() });
    activecontainer_1.activeContainer.set(pathOnServer, newparameters);
    next();
};
exports.updateActive = updateActive;
exports.default = exports.updateActive;
