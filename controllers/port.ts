import { Request, Response } from "express";
import ngrok from "@ngrok/ngrok";

const Port = async (req: Request, res: Response) => {
    const port = req.query.port;
    if (typeof port !== "string") {
        return res.json({ error: "inavlid input" })
    }
    const portno = parseInt(port);
    try {
        const listener = (await ngrok.connect({ addr: portno, authtoken_from_env: true })).url();
        res.json({ data: listener }).status(200);
    }
    catch (e) {
        return res.json({ error: e }).status(404);
    }
};

export default Port;

