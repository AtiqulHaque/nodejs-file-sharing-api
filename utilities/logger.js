const {createLogger, format, transports} = require("winston");

require("winston-syslog").Syslog;

const network = require("./network");
const ipAddresses = network.getIPAddressesOfHostMachine();
const hostIP = ipAddresses[ipAddresses.length - 1];
const dotenv = require('dotenv');
dotenv.config();
const myFormat = format.printf((info) => {

     console.log(info.message)

    const {level, message, ...rest} = info;

    return JSON.stringify({
        level,
        message,
        ...rest,
    });


});

const logTransports = [
    new transports.Syslog({
        host: 'logs3.papertrailapp.com',
        port: 29002,
        handleExceptions: true,
        protocol: "tls4",
        localhost: hostIP,
        eol: "\n",
        app_name: "logo-service",
    }),
];

if (process.env.NODE_ENV === "development") {
    logTransports.push(new transports.Console());
}


module.exports = createLogger({
    level: "debug",
    format: myFormat,
    transports: logTransports,
});