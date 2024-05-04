const StorageFactory = require('./storage/StorageFactory');
const FileRepository = require('../database/repositories/FileRepository');
const GenerateKeyService = require('./GeneratekeyService');
/**
 * @description Service for Uploading Files
 * @class FileUploadService
 * @date 04/05/2024
 */
class FileUploadService {
    /**
     * Creates an instance of FileUploadService.
     * @memberof FileUploadService
     */
    constructor() {
        // Initialize storage, repository, and key service objects
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
        // Assuming GenerateKeyService is imported and defined elsewhere
        this.keyService = new GenerateKeyService(16);
    }

    /**
     * @description Handle file upload request
     * @param {*} req - The request object containing the file to be uploaded
     * @returns {*} - Status and data of the upload operation
     * @memberof FileUploadService
     */
    async uploadFile(req) {
        // Upload the file to the storage system
        const uploadResponse = await this.fileStorage.uploadFile(req);

        // If file upload is successful, generate keys and store file metadata in the database
        if (uploadResponse.status === 'success') {
            const { publicKey, privateKey } = this.keyService.getKeys();
            const { filename, mimetype } = uploadResponse.data;

            // Add file metadata to the database
            await this.repository.addFile({
                private_key: privateKey,
                public_key: publicKey,
                file_name: filename,
                file_mimetype: mimetype,
            });

            return {
                status: 'success',
                data: { publicKey, privateKey },
            };
        }

        // If file upload fails, return error
        return {
            status: 'error',
            data: 'File not found',
        };
    }
}

module.exports = FileUploadService;
