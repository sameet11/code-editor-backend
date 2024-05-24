import express from 'express';
import cors from "cors";
import router from "../routes/index"
import { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'node:http';
import { handleContainer } from "../ws/handlecontainer";
import {updateActiveContainer} from "../utils/cron-job";

const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*",
  }
});
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err }).status(500);
});
io.on('connection', (socket: Socket) => {
  handleContainer(socket);
});
updateActiveContainer();
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
