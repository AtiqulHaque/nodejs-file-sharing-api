
const StorageFactory = require("../services/storage/StorageFactory");
const FileRepository = require("./../database/repositories/FileRepository");


class FileDeleteService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async deleteFile(privatekey){

       

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