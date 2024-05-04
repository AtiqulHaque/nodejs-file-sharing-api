
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "upload_folder" : process.env.FOLDER,
    "storage" : (typeof process.env.PROVIDER === "undefined") ? "local" : process.env.PROVIDER,
    "perday_upload_limit" : process.env.PER_DAY_UPLOAD_LIMIT,
    "perday_download_limit" : process.env.PER_DAY_DOWNLOAD_LIMIT,
    "inactive_duration" : process.env.INACTIVE_FILE_DURATION,
}