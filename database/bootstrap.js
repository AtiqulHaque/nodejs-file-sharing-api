const mongoose = require('mongoose');
const logger = require('../utilities/logger');
/**
 * @description Initialize Database connection
 * @date 04/05/2024
 */
module.exports.initiateConnection = () => {
    try {
        mongoose
            .connect(process.env.MONGO_DSN)
            .then(() => {
                logger.info('Database connected');
            })
            .catch((err) => {
                logger.error(err);
            });
    } catch (error) {
        logger.log('Database connection error', error);
        logger.error(error);
    }
};
