const StorageFactory = require("./storage/StorageFactory");
const FileRepository = require("../database/repositories/FileRepository");
const CacheHandler = require("./../utilities/CacheHandler");

class FileDownloadService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async getFileData(req){

        const {publickey} = {...req.params}
        let fileResponse = await CacheHandler.get(publickey);

        if(!fileResponse){
            console.log("Cache miss");
            const {status, data} = await this.repository.getFileByPubKey(publickey);

            if(status !== "success"){
                return {
                    "status" : "error",
                    "data" : "File not found"
                }
            }
            fileResponse = data;
            await CacheHandler.set(publickey, JSON.stringify(data), 30);
        } else {
            console.log("Cache Hit");
            fileResponse = JSON.parse(fileResponse);
        }

        if(fileResponse){
            await this.repository.updateLastExcessTimeByPublicKey(publickey);
            return {
                "status" : "success",
                "data" : {
                    fileHandler : this.fileStorage.getFile(fileResponse),
                    file_meta_data : fileResponse
                }
            }
        }

        return {
            "status" : "error",
            "data" : "File not found"
        }

        
    }
}

module.exports = FileDownloadService;