const {createWrapper} = require("../../utilities/newrelic");

const logger = require('../../utilities/logger');

const TASKS = {
    hello,
};

module.exports = async (job) => {
    const {name, data} = job;
    const handler = TASKS[name];
    if (!handler) throw new Error("Invalid job name passed");

    const wrappedHandler = createWrapper("ping", name, handler);
    return await wrappedHandler(data);
};

async function hello({name}) {
    logger.info(`Hello there, ${name}!`);
}
