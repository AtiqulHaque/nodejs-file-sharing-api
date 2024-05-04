const setRateLimit = require('express-rate-limit');
const app_settings = require('./../settings/app');

/** @type {*} */
// Middleware for limiting download requests
const DownloadLimitMiddleware = setRateLimit({
    windowMs: 1440 * 60 * 1000, // 24 hours in milliseconds
    max: app_settings.perday_download_limit, // Maximum number of download requests allowed per day
    message: {
        status: 'error',
        data: `You have exceeded your ${app_settings.perday_download_limit} file download request per day limit.`,
    },
    headers: true, // Include rate limit headers in the response
});

// Middleware for limiting upload requests
const UploadLimitMiddleware = setRateLimit({
    windowMs: 1440 * 60 * 1000, // 24 hours in milliseconds
    max: app_settings.perday_upload_limit, // Maximum number of upload requests allowed per day
    message: {
        status: 'error',
        data: `You have exceeded your ${app_settings.perday_upload_limit} file upload request per day limit.`,
    },
    headers: true, // Include rate limit headers in the response
});

module.exports = {
    DownloadLimitMiddleware,
    UploadLimitMiddleware,
};
