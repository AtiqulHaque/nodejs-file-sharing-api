
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    "ACCESS_KEY" : process.env.S3_ACCESS_KEY,
    "ACCESS_SECRET" : process.env.S3_ACCESS_SECRET,
    "BUCKET_NAME" : process.env.S3_BUCKET_NAME
}