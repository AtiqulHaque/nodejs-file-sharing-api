
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'File sharing api documentation',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express.',
    },
    servers: [
        {
            url: 'http://localhost:' + process.env.PORT,
            description: 'Development server',
        },
    ],
};

module.exports = swaggerDefinition;