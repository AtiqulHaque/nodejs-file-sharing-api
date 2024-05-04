const setRateLimit = require("express-rate-limit");
const app_settings = require("./../settings/app");


const DownloadLimitMiddleware = setRateLimit({
  windowMs: 1440 * 60 * 1000, //24 hour in milisecond
  max: app_settings.perday_download_limit,
  message: {
    "status" : "error",
    "data" : "You have exceeded your " +app_settings.perday_download_limit + " file download request per day limit."
  },
  headers: true,
});

const UploadLimitMiddleware = setRateLimit({
  windowMs: 1440 * 60 * 1000, //24 hour in milisecond
  max: app_settings.perday_upload_limit,
  message: {
    "status" : "error",
    "data" : "You have exceeded your " +app_settings.perday_upload_limit + " file upload request per day limit."
  },
  headers: true,
});



module.exports = {
  DownloadLimitMiddleware,
  UploadLimitMiddleware
};