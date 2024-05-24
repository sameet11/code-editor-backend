import fs from "fs";
const EditFile = (path: string, content: string) => {
    try {
        fs.writeFileSync(path, content);
        return { data: "file updated" }
    }
    catch (e) {
        return { error: "something went wrong" }
    }
}
export default EditFile;