const redis = require('redis');
const dotenv = require("dotenv");
const logger = require("../utilities/logger");

let redisClient;

(async () => {
    try {
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });
       
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
        await redisClient.connect();
        await redisClient.select(3);
    } catch (error) {
        console.log(process.env.REDIS_PORT)
        console.log(error);
    }

})();

class CacheHandler {

    static async set(key, data, expireTime) {
        try {
            await redisClient.set(key, data, {
                EX: expireTime,
                NX: true,
            });
        } catch (error) {
            console.log(error);
            logger.log('error', error.message);
        }
    }

    static async get(key) {
        try {
            return await redisClient.get(key);
        } catch (error) {
            console.log(error);
            logger.log('error', error.message);
            return null;
        }
    }

    static async remove(key) {
        try {
            return await redisClient.del(key);
        } catch (error) {
            console.log(error);
            logger.log('error', error.message);
            return null;
        }
    }

    static createKey(keys) {
        return keys.join("::");
    }
}

module.exports = CacheHandler