const StorageFactory = require('./storage/StorageFactory');
const FileRepository = require('../database/repositories/FileRepository');

class FileDownloadService {
    constructor() {
        this.fileStorage = StorageFactory.getStorageObject();
        this.repository = new FileRepository();
    }

    async getFileData(req) {
        const { publickey } = { ...req.params };

        const { status, data } = await this.repository.getFileByPubKey(publickey);

        if (status !== 'success') {
            return {
                status: 'error',
                data: 'File not found',
            };
        }
        if (data) {
            await this.repository.updateLastExcessTimeByPublicKey(publickey);
            return {
                status: 'success',
                data: {
                    fileHandler: this.fileStorage.getFile(data),
                    file_meta_data: data,
                },
            };
        }

        return {
            status: 'error',
            data: 'File not found',
        };
    }
}

module.exports = FileDownloadService;
