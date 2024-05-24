import { Socket } from "socket.io";
import * as pty from "node-pty";
import os from "os";

export const handleContainer = (socket: Socket) => {
  const containerId = socket.handshake.query.containerId as string;
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  const ptyProcess = pty.spawn(shell, ['docker', 'exec', '-it', containerId, '/bin/sh'], {
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




