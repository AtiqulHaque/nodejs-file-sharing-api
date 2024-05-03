const { reportError } = require('../../utilities/sentry');
const logger = require('../../utilities/logger');
const FileRepository = require('../../database/repositories/FileRepository');

const FileDeleteService = require('../../services/FileDeleteService');

const SCHEDULE = {
    minute: '*',
};

const task = async () => {
    logger.info('Queue: storage_cleanup');

    const fileRepository = new FileRepository();
    const allInactiveFiles = await fileRepository.getAllInActiveFiles();
    //Pull all inactive files which is not used within 1 day.
    if (allInactiveFiles.status === 'success') {
        for (let i = 0; i < allInactiveFiles.data.length; i++) {
            await deleteFiles(allInactiveFiles.data[i]);
        }
    }
    return 'done';
};

const onError = (err) => {
    reportError(err).catch((err) => console.error(err));
};

const deleteFiles = async (file) => {
    //Remove that file
    let FileDeleteServiceObj = new FileDeleteService();
    let response = await FileDeleteServiceObj.deleteFile(file.private_key);

    if (response.status === 'success') {
        logger.info(`File ${file.file_name} removed`);
    }
};

module.exports = {
    schedule: SCHEDULE,
    task,
    onError,
};
