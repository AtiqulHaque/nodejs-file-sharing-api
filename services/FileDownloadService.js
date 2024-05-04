const StorageFactory = require('./storage/StorageFactory');
const FileRepository = require('../database/repositories/FileRepository');
const CacheHandler = require('./../utilities/CacheHandler');

/**
 * @description Service for Downloading Files
 * @class FileDownloadService
 * @date 04/05/2024
 */
class FileDownloadService {
    constructor() {
        // Initialize storage and repository objects
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    /**
     * @description Retrieve file data based on the provided public key
     * @param {*} req - The request object containing parameters
     * @returns {*} - Status and data of the file retrieval operation
     */
    async getFileData(req) {
        const { publickey } = { ...req.params };
        let fileResponse = await CacheHandler.get(publickey);

        // If cache miss, retrieve file data from repository
        if (!fileResponse) {
            console.log('Cache miss');
            const { status, data } = await this.repository.getFileByPubKey(publickey);

            // If file not found in the repository, return error
            if (status !== 'success') {
                return {
                    status: 'error',
                    data: 'File not found',
                };
            }
            fileResponse = data;
            // Store file data in cache for future requests
            await CacheHandler.set(publickey, JSON.stringify(data), 30);
        } else {
            console.log('Cache Hit');
            fileResponse = JSON.parse(fileResponse);
        }

        // If file data is available, update last access time and return file handler and metadata
        if (fileResponse) {
            await this.repository.updateLastExcessTimeByPublicKey(publickey);
            return {
                status: 'success',
                data: {
                    fileHandler: this.fileStorage.getFile(fileResponse),
                    file_meta_data: fileResponse,
                },
            };
        }

        // If file data not found, return error
        return {
            status: 'error',
            data: 'File not found',
        };
    }
}

module.exports = FileDownloadService;
