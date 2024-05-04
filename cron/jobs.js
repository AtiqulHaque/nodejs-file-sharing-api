// const ping = require("./jobs/ping");
//const categoryLookup = require("./jobs/keyword_lookup")
const storage_cleanup = require("./jobs/storage_cleanup")
module.exports = [storage_cleanup];
