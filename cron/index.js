const cron = require('node-cron');

const jobs = require('./jobs');
const utils = require('./utils');

for (const job of jobs) {
    const cronExpression = utils.convertToCronExpression(job.schedule);

    cron.schedule(
        cronExpression,
        () => {
            utils
                .promise(job.task)
                .then((response) => {
                    if (job.onComplete) {
                        return job.onComplete(response);
                    }
                })
                .catch((err) => {
                    if (job.onError) {
                        return job.onError(err);
                    }
                });
        },
        job.options
    );
}

module.exports = cron;
