const {upload, modifyUploader} = require("./ImageUpload");
const StorageFactory = require("../services/storage/StorageFactory");
const imageUpload = upload.fields([
    {name: 'file', maxCount: 1}
]);

const FileRepository = require("./../database/repositories/FileRepository");




class FileDeleteService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async deleteFile(req){

        const {privatekey} = {...req.params}

        const fileResponse = await this.repository.getFileByPrivateKey(privatekey);

        if(fileResponse.status === "success"){
            
            const deleteResponse = await this.fileStorage.deleteFile(fileResponse.data.file_name)

            if(deleteResponse.status === "success"){
                await this.repository.removePrivatKeyById(privatekey);
                
                return {
                    "status" : "success",
                    "data" : "File has been delete successfully"
                }
            }
        }

        return {
            "status" : "error",
            "data" : "File not found"
        }

        
    }
}

module.exports = FileDeleteService;