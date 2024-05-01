const Redis = require("ioredis");

let CONNECTION = null;

module.exports.getRedis = function () {
    if (CONNECTION) {
        return CONNECTION;
    }
    const redisDSN = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`
    const conn = new Redis(redisDSN);
    CONNECTION = conn;

    return conn;
};
