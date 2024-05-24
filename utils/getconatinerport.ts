import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface PortBinding {
  HostPort: string;
}

interface ContainerPortResult {
  data?: string[];
  error?: string;
}

async function getContainerPorts(containerId: string): Promise<ContainerPortResult> {
  try {
    const { stdout, stderr } = await execAsync(`docker inspect ${containerId}`);

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return { error: stderr };
    }

    const containerInfo = JSON.parse(stdout);
    const portMappings = containerInfo[0].NetworkSettings.Ports;

    const ports: string[] = [];
    for (const [containerPort, bindings] of Object.entries(portMappings)) {
      if (bindings) {
        const bindingArray = bindings as PortBinding[];
        bindingArray.forEach(binding => {
          ports.push(binding.HostPort);
        });
      }
    }

    if (ports.length === 0) {
      return { error: "no ports found" };
    }

    return { data: ports };
  } catch (error) {
    return { error: "container port error" };
  }
}

export default getContainerPorts;


