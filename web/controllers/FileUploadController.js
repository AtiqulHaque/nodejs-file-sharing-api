const Response = require("../../utilities/response");
const logger = require("../../utilities/logger");
const dotenv = require("dotenv");
const Token = require("./../../utilities/base62Encoder");
const GenerateKeyService = require("../../services/GeneratekeyService");
const FileUploadService = require("../../services/FileUploadService");
const FileRepository = require("../../database/repositories/FileRepository");
async function addFile(req, res, next) {
    try {
        const uploder = new FileUploadService();
        const uploadData = await uploder.uploadFile(req)

        let params = {...req.body};
       // console.log(uploadData)
        let keyService = new GenerateKeyService();

        const keys = keyService.getKeys() ;
        
        const companyRepository = new FileRepository();

        try {
            await companyRepository.addFile({
                private_key : "",
                public_key : "",
                file_name : uploadData.originalname,
                file_mimetype : uploadData.mimetype,
            });

            if (response.status === "success") {
                res.json(Response.success(keys));
            } else {
                res.json(Response.errorWithMessage(response.payload), 500);
            }

            

        } catch(error){
            res.json(Response.errorWithMessage(error.message), 500);
        }
        
    } catch (error) {
        console.log(error)
        logger.log('error', error);
        next(error);
    }
}


module.exports = {
    addFile
};
