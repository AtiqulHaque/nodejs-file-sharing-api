const { upload } = require('../ImageUpload');
const app_settings = require('./../../settings/app');
const fs = require('fs');

const directoryPath = __basedir + '/' + app_settings.upload_folder + '/';

class LocalStorageService {
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
    getFile(file) {
        //  return directoryPath + file.file_name;
        return fs.createReadStream(directoryPath + file.file_name);
    }

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
