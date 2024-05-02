const Response = require("../../utilities/response");
const logger = require("../../utilities/logger");
const FileUploadService = require("../../services/FileUploadService");
const FileDownloadService = require("../../services/FileDownloadService");
const FileDeleteService = require("../../services/FileDeleteService");
const dotenv = require("dotenv");
dotenv.config();
const app = require("../../settings/app");

async function addFile(req, res, next) {
    try {

        let FileDeleteServiceObj = new FileUploadService();
        let response = await FileDeleteServiceObj.uploadFile(req);
            
        if (response.status === "success") {
            res.json(Response.success(response.data));
        } else {
            res.json(Response.errorWithMessage(response.data), 500);
        }
        
    } catch (error) {
        console.log(error)
        logger.log('error', error);
        next(error);
    }
}


async function deleteFile(req, res, next) {

    try {

        let FileDeleteServiceObj = new FileDeleteService();

        let response = await FileDeleteServiceObj.deleteFile(req);
        
        if (response.status === "success") {
            res.json(Response.success(response.data));
        } else {
            res.json(Response.errorWithMessage(response.data), 500);
        }

    } catch (error) {
        next(error);
    }
}



async function downloadFile(req, res, next) {

    try {

        let FileDownloadServiceObj = new FileDownloadService();
        let response = await FileDownloadServiceObj.getFileData(req);

        if (response.status === "success") {
            if(app.storage === "local"){
                res.download(response.data);
            } else if(app.storage === "S3"){
                res.attachment(response.data.file_name);
                response.data.s3
                .getObject(response.data.options)
                .createReadStream().pipe(res);
            }
        } else {
            res.json(Response.errorWithMessage(response.data), 500);
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {
    addFile,
    deleteFile,
    downloadFile
};
