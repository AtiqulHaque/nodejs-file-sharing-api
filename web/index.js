const express = require("express");


// express middlewares
const cors = require("cors");
const helmet = require('helmet');
const hpp = require('hpp');
const compression = require('compression')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

// swagger specs
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require('./docs/docs')
const options = {
    swaggerDefinition,
    apis: [`${__dirname}/routers/*.js`],
};
const swaggerSpec = swaggerJsdoc(options);

// Routers
const FileProcessRouter = require("./routers/FileProcessRouter");
const {home} = require("./controllers/WelcomeController");

// Utils
const logger = require('../utilities/logger');


// Express
const app = express();

//load middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(compression())
app.use(cors());

app.use(helmet());
app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(hpp());

//app.use(rateLimitMiddleware);

// routes
app.get("/api/ping", home);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use("/tasks", TasksRouter);

app.use("/",FileProcessRouter);
// 404 handler
app.get('*', function (req, res) {
    res.status(404).json({"error": "Not found"})
});

// common error handler - last middleware
app.use((err, req, res, next) => {

    console.log(err);
    if (res.headersSent) {
        next("There was an error!");
    } else {
        if (process.env.NODE_ENV === "development") {
            logger.error(err);
            res.error = {
                status: "error",
                message: err.message,
            };
        } else {
            console.log(err);
            logger.error(err);
            res.error = {status: "error", message: "Internal Server Error"};
        }

        res.status(err.status || 500);
        res.json(res.error);
    }
});

// start app, handle errors
app.listen(3000, () => {
    logger.info(`app started`, {port: process.env.PORT});
});

process.on('uncaughtException', err => {
    logger.error(err)
    process.exit(1);
});

process.on('unhandledRejection', err => {
    logger.error(err)
    app.close(() => {
        process.exit(1);
    });
});

module.exports = app;