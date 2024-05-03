const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
const env = dotenv.parse(fs.readFileSync(envPath, {encoding: "utf8"}));

module.exports = {
    apps: [
        {
            name: "upload-service",
            script: "./index.js",
            env,
            node_args: "--max_old_space_size=6144",
        },
    ],
};
