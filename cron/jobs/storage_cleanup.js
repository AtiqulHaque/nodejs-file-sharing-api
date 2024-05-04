const { postMessageToQueue } = require('../../utilities/bullmq'); // Importing function to post messages to a queue
const { reportError } = require('../../utilities/sentry'); // Importing function to report errors
const logger = require('../../utilities/logger'); // Importing logger utility

/**
 * @constant
 * @description Schedule for the storage cleanup task
 * @type {Object}
 * @property {string} minute - Specifies that the task should run every minute
 */
const SCHEDULE = {
    minute: '*',
};

/**
 * @function task
 * @description Performs the storage cleanup task
 * @returns {Promise<string>} - A promise resolving to 'done' upon successful completion of the task
 */
const task = async () => {
    logger.info('Queue: storage_cleanup'); // Logging an informational message
    await postMessageToQueue('storage_cleanup', 'init'); // Posting a message to the 'storage_cleanup' queue to initiate cleanup
    return 'done'; // Returning 'done' to indicate successful completion of the task
};

/**
 * @function onError
 * @description Handles errors that occur during the task execution
 * @param {Error} err - The error that occurred
 */
const onError = (err) => {
    reportError(err).catch((err) => console.error(err)); // Reporting the error using Sentry utility and logging to console if reporting fails
};

module.exports = {
    schedule: SCHEDULE, // Exporting the schedule for the task
    task, // Exporting the task function
    onError, // Exporting the error handling function
};
