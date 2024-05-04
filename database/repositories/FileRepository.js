const FileModel = require('../models/FileModel'); // Importing the FileModel for database operations
const logger = require('../../utilities/logger'); // Importing the logger utility for error logging
const app_settings = require('../../settings/app'); // Importing app settings

/**
 * @class FileRepository
 * @description A class representing a repository for file operations
 * @date 04/05/2024
 */
class FileRepository {
    /**
     * @constructor
     * @description Creates an instance of FileRepository
     * @date 04/05/2024
     */
    constructor() {
        this.File = FileModel; // Assigning the FileModel to the File property for database operations
    }

    /**
     * @async
     * @function addFile
     * @description Adds a file to the repository
     * @date 04/05/2024
     * @param {*} param - The file data to be added
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async addFile(param) {
        try {
            let response = await this.File.create(param); // Creating a new file entry in the database
            return {
                status: 'success',
                data: response,
            };
        } catch (e) {
            console.log(e); // Logging the error to the console
            logger.log('error', e); // Logging the error using the logger utility

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function getFileByPrivateKey
     * @description Retrieves a file from the repository by private key
     * @date 04/05/2024
     * @param {*} private_key - The private key of the file to retrieve
     * @returns {*} - A status and data object containing the retrieved file or an error message
     */
    async getFileByPrivateKey(private_key) {
        try {
            const file = await this.File.find({ private_key: private_key }); // Finding the file by private key

            if (file.length > 0) {
                return {
                    status: 'success',
                    data: file[0],
                };
            }

            return {
                status: 'error',
                data: 'file not found',
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function getFileByPubKey
     * @description Retrieves a file from the repository by public key
     * @date 04/05/2024
     * @param {*} public_key - The public key of the file to retrieve
     * @returns {*} - A status and data object containing the retrieved file or an error message
     */
    async getFileByPubKey(public_key) {
        try {
            const file = await this.File.find({ public_key: public_key }); // Finding the file by public key

            if (file.length > 0) {
                return {
                    status: 'success',
                    data: file[0],
                };
            }

            return {
                status: 'error',
                data: 'file not found',
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function removePrivatKeyById
     * @description Removes a file from the repository by private key
     * @date 04/05/2024
     * @param {*} private_key - The private key of the file to remove
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async removePrivatKeyById(private_key) {
        try {
            let response = await this.File.find({ private_key: private_key }).remove(); // Removing the file by private key

            return {
                status: 'success',
                data: response,
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            return {
                status: 'error',
                data: e,
            };
        }
    }

    /**
     * @async
     * @function updateLastExcessTimeByPublicKey
     * @description Updates the last access time of a file by public key
     * @date 04/05/2024
     * @param {*} public_key - The public key of the file to update
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async updateLastExcessTimeByPublicKey(public_key) {
        try {
            let response = await this.File.updateOne(
                { public_key: public_key },
                { last_excess: new Date().toISOString() }
            ); // Updating the last access time of the file by public key

            return {
                status: 'success',
                data: response,
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            return {
                status: 'error',
                data: e,
            };
        }
    }

    /**
     * @async
     * @function getAllInActiveFiles
     * @description Retrieves all files from the repository that have not been accessed for a certain duration
     * @date 04/05/2024
     * @returns {*} - A status and data object containing the retrieved files or an empty array if none found
     */
    async getAllInActiveFiles() {
        try {
            let cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - parseInt(app_settings.inactive_duration));

            const files = await this.File.find({ last_excess: { $lt: cutoff } }); // Finding all inactive files

            if (files.length > 0) {
                return {
                    status: 'success',
                    data: files,
                };
            }

            return {
                status: 'error',
                data: [],
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }
}

module.exports = FileRepository; // Exporting the FileRepository class for use in other modules
