
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    "upload_folder" : process.env.FOLDER,
    "storage" : process.env.STORAGE,
    "perday_limit" : process.env.PER_DAY_LIMIT,
}