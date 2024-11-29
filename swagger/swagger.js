const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.1.1',
    info: {
      title: 'Wuolah Contests API',
      description: 'API endpoints for a contest app documented on swagger',
      contact: {
        name: 'Virginia Raschia',
        email: 'viraschia@gmail.com',
        url: 'https://github.com/willCodeForCandy/wuolah-back',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local server',
      },
      {
        url: '<pending>',
        description: 'Live server',
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ['./src/api/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
const swaggerDocs = (app, port) => {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = swaggerDocs;
