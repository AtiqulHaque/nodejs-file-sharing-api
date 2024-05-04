const StorageFactory = require('../services/storage/StorageFactory');
const FileRepository = require('./../database/repositories/FileRepository');
const CacheHandler = require('./../utilities/CacheHandler');

/**
 * @description Service for Delete Files
 * @class FileDeleteService
 * @date 04/05/2024
 */
class FileDeleteService {
    constructor() {
        // Initialize storage and repository objects
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    /**
     * @description Action for deleting files
     * @param {string} privatekey - The private key of the file to be deleted
     * @returns {object} - Status and data of the deletion operation
     */
    async deleteFile(privatekey) {
        // Get file data from repository using private key
        const { status, data } = await this.repository.getFileByPrivateKey(privatekey);

        // If file not found, return error
        if (status !== 'success') {
            return {
                status: 'error',
                data: 'File not found',
            };
        }

        // Delete file from storage
        const deleteResponse = await this.fileStorage.deleteFile(data.file_name);

        // If deletion from storage is successful, remove file data from database and cache
        if (deleteResponse.status === 'success') {
            await this.repository.removePrivatKeyById(privatekey); // Remove file data from database
            await CacheHandler.remove(data.public_key); // Remove file data from cache

            return {
                status: 'success',
                data: 'File has been deleted successfully',
            };
        }

        // If deletion from storage fails, return error
        return {
            status: 'error',
            data: 'File not found',
        };
    }
}

module.exports = FileDeleteService;
