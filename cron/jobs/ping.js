const { postMessageToQueue } = require('../../utilities/bullmq');
const { reportError } = require('../../utilities/sentry');
const logger = require('../../utilities/logger');

const SCHEDULE = {
    minute: '*',
};

const task = async () => {
    logger.info('Queue: ping');
    await postMessageToQueue('ping', 'hello', { name: 'logo service' });
    return 'done';
};

const onError = (err) => {
    reportError(err).catch((err) => console.error(err));
};

module.exports = {
    schedule: SCHEDULE,
    task,
    onError,
};
