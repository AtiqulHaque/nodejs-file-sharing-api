const Response = require("../../utilities/response");
const logger = require("../../utilities/logger");
const dotenv = require("dotenv");
const Token = require("../../utilities/base62Encoder");
const GenerateKeyService = require("../../services/GeneratekeyService");
const FileUploadService = require("../../services/FileUploadService");
const FileDownloadService = require("../../services/FileDownloadService");
const FileRepository = require("../../database/repositories/FileRepository");
const FileDeleteService = require("../../services/FileDeleteService");
const StorageFactory = require("../../services/storage/StorageFactory");

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
        let response = await FileDownloadServiceObj.getFileData(req, res, next);

        if (response.status === "success") {
            res.download(response.data)
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
