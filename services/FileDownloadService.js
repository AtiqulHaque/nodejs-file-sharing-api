const {upload, modifyUploader} = require("./ImageUpload");
const StorageFactory = require("./storage/StorageFactory");
const imageUpload = upload.fields([
    {name: 'file', maxCount: 1}
]);

const FileRepository = require("../database/repositories/FileRepository");




class FileDownloadService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async getFileData(req){

        const {publickey} = {...req.params}

        const fileResponse = await this.repository.getFileByPubKey(publickey);

        if(fileResponse.status === "success"){
            
            await this.repository.updateLastExcessTimeByPublicKey(publickey);
                
            return {
                "status" : "success",
                "data" : this.fileStorage.getFile(fileResponse.data)
            }
        }

        return {
            "status" : "error",
            "data" : "File not found"
        }

        
    }
}

module.exports = FileDownloadService;