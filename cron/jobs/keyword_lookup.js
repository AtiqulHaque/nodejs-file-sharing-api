const {postMessageToQueue} = require("../../utilities/bullmq");
const {reportError} = require("../../utilities/sentry");
const logger = require("../../utilities/logger")

const SCHEDULE = {
    hour: "0",
};

const task = async () => {
    logger.info("Queue: keyword_lookup");
    await postMessageToQueue("keyword_lookup", "init",);
    return "done";
};

const onError = (err) => {
    reportError(err).catch((err) => console.error(err));
};

module.exports = {
    schedule: SCHEDULE, task, onError,
};
