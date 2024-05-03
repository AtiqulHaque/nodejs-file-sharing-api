
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "ACCESS_KEY" : process.env.GOOGLE_ACCESS_KEY,
    "ACCESS_SECRET" : process.env.GOOGLE_ACCESS_SECRET,
    "BUCKET_NAME" : process.env.GOOGLE_BUCKET_NAME
}