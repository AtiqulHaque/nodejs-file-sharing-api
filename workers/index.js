const path = require("path");

const {QUEUE_CONFIGURATIONS} = require("./config");
const {getWorker} = require("../utilities/bullmq");
const {reportError} = require("../utilities/sentry");

for (const [queueName, options] of Object.entries(QUEUE_CONFIGURATIONS)) {
    const processorFile = path.join(__dirname, "handlers", queueName);
    const runnerFunc = require(processorFile);
    const worker = getWorker(queueName, runnerFunc, options);

    worker.on("error", (err) => {
        reportError(err).catch((err) => console.error(err));
    });

    worker.on("failed", (job, err) => {
        reportError(err).catch((err) => console.error(err));
    });

    worker.run();
}
