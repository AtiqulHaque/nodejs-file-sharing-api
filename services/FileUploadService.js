const {upload} = require("./ImageUpload");
const StorageFactory = require("./storage/StorageFactory");
const FileRepository = require("../database/repositories/FileRepository");
const GenerateKeyService = require("./GeneratekeyService");
class FileUploadService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
        this.keyService = new GenerateKeyService();
    }

    async uploadFile(req){

        const uploadResponse  =  await this.fileStorage.uploadFile(req);

        if(uploadResponse.status === "success"){
            const keys = this.keyService.getKeys();
            const uploadData = uploadResponse.data;

            await this.repository.addFile({
                private_key : keys.privateKey,
                public_key : keys.publicKey,
                file_name : uploadData.filename,
                file_mimetype : uploadData.mimetype,
            });

            return {
                "status" : "success",
                "data" : keys
            }
        }

        
        return {
            "status" : "error",
            "data" : "file not found"
        }
    }
}

module.exports = FileUploadService;