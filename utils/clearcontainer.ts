import { promisify } from 'util';
import { exec } from 'child_process';

const execPromisified = promisify(exec);

const stopContainer = async (containerId:string) => {
    const stopCommand = `docker stop ${containerId}`;
    try {
        const { stdout, stderr } = await execPromisified(stopCommand);

        if (stderr) {
            console.error(`Error stopping container ${containerId}: ${stderr}`);
            throw new Error(stderr);
        }
    } catch (error) {
        console.error(`Failed to stop container with containerId ${containerId}: ${error}`);
        throw error;
    }
};

const deleteContainer = async (containerId:string) => {
    const deleteCommand = `docker rm ${containerId}`;
    try {
        const { stdout, stderr } = await execPromisified(deleteCommand);

        if (stderr) {
            console.error(`Error deleting container ${containerId}: ${stderr}`);
            throw new Error(stderr);
        }

    } catch (error) {
        console.error(`Failed to delete container with containerId ${containerId}: ${error}`);
        throw error;
    }
};

const clearContainer = async (containerId:string) => {
    try {
        await stopContainer(containerId);
        await deleteContainer(containerId);
    } catch (error) {
        console.error(`Failed to clear container with containerId ${containerId}: ${error}`);
        throw error;
    }
};

export default clearContainer;
