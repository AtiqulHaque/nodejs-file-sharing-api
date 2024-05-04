const StorageFactory = require("./storage/StorageFactory");
const FileRepository = require("../database/repositories/FileRepository");
const GenerateKeyService = require("./GeneratekeyService");
class FileUploadService {

    constructor(){
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
        this.keyService = new GenerateKeyService(16);
    }

    async uploadFile(req){

        const uploadResponse  =  await this.fileStorage.uploadFile(req);

        if(uploadResponse.status === "success"){
            const { publicKey, privateKey } = this.keyService.getKeys();
            const {filename, mimetype} = uploadResponse.data;

            await this.repository.addFile({
                private_key : privateKey,
                public_key : publicKey,
                file_name : filename,
                file_mimetype : mimetype,
            });

            return {
                "status" : "success",
                "data" : {publicKey, privateKey}
            }
        }

        
        return {
            "status" : "error",
            "data" : "file not found"
        }
    }
}

module.exports = FileUploadService;