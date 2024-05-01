// Bootstrap pools
const {initiateConnection} = require("./database/bootstrap")
initiateConnection();

// Require components
require("./web")
//require("./workers")
//require("./cron")