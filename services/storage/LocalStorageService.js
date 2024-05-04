const { upload } = require('../ImageUpload');
const app_settings = require('./../../settings/app');
const fs = require('fs');

const directoryPath = __basedir + '/' + app_settings.upload_folder + '/';

/**
 * @description Service for Local Storage Operations
 * @class LocalStorageService
 * @date 04/05/2024
 */
class LocalStorageService {
    /**
     * @description Upload a file to local storage
     * @param {*} req - The request object containing the file to be uploaded
     * @returns {*} - Status and data of the upload operation
     * @memberof LocalStorageService
     */
    uploadFile(req) {
        return new Promise((resolve, reject) => {
            upload.single('file')(req, {}, function (err) {
                if (err) {
                    reject({
                        status: 'error',
                        data: err.message,
                    });
                }

                resolve({
                    status: 'success',
                    data: req.file,
                });
            });
        });
    }

    /**
     * @description Get a file from local storage
     * @param {*} file - The file object containing file_name
     * @returns {*} - Read stream of the file
     * @memberof LocalStorageService
     */
    getFile(file) {
        return fs.createReadStream(directoryPath + file.file_name);
    }

    /**
     * @description Delete a file from local storage
     * @param {*} filePath - The path of the file to be deleted
     * @returns {*} - Status and message of the deletion operation
     * @memberof LocalStorageService
     */
    deleteFile(filePath) {
        try {
            fs.unlinkSync(directoryPath + filePath);

            return {
                status: 'success',
                data: `File ${filePath} has been deleted.`,
            };
        } catch (err) {
            console.error(err);
            return {
                status: 'error',
                data: 'Something went wrong',
            };
        }
    }
}

module.exports = LocalStorageService;
