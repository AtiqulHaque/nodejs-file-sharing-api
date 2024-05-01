const newrelic = require("newrelic");

module.exports.createWrapper = (group, name, handler) => {
    return async (arguments) => {
        return await newrelic.startBackgroundTransaction(
            name,
            [group],
            async () => {
                return await handler(arguments);
            }
        );
    };
};
