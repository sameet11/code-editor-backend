import fs from "fs";
import path from "path";

interface Folder {
    name: string;
    content?: string;
}
const Getfolderdata = (pathname: string) => {
    const folderPath = `D:/${pathname}`
    const files = fs.readdirSync(folderPath)

    const folderContents: Folder[] = [];

    files.forEach(fileName => {
        const itemPath = path.join(folderPath, fileName);

        const stats = fs.statSync(itemPath)

        const type = stats.isDirectory() ? 'folder' : 'file';

        if (type === 'file') {
            const data = fs.readFileSync(itemPath, 'utf8',)

            folderContents.push({
                name: fileName,
                content: data
            });

        }
        else {
            folderContents.push({
                name: fileName
            });
        }
    });
    if (folderContents.length === files.length) {
        return { data: folderContents }
    }
    else {
        return { error: "Something went wrong" }
    }
}
export default Getfolderdata;