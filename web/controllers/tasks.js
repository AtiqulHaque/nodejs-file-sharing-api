const {postMessageToQueue} = require("../../utilities/bullmq");

async function queueTask(req, res, next) {
    const {queue, job, data} = req.body
    if (!queue || !job) {
        return res.status(400).json({
            "error": "queue and job should not be empty"
        })
    }

    const response = await postMessageToQueue(queue, job, data)

    try {
        res.json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    queueTask,
};
