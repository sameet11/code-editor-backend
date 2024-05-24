import fs from "fs";
const createFolder = (name: string, rootpath: string) => {
    try {
        const pathname = rootpath + name;
        fs.mkdirSync(pathname, { recursive: true });
        return { data: pathname };
    } catch (error) {
        return { error: error };
    }
};

export default createFolder;