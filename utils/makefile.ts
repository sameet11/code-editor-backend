import fs from "fs";
const Makefile = (path: string, content: string) => {
    try {
        fs.writeFileSync(path, content);
        return { data: "file created" };
    }
    catch (e) {
        return { error: e };
    }
}
export default Makefile;