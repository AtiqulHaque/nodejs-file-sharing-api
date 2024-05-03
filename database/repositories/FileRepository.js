// Import necessary modules and dependencies
const FileModel = require('../models/FileModel'); // Importing the FileModel module
const logger = require('../../utilities/logger'); // Importing the logger utility
const app_settings = require('../../settings/app'); // Importing application settings
const moment = require('moment'); // Importing moment.js for date manipulation

// Define a class for handling file operations
class FileRepository {
    constructor() {
        this.File = new FileModel(); // Initialize FileModel instance
    }

    // Method to add a file
    async addFile(param) {
        try {
            let response = await this.File.create(param); // Create file using FileModel

            // Return success response
            return {
                status: 'success',
                data: param,
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            let errorMessages = e;

            // Extract error messages if available
            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            // Return error response
            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    // Method to get a file by private key
    async getFileByPrivateKey(private_key) {
        try {
            const file = await this.File.find(private_key); // Find file by private key

            // If file found, return success response
            if (file.length > 0) {
                return {
                    status: 'success',
                    data: file[0],
                };
            }

            // If file not found, return error response
            return {
                status: 'error',
                data: 'file not found',
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            let errorMessages = e;

            // Extract error messages if available
            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            // Return error response
            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    // Method to get a file by public key
    /**
     *
     *
     * @param {any} public_key
     * @returns
     *
     * @memberOf FileRepository
     */
    async getFileByPubKey(public_key) {
        try {
            const file = await this.File.find(public_key); // Find file by public key

            // If file found, return success response
            if (file.length > 0) {
                return {
                    status: 'success',
                    data: file[0],
                };
            }

            // If file not found, return error response
            return {
                status: 'error',
                data: 'file not found',
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            let errorMessages = e;

            // Extract error messages if available
            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            // Return error response
            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    // Method to remove file by private key
    /**
     *
     *
     * @param {any} private_key
     * @returns
     *
     * @memberOf FileRepository
     */
    async removePrivatKeyById(private_key) {
        try {
            await this.File.delete(private_key); // Delete file by private key

            // Return success response
            return {
                status: 'success',
                data: 'Success',
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            // Return error response
            return {
                status: 'error',
                data: e,
            };
        }
    }

    /**
     * Method to update last access time by public key
     *
     * @param {any} public_key
     * @returns
     *
     * @memberOf FileRepository
     */
    async updateLastExcessTimeByPublicKey(public_key) {
        try {
            await this.File.updateActivity(public_key, moment().format()); // Update last access time

            // Return success response
            return {
                status: 'success',
                data: 'success',
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            // Return error response
            return {
                status: 'error',
                data: e,
            };
        }
    }

    // Method to get all inactive files
    async getAllInActiveFiles() {
        try {
            const data = await this.File.read(); // Read all files
            const currentTime = moment(); // Get current time
            const files = [];

            // Iterate through each file
            data.forEach((element) => {
                const inactiveFileTime = currentTime.diff(moment(element.uploaded_at), 'minutes');
                console.log(inactiveFileTime, app_settings.inactive_duration);

                // If file is inactive, add it to the list
                if (inactiveFileTime >= parseInt(app_settings.inactive_duration)) {
                    files.push(element);
                }
            });

            // Return success response with inactive files
            return {
                status: 'success',
                data: files,
            };
        } catch (e) {
            console.log(e); // Log error to console
            logger.log('error', e); // Log error using logger utility

            let errorMessages = e;

            // Extract error messages if available
            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            // Return error response
            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }
}

module.exports = FileRepository; // Export FileRepository class
