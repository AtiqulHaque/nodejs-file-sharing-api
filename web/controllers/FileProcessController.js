const Response = require('../../utilities/response');
const logger = require('../../utilities/logger');
const FileUploadService = require('../../services/FileUploadService');
const FileDownloadService = require('../../services/FileDownloadService');
const FileDeleteService = require('../../services/FileDeleteService');
const dotenv = require('dotenv');
dotenv.config();

async function addFile(req, res, next) {
    try {
        let FileDeleteServiceObj = new FileUploadService();
        let { status, data } = await FileDeleteServiceObj.uploadFile(req);

        if (status === 'success') {
            res.json(Response.success(data));
        } else {
            res.json(Response.errorWithMessage(data), 500);
        }
    } catch (error) {
        console.log(error);
        logger.log('error', error);
        next(error);
    }
}

async function deleteFile(req, res, next) {
    try {
        let FileDeleteServiceObj = new FileDeleteService();
        const { privatekey } = { ...req.params };
        let { status, data } = await FileDeleteServiceObj.deleteFile(privatekey);

        if (status === 'success') {
            res.json(Response.success(data));
        } else {
            res.json(Response.errorWithMessage(data), 500);
        }
    } catch (error) {
        next(error);
    }
}

/**
 * @returns
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function downloadFile(req, res, next) {
    try {
        let FileDownloadServiceObj = new FileDownloadService();

        const { status, data } = await FileDownloadServiceObj.getFileData(req);

        if (typeof status !== 'undefined' && status === 'success') {
            const { fileHandler, file_meta_data } = data;
            res.setHeader('Content-Type', file_meta_data.file_mimetype);
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=${file_meta_data.file_name}`
            );
            fileHandler.pipe(res);
        } else {
            res.json(Response.errorWithMessage(data), 500);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addFile,
    deleteFile,
    downloadFile,
};
