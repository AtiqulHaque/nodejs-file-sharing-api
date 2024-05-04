const { createWrapper } = require('../../utilities/newrelic');

const logger = require('../../utilities/logger');

const { postMessageToQueue } = require('../../utilities/bullmq');
const FileRepository = require('../../database/repositories/FileRepository');

const TASKS = {
    init,
};

module.exports = async (job) => {
    const { name, data } = job;
    const handler = TASKS[name];
    if (!handler) throw new Error('Invalid job name passed');

    const wrappedHandler = createWrapper('ping', name, handler);
    return await wrappedHandler(data);
};

async function init() {
    const fileRepository = new FileRepository();
    const allInactiveFiles = await fileRepository.getAllInActiveFiles();
    //Pull all inactive files which is not used within 1 day.
    if (allInactiveFiles.status === 'success') {
        for (let i = 0; i < allInactiveFiles.data.length; i++) {
            //Push that file to cleanup queue
            await postMessageToQueue('cleanup', 'handleOne', allInactiveFiles.data[i]);
        }
    }

    logger.info(`Total inactive file found File :  ${allInactiveFiles.data.length}`);
}
