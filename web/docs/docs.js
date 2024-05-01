
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Company api documentation',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from Company Database.',
    },
    servers: [
        {
            url: 'http://localhost:' + process.env.PORT,
            description: 'Development server',
        },
    ],
};

module.exports = swaggerDefinition;