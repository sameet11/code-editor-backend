import { promisify } from 'util';
import { exec } from 'child_process';
import findFreePorts from 'find-free-ports';

const promisifiedExec = promisify(exec);


const createContainer = async (folderpath: string, env: string) => {
    let host: string;

    try {
        const [hostPort] = await findFreePorts(1);
        host = hostPort.toString();
    } catch (e) {
        return { error: e };
    }
    const path = folderpath.split('/')[1];
    const image = env === "node" ? "node:1" : "react:1"
    const containerport = env === "node" ? "3000" : "5173"
    const dockerRunCommand = `docker run -d -p${host}:${containerport} -v ${folderpath}:/app -v /app/node_modules ${image}`

    try {
        const { stdout, stderr } = await promisifiedExec(dockerRunCommand);

        if (stderr) {
            throw new Error(stderr);
        }

        const containerId = stdout.trim();

        return {
            data: {
                hostPort: host,
                containerId: containerId
            }
        };
    } catch (error) {
        return { error: error };
    }


};

export default createContainer;






