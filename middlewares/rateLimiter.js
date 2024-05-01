const setRateLimit = require("express-rate-limit");
const app_settings = require("./../settings/app");


const rateLimitMiddleware = setRateLimit({
  windowMs: 1440 * 60 * 1000, //24 hour in milisecond
  max: app_settings.perday_limit,
  message: "You have exceeded your " +app_settings.perday_limit + " requests per day limit.",
  headers: true,
});

module.exports = rateLimitMiddleware;