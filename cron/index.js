const cron = require('node-cron'); // Importing the node-cron library for scheduling tasks

const jobs = require('./jobs'); // Importing job configurations
const utils = require('./utils'); // Importing utility functions

/**
 * @description Schedule and execute jobs based on the configured schedule
 */
for (const job of jobs) {
    const cronExpression = utils.convertToCronExpression(job.schedule); // Converting job schedule to cron expression

    /**
     * Schedules a task to run according to the cron expression.
     * Executes the task function, handles completion and error cases using promises and provided callbacks.
     */
    cron.schedule(
        cronExpression, // Cron expression defining the schedule
        () => {
            utils
                .promise(job.task) // Executes the task function asynchronously
                .then((response) => {
                    // Handling task completion
                    if (job.onComplete) {
                        return job.onComplete(response); // Executes onComplete callback if provided
                    }
                })
                .catch((err) => {
                    // Handling task errors
                    if (job.onError) {
                        return job.onError(err); // Executes onError callback if provided
                    }
                });
        },
        job.options // Additional options for the scheduled task
    );
}

module.exports = cron; // Exporting the cron scheduler for use in other modules
