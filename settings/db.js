const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: process.env.DB,
    name: process.env.DB_HOST,
};
