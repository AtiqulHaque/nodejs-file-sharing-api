// Bootstrap pools
const {initiateConnection} = require("./database/bootstrap")
initiateConnection();
global.__basedir = __dirname;
// Require components
require("./web")
require("./workers")
require("./cron")