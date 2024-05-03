const StorageFactory = require('../services/storage/StorageFactory');
const FileRepository = require('./../database/repositories/FileRepository');

class FileDeleteService {
    constructor() {
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async deleteFile(privatekey) {
        const { status, data } = await this.repository.getFileByPrivateKey(privatekey);

        if (status !== 'success') {
            return {
                status: 'error',
                data: 'File not found',
            };
        }

        const deleteResponse = await this.fileStorage.deleteFile(data.file_name);

        if (deleteResponse.status === 'success') {
            //Remove file data from database
            await this.repository.removePrivatKeyById(privatekey);

            return {
                status: 'success',
                data: 'File has been delete successfully',
            };
        }

        return {
            status: 'error',
            data: 'File not found',
        };
    }
}

module.exports = FileDeleteService;
