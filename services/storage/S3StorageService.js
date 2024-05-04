const app_settings = require('./../../settings/app');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
const s3_settings = require('./../../settings/providers/s3');

// Create an instance of the S3 service
const s3 = new aws.S3({
    accessKeyId: s3_settings.ACCESS_KEY,
    secretAccessKey: s3_settings.ACCESS_SECRET,
});

/** @type {*} */
const s3Uploader = multer({
    // Configure multer to upload files directly to S3
    storage: multerS3({
        acl: 'public-read', // Set file permissions to public-read
        s3, // Specify the S3 instance
        bucket: s3_settings.BUCKET_NAME + '/files', // Set the bucket and folder to upload files
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically detect and set the content type of uploaded files
        key: function (req, file, cb) {
            // Set the key (filename) for the uploaded file
            cb(
                null,
                `${Date.now().toString()}_${file.fieldname}${path
                    .extname(file.originalname)
                    .toLowerCase()}`
            );
        },
    }),
});

/**
 * @description Service for Amazon S3 Storage Operations
 * @class S3StorageService
 * @date 04/05/2024
 */
class S3StorageService {
    /**
     * @description Upload a file to Amazon S3
     * @param {*} req - The request object containing the file to be uploaded
     * @returns {*} - Status and data of the upload operation
     * @memberof S3StorageService
     */
    uploadFile(req) {
        return new Promise((resolve, reject) => {
            // Use multer middleware to handle file upload
            s3Uploader.single('file')(req, {}, function (err) {
                if (err) {
                    // If upload fails, reject the promise with an error
                    reject({
                        status: 'error',
                        data: err.message,
                    });
                }
                // If upload succeeds, resolve the promise with upload information
                resolve({
                    status: 'success',
                    data: {
                        filename: req.file.key, // Uploaded file's key (filename)
                        mimetype: req.file.contentType, // Uploaded file's content type
                    },
                });
            });
        });
    }

    /**
     * @description Get a file from Amazon S3
     * @param {*} file - The file object containing file_name
     * @returns {*} - Read stream of the file
     * @memberof S3StorageService
     */
    getFile(file) {
        // Define options for retrieving the file from S3
        var options = {
            Bucket: s3_settings.BUCKET_NAME + '/files', // Specify the bucket and folder
            Key: file.file_name, // Specify the file key (filename)
        };
        // Retrieve the file as a readable stream
        return s3.getObject(options).createReadStream();
    }

    /**
     * @description Delete a file from Amazon S3
     * @param {*} filePath - The path of the file to be deleted
     * @returns {*} - Status and message of the deletion operation
     * @memberof S3StorageService
     */
    async deleteFile(filePath) {
        try {
            // Create a promise to handle the deletion operation
            return new Promise((resolve, reject) => {
                // Specify parameters for deleting the file from S3
                s3.deleteObject(
                    {
                        Bucket: s3_settings.BUCKET_NAME + '/files', // Specify the bucket and folder
                        Key: filePath, // Specify the file key (filename)
                    },
                    function (err, data) {
                        if (err) {
                            // If deletion fails, reject the promise with an error
                            reject({
                                status: 'error',
                                data: err.message,
                            });
                        } else {
                            // If deletion succeeds, resolve the promise with a success message
                            resolve({
                                status: 'success',
                                data: 'File ' + filePath + ' deleted successfully',
                            });
                        }
                    }
                );
            });
        } catch (err) {
            // If an error occurs during deletion, catch and handle the error
            console.error(err);
            return {
                status: 'error',
                data: 'Something went wrong',
            };
        }
    }
}

module.exports = S3StorageService;
