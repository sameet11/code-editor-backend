import cron from "node-cron";
import { activeContainer } from "../global variables/activecontainer";
import clearContainer from "./clearcontainer";
import clearOnServer from "./clearonserver";

export const updateActiveContainer = () => {

    cron.schedule('*/1 * * * *', async () => {
        const currenttime = new Date();
        for (const [key, value] of activeContainer.entries()) {
            if (checkDifferenceInMinutes(currenttime, value.timeStamp)) {
                try {
                    await clearContainer(value.containerId);
                    await clearOnServer(key);
                    activeContainer.delete(key);
                } catch (error) {
                    console.error(`Error processing container ${value.containerId}:`, error);
                }
            }
        }
    });
};

const checkDifferenceInMinutes = (currentime:Date, timestamp:Date) => {
    const timeDifference = currentime.getTime() - timestamp.getTime();
    const differenceInMinutes = Math.floor(timeDifference / (1000 * 60));
    return differenceInMinutes >= 20;
};
