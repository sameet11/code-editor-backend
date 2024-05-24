import fs from "fs";
const clearOnServer=async (path:string)=>{
    try{
    fs.rmSync(path,{recursive:true});
    }
    catch(e){
    }
}
export default clearOnServer;