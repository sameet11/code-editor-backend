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
const ngrok_1 = __importDefault(require("@ngrok/ngrok"));
const Port = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const port = req.query.port;
    if (typeof port !== "string") {
        return res.json({ error: "inavlid input" });
    }
    const portno = parseInt(port);
    try {
        const listener = (yield ngrok_1.default.connect({ addr: portno, authtoken_from_env: true })).url();
        res.json({ data: listener }).status(200);
    }
    catch (e) {
        return res.json({ error: e }).status(404);
    }
});
exports.default = Port;
