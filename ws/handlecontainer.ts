import { Socket } from "socket.io";
import * as pty from "node-pty";

export const handleContainer = (socket: Socket) => {
  const containerId = socket.handshake.query.containerId as string;

  const ptyProcess = pty.spawn('docker', ['exec', '-it', containerId, '/bin/sh'], {
    name: 'xterm-color',
    cwd: process.env.HOME,
  }) 
  ptyProcess.onData((data: string) => {
      socket.emit("commandoutput", data);
  });

  ptyProcess.onExit(()=>{
    socket.emit("commandstatus","closed")
  })

  socket.on("command", (input: string) => {
      const { command } = JSON.parse(input);
      ptyProcess.write(`${command}`);
  });

};





